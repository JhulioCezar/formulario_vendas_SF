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

/**
 * Template da tela inicial (home)
 */
function getHomeScreenHTML() {
    return `
        <div class="container" id="homeScreen">
            <div class="logo-section">
                <div class="logo">
                    <img src="https://i.imgur.com/SEr4lkm.png" alt="Logomarca">
                </div>
            </div>

            <div class="page-title">Abertura de Chamados - Novos Clientes</div>

            <div class="app-controls">
                <button class="install-btn" id="installButton" style="display: none;">
                    📲 Instalar App
                </button>
                <button class="update-btn" id="updateButton" style="display: none;">
                    🔄 Atualizar App
                </button>
            </div>
            
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
                    para preenchimento dos dados do cliente. Certifique-se de ter todos os documentos 
                    necessários antes de iniciar.
                </div>
            </div>
            
            <button class="start-button" id="startButton" disabled>
                <span>📋</span> Iniciar Formulário →
            </button>
        </div>
    `;
}

/**
 * Adiciona o botão voltar ao topo do formulário
 * @param {string} templateHTML - O HTML do formulário
 * @returns {string} HTML com botão voltar adicionado
 */
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
    
    // Inserir o botão logo após a abertura do container
    return templateHTML.replace('<div class="container', backButtonHTML + '<div class="container');
}

/**
 * Voltar para a tela inicial
 */
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

/**
 * Inicializa a tela inicial (event listeners)
 */
function initializeHomeScreen() {
    let selectedType = null;
    let selectedService = null;
    
    // Selecionar tipo de cliente
    const optionCards = document.querySelectorAll('.option-card');
    optionCards.forEach(card => {
        card.removeEventListener('click', handleTypeClick);
        card.addEventListener('click', handleTypeClick);
    });
    
    function handleTypeClick() {
        const type = this.getAttribute('data-type');
        optionCards.forEach(c => c.classList.remove('selected'));
        this.classList.add('selected');
        selectedType = type;
        updateStartButton();
    }
    
    // Selecionar serviço
    const serviceOptions = document.querySelectorAll('.service-option');
    serviceOptions.forEach(option => {
        option.removeEventListener('click', handleServiceClick);
        option.addEventListener('click', handleServiceClick);
    });
    
    function handleServiceClick() {
        const service = this.getAttribute('data-service');
        serviceOptions.forEach(s => s.classList.remove('selected'));
        this.classList.add('selected');
        selectedService = service;
        updateStartButton();
    }
    
    function updateStartButton() {
        const button = document.getElementById('startButton');
        const validationMessage = document.getElementById('validationMessage');
        
        if (selectedType && selectedService) {
            button.removeAttribute('disabled');
            button.style.opacity = '1';
            button.style.cursor = 'pointer';
            if (validationMessage) validationMessage.style.display = 'none';
        } else {
            button.setAttribute('disabled', 'disabled');
            button.style.opacity = '0.6';
            button.style.cursor = 'not-allowed';
        }
    }
    
    // Botão iniciar
    const startBtn = document.getElementById('startButton');
    if (startBtn) {
        startBtn.removeEventListener('click', startHandler);
        startBtn.addEventListener('click', startHandler);
    }
    
    function startHandler() {
        if (selectedType && selectedService) {
            startForm(selectedType, selectedService);
        } else {
            const validationMsg = document.getElementById('validationMessage');
            if (validationMsg) validationMsg.style.display = 'block';
        }
    }
    
    // Teclas de atalho
    document.removeEventListener('keydown', homeScreenKeyHandler);
    document.addEventListener('keydown', homeScreenKeyHandler);
    
    function homeScreenKeyHandler(e) {
        if (e.key === '1') {
            const pfCard = document.querySelector('.option-card[data-type="pf"]');
            if (pfCard) pfCard.click();
        } else if (e.key === '2') {
            const pjCard = document.querySelector('.option-card[data-type="pj"]');
            if (pjCard) pjCard.click();
        } else if (e.key === 'i' || e.key === 'I') {
            const internetOption = document.querySelector('.service-option[data-service="internet"]');
            if (internetOption) internetOption.click();
        } else if (e.key === 't' || e.key === 'T') {
            const telefoneOption = document.querySelector('.service-option[data-service="telefone"]');
            if (telefoneOption) telefoneOption.click();
        } else if (e.key === 'b' || e.key === 'B') {
            const ambosOption = document.querySelector('.service-option[data-service="internet-telefone"]');
            if (ambosOption) ambosOption.click();
        } else if (e.key === 'Enter' && selectedType && selectedService) {
            startHandler();
        }
    }
    
    // PWA Install Prompt (re-aplicar)
    const installBtn = document.getElementById('installButton');
    if (installBtn && window.deferredPrompt) {
        installBtn.style.display = 'block';
        installBtn.removeEventListener('click', installHandler);
        installBtn.addEventListener('click', installHandler);
    }
    
    function installHandler() {
        if (window.deferredPrompt) {
            window.deferredPrompt.prompt();
            window.deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                }
                window.deferredPrompt = null;
                installBtn.style.display = 'none';
            });
        }
    }
}

/**
 * Carrega um formulário específico baseado no tipo e serviço
 * @param {string} type - 'pf' ou 'pj'
 * @param {string} service - 'internet', 'telefone', ou 'internet-telefone'
 */
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
        
        // Reinicializar todos os event listeners após carregar o DOM
        setTimeout(() => {
            initializeCurrentForm();
            
            // Adicionar evento do botão voltar
            const backButton = document.getElementById('backToHomeButton');
            if (backButton) {
                backButton.addEventListener('click', goToHome);
            }
        }, 100);
        
        return true;
    }
    
    return false;
}

/**
 * Inicializa o formulário atual com todos os event listeners
 */
function initializeCurrentForm() {
    if (!currentFormType) return;
    
    // Inicializar opções de pagamento (toggle entre débito e boleto)
    initializePaymentOptions();
    
    // Inicializar formatação de campos
    initializeFormatting();
    
    // Inicializar botões específicos
    initializeButtons();
    
    // Inicializar validações específicas do formulário
    initializeFormValidations();
    
    // Inicializar campos de cargo para PJ
    if (currentFormType.startsWith('pj')) {
        initializeCargoFields();
    }
    
    // Inicializar plano e taxa para telefone
    if (currentFormType === 'pf-telefone' || currentFormType === 'pj-telefone') {
        initializePlanoTaxa();
    }
}

/**
 * Inicializa os botões de opção de pagamento (Débito/Boleto)
 */
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

/**
 * Inicializa formatação automática dos campos
 */
function initializeFormatting() {
    // CPF
    const cpfFields = document.querySelectorAll('[id*="cpf"]');
    cpfFields.forEach(field => {
        field.removeEventListener('input', cpfInputHandler);
        field.addEventListener('input', cpfInputHandler);
    });
    
    // CNPJ
    const cnpjFields = document.querySelectorAll('[id*="cnpj"]');
    cnpjFields.forEach(field => {
        field.removeEventListener('input', cnpjInputHandler);
        field.addEventListener('input', cnpjInputHandler);
    });
    
    // CEP
    const cepFields = document.querySelectorAll('[id*="cep"]');
    cepFields.forEach(field => {
        field.removeEventListener('input', cepInputHandler);
        field.addEventListener('input', cepInputHandler);
    });
    
    // Telefone
    const phoneFields = document.querySelectorAll('[id*="telefone"], [id*="contato"]');
    phoneFields.forEach(field => {
        field.removeEventListener('input', phoneInputHandler);
        field.addEventListener('input', phoneInputHandler);
    });
    
    // Taxa de Instalação
    const taxaFields = document.querySelectorAll('[id*="taxa_instalacao"], [id*="taxa_telefone"]');
    taxaFields.forEach(field => {
        field.removeEventListener('input', taxaInputHandler);
        field.addEventListener('input', taxaInputHandler);
    });
    
    // Data de Nascimento (apenas PF)
    const dateFields = document.querySelectorAll('[id*="data_nascimento"]');
    dateFields.forEach(field => {
        field.removeEventListener('blur', dateBlurHandler);
        field.removeEventListener('focus', dateFocusHandler);
        field.addEventListener('blur', dateBlurHandler);
        field.addEventListener('focus', dateFocusHandler);
    });
    
    // Capitalização em campos de texto
    const textFields = document.querySelectorAll('input[type="text"]:not([id*="cpf"]):not([id*="cnpj"]):not([id*="cep"]):not([id*="taxa"]):not([readonly]):not([id*="data_nascimento"])');
    textFields.forEach(field => {
        field.removeEventListener('blur', capitalizeHandler);
        field.addEventListener('blur', capitalizeHandler);
    });
}

// Handlers para formatação
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

/**
 * Inicializa os botões de ação (GPS, Copiar, Salvar, Limpar)
 */
function initializeButtons() {
    // Botão GPS
    const gpsBtn = document.getElementById('gps_button');
    const gpsBtnBoleto = document.getElementById('gps_button_boleto');
    
    if (gpsBtn) {
        gpsBtn.removeEventListener('click', gpsClickHandler);
        gpsBtn.addEventListener('click', gpsClickHandler);
    }
    if (gpsBtnBoleto) {
        gpsBtnBoleto.removeEventListener('click', gpsBoletoClickHandler);
        gpsBtnBoleto.addEventListener('click', gpsBoletoClickHandler);
    }
    
    // Botão Copiar
    const copyBtn = document.getElementById('copyButton');
    if (copyBtn) {
        copyBtn.removeEventListener('click', copyClickHandler);
        copyBtn.addEventListener('click', copyClickHandler);
    }
    
    // Botão Limpar
    const clearBtn = document.getElementById('clearButton');
    if (clearBtn) {
        clearBtn.removeEventListener('click', clearClickHandler);
        clearBtn.addEventListener('click', clearClickHandler);
    }
    
    // Botão Salvar PDF
    const saveBtn = document.getElementById('saveButton');
    if (saveBtn) {
        saveBtn.removeEventListener('click', saveClickHandler);
        saveBtn.addEventListener('click', saveClickHandler);
    }
    
    // Botão Autofill (Telefone Fixo)
    const autofillBtn = document.querySelector('.autofill-button');
    if (autofillBtn && (currentFormType === 'pf-internet-telefone' || currentFormType === 'pj-internet-telefone')) {
        const activeSection = document.querySelector('.form-section.active');
        const formType = activeSection && activeSection.id === 'boleto' ? 'boleto' : 'debito';
        autofillBtn.removeEventListener('click', () => {});
        autofillBtn.addEventListener('click', () => autofillTelefoneFixo(formType));
    }
}

// Handlers para botões
function gpsClickHandler() { getLocation(false, currentFormType); }
function gpsBoletoClickHandler() { getLocation(true, currentFormType); }

function copyClickHandler() {
    const activeSection = document.querySelector('.form-section.active');
    const isBoleto = activeSection ? activeSection.id === 'boleto' : false;
    const containerId = isBoleto ? 'boleto' : 'debito';
    
    if (validateForm(isBoleto, currentFormType)) {
        copyFormData(isBoleto, containerId);
    } else {
        alert('Por favor, preencha todos os campos obrigatórios corretamente antes de copiar.');
    }
}

function clearClickHandler() {
    if (confirm('Tem certeza que deseja limpar todos os campos do formulário? Todos os dados serão perdidos.')) {
        const activeSection = document.querySelector('.form-section.active');
        const isBoleto = activeSection ? activeSection.id === 'boleto' : false;
        const containerId = isBoleto ? 'boleto' : 'debito';
        clearForm(isBoleto, containerId);
        alert('Formulário limpo com sucesso!');
    }
}

function saveClickHandler() {
    const activeSection = document.querySelector('.form-section.active');
    const isBoleto = activeSection ? activeSection.id === 'boleto' : false;
    
    if (validateForm(isBoleto, currentFormType)) {
        gerarPDF(isBoleto, currentFormType);
    } else {
        alert('Por favor, preencha todos os campos obrigatórios corretamente antes de salvar.');
    }
}

/**
 * Inicializa validações específicas do formulário
 */
function initializeFormValidations() {
    // PF - Dados Pessoais
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
    
    // PJ - Dados da Empresa
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
    
    if (!currentFormType.includes('telefone')) {
        setupValidation('fidelidade', 'fidelidade-error', value => value.length > 0);
        setupValidation('fidelidade_boleto', 'fidelidade_boleto-error', value => value.length > 0);
        setupValidation('taxa_instalacao', 'taxa_instalacao-error', value => value.length > 0);
        setupValidation('taxa_instalacao_boleto', 'taxa_instalacao_boleto-error', value => value.length > 0);
        setupValidation('plano', 'plano-error', value => value.length > 0);
        setupValidation('plano_boleto', 'plano_boleto-error', value => value.length > 0);
    }
    
    if (currentFormType !== 'pf-telefone' && currentFormType !== 'pj-telefone') {
        setupValidation('agencia', 'agencia-error', value => value.length >= 3);
        setupValidation('conta', 'conta-error', value => value.length >= 3);
        setupValidation('vencimento_debito', 'vencimento_debito-error', value => value.length > 0);
        setupValidation('vencimento_boleto', 'vencimento_boleto-error', value => value.length > 0);
        setupValidation('inserir_rede_mesh', 'inserir_rede_mesh-error', value => value.length > 0);
        setupValidation('inserir_rede_mesh_boleto', 'inserir_rede_mesh_boleto-error', value => value.length > 0);
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

/**
 * Inicializa campos de cargo para formulários PJ
 */
function initializeCargoFields() {
    const razaoSocial = document.getElementById('razao_social');
    const nomeFantasia = document.getElementById('nome_fantasia');
    const razaoSocialBoleto = document.getElementById('razao_social_boleto');
    const nomeFantasiaBoleto = document.getElementById('nome_fantasia_boleto');
    
    if (razaoSocial) {
        razaoSocial.removeEventListener('input', updateCargoHandler);
        razaoSocial.addEventListener('input', updateCargoHandler);
        updateCargoOptions(false);
    }
    if (nomeFantasia) {
        nomeFantasia.removeEventListener('input', updateCargoHandler);
        nomeFantasia.addEventListener('input', updateCargoHandler);
    }
    if (razaoSocialBoleto) {
        razaoSocialBoleto.removeEventListener('input', updateCargoBoletoHandler);
        razaoSocialBoleto.addEventListener('input', updateCargoBoletoHandler);
        updateCargoOptions(true);
    }
    if (nomeFantasiaBoleto) {
        nomeFantasiaBoleto.removeEventListener('input', updateCargoBoletoHandler);
        nomeFantasiaBoleto.addEventListener('input', updateCargoBoletoHandler);
    }
}

function updateCargoHandler() { updateCargoOptions(false); }
function updateCargoBoletoHandler() { updateCargoOptions(true); }

/**
 * Inicializa campos de plano e taxa para formulários de telefone
 */
function initializePlanoTaxa() {
    const clienteSelect = document.getElementById('cliente_sem_fronteiras');
    const clienteSelectBoleto = document.getElementById('cliente_sem_fronteiras_boleto');
    
    if (clienteSelect) {
        clienteSelect.removeEventListener('change', planoChangeHandler);
        clienteSelect.addEventListener('change', planoChangeHandler);
    }
    if (clienteSelectBoleto) {
        clienteSelectBoleto.removeEventListener('change', planoBoletoChangeHandler);
        clienteSelectBoleto.addEventListener('change', planoBoletoChangeHandler);
    }
}

function planoChangeHandler() { updatePlanoAndTaxa(false); }
function planoBoletoChangeHandler() { updatePlanoAndTaxa(true); }

/**
 * Função principal chamada pelo index.html ao iniciar
 * @param {string} type - 'pf' ou 'pj'
 * @param {string} service - 'internet', 'telefone', ou 'internet-telefone'
 */
function startForm(type, service) {
    return loadForm(type, service);
}

/**
 * Inicializa a aplicação (chamada quando a página carrega)
 */
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

// Tornar funções globais
window.startForm = startForm;
window.loadForm = loadForm;
window.initRouter = initRouter;
window.goToHome = goToHome;
window.currentFormType = () => currentFormType;

// Armazenar deferredPrompt globalmente
window.deferredPrompt = null;

// Inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRouter);
} else {
    initRouter();
}