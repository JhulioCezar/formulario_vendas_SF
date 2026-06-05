// ============================================
// ROUTER.JS - Navegação e Inicialização
// ============================================

// Mapeamento de rotas para templates
const ROUTES = {
    'pf-internet': 'pf-internet',
    'pf-internet-telefone': 'pf-internet-telefone',
    'pf-telefone': 'pf-telefone',
    'pj-internet': 'pj-internet',
    'pj-internet-telefone': 'pj-internet-telefone',
    'pj-telefone': 'pj-telefone'
};

// Variável global para armazenar o tipo de formulário atual
let currentFormType = null;

// ============================================
// FUNÇÃO PARA OBTER USUÁRIO ATUAL (SEGURA)
// ============================================
function getCurrentUserSafe() {
    try {
        // Tentar obter do localStorage
        const userData = localStorage.getItem('user_data');
        if (userData) {
            const user = JSON.parse(userData);
            if (user && user.id) {
                return user;
            }
        }
        
        // Tentar obter da função global
        if (window.getCurrentUser) {
            const user = window.getCurrentUser();
            if (user && user.id) return user;
        }
        
        // Usuário padrão fallback (não deveria acontecer)
        console.warn('Usuário não encontrado, usando fallback');
        return { id: 0, nome_completo: 'Usuário', nome: 'Usuário', usuario: 'usuário', role: 'vendedor' };
    } catch (e) {
        console.error('Erro ao obter usuário:', e);
        return { id: 0, nome_completo: 'Usuário', nome: 'Usuário', usuario: 'usuário', role: 'vendedor' };
    }
}

// ============================================
// TEMPLATE DA TELA INICIAL (HOME)
// ============================================
function getHomeScreenHTML() {
    const user = getCurrentUserSafe();
    const userName = user.nome_completo || user.nome || user.usuario || 'Usuário';
    const userRole = user.role || 'vendedor';
    const roleLabel = userRole === 'admin' ? '👑 Administrador' : '👤 Vendedor';
    
    return `
        <div class="container">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; flex-wrap: wrap; gap: 10px;">
                <div>
                    <span style="font-size: 14px; color: #666;">Bem-vindo, <strong>${userName}</strong></span>
                    <br>
                    <span style="font-size: 12px; color: #999;">${roleLabel}</span>
                </div>
                <button onclick="doLogout()" style="background: #f44336; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer;">
                    🚪 Sair
                </button>
            </div>
            
            <div class="logo-section">
                <div class="logo">
                    <img src="https://i.imgur.com/SEr4lkm.png" alt="Logomarca">
                </div>
            </div>
            
            <div class="page-title">Abertura de Chamados - Novos Clientes</div>
            
            <div class="step">
                <div class="step-title" data-number="1">Selecione o tipo de cliente:</div>
                <div class="options-grid">
                    <div class="option-card" data-type="pf">
                        <div class="option-check">✓</div>
                        <div class="option-icon">👤</div>
                        <div class="option-title">Pessoa Física (CPF)</div>
                        <div class="option-description">Para clientes individuais com CPF</div>
                    </div>
                    
                    <div class="option-card" data-type="pj">
                        <div class="option-check">✓</div>
                        <div class="option-icon">🏢</div>
                        <div class="option-title">Pessoa Jurídica (CNPJ)</div>
                        <div class="option-description">Para empresas com CNPJ</div>
                    </div>
                </div>
            </div>
            
            <div class="step">
                <div class="step-title" data-number="2">Selecione o serviço:</div>
                <div class="service-options">
                    <div class="service-option" data-service="internet">
                        <div class="option-check">✓</div>
                        <div class="service-icon">🌐</div>
                        <div class="service-title">Somente Internet</div>
                    </div>
                    
                    <div class="service-option" data-service="internet-telefone">
                        <div class="option-check">✓</div>
                        <div class="service-icon">🌐📞</div>
                        <div class="service-title">Internet + Telefone Fixo</div>
                    </div>
                    
                    <div class="service-option" data-service="telefone">
                        <div class="option-check">✓</div>
                        <div class="service-icon">📞</div>
                        <div class="service-title">Telefone Fixo</div>
                    </div>
                </div>
            </div>
            
            <div class="validation-message" id="validationMessage">
                Por favor, selecione o tipo de cliente e o serviço antes de continuar.
            </div>
            
            <div class="info-box">
                <div class="info-title">ℹ️ Informações importantes</div>
                <div class="info-text">
                    Após selecionar as opções acima, você será direcionado para o formulário específico 
                    para preenchimento dos dados do cliente.
                </div>
            </div>
            
            <button class="start-button" id="startButton" disabled>
                <span>📋</span> Iniciar Formulário →
            </button>
            
            <div class="info-box" style="margin-top: 20px; background-color: #e3f2fd;">
                <div class="info-title">📊 Seus chamados</div>
                <div class="info-text">
                    <button onclick="verMeusChamados()" style="background: #2196F3; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; width: 100%;">
                        Ver lista de chamados salvos
                    </button>
                </div>
            </div>
        </div>
    `;
}

// ============================================
// FUNÇÃO PARA VOLTAR PARA HOME (CORRIGIDA)
// ============================================
function goToHome() {
    const appContainer = document.getElementById('app');
    if (appContainer) {
        appContainer.innerHTML = getHomeScreenHTML();
        currentFormType = null;
        
        // Reinicializar os event listeners da tela inicial
        setTimeout(() => {
            initializeHomeScreen();
        }, 100);
    }
}

// ============================================
// INICIALIZAR TELA INICIAL
// ============================================
function initializeHomeScreen() {
    let selectedType = null;
    let selectedService = null;
    
    const optionCards = document.querySelectorAll('.option-card');
    const serviceOptions = document.querySelectorAll('.service-option');
    const startButton = document.getElementById('startButton');
    const validationMessage = document.getElementById('validationMessage');
    
    function updateStartButton() {
        if (selectedType && selectedService) {
            startButton.removeAttribute('disabled');
            startButton.style.opacity = '1';
            startButton.style.cursor = 'pointer';
            if (validationMessage) validationMessage.style.display = 'none';
        } else {
            startButton.setAttribute('disabled', 'disabled');
            startButton.style.opacity = '0.6';
            startButton.style.cursor = 'not-allowed';
        }
    }
    
    optionCards.forEach(card => {
        card.onclick = () => {
            optionCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedType = card.getAttribute('data-type');
            updateStartButton();
        };
    });
    
    serviceOptions.forEach(option => {
        option.onclick = () => {
            serviceOptions.forEach(s => s.classList.remove('selected'));
            option.classList.add('selected');
            selectedService = option.getAttribute('data-service');
            updateStartButton();
        };
    });
    
    if (startButton) {
        startButton.onclick = () => {
            if (selectedType && selectedService) {
                loadForm(selectedType, selectedService);
            } else {
                if (validationMessage) validationMessage.style.display = 'block';
            }
        };
    }
}

// ============================================
// ADICIONAR BOTÃO VOLTAR AO FORMULÁRIO
// ============================================
function addBackButton(templateHTML) {
    const backButtonHTML = `
        <div style="margin-bottom: 20px; text-align: left;">
            <button type="button" id="backToHomeButton" style="
                background: linear-gradient(135deg, #6c757d, #5a6268);
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 8px;
                cursor: pointer;
                font-size: 14px;
                font-weight: 500;
                display: inline-flex;
                align-items: center;
                gap: 8px;
                transition: all 0.3s;
            ">
                ← Voltar para Início
            </button>
        </div>
    `;
    
    // Inserir o botão após a abertura do body ou container
    if (templateHTML.includes('<div class="container"')) {
        return templateHTML.replace('<div class="container"', backButtonHTML + '<div class="container"');
    }
    return backButtonHTML + templateHTML;
}

// ============================================
// CARREGAR FORMULÁRIO
// ============================================
function loadForm(type, service) {
    const formKey = `${type}-${service}`;
    const templateKey = ROUTES[formKey];
    
    if (!templateKey || !TEMPLATES[templateKey]) {
        console.error('Template não encontrado:', formKey);
        alert('Formulário não disponível no momento. Tente outra opção.');
        return false;
    }
    
    currentFormType = templateKey;
    
    const appContainer = document.getElementById('app');
    if (appContainer) {
        let templateHTML = TEMPLATES[templateKey];
        templateHTML = addBackButton(templateHTML);
        appContainer.innerHTML = templateHTML;
        
        setTimeout(() => {
            initializeCurrentForm();
            
            const backButton = document.getElementById('backToHomeButton');
            if (backButton) {
                backButton.onclick = goToHome;
            }
        }, 100);
        
        return true;
    }
    
    return false;
}

// ============================================
// INICIALIZAR FORMULÁRIO ATUAL
// ============================================
function initializeCurrentForm() {
    if (!currentFormType) return;
    
    initializePaymentOptions();
    initializeFormatting();
    initializeButtons();
    initializeFormValidations();
    
    if (currentFormType.startsWith('pj')) {
        initializeCargoFields();
    }
    
    if (currentFormType === 'pf-telefone' || currentFormType === 'pj-telefone') {
        initializePlanoTaxa();
    }
}

// ============================================
// INICIALIZAR OPÇÕES DE PAGAMENTO
// ============================================
function initializePaymentOptions() {
    const paymentOptions = document.querySelectorAll('.payment-option');
    
    paymentOptions.forEach(option => {
        const newOption = option.cloneNode(true);
        option.parentNode.replaceChild(newOption, option);
        
        newOption.addEventListener('click', function() {
            document.querySelectorAll('.payment-option').forEach(opt => {
                opt.classList.remove('active');
            });
            
            this.classList.add('active');
            
            document.querySelectorAll('.form-section').forEach(section => {
                section.classList.remove('active');
            });
            
            const targetId = this.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });
}

// ============================================
// INICIALIZAR FORMATAÇÃO
// ============================================
function initializeFormatting() {
    // CPF
    document.querySelectorAll('[id*="cpf"]').forEach(field => {
        field.removeEventListener('input', cpfInputHandler);
        field.addEventListener('input', cpfInputHandler);
    });
    
    // CNPJ
    document.querySelectorAll('[id*="cnpj"]').forEach(field => {
        field.removeEventListener('input', cnpjInputHandler);
        field.addEventListener('input', cnpjInputHandler);
    });
    
    // CEP
    document.querySelectorAll('[id*="cep"]').forEach(field => {
        field.removeEventListener('input', cepInputHandler);
        field.addEventListener('input', cepInputHandler);
    });
    
    // Telefone
    document.querySelectorAll('[id*="telefone"], [id*="contato"]').forEach(field => {
        field.removeEventListener('input', phoneInputHandler);
        field.addEventListener('input', phoneInputHandler);
    });
    
    // Taxa
    document.querySelectorAll('[id*="taxa_instalacao"], [id*="taxa_telefone"]').forEach(field => {
        field.removeEventListener('input', taxaInputHandler);
        field.addEventListener('input', taxaInputHandler);
    });
    
    // Data de Nascimento
    document.querySelectorAll('[id*="data_nascimento"]').forEach(field => {
        field.removeEventListener('blur', dateBlurHandler);
        field.removeEventListener('focus', dateFocusHandler);
        field.addEventListener('blur', dateBlurHandler);
        field.addEventListener('focus', dateFocusHandler);
    });
    
    // Capitalização
    document.querySelectorAll('input[type="text"]:not([id*="cpf"]):not([id*="cnpj"]):not([id*="cep"]):not([id*="taxa"]):not([readonly]):not([id*="data_nascimento"])').forEach(field => {
        field.removeEventListener('blur', capitalizeHandler);
        field.addEventListener('blur', capitalizeHandler);
    });
}

// Handlers de formatação
function cpfInputHandler(e) { this.value = formatCPF(this.value); }
function cnpjInputHandler(e) { this.value = formatCNPJ(this.value); }
function cepInputHandler(e) { this.value = formatCEP(this.value); }
function phoneInputHandler(e) { 
    this.value = formatPhone(this.value);
    if (this.id === 'telefone_principal' && this.value.length === 15) {
        const confirmDiv = document.getElementById('whatsapp_confirm');
        if (confirmDiv) confirmDiv.style.display = 'block';
    }
    if (this.id === 'telefone_principal_boleto' && this.value.length === 15) {
        const confirmDiv = document.getElementById('whatsapp_confirm_boleto');
        if (confirmDiv) confirmDiv.style.display = 'block';
    }
}
function taxaInputHandler(e) { this.value = formatCurrency(this.value); }
function dateBlurHandler(e) { formatDate(this); }
function dateFocusHandler(e) { this.type = 'text'; }
function capitalizeHandler(e) { 
    if (this.value.trim() !== '') {
        this.value = capitalizeWords(this.value);
    }
}

// ============================================
// INICIALIZAR BOTÕES
// ============================================
function initializeButtons() {
    // Botões GPS
    const gpsBtn = document.getElementById('gps_button');
    const gpsBtnBoleto = document.getElementById('gps_button_boleto');
    
    if (gpsBtn) {
        gpsBtn.onclick = () => getLocation(false, currentFormType);
    }
    if (gpsBtnBoleto) {
        gpsBtnBoleto.onclick = () => getLocation(true, currentFormType);
    }
    
    // Botão Copiar
    const copyBtn = document.getElementById('copyButton');
    if (copyBtn) {
        copyBtn.onclick = () => {
            const activeSection = document.querySelector('.form-section.active');
            const isBoleto = activeSection ? activeSection.id === 'boleto' : false;
            const containerId = isBoleto ? 'boleto' : 'debito';
            
            if (validateForm(isBoleto, currentFormType)) {
                copyFormData(isBoleto, containerId);
            } else {
                alert('Por favor, preencha todos os campos obrigatórios corretamente antes de copiar.');
            }
        };
    }
    
    // Botão Limpar
    const clearBtn = document.getElementById('clearButton');
    if (clearBtn) {
        clearBtn.onclick = () => {
            if (confirm('Tem certeza que deseja limpar todos os campos do formulário? Todos os dados serão perdidos.')) {
                const activeSection = document.querySelector('.form-section.active');
                const isBoleto = activeSection ? activeSection.id === 'boleto' : false;
                const containerId = isBoleto ? 'boleto' : 'debito';
                clearForm(isBoleto, containerId);
                alert('Formulário limpo com sucesso!');
            }
        };
    }
    
    // Botão Salvar PDF
    const saveBtn = document.getElementById('saveButton');
    if (saveBtn) {
        saveBtn.onclick = () => {
            const activeSection = document.querySelector('.form-section.active');
            const isBoleto = activeSection ? activeSection.id === 'boleto' : false;
            
            if (validateForm(isBoleto, currentFormType)) {
                gerarPDF(isBoleto, currentFormType);
            } else {
                alert('Por favor, preencha todos os campos obrigatórios corretamente antes de salvar.');
            }
        };
    }
    
    // Botão Autofill
    const autofillBtn = document.querySelector('.autofill-button');
    if (autofillBtn && (currentFormType === 'pf-internet-telefone' || currentFormType === 'pj-internet-telefone')) {
        const activeSection = document.querySelector('.form-section.active');
        const formType = activeSection && activeSection.id === 'boleto' ? 'boleto' : 'debito';
        autofillBtn.onclick = () => autofillTelefoneFixo(formType);
    }
}

// ============================================
// VALIDAÇÕES DO FORMULÁRIO (SIMPLIFICADAS)
// ============================================
function initializeFormValidations() {
    // Campos comuns
    setupValidation('cep', 'cep-error', value => /^\d{5}-\d{3}$/.test(value));
    setupValidation('cep_boleto', 'cep_boleto-error', value => /^\d{5}-\d{3}$/.test(value));
    setupValidation('numero', 'numero-error', value => value.length >= 1);
    setupValidation('numero_boleto', 'numero_boleto-error', value => value.length >= 1);
    setupValidation('endereco', 'endereco-error', value => value.length >= 5);
    setupValidation('endereco_boleto', 'endereco_boleto-error', value => value.length >= 5);
    setupValidation('bairro', 'bairro-error', value => value.length >= 2);
    setupValidation('bairro_boleto', 'bairro_boleto-error', value => value.length >= 2);
    setupValidation('cidade', 'cidade-error', value => value.length >= 2);
    setupValidation('cidade_boleto', 'cidade_boleto-error', value => value.length >= 2);
    setupValidation('telefone_principal', 'telefone_principal-error', value => /^\(\d{2}\) \d{5}-\d{4}$/.test(value));
    setupValidation('telefone_principal_boleto', 'telefone_principal_boleto-error', value => /^\(\d{2}\) \d{5}-\d{4}$/.test(value));
    setupValidation('whatsapp_principal', 'whatsapp_principal-error', value => /^\(\d{2}\) \d{5}-\d{4}$/.test(value));
    setupValidation('whatsapp_principal_boleto', 'whatsapp_principal_boleto-error', value => /^\(\d{2}\) \d{5}-\d{4}$/.test(value));
    setupValidation('vendedor', 'vendedor-error', value => value.length >= 2);
    setupValidation('vendedor_boleto', 'vendedor_boleto-error', value => value.length >= 2);
    
    if (currentFormType.startsWith('pf')) {
        setupValidation('nome', 'nome-error', value => value.length >= 3);
        setupValidation('cpf', 'cpf-error', value => /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(value));
        setupValidation('rg', 'rg-error', value => value.length >= 5 && value.length <= 20);
        setupValidation('data_nascimento', 'data_nascimento-error', validateBirthDate);
        setupValidation('email', 'email-error', value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
        
        setupValidation('nome_boleto', 'nome_boleto-error', value => value.length >= 3);
        setupValidation('cpf_boleto', 'cpf_boleto-error', value => /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(value));
        setupValidation('rg_boleto', 'rg_boleto-error', value => value.length >= 5 && value.length <= 20);
        setupValidation('data_nascimento_boleto', 'data_nascimento_boleto-error', validateBirthDate);
        setupValidation('email_boleto', 'email_boleto-error', value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
    }
    
    if (currentFormType.startsWith('pj')) {
        setupValidation('razao_social', 'razao_social-error', value => value.length >= 3);
        setupValidation('cnpj', 'cnpj-error', value => /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(value));
        setupValidation('nome_contratante', 'nome_contratante-error', value => value.length >= 3);
        setupValidation('cpf_contratante', 'cpf_contratante-error', value => /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(value));
        setupValidation('cargo_contratante', 'cargo_contratante-error', value => value.length > 0);
        setupValidation('email', 'email-error', value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
        
        setupValidation('razao_social_boleto', 'razao_social_boleto-error', value => value.length >= 3);
        setupValidation('cnpj_boleto', 'cnpj_boleto-error', value => /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(value));
        setupValidation('nome_contratante_boleto', 'nome_contratante_boleto-error', value => value.length >= 3);
        setupValidation('cpf_contratante_boleto', 'cpf_contratante_boleto-error', value => /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(value));
        setupValidation('cargo_contratante_boleto', 'cargo_contratante_boleto-error', value => value.length > 0);
        setupValidation('email_boleto', 'email_boleto-error', value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
    }
    
    if (!currentFormType.includes('telefone')) {
        setupValidation('fidelidade', 'fidelidade-error', value => value.length > 0);
        setupValidation('fidelidade_boleto', 'fidelidade_boleto-error', value => value.length > 0);
        setupValidation('taxa_instalacao', 'taxa_instalacao-error', value => value.length > 0);
        setupValidation('taxa_instalacao_boleto', 'taxa_instalacao_boleto-error', value => value.length > 0);
        setupValidation('plano', 'plano-error', value => value.length > 0);
        setupValidation('plano_boleto', 'plano_boleto-error', value => value.length > 0);
        setupValidation('inserir_rede_mesh', 'inserir_rede_mesh-error', value => value.length > 0);
        setupValidation('inserir_rede_mesh_boleto', 'inserir_rede_mesh_boleto-error', value => value.length > 0);
    }
    
    if (currentFormType !== 'pf-telefone' && currentFormType !== 'pj-telefone') {
        setupValidation('agencia', 'agencia-error', value => value.length >= 3);
        setupValidation('conta', 'conta-error', value => value.length >= 3);
        setupValidation('vencimento_debito', 'vencimento_debito-error', value => value.length > 0);
        setupValidation('vencimento_boleto', 'vencimento_boleto-error', value => value.length > 0);
    }
    
    if (currentFormType === 'pf-internet-telefone' || currentFormType === 'pj-internet-telefone' || currentFormType === 'pf-telefone') {
        setupValidation('cliente_telefone', 'cliente_telefone-error', value => value.length >= 3);
        setupValidation('cpf_telefone', 'cpf_telefone-error', value => /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(value));
        setupValidation('cidade_telefone', 'cidade_telefone-error', value => value.length >= 2);
        setupValidation('bairro_telefone', 'bairro_telefone-error', value => value.length >= 2);
        setupValidation('numero_endereco_telefone', 'numero_endereco_telefone-error', value => value.length >= 1);
        setupValidation('vendedor_telefone', 'vendedor_telefone-error', value => value.length >= 2);
        setupValidation('contato_telefone', 'contato_telefone-error', value => /^\(\d{2}\) \d{5}-\d{4}$/.test(value));
        setupValidation('taxa_telefone', 'taxa_telefone-error', value => value.length > 0);
        setupValidation('fidelidade_telefone', 'fidelidade_telefone-error', value => value.length > 0);
        setupValidation('portabilidade_telefone', 'portabilidade_telefone-error', value => value.length > 0);
        
        setupValidation('cliente_telefone_boleto', 'cliente_telefone_boleto-error', value => value.length >= 3);
        setupValidation('cpf_telefone_boleto', 'cpf_telefone_boleto-error', value => /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(value));
        setupValidation('cidade_telefone_boleto', 'cidade_telefone_boleto-error', value => value.length >= 2);
        setupValidation('bairro_telefone_boleto', 'bairro_telefone_boleto-error', value => value.length >= 2);
        setupValidation('numero_endereco_telefone_boleto', 'numero_endereco_telefone_boleto-error', value => value.length >= 1);
        setupValidation('vendedor_telefone_boleto', 'vendedor_telefone_boleto-error', value => value.length >= 2);
        setupValidation('contato_telefone_boleto', 'contato_telefone_boleto-error', value => /^\(\d{2}\) \d{5}-\d{4}$/.test(value));
        setupValidation('taxa_telefone_boleto', 'taxa_telefone_boleto-error', value => value.length > 0);
        setupValidation('fidelidade_telefone_boleto', 'fidelidade_telefone_boleto-error', value => value.length > 0);
        setupValidation('portabilidade_telefone_boleto', 'portabilidade_telefone_boleto-error', value => value.length > 0);
    }
}

// ============================================
// FUNÇÕES PJ (CARGOS)
// ============================================
function initializeCargoFields() {
    const razaoSocial = document.getElementById('razao_social');
    const nomeFantasia = document.getElementById('nome_fantasia');
    const razaoSocialBoleto = document.getElementById('razao_social_boleto');
    const nomeFantasiaBoleto = document.getElementById('nome_fantasia_boleto');
    
    if (razaoSocial) {
        razaoSocial.oninput = () => updateCargoOptions(false);
        updateCargoOptions(false);
    }
    if (nomeFantasia) {
        nomeFantasia.oninput = () => updateCargoOptions(false);
    }
    if (razaoSocialBoleto) {
        razaoSocialBoleto.oninput = () => updateCargoOptions(true);
        updateCargoOptions(true);
    }
    if (nomeFantasiaBoleto) {
        nomeFantasiaBoleto.oninput = () => updateCargoOptions(true);
    }
}

// ============================================
// FUNÇÕES TELEFONE (PLANO E TAXA)
// ============================================
function initializePlanoTaxa() {
    const clienteSelect = document.getElementById('cliente_sem_fronteiras');
    const clienteSelectBoleto = document.getElementById('cliente_sem_fronteiras_boleto');
    
    if (clienteSelect) {
        clienteSelect.onchange = () => updatePlanoAndTaxa(false);
    }
    if (clienteSelectBoleto) {
        clienteSelectBoleto.onchange = () => updatePlanoAndTaxa(true);
    }
}

// ============================================
// INICIALIZAR ROUTER
// ============================================
function initRouter() {
    const urlParams = new URLSearchParams(window.location.search);
    const formParam = urlParams.get('form');
    
    if (formParam && ROUTES[formParam]) {
        const [type, service] = formParam.split('-');
        if (type && service) {
            loadForm(type, service);
            return;
        }
    }
    
    // Carregar tela inicial
    const appContainer = document.getElementById('app');
    if (appContainer) {
        appContainer.innerHTML = getHomeScreenHTML();
        setTimeout(() => {
            initializeHomeScreen();
        }, 100);
    }
}

// Função para verificar se o Supabase já está carregado
function waitForSupabase() {
    return new Promise((resolve) => {
        if (window.supabaseClient) {
            resolve();
        } else {
            const checkInterval = setInterval(() => {
                if (window.supabaseClient) {
                    clearInterval(checkInterval);
                    resolve();
                }
            }, 100);
        }
    });
}

// Inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        waitForSupabase().then(() => {
            initRouter();
        });
    });
} else {
    waitForSupabase().then(() => {
        initRouter();
    });
}

// Exportar funções globalmente
window.goToHome = goToHome;
window.loadForm = loadForm;
window.getCurrentUserSafe = getCurrentUserSafe;
