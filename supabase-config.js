// ============================================
// SUPABASE-CONFIG.JS - Configuração do Supabase
// ============================================

// Configuração do seu projeto Supabase
const SUPABASE_URL = 'https://rxzopexoeoqylqzdktnv.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4em9wZXhvZW9xeWxxemRrdG52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2NTUyOTIsImV4cCI6MjA5NjIzMTI5Mn0.-YD8cuIjNuxGbXLQ5DDawpdSj4SqU1-ThOaZsar-X9c';

// Inicializar cliente Supabase
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ============================================
// FUNÇÕES DE USUÁRIO
// ============================================

// Cadastrar novo usuário (primeiro acesso)
async function cadastrarUsuario(nome_completo, cpf, setor, cargo, email, usuario, telefone, senha) {
    try {
        // Verificar se usuário já existe
        const { data: existing, error: checkError } = await supabaseClient
            .from('usuarios')
            .select('id')
            .or(`email.eq.${email},cpf.eq.${cpf},usuario.eq.${usuario}`)
            .maybeSingle();
        
        if (existing) {
            if (existing.email === email) return { success: false, error: 'Este e-mail já está cadastrado' };
            if (existing.cpf === cpf) return { success: false, error: 'Este CPF já está cadastrado' };
            return { success: false, error: 'Este nome de usuário já existe' };
        }
        
        // Inserir novo usuário
        const { data, error } = await supabaseClient
            .from('usuarios')
            .insert([{
                nome_completo,
                cpf,
                setor,
                cargo,
                email,
                usuario,
                telefone,
                senha: senha,
                role: 'vendedor',
                ativo: true
            }])
            .select();
        
        if (error) throw error;
        
        return { success: true, user: data[0] };
    } catch (error) {
        console.error('Erro no cadastro:', error);
        return { success: false, error: error.message };
    }
}

// Login
async function login(usuario, senha) {
    try {
        const { data: user, error } = await supabaseClient
            .from('usuarios')
            .select('*')
            .or(`email.eq.${usuario},usuario.eq.${usuario}`)
            .eq('ativo', true)
            .single();
        
        if (error || !user) {
            return { success: false, error: 'Usuário ou senha inválidos' };
        }
        
        if (user.senha !== senha) {
            return { success: false, error: 'Usuário ou senha inválidos' };
        }
        
        // Salvar sessão
        const sessionToken = btoa(`${user.id}:${Date.now()}`);
        localStorage.setItem('session_token', sessionToken);
        localStorage.setItem('user_data', JSON.stringify(user));
        
        return { success: true, user };
    } catch (error) {
        return { success: false, error: 'Erro ao fazer login' };
    }
}

// Gerar código de 6 dígitos
function gerarCodigo() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Solicitar recuperação de senha
async function solicitarRecuperacao(email) {
    try {
        const { data: user, error } = await supabaseClient
            .from('usuarios')
            .select('id, email, nome_completo')
            .eq('email', email)
            .single();
        
        if (error || !user) {
            return { success: false, error: 'E-mail não encontrado' };
        }
        
        const codigo = gerarCodigo();
        const expira_em = new Date();
        expira_em.setMinutes(expira_em.getMinutes() + 15);
        
        await supabaseClient
            .from('recuperacao_senha')
            .insert([{
                usuario_id: user.id,
                codigo: codigo,
                expira_em: expira_em.toISOString(),
                usado: false
            }]);
        
        // Mostrar código no console (temporário - depois será por e-mail)
        console.log(`🔐 CÓDIGO DE RECUPERAÇÃO PARA ${email}: ${codigo}`);
        alert(`Código de verificação: ${codigo}\n\n(Em produção, este código será enviado por e-mail)`);
        
        return { success: true, message: 'Código enviado com sucesso' };
    } catch (error) {
        return { success: false, error: 'Erro ao solicitar recuperação' };
    }
}

// Verificar código
async function verificarCodigoRecuperacao(email, codigo) {
    try {
        const { data: user } = await supabaseClient
            .from('usuarios')
            .select('id')
            .eq('email', email)
            .single();
        
        if (!user) return { success: false, error: 'Usuário não encontrado' };
        
        const { data: token, error } = await supabaseClient
            .from('recuperacao_senha')
            .select('id')
            .eq('usuario_id', user.id)
            .eq('codigo', codigo)
            .eq('usado', false)
            .gte('expira_em', new Date().toISOString())
            .single();
        
        if (error || !token) {
            return { success: false, error: 'Código inválido ou expirado' };
        }
        
        return { success: true, token_id: token.id };
    } catch (error) {
        return { success: false, error: 'Erro ao verificar código' };
    }
}

// Redefinir senha
async function redefinirSenha(email, codigo, novaSenha) {
    try {
        const verificacao = await verificarCodigoRecuperacao(email, codigo);
        if (!verificacao.success) return verificacao;
        
        await supabaseClient
            .from('usuarios')
            .update({ senha: novaSenha, updated_at: new Date().toISOString() })
            .eq('email', email);
        
        await supabaseClient
            .from('recuperacao_senha')
            .update({ usado: true })
            .eq('id', verificacao.token_id);
        
        return { success: true, message: 'Senha alterada com sucesso' };
    } catch (error) {
        return { success: false, error: 'Erro ao redefinir senha' };
    }
}

// Logout
async function logout() {
    localStorage.removeItem('session_token');
    localStorage.removeItem('user_data');
    return { success: true };
}

// Verificar sessão
function isLoggedIn() {
    return !!localStorage.getItem('session_token');
}

// Obter usuário atual
function getCurrentUser() {
    const userData = localStorage.getItem('user_data');
    return userData ? JSON.parse(userData) : null;
}

// ============================================
// FUNÇÕES DE CHAMADOS
// ============================================

async function salvarChamado(tipo_cliente, tipo_servico, tipo_pagamento, dados, vendedor_id, vendedor_nome) {
    try {
        const { data, error } = await supabaseClient
            .from('chamados')
            .insert([{
                tipo_cliente,
                tipo_servico,
                tipo_pagamento,
                dados: dados,
                vendedor_id,
                vendedor_nome
            }])
            .select();
        
        if (error) throw error;
        return { success: true, data: data[0] };
    } catch (error) {
        console.error('Erro ao salvar chamado:', error);
        return { success: false, error: error.message };
    }
}

async function listarChamados(vendedor_id = null) {
    try {
        let query = supabaseClient
            .from('chamados')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (vendedor_id) {
            query = query.eq('vendedor_id', vendedor_id);
        }
        
        const { data, error } = await query;
        if (error) throw error;
        
        return { success: true, chamados: data };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Tornar funções globais
window.supabaseClient = supabaseClient;
window.cadastrarUsuario = cadastrarUsuario;
window.login = login;
window.solicitarRecuperacao = solicitarRecuperacao;
window.verificarCodigoRecuperacao = verificarCodigoRecuperacao;
window.redefinirSenha = redefinirSenha;
window.logout = logout;
window.isLoggedIn = isLoggedIn;
window.getCurrentUser = getCurrentUser;
window.salvarChamado = salvarChamado;
window.listarChamados = listarChamados;
window.gerarCodigo = gerarCodigo;