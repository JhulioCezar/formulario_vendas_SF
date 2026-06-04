// ============================================
// UTILS.JS - Funções Centralizadas
// ============================================

// ============================================
// FUNÇÕES DE FORMATAÇÃO
// ============================================

// Formatação de CPF
function formatCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return cpf;
}

// Formatação de CNPJ
function formatCNPJ(cnpj) {
    cnpj = cnpj.replace(/\D/g, '');
    cnpj = cnpj.replace(/^(\d{2})(\d)/, '$1.$2');
    cnpj = cnpj.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
    cnpj = cnpj.replace(/\.(\d{3})(\d)/, '.$1/$2');
    cnpj = cnpj.replace(/(\d{4})(\d)/, '$1-$2');
    return cnpj;
}

// Formatação de CEP
function formatCEP(cep) {
    cep = cep.replace(/\D/g, '');
    cep = cep.replace(/^(\d{5})(\d)/, '$1-$2');
    return cep;
}

// Formatação de Telefone
function formatPhone(phone) {
    phone = phone.replace(/\D/g, '');
    phone = phone.replace(/^(\d{2})(\d)/g, '($1) $2');
    phone = phone.replace(/(\d{5})(\d)/, '$1-$2');
    return phone;
}

// Formatação de Moeda (Taxa de Instalação)
function formatCurrency(value) {
    value = value.replace(/\D/g, '');
    if (value === '') return 'R$ 0,00';
    value = (parseInt(value) / 100).toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    return 'R$ ' + value;
}

// Formatação de Data com validação de 18 anos
function formatDate(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2);
    }
    if (value.length >= 5) {
        value = value.substring(0, 5) + '/' + value.substring(5, 9);
    }
    input.value = value;
    
    const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (dateRegex.test(value)) {
        const [, day, month, year] = value.match(dateRegex);
        const birthDate = new Date(`${year}-${month}-${day}`);
        const currentDate = new Date();
        const minDate = new Date();
        minDate.setFullYear(currentDate.getFullYear() - 18);
        
        if (birthDate > minDate) {
            input.classList.add('validation-error');
            const errorElement = document.getElementById(input.id + '-error');
            if (errorElement) {
                errorElement.style.display = 'block';
                errorElement.textContent = 'Data de nascimento inválida. Cliente deve ter 18 anos ou mais.';
            }
        } else {
            input.classList.remove('validation-error');
            const errorElement = document.getElementById(input.id + '-error');
            if (errorElement) errorElement.style.display = 'none';
        }
    }
}

// Capitalização de palavras (iniciais maiúsculas)
function capitalizeWords(text) {
    const wordsToIgnore = ['de', 'da', 'do', 'e', 'com', 'para', 'em', 'na', 'no', 'das', 'dos'];
    return text.replace(/\w\S*/g, function(txt) {
        if (wordsToIgnore.includes(txt.toLowerCase())) {
            return txt.toLowerCase();
        }
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

// ============================================
// FUNÇÕES DE GPS
// ============================================

// Obter localização via GPS
function getLocation(isBoleto = false, formType = 'pf-internet') {
    const loadingElement = isBoleto 
        ? document.getElementById('loading_boleto') 
        : document.getElementById('loading');
        
    if (loadingElement) loadingElement.style.display = 'block';
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                
                // Preencher campos de coordenadas e mapa
                if (isBoleto) {
                    const coordsField = document.getElementById('coordenadas_boleto');
                    const mapaField = document.getElementById('localizacao_mapa_boleto');
                    const mapLink = document.getElementById('map_link_boleto');
                    
                    if (coordsField) coordsField.value = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
                    if (mapaField) mapaField.value = `https://www.google.com/maps?q=${lat},${lng}`;
                    if (mapLink) {
                        mapLink.href = `https://www.google.com/maps?q=${lat},${lng}`;
                        mapLink.style.display = 'inline-flex';
                    }
                } else {
                    const coordsField = document.getElementById('coordenadas');
                    const mapaField = document.getElementById('localizacao_mapa');
                    const mapLink = document.getElementById('map_link');
                    
                    if (coordsField) coordsField.value = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
                    if (mapaField) mapaField.value = `https://www.google.com/maps?q=${lat},${lng}`;
                    if (mapLink) {
                        mapLink.href = `https://www.google.com/maps?q=${lat},${lng}`;
                        mapLink.style.display = 'inline-flex';
                    }
                }
                
                // Usar API de geocodificação (Nominatim - OpenStreetMap)
                fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1&zoom=18`)
                    .then(response => response.json())
                    .then(data => {
                        if (data && data.address) {
                            const address = data.address;
                            
                            // Preencher os campos de endereço
                            if (isBoleto) {
                                if (address.postcode) {
                                    const cepField = document.getElementById('cep_boleto');
                                    if (cepField) cepField.value = formatCEP(address.postcode);
                                }
                                if (address.house_number) {
                                    const numeroField = document.getElementById('numero_boleto');
                                    if (numeroField) numeroField.value = address.house_number;
                                }
                                if (address.road) {
                                    const enderecoField = document.getElementById('endereco_boleto');
                                    if (enderecoField) enderecoField.value = address.road;
                                }
                                if (address.suburb || address.neighbourhood) {
                                    const bairroField = document.getElementById('bairro_boleto');
                                    if (bairroField) bairroField.value = address.suburb || address.neighbourhood;
                                }
                                if (address.city || address.town || address.village) {
                                    const cidadeField = document.getElementById('cidade_boleto');
                                    if (cidadeField) cidadeField.value = address.city || address.town || address.village;
                                }
                            } else {
                                if (address.postcode) {
                                    const cepField = document.getElementById('cep');
                                    if (cepField) cepField.value = formatCEP(address.postcode);
                                }
                                if (address.house_number) {
                                    const numeroField = document.getElementById('numero');
                                    if (numeroField) numeroField.value = address.house_number;
                                }
                                if (address.road) {
                                    const enderecoField = document.getElementById('endereco');
                                    if (enderecoField) enderecoField.value = address.road;
                                }
                                if (address.suburb || address.neighbourhood) {
                                    const bairroField = document.getElementById('bairro');
                                    if (bairroField) bairroField.value = address.suburb || address.neighbourhood;
                                }
                                if (address.city || address.town || address.village) {
                                    const cidadeField = document.getElementById('cidade');
                                    if (cidadeField) cidadeField.value = address.city || address.town || address.village;
                                }
                            }
                            
                            if (loadingElement) loadingElement.style.display = 'none';
                            alert('Endereço preenchido automaticamente com sucesso!');
                        } else {
                            throw new Error('Endereço não encontrado');
                        }
                    })
                    .catch(error => {
                        console.error('Erro ao obter endereço:', error);
                        if (loadingElement) loadingElement.style.display = 'none';
                        alert('Não foi possível obter o endereço completo. Por favor, preencha manualmente os campos que faltaram.');
                    });
            }, 
            function(error) {
                if (loadingElement) loadingElement.style.display = 'none';
                let errorMessage = 'Erro ao obter localização: ';
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage += 'Usuário negou a solicitação de Geolocalização.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage += 'As informações de localização não estão disponíveis.';
                        break;
                    case error.TIMEOUT:
                        errorMessage += 'A solicitação de localização expirou.';
                        break;
                    case error.UNKNOWN_ERROR:
                        errorMessage += 'Ocorreu um erro desconhecido.';
                        break;
                }
                alert(errorMessage);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 60000
            }
        );
    } else {
        if (loadingElement) loadingElement.style.display = 'none';
        alert('Geolocalização não é suportada por este navegador.');
    }
}

// ============================================
// FUNÇÕES DE WHATSAPP
// ============================================

function copyToWhatsApp(isWhatsApp, isBoleto = false) {
    const telefonePrincipal = document.getElementById(isBoleto ? 'telefone_principal_boleto' : 'telefone_principal');
    const whatsappPrincipal = document.getElementById(isBoleto ? 'whatsapp_principal_boleto' : 'whatsapp_principal');
    
    if (isWhatsApp && telefonePrincipal && whatsappPrincipal) {
        whatsappPrincipal.value = telefonePrincipal.value;
    }
    
    const confirmDiv = document.getElementById(isBoleto ? 'whatsapp_confirm_boleto' : 'whatsapp_confirm');
    if (confirmDiv) confirmDiv.style.display = 'none';
}

// ============================================
// FUNÇÕES DE VALIDAÇÃO
// ============================================

// Configurar validação em tempo real para um campo
function setupValidation(fieldId, errorId, validationFn) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);
    
    if (!field || !error) return;
    
    field.addEventListener('blur', function() {
        if (!validationFn(this.value)) {
            error.style.display = 'block';
            this.classList.add('validation-error');
        } else {
            error.style.display = 'none';
            this.classList.remove('validation-error');
        }
    });
    
    field.addEventListener('input', function() {
        if (validationFn(this.value)) {
            error.style.display = 'none';
            this.classList.remove('validation-error');
        }
    });
}

// Validar data de nascimento (18 anos ou mais)
function validateBirthDate(value) {
    const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (!dateRegex.test(value)) return false;
    const [, day, month, year] = value.match(dateRegex);
    const birthDate = new Date(`${year}-${month}-${day}`);
    const currentDate = new Date();
    const minDate = new Date();
    minDate.setFullYear(currentDate.getFullYear() - 18);
    return birthDate <= minDate;
}

// ============================================
// FUNÇÕES DE TIPO DE INSTITUIÇÃO (PJ)
// ============================================

// Detectar tipo de instituição baseado no texto
function getTipoInstituicao(razaoSocial, nomeFantasia) {
    const texto = (razaoSocial + ' ' + nomeFantasia).toLowerCase();
    
    if (texto.includes('igreja') || texto.includes('paróquia') || texto.includes('capela') || texto.includes('templo')) {
        return 'igreja';
    } else if (texto.includes('associação') || texto.includes('sindicato') || texto.includes('associacao') || texto.includes('federação')) {
        return 'associacao';
    } else if (texto.includes('escola') || texto.includes('colégio') || texto.includes('faculdade') || texto.includes('universidade') || texto.includes('colegio')) {
        return 'escola';
    } else {
        return 'outros';
    }
}

// Obter opções de cargo baseado no tipo de instituição
function getCargoOptions(institutionType) {
    switch(institutionType) {
        case 'igreja':
            return ['Pastor', 'Presidente', 'Tesoureiro'];
        case 'associacao':
            return ['Presidente', 'Tesoureiro'];
        case 'escola':
            return ['Diretor', 'Coordenador'];
        default:
            return ['Administrador', 'Assistente administrativo', 'Diretor', 'Gerente', 'Proprietário', 'Sócio'];
    }
}

// Atualizar opções de cargo (para formulários PJ)
function updateCargoOptions(isBoleto = false) {
    const prefix = isBoleto ? '_boleto' : '';
    const razaoSocialField = document.getElementById('razao_social' + prefix);
    const nomeFantasiaField = document.getElementById('nome_fantasia' + prefix);
    const cargoSelect = document.getElementById('cargo_contratante' + prefix);
    
    if (!razaoSocialField || !cargoSelect) return;
    
    const razaoSocial = razaoSocialField.value || '';
    const nomeFantasia = nomeFantasiaField ? nomeFantasiaField.value || '' : '';
    
    const institutionType = getTipoInstituicao(razaoSocial, nomeFantasia);
    const cargoOptions = getCargoOptions(institutionType);
    
    const currentValue = cargoSelect.value;
    
    cargoSelect.innerHTML = '<option value="">Selecione o cargo</option>';
    cargoOptions.forEach(cargo => {
        const option = document.createElement('option');
        option.value = cargo;
        option.textContent = cargo;
        if (cargo === currentValue) option.selected = true;
        cargoSelect.appendChild(option);
    });
    
    const instructionDiv = document.getElementById('cargo_instruction' + prefix);
    if (instructionDiv) {
        let tipoDescricao = '';
        switch(institutionType) {
            case 'igreja':
                tipoDescricao = 'Igreja (Pastor, Presidente ou Tesoureiro)';
                break;
            case 'associacao':
                tipoDescricao = 'Associação/Sindicato (Presidente ou Tesoureiro)';
                break;
            case 'escola':
                tipoDescricao = 'Escola (Diretor ou Coordenador)';
                break;
            default:
                tipoDescricao = 'Outra instituição (Administrador, Assistente administrativo, Diretor, Gerente, Proprietário ou Sócio)';
                break;
        }
        instructionDiv.textContent = `Cargos disponíveis para: ${tipoDescricao}`;
        instructionDiv.style.display = 'block';
    }
}

// ============================================
// FUNÇÕES DE PLANO E TAXA (TELEFONE)
// ============================================

function updatePlanoAndTaxa(isBoleto = false) {
    const prefix = isBoleto ? '_boleto' : '';
    const clienteSelect = document.getElementById('cliente_sem_fronteiras' + prefix);
    const planoSelect = document.getElementById('plano' + prefix);
    const taxaInput = document.getElementById('taxa_instalacao' + prefix);
    
    if (!clienteSelect || !planoSelect || !taxaInput) return;
    
    if (clienteSelect.value === 'sim') {
        planoSelect.value = 'R$ 19,80';
        taxaInput.value = 'Isento';
        taxaInput.classList.add('auto-filled');
    } else if (clienteSelect.value === 'nao') {
        planoSelect.value = 'R$ 39,80';
        taxaInput.value = 'R$ 100,00';
        taxaInput.classList.add('auto-filled');
    } else {
        planoSelect.value = '';
        taxaInput.value = '';
        taxaInput.classList.remove('auto-filled');
    }
}

// ============================================
// FUNÇÃO DE AUTOPREENCHIMENTO (TELEFONE FIXO)
// ============================================

function autofillTelefoneFixo(formType) {
    const isBoleto = formType === 'boleto';
    const prefix = isBoleto ? '_boleto' : '';
    const telefonePrefix = isBoleto ? '_boleto' : '';
    
    // Detectar se é PF ou PJ baseado nos campos disponíveis
    const isPF = document.getElementById('nome' + prefix) !== null;
    
    if (isPF) {
        // PF - usar campos de pessoa física
        const nomeField = document.getElementById('nome' + prefix);
        const cpfField = document.getElementById('cpf' + prefix);
        const cidadeField = document.getElementById('cidade' + prefix);
        const bairroField = document.getElementById('bairro' + prefix);
        const numeroField = document.getElementById('numero' + prefix);
        const vendedorField = document.getElementById('vendedor' + prefix);
        const telefoneField = document.getElementById('telefone_principal' + prefix);
        const taxaField = document.getElementById('taxa_instalacao' + prefix);
        
        const clienteTelefone = document.getElementById('cliente_telefone' + telefonePrefix);
        const cpfTelefone = document.getElementById('cpf_telefone' + telefonePrefix);
        const cidadeTelefone = document.getElementById('cidade_telefone' + telefonePrefix);
        const bairroTelefone = document.getElementById('bairro_telefone' + telefonePrefix);
        const numeroEnderecoTelefone = document.getElementById('numero_endereco_telefone' + telefonePrefix);
        const vendedorTelefone = document.getElementById('vendedor_telefone' + telefonePrefix);
        const contatoTelefone = document.getElementById('contato_telefone' + telefonePrefix);
        const taxaTelefone = document.getElementById('taxa_telefone' + telefonePrefix);
        
        if (clienteTelefone && nomeField) clienteTelefone.value = nomeField.value;
        if (cpfTelefone && cpfField) cpfTelefone.value = cpfField.value;
        if (cidadeTelefone && cidadeField) cidadeTelefone.value = cidadeField.value;
        if (bairroTelefone && bairroField) bairroTelefone.value = bairroField.value;
        if (numeroEnderecoTelefone && numeroField) numeroEnderecoTelefone.value = numeroField.value;
        if (vendedorTelefone && vendedorField) vendedorTelefone.value = vendedorField.value;
        if (contatoTelefone && telefoneField) contatoTelefone.value = telefoneField.value;
        if (taxaTelefone && taxaField) taxaTelefone.value = taxaField.value;
    } else {
        // PJ - usar campos de pessoa jurídica
        const razaoSocialField = document.getElementById('razao_social' + prefix);
        const nomeFantasiaField = document.getElementById('nome_fantasia' + prefix);
        const cpfContratanteField = document.getElementById('cpf_contratante' + prefix);
        const cidadeField = document.getElementById('cidade' + prefix);
        const bairroField = document.getElementById('bairro' + prefix);
        const numeroField = document.getElementById('numero' + prefix);
        const vendedorField = document.getElementById('vendedor' + prefix);
        const telefoneField = document.getElementById('telefone_principal' + prefix);
        
        const clienteTelefone = document.getElementById('cliente_telefone' + telefonePrefix);
        const cpfTelefone = document.getElementById('cpf_telefone' + telefonePrefix);
        const cidadeTelefone = document.getElementById('cidade_telefone' + telefonePrefix);
        const bairroTelefone = document.getElementById('bairro_telefone' + telefonePrefix);
        const numeroEnderecoTelefone = document.getElementById('numero_endereco_telefone' + telefonePrefix);
        const vendedorTelefone = document.getElementById('vendedor_telefone' + telefonePrefix);
        const contatoTelefone = document.getElementById('contato_telefone' + telefonePrefix);
        
        const nomeCliente = nomeFantasiaField && nomeFantasiaField.value ? nomeFantasiaField.value : (razaoSocialField ? razaoSocialField.value : '');
        
        if (clienteTelefone) clienteTelefone.value = nomeCliente;
        if (cpfTelefone && cpfContratanteField) cpfTelefone.value = cpfContratanteField.value;
        if (cidadeTelefone && cidadeField) cidadeTelefone.value = cidadeField.value;
        if (bairroTelefone && bairroField) bairroTelefone.value = bairroField.value;
        if (numeroEnderecoTelefone && numeroField) numeroEnderecoTelefone.value = numeroField.value;
        if (vendedorTelefone && vendedorField) vendedorTelefone.value = vendedorField.value;
        if (contatoTelefone && telefoneField) contatoTelefone.value = telefoneField.value;
    }
    
    alert('Campos do formulário de telefone fixo preenchidos automaticamente!');
}

// ============================================
// FUNÇÃO DE LIMPEZA DE FORMULÁRIO
// ============================================

function clearForm(isBoleto = false, formContainerId = 'debito') {
    const container = document.getElementById(formContainerId);
    if (!container) return;
    
    const fields = container.querySelectorAll('input, select, textarea');
    fields.forEach(field => {
        if (field.type !== 'button' && field.type !== 'submit' && 
            !field.classList.contains('gps-button') && 
            !field.classList.contains('autofill-button') &&
            !field.readonly) {
            
            if (field.type === 'text' || field.type === 'tel' || field.type === 'email' || field.tagName === 'TEXTAREA') {
                field.value = '';
            } else if (field.type === 'select-one') {
                field.selectedIndex = 0;
            }
            
            field.classList.remove('validation-error');
            field.classList.remove('auto-filled');
            
            const errorElement = document.getElementById(field.id + '-error');
            if (errorElement) errorElement.style.display = 'none';
        }
    });
    
    // Limpar campos específicos
    if (isBoleto) {
        const coordsField = document.getElementById('coordenadas_boleto');
        const mapaField = document.getElementById('localizacao_mapa_boleto');
        const mapLink = document.getElementById('map_link_boleto');
        const whatsappConfirm = document.getElementById('whatsapp_confirm_boleto');
        
        if (coordsField) coordsField.value = '';
        if (mapaField) mapaField.value = '';
        if (mapLink) mapLink.style.display = 'none';
        if (whatsappConfirm) whatsappConfirm.style.display = 'none';
    } else {
        const coordsField = document.getElementById('coordenadas');
        const mapaField = document.getElementById('localizacao_mapa');
        const mapLink = document.getElementById('map_link');
        const whatsappConfirm = document.getElementById('whatsapp_confirm');
        
        if (coordsField) coordsField.value = '';
        if (mapaField) mapaField.value = '';
        if (mapLink) mapLink.style.display = 'none';
        if (whatsappConfirm) whatsappConfirm.style.display = 'none';
    }
    
    const successMessage = document.getElementById('successMessage');
    if (successMessage) successMessage.style.display = 'none';
}

// ============================================
// FUNÇÃO DE CÓPIA PARA ÁREA DE TRANSFERÊNCIA
// ============================================

function copyFormData(isBoleto = false, containerId = 'debito') {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    let formData = '';
    const fields = container.querySelectorAll('input, select, textarea');
    
    fields.forEach(field => {
        if (field.type !== 'button' && field.type !== 'submit' && 
            !field.classList.contains('gps-button') && 
            !field.classList.contains('autofill-button') &&
            field.id !== 'coordenadas' && 
            field.id !== 'coordenadas_boleto' &&
            field.id !== 'localizacao_mapa' && 
            field.id !== 'localizacao_mapa_boleto') {
            
            const label = document.querySelector(`label[for="${field.id}"]`);
            const labelText = label ? label.textContent.replace(' *', '').replace(':', '') : field.name;
            
            if (field.value && field.value.trim() !== '') {
                formData += `${labelText}: ${field.value}\n`;
            }
        }
    });
    
    navigator.clipboard.writeText(formData)
        .then(() => {
            const successMessage = document.getElementById('successMessage');
            if (successMessage) {
                successMessage.style.display = 'block';
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            }
        })
        .catch(err => {
            console.error('Erro ao copiar: ', err);
            alert('Erro ao copiar dados. Tente novamente.');
        });
}

// ============================================
// FUNÇÃO DE INICIALIZAÇÃO DO FORMULÁRIO
// ============================================

function inicializarFormulario(formType, isBoletoAtivo = false) {
    // Esta função será chamada após carregar o template
    // Ela configura todos os event listeners e formatações
    
    // Alternar entre opções de pagamento
    const paymentOptions = document.querySelectorAll('.payment-option');
    paymentOptions.forEach(option => {
        option.addEventListener('click', function() {
            paymentOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            document.querySelectorAll('.form-section').forEach(section => {
                section.classList.remove('active');
            });
            
            const targetId = this.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            if (targetSection) targetSection.classList.add('active');
        });
    });
    
    // Configurar eventos de input para formatação
    // CPF
    const cpfFields = document.querySelectorAll('[id*="cpf"]');
    cpfFields.forEach(field => {
        field.addEventListener('input', function() { this.value = formatCPF(this.value); });
    });
    
    // CNPJ
    const cnpjFields = document.querySelectorAll('[id*="cnpj"]');
    cnpjFields.forEach(field => {
        field.addEventListener('input', function() { this.value = formatCNPJ(this.value); });
    });
    
    // CEP
    const cepFields = document.querySelectorAll('[id*="cep"]');
    cepFields.forEach(field => {
        field.addEventListener('input', function() { this.value = formatCEP(this.value); });
    });
    
    // Telefone
    const phoneFields = document.querySelectorAll('[id*="telefone"], [id*="contato"]');
    phoneFields.forEach(field => {
        field.addEventListener('input', function() { 
            this.value = formatPhone(this.value);
            // WhatsApp confirmation
            if (this.id === 'telefone_principal' && this.value.length === 15) {
                const confirmDiv = document.getElementById('whatsapp_confirm');
                if (confirmDiv) confirmDiv.style.display = 'block';
            }
            if (this.id === 'telefone_principal_boleto' && this.value.length === 15) {
                const confirmDiv = document.getElementById('whatsapp_confirm_boleto');
                if (confirmDiv) confirmDiv.style.display = 'block';
            }
        });
    });
    
    // Taxa de Instalação
    const taxaFields = document.querySelectorAll('[id*="taxa_instalacao"], [id*="taxa_telefone"]');
    taxaFields.forEach(field => {
        field.addEventListener('input', function() { this.value = formatCurrency(this.value); });
    });
    
    // Data de Nascimento
    const dateFields = document.querySelectorAll('[id*="data_nascimento"]');
    dateFields.forEach(field => {
        field.addEventListener('blur', function() { formatDate(this); });
        field.addEventListener('focus', function() { this.type = 'text'; });
    });
    
    // Capitalização em campos de texto
    const textFields = document.querySelectorAll('input[type="text"]:not([id*="cpf"]):not([id*="cnpj"]):not([id*="cep"]):not([id*="taxa"]):not([readonly]):not([id*="data_nascimento"])');
    textFields.forEach(field => {
        field.addEventListener('blur', function() {
            if (this.value.trim() !== '') {
                this.value = capitalizeWords(this.value);
            }
        });
    });
    
    // Botões GPS
    const gpsBtn = document.getElementById('gps_button');
    const gpsBtnBoleto = document.getElementById('gps_button_boleto');
    if (gpsBtn) gpsBtn.addEventListener('click', () => getLocation(false, formType));
    if (gpsBtnBoleto) gpsBtnBoleto.addEventListener('click', () => getLocation(true, formType));
    
    // Botão Copiar
    const copyBtn = document.getElementById('copyButton');
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const activeSection = document.querySelector('.form-section.active');
            const isBoleto = activeSection ? activeSection.id === 'boleto' : false;
            const containerId = isBoleto ? 'boleto' : 'debito';
            
            if (validateForm(isBoleto, formType)) {
                copyFormData(isBoleto, containerId);
            } else {
                alert('Por favor, preencha todos os campos obrigatórios corretamente antes de copiar.');
            }
        });
    }
    
    // Botão Limpar
    const clearBtn = document.getElementById('clearButton');
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (confirm('Tem certeza que deseja limpar todos os campos do formulário? Todos os dados serão perdidos.')) {
                const activeSection = document.querySelector('.form-section.active');
                const isBoleto = activeSection ? activeSection.id === 'boleto' : false;
                const containerId = isBoleto ? 'boleto' : 'debito';
                clearForm(isBoleto, containerId);
                alert('Formulário limpo com sucesso!');
            }
        });
    }
    
    // Botão Salvar PDF (será implementado separadamente pois é mais complexo)
    const saveBtn = document.getElementById('saveButton');
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            const activeSection = document.querySelector('.form-section.active');
            const isBoleto = activeSection ? activeSection.id === 'boleto' : false;
            
            if (validateForm(isBoleto, formType)) {
                gerarPDF(isBoleto, formType);
            } else {
                alert('Por favor, preencha todos os campos obrigatórios corretamente antes de salvar.');
            }
        });
    }
}

// ============================================
// FUNÇÃO DE VALIDAÇÃO DO FORMULÁRIO
// ============================================

function validateForm(isBoleto = false, formType = 'pf-internet') {
    let isValid = true;
    const prefix = isBoleto ? '_boleto' : '';
    
    // Determinar quais campos são obrigatórios baseado no tipo de formulário
    let requiredFields = [];
    
    if (formType === 'pf-internet' || formType === 'pf-internet-telefone' || formType === 'pf-telefone') {
        // PF
        requiredFields = ['nome', 'cpf', 'rg', 'data_nascimento', 'cep', 'numero', 'endereco', 'bairro', 'cidade', 'telefone_principal', 'whatsapp_principal', 'email', 'fidelidade', 'taxa_instalacao', 'plano', 'vendedor', 'inserir_rede_mesh'];
        
        if (!isBoleto && formType !== 'pf-telefone') {
            requiredFields.push('agencia', 'conta', 'vencimento_debito');
        }
        
        if (isBoleto) {
            requiredFields.push('vencimento_boleto');
        }
        
        if (formType === 'pf-internet-telefone' || formType === 'pf-telefone') {
            const telefoneFields = ['cliente_telefone', 'cpf_telefone', 'cidade_telefone', 'bairro_telefone', 'numero_endereco_telefone', 'vendedor_telefone', 'contato_telefone', 'taxa_telefone', 'fidelidade_telefone', 'portabilidade_telefone'];
            requiredFields.push(...telefoneFields);
        }
        
        if (formType === 'pf-telefone') {
            requiredFields.push('cliente_sem_fronteiras', 'portabilidade');
        }
    } else {
        // PJ
        requiredFields = ['razao_social', 'cnpj', 'cep', 'numero', 'endereco', 'bairro', 'cidade', 'email', 'telefone_principal', 'whatsapp_principal', 'plano', 'nome_contratante', 'cpf_contratante', 'cargo_contratante', 'vendedor', 'inserir_rede_mesh'];
        
        if (!isBoleto) {
            requiredFields.push('agencia', 'conta', 'vencimento_debito');
        } else {
            requiredFields.push('vencimento_boleto');
        }
        
        if (formType === 'pj-internet-telefone') {
            const telefoneFields = ['cliente_telefone', 'cpf_telefone', 'cidade_telefone', 'bairro_telefone', 'numero_endereco_telefone', 'vendedor_telefone', 'contato_telefone', 'taxa_telefone', 'fidelidade_telefone', 'portabilidade_telefone'];
            requiredFields.push(...telefoneFields);
        }
        
        if (formType === 'pj-telefone') {
            requiredFields.push('cliente_sem_fronteiras', 'fidelidade', 'portabilidade');
        }
    }
    
    // Validar cada campo
    requiredFields.forEach(field => {
        const fieldId = field + prefix;
        const fieldElement = document.getElementById(fieldId);
        const errorElement = document.getElementById(fieldId + '-error');
        
        if (fieldElement) {
            let fieldValid = true;
            
            if (field.includes('cpf')) {
                fieldValid = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(fieldElement.value);
            } else if (field === 'cnpj') {
                fieldValid = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(fieldElement.value);
            } else if (field === 'cep') {
                fieldValid = /^\d{5}-\d{3}$/.test(fieldElement.value);
            } else if (field.includes('telefone_principal') || field.includes('whatsapp_principal') || field.includes('contato_telefone')) {
                fieldValid = /^\(\d{2}\) \d{5}-\d{4}$/.test(fieldElement.value);
            } else if (field === 'email') {
                fieldValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fieldElement.value);
            } else if (field === 'data_nascimento') {
                fieldValid = validateBirthDate(fieldElement.value);
            } else if (field === 'rg') {
                fieldValid = fieldElement.value.length >= 5 && fieldElement.value.length <= 20;
            } else if (['nome', 'endereco', 'bairro', 'cidade', 'vendedor', 'razao_social', 'nome_contratante', 'cliente_telefone', 'cidade_telefone', 'bairro_telefone', 'vendedor_telefone'].includes(field)) {
                fieldValid = fieldElement.value.length >= (field === 'nome' || field === 'cliente_telefone' || field === 'nome_contratante' || field === 'razao_social' ? 3 : 2);
            } else if (['agencia', 'conta'].includes(field)) {
                fieldValid = fieldElement.value.length >= 3;
            } else if (['numero', 'numero_endereco_telefone'].includes(field)) {
                fieldValid = fieldElement.value.length >= 1;
            } else {
                fieldValid = fieldElement.value.length > 0;
            }
            
            if (!fieldValid) {
                isValid = false;
                fieldElement.classList.add('validation-error');
                if (errorElement) errorElement.style.display = 'block';
            } else {
                fieldElement.classList.remove('validation-error');
                if (errorElement) errorElement.style.display = 'none';
            }
        }
    });
    
    return isValid;
}

// ============================================
// FUNÇÃO DE GERAR PDF
// ============================================

async function gerarPDF(isBoleto = false, formType = 'pf-internet') {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');
    
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    let yPosition = margin;
    
    // Cabeçalho
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('SEM FRONTEIRAS - Ultrafibra', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 10;
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    
    let titulo = '';
    if (formType === 'pf-internet') titulo = 'Formulário de Abertura - PF Internet';
    else if (formType === 'pf-internet-telefone') titulo = 'Formulário de Abertura - PF Internet + Telefone';
    else if (formType === 'pf-telefone') titulo = 'Formulário de Abertura - PF Telefone';
    else if (formType === 'pj-internet') titulo = 'Formulário de Abertura - PJ Internet';
    else if (formType === 'pj-internet-telefone') titulo = 'Formulário de Abertura - PJ Internet + Telefone';
    else if (formType === 'pj-telefone') titulo = 'Formulário de Abertura - PJ Telefone';
    
    doc.text(titulo, pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 8;
    
    const tipo = isBoleto ? 'BOLETO' : 'DÉBITO EM CONTA';
    doc.text(`Tipo: ${tipo}`, pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 15;
    
    doc.setDrawColor(76, 175, 80);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    const now = new Date();
    doc.text(`Gerado em: ${now.toLocaleDateString('pt-BR')} às ${now.toLocaleTimeString('pt-BR')}`, margin, yPosition);
    yPosition += 10;
    
    const activeFormId = isBoleto ? 'boleto' : 'debito';
    const fields = document.querySelectorAll(`#${activeFormId} input, #${activeFormId} select, #${activeFormId} textarea`);
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(0);
    
    fields.forEach(field => {
        if (field.type !== 'button' && field.type !== 'submit' && 
            !field.classList.contains('gps-button') && 
            !field.classList.contains('autofill-button') && 
            field.value && field.value.trim() !== '') {
            
            if (yPosition > pageHeight - 20) {
                doc.addPage();
                yPosition = margin;
            }
            
            const label = document.querySelector(`label[for="${field.id}"]`);
            const labelText = label ? label.textContent.replace(' *', '').replace(':', '') : field.name;
            
            const text = `${labelText}: ${field.value}`;
            const lines = doc.splitTextToSize(text, pageWidth - (margin * 2));
            
            lines.forEach(line => {
                if (yPosition > pageHeight - 20) {
                    doc.addPage();
                    yPosition = margin;
                }
                doc.text(line, margin, yPosition);
                yPosition += 6;
            });
            
            yPosition += 2;
        }
    });
    
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(9);
        doc.setTextColor(150);
        doc.text(`Página ${i} de ${totalPages}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
    }
    
    let fileName = `formulario_${formType}_${isBoleto ? 'boleto' : 'debito'}.pdf`;
    doc.save(fileName);
}