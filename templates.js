// ============================================
// TEMPLATES.JS - Todos os formulários em templates
// ============================================

const TEMPLATES = {
    // ========================================
    // PF - SOMENTE INTERNET
    // ========================================
    'pf-internet': `
        <div class="container formulario-container">
            <div class="logo">
                <img src="https://i.imgur.com/SEr4lkm.png" alt="Logomarca">
            </div>
            
            <h1>Abertura de Chamados - Novos Clientes</h1>
            
            <div class="payment-options">
                <div class="payment-option active" data-target="debito">Débito em Conta</div>
                <div class="payment-option" data-target="boleto">Boleto</div>
            </div>
            
            <form id="chamadoForm">
                <!-- Débito em Conta -->
                <div id="debito" class="form-section active">
                    <div class="section-title">Dados Pessoais</div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="nome" class="required">Nome:</label>
                            <input type="text" id="nome" name="nome" required minlength="3" maxlength="100">
                            <div class="error-message" id="nome-error">Nome deve ter pelo menos 3 caracteres</div>
                        </div>
                        <div class="form-group">
                            <label for="cpf" class="required">CPF:</label>
                            <input type="text" id="cpf" name="cpf" required pattern="\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}" placeholder="000.000.000-00" inputmode="numeric">
                            <div class="error-message" id="cpf-error">CPF deve estar no formato 000.000.000-00</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="rg" class="required">RG:</label>
                            <input type="text" id="rg" name="rg" required minlength="5" maxlength="20">
                            <div class="error-message" id="rg-error">RG deve ter entre 5 e 20 caracteres</div>
                        </div>
                        <div class="form-group">
                            <label for="data_nascimento" class="required">Data de Nascimento:</label>
                            <input type="text" id="data_nascimento" name="data_nascimento" required placeholder="DD/MM/AAAA">
                            <div class="error-message" id="data_nascimento-error">Data de nascimento inválida. Cliente deve ter 18 anos ou mais.</div>
                        </div>
                    </div>
                    
                    <div class="section-title">Endereço do Cliente</div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="cep" class="required">CEP:</label>
                            <input type="text" id="cep" name="cep" required pattern="\\d{5}-\\d{3}" placeholder="00000-000" inputmode="numeric">
                            <div class="error-message" id="cep-error">CEP deve estar no formato 00000-000</div>
                        </div>
                        <div class="form-group">
                            <label for="numero" class="required">Número:</label>
                            <input type="text" id="numero" name="numero" required minlength="1" maxlength="10">
                            <div class="error-message" id="numero-error">Número é obrigatório</div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <button type="button" class="gps-button" id="gps_button">📍 Usar GPS para preencher endereço</button>
                        <div id="loading" class="loading">Buscando endereço...</div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="endereco" class="required">Endereço:</label>
                            <input type="text" id="endereco" name="endereco" required minlength="5" maxlength="200">
                            <div class="error-message" id="endereco-error">Endereço é obrigatório</div>
                        </div>
                        <div class="form-group">
                            <label for="bairro" class="required">Bairro:</label>
                            <input type="text" id="bairro" name="bairro" required minlength="2" maxlength="100">
                            <div class="error-message" id="bairro-error">Bairro é obrigatório</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="cidade" class="required">Cidade:</label>
                            <input type="text" id="cidade" name="cidade" required minlength="2" maxlength="100">
                            <div class="error-message" id="cidade-error">Cidade é obrigatória</div>
                        </div>
                        <div class="form-group">
                            <label for="ponto_referencia">Ponto de Referência:</label>
                            <input type="text" id="ponto_referencia" name="ponto_referencia" maxlength="200">
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="coordenadas">Coordenadas:</label>
                            <input type="text" id="coordenadas" name="coordenadas" readonly>
                        </div>
                        <div class="form-group">
                            <label for="localizacao_mapa">Localização (Link do Mapa):</label>
                            <div style="display: flex; gap: 10px; align-items: center;">
                                <input type="text" id="localizacao_mapa" name="localizacao_mapa" readonly style="flex: 1;">
                                <a href="#" id="map_link" class="map-link" target="_blank" style="display: none;">🗺️ Abrir Mapa</a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="section-title">Informações de Contato</div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="telefone_principal" class="required">Telefone Principal:</label>
                            <input type="tel" id="telefone_principal" name="telefone_principal" required pattern="\\(\\d{2}\\) \\d{5}-\\d{4}" placeholder="(00) 00000-0000" inputmode="numeric">
                            <div class="error-message" id="telefone_principal-error">Telefone deve estar no formato (00) 00000-0000</div>
                            <div class="whatsapp-confirm" id="whatsapp_confirm" style="display: none;">
                                <p style="margin: 0 0 8px 0; font-size: 14px;">Este número é do WhatsApp?</p>
                                <div class="whatsapp-buttons">
                                    <button type="button" class="whatsapp-btn whatsapp-yes" onclick="copyToWhatsApp(true, false)">Sim</button>
                                    <button type="button" class="whatsapp-btn whatsapp-no" onclick="copyToWhatsApp(false, false)">Não</button>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="whatsapp_principal" class="required">WhatsApp Principal:</label>
                            <input type="tel" id="whatsapp_principal" name="whatsapp_principal" required pattern="\\(\\d{2}\\) \\d{5}-\\d{4}" placeholder="(00) 00000-0000" inputmode="numeric">
                            <div class="error-message" id="whatsapp_principal-error">WhatsApp deve estar no formato (00) 00000-0000</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="telefone_secundario">Telefone Secundário:</label>
                            <input type="tel" id="telefone_secundario" name="telefone_secundario" pattern="\\(\\d{2}\\) \\d{5}-\\d{4}" placeholder="(00) 00000-0000" inputmode="numeric">
                            <div class="error-message" id="telefone_secundario-error">Telefone deve estar no formato (00) 00000-0000</div>
                        </div>
                        <div class="form-group">
                            <label for="whatsapp_secundario">WhatsApp Secundário:</label>
                            <input type="tel" id="whatsapp_secundario" name="whatsapp_secundario" pattern="\\(\\d{2}\\) \\d{5}-\\d{4}" placeholder="(00) 00000-0000" inputmode="numeric">
                            <div class="error-message" id="whatsapp_secundario-error">WhatsApp deve estar no formato (00) 00000-0000</div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="email" class="required">E-mail:</label>
                        <input type="email" id="email" name="email" required>
                        <div class="error-message" id="email-error">E-mail deve ser válido</div>
                    </div>
                    
                    <div class="section-title">Informações de Cobrança Banco do Brasil</div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="agencia" class="required">Agência:</label>
                            <input type="text" id="agencia" name="agencia" required minlength="3" maxlength="10" inputmode="numeric">
                            <div class="error-message" id="agencia-error">Agência é obrigatória</div>
                        </div>
                        <div class="form-group">
                            <label for="conta" class="required">Conta:</label>
                            <input type="text" id="conta" name="conta" required minlength="3" maxlength="15" inputmode="numeric">
                            <div class="error-message" id="conta-error">Conta é obrigatória</div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="vencimento_debito" class="required">Vencimento:</label>
                        <select id="vencimento_debito" name="vencimento_debito" required>
                            <option value="">Selecione o dia</option>
                            <option value="05">Dia 05</option>
                            <option value="10">Dia 10</option>
                            <option value="15">Dia 15</option>
                            <option value="20">Dia 20</option>
                            <option value="25">Dia 25</option>
                        </select>
                        <div class="error-message" id="vencimento_debito-error">Vencimento é obrigatório</div>
                    </div>
                    
                    <div class="section-title">Outros</div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="fidelidade" class="required">Aceita a Fidelidade:</label>
                            <select id="fidelidade" name="fidelidade" required>
                                <option value="">Selecione</option>
                                <option value="sim">Sim</option>
                                <option value="nao">Não</option>
                            </select>
                            <div class="error-message" id="fidelidade-error">Selecione uma opção</div>
                        </div>
                        <div class="form-group">
                            <label for="taxa_instalacao" class="required">Taxa de Instalação:</label>
                            <input type="text" id="taxa_instalacao" name="taxa_instalacao" required placeholder="R$ 0,00" inputmode="decimal">
                            <div class="error-message" id="taxa_instalacao-error">Taxa de instalação é obrigatória</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="plano" class="required">Plano:</label>
                            <select id="plano" name="plano" required>
                                <option value="">Selecione</option>
                                <option value="700MB - R$ 99,90">700MB - R$ 99,90</option>
                                <option value="900MB - R$ 149,90">900MB - R$ 149,90</option>
                            </select>
                            <div class="error-message" id="plano-error">Selecione um plano</div>
                        </div>
                        <div class="form-group">
                            <label for="vendedor" class="required">Vendedor:</label>
                            <input type="text" id="vendedor" name="vendedor" required minlength="2" maxlength="100">
                            <div class="error-message" id="vendedor-error">Vendedor é obrigatório</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="inserir_rede_mesh" class="required">Inserir rede mesh:</label>
                            <select id="inserir_rede_mesh" name="inserir_rede_mesh" required>
                                <option value="">Selecione</option>
                                <option value="sim">Sim</option>
                                <option value="nao">Não</option>
                            </select>
                            <div class="error-message" id="inserir_rede_mesh-error">Selecione uma opção</div>
                        </div>
                    </div>
                </div>
                
                <!-- Boleto -->
                <div id="boleto" class="form-section">
                    <div class="section-title">Dados Pessoais</div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="nome_boleto" class="required">Nome:</label>
                            <input type="text" id="nome_boleto" name="nome_boleto" required minlength="3" maxlength="100">
                            <div class="error-message" id="nome_boleto-error">Nome deve ter pelo menos 3 caracteres</div>
                        </div>
                        <div class="form-group">
                            <label for="cpf_boleto" class="required">CPF:</label>
                            <input type="text" id="cpf_boleto" name="cpf_boleto" required pattern="\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}" placeholder="000.000.000-00" inputmode="numeric">
                            <div class="error-message" id="cpf_boleto-error">CPF deve estar no formato 000.000.000-00</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="rg_boleto" class="required">RG:</label>
                            <input type="text" id="rg_boleto" name="rg_boleto" required minlength="5" maxlength="20">
                            <div class="error-message" id="rg_boleto-error">RG deve ter entre 5 e 20 caracteres</div>
                        </div>
                        <div class="form-group">
                            <label for="data_nascimento_boleto" class="required">Data de Nascimento:</label>
                            <input type="text" id="data_nascimento_boleto" name="data_nascimento_boleto" required placeholder="DD/MM/AAAA">
                            <div class="error-message" id="data_nascimento_boleto-error">Data de nascimento inválida. Cliente deve ter 18 anos ou mais.</div>
                        </div>
                    </div>
                    
                    <div class="section-title">Endereço do Cliente</div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="cep_boleto" class="required">CEP:</label>
                            <input type="text" id="cep_boleto" name="cep_boleto" required pattern="\\d{5}-\\d{3}" placeholder="00000-000" inputmode="numeric">
                            <div class="error-message" id="cep_boleto-error">CEP deve estar no formato 00000-000</div>
                        </div>
                        <div class="form-group">
                            <label for="numero_boleto" class="required">Número:</label>
                            <input type="text" id="numero_boleto" name="numero_boleto" required minlength="1" maxlength="10">
                            <div class="error-message" id="numero_boleto-error">Número é obrigatório</div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <button type="button" class="gps-button" id="gps_button_boleto">📍 Usar GPS para preencher endereço</button>
                        <div id="loading_boleto" class="loading">Buscando endereço...</div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="endereco_boleto" class="required">Endereço:</label>
                            <input type="text" id="endereco_boleto" name="endereco_boleto" required minlength="5" maxlength="200">
                            <div class="error-message" id="endereco_boleto-error">Endereço é obrigatório</div>
                        </div>
                        <div class="form-group">
                            <label for="bairro_boleto" class="required">Bairro:</label>
                            <input type="text" id="bairro_boleto" name="bairro_boleto" required minlength="2" maxlength="100">
                            <div class="error-message" id="bairro_boleto-error">Bairro é obrigatório</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="cidade_boleto" class="required">Cidade:</label>
                            <input type="text" id="cidade_boleto" name="cidade_boleto" required minlength="2" maxlength="100">
                            <div class="error-message" id="cidade_boleto-error">Cidade é obrigatória</div>
                        </div>
                        <div class="form-group">
                            <label for="ponto_referencia_boleto">Ponto de Referência:</label>
                            <input type="text" id="ponto_referencia_boleto" name="ponto_referencia_boleto" maxlength="200">
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="coordenadas_boleto">Coordenadas:</label>
                            <input type="text" id="coordenadas_boleto" name="coordenadas_boleto" readonly>
                        </div>
                        <div class="form-group">
                            <label for="localizacao_mapa_boleto">Localização (Link do Mapa):</label>
                            <div style="display: flex; gap: 10px; align-items: center;">
                                <input type="text" id="localizacao_mapa_boleto" name="localizacao_mapa_boleto" readonly style="flex: 1;">
                                <a href="#" id="map_link_boleto" class="map-link" target="_blank" style="display: none;">🗺️ Abrir Mapa</a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="section-title">Informações de Contato</div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="telefone_principal_boleto" class="required">Telefone Principal:</label>
                            <input type="tel" id="telefone_principal_boleto" name="telefone_principal_boleto" required pattern="\\(\\d{2}\\) \\d{5}-\\d{4}" placeholder="(00) 00000-0000" inputmode="numeric">
                            <div class="error-message" id="telefone_principal_boleto-error">Telefone deve estar no formato (00) 00000-0000</div>
                            <div class="whatsapp-confirm" id="whatsapp_confirm_boleto" style="display: none;">
                                <p style="margin: 0 0 8px 0; font-size: 14px;">Este número é do WhatsApp?</p>
                                <div class="whatsapp-buttons">
                                    <button type="button" class="whatsapp-btn whatsapp-yes" onclick="copyToWhatsApp(true, true)">Sim</button>
                                    <button type="button" class="whatsapp-btn whatsapp-no" onclick="copyToWhatsApp(false, true)">Não</button>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="whatsapp_principal_boleto" class="required">WhatsApp Principal:</label>
                            <input type="tel" id="whatsapp_principal_boleto" name="whatsapp_principal_boleto" required pattern="\\(\\d{2}\\) \\d{5}-\\d{4}" placeholder="(00) 00000-0000" inputmode="numeric">
                            <div class="error-message" id="whatsapp_principal_boleto-error">WhatsApp deve estar no formato (00) 00000-0000</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="telefone_secundario_boleto">Telefone Secundário:</label>
                            <input type="tel" id="telefone_secundario_boleto" name="telefone_secundario_boleto" pattern="\\(\\d{2}\\) \\d{5}-\\d{4}" placeholder="(00) 00000-0000" inputmode="numeric">
                            <div class="error-message" id="telefone_secundario_boleto-error">Telefone deve estar no formato (00) 00000-0000</div>
                        </div>
                        <div class="form-group">
                            <label for="whatsapp_secundario_boleto">WhatsApp Secundário:</label>
                            <input type="tel" id="whatsapp_secundario_boleto" name="whatsapp_secundario_boleto" pattern="\\(\\d{2}\\) \\d{5}-\\d{4}" placeholder="(00) 00000-0000" inputmode="numeric">
                            <div class="error-message" id="whatsapp_secundario_boleto-error">WhatsApp deve estar no formato (00) 00000-0000</div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="email_boleto" class="required">E-mail:</label>
                        <input type="email" id="email_boleto" name="email_boleto" required>
                        <div class="error-message" id="email_boleto-error">E-mail deve ser válido</div>
                    </div>
                    
                    <div class="section-title">Informações de Cobrança</div>
                    
                    <div class="form-group">
                        <label for="vencimento_boleto" class="required">Vencimento:</label>
                        <select id="vencimento_boleto" name="vencimento_boleto" required>
                            <option value="">Selecione o dia</option>
                            <option value="01">Dia 01</option>
                            <option value="05">Dia 05</option>
                            <option value="08">Dia 08</option>
                            <option value="10">Dia 10</option>
                            <option value="12">Dia 12</option>
                            <option value="15">Dia 15</option>
                            <option value="20">Dia 20</option>
                        </select>
                        <div class="error-message" id="vencimento_boleto-error">Vencimento é obrigatório</div>
                    </div>
                    
                    <div class="section-title">Outros</div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="fidelidade_boleto" class="required">Aceita a Fidelidade:</label>
                            <select id="fidelidade_boleto" name="fidelidade_boleto" required>
                                <option value="">Selecione</option>
                                <option value="sim">Sim</option>
                                <option value="nao">Não</option>
                            </select>
                            <div class="error-message" id="fidelidade_boleto-error">Selecione uma opção</div>
                        </div>
                        <div class="form-group">
                            <label for="taxa_instalacao_boleto" class="required">Taxa de Instalação:</label>
                            <input type="text" id="taxa_instalacao_boleto" name="taxa_instalacao_boleto" required placeholder="R$ 0,00" inputmode="decimal">
                            <div class="error-message" id="taxa_instalacao_boleto-error">Taxa de instalação é obrigatória</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="plano_boleto" class="required">Plano:</label>
                            <select id="plano_boleto" name="plano_boleto" required>
                                <option value="">Selecione</option>
                                <option value="700MB - R$ 119,90">700MB - R$ 119,90</option>
                                <option value="900MB - R$ 169,90">900MB - R$ 169,90</option>
                            </select>
                            <div class="error-message" id="plano_boleto-error">Selecione um plano</div>
                        </div>
                        <div class="form-group">
                            <label for="vendedor_boleto" class="required">Vendedor:</label>
                            <input type="text" id="vendedor_boleto" name="vendedor_boleto" required minlength="2" maxlength="100">
                            <div class="error-message" id="vendedor_boleto-error">Vendedor é obrigatório</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="inserir_rede_mesh_boleto" class="required">Inserir rede mesh:</label>
                            <select id="inserir_rede_mesh_boleto" name="inserir_rede_mesh_boleto" required>
                                <option value="">Selecione</option>
                                <option value="sim">Sim</option>
                                <option value="nao">Não</option>
                            </select>
                            <div class="error-message" id="inserir_rede_mesh_boleto-error">Selecione uma opção</div>
                        </div>
                    </div>
                </div>
                
                <div class="success-message" id="successMessage">✅ Dados copiados com sucesso! Agora você pode colar no WhatsApp.</div>
                
                <div class="action-buttons">
                    <button type="button" class="copy-btn" id="copyButton">📋 Copiar</button>
                    <button type="button" class="save-btn" id="saveButton">💾 Salvar PDF</button>
                    <button type="button" class="clear-btn" id="clearButton">🗑️ Limpar Formulário</button>
                </div>
            </form>
        </div>
    `,

    // ========================================
    // PF - INTERNET + TELEFONE
    // ========================================
    'pf-internet-telefone': `
        <div class="container formulario-container">
            <div class="logo">
                <img src="https://i.imgur.com/SEr4lkm.png" alt="Logomarca">
            </div>
            
            <h1>Abertura de Chamados - Pessoa Física (Internet + Telefone Fixo)</h1>
            
            <div class="payment-options">
                <div class="payment-option active" data-target="debito">Débito em Conta</div>
                <div class="payment-option" data-target="boleto">Boleto</div>
            </div>
            
            <form id="chamadoForm">
                <!-- Débito em Conta -->
                <div id="debito" class="form-section active">
                    <div class="section-title">Dados Pessoais</div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="nome" class="required">Nome:</label>
                            <input type="text" id="nome" name="nome" required minlength="3" maxlength="100">
                            <div class="error-message" id="nome-error">Nome deve ter pelo menos 3 caracteres</div>
                        </div>
                        <div class="form-group">
                            <label for="cpf" class="required">CPF:</label>
                            <input type="text" id="cpf" name="cpf" required pattern="\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}" placeholder="000.000.000-00" inputmode="numeric">
                            <div class="error-message" id="cpf-error">CPF deve estar no formato 000.000.000-00</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="rg" class="required">RG:</label>
                            <input type="text" id="rg" name="rg" required minlength="5" maxlength="20">
                            <div class="error-message" id="rg-error">RG deve ter entre 5 e 20 caracteres</div>
                        </div>
                        <div class="form-group">
                            <label for="data_nascimento" class="required">Data de Nascimento:</label>
                            <input type="text" id="data_nascimento" name="data_nascimento" required placeholder="DD/MM/AAAA">
                            <div class="error-message" id="data_nascimento-error">Data de nascimento inválida. Cliente deve ter 18 anos ou mais.</div>
                        </div>
                    </div>
                    
                    <div class="section-title">Endereço do Cliente</div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="cep" class="required">CEP:</label>
                            <input type="text" id="cep" name="cep" required pattern="\\d{5}-\\d{3}" placeholder="00000-000" inputmode="numeric">
                            <div class="error-message" id="cep-error">CEP deve estar no formato 00000-000</div>
                        </div>
                        <div class="form-group">
                            <label for="numero" class="required">Número:</label>
                            <input type="text" id="numero" name="numero" required minlength="1" maxlength="10">
                            <div class="error-message" id="numero-error">Número é obrigatório</div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <button type="button" class="gps-button" id="gps_button">📍 Usar GPS para preencher endereço</button>
                        <div id="loading" class="loading">Buscando endereço...</div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="endereco" class="required">Endereço:</label>
                            <input type="text" id="endereco" name="endereco" required minlength="5" maxlength="200">
                            <div class="error-message" id="endereco-error">Endereço é obrigatório</div>
                        </div>
                        <div class="form-group">
                            <label for="bairro" class="required">Bairro:</label>
                            <input type="text" id="bairro" name="bairro" required minlength="2" maxlength="100">
                            <div class="error-message" id="bairro-error">Bairro é obrigatório</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="cidade" class="required">Cidade:</label>
                            <input type="text" id="cidade" name="cidade" required minlength="2" maxlength="100">
                            <div class="error-message" id="cidade-error">Cidade é obrigatória</div>
                        </div>
                        <div class="form-group">
                            <label for="ponto_referencia">Ponto de Referência:</label>
                            <input type="text" id="ponto_referencia" name="ponto_referencia" maxlength="200">
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="coordenadas">Coordenadas:</label>
                            <input type="text" id="coordenadas" name="coordenadas" readonly>
                        </div>
                        <div class="form-group">
                            <label for="localizacao_mapa">Localização (Link do Mapa):</label>
                            <div style="display: flex; gap: 10px; align-items: center;">
                                <input type="text" id="localizacao_mapa" name="localizacao_mapa" readonly style="flex: 1;">
                                <a href="#" id="map_link" class="map-link" target="_blank" style="display: none;">🗺️ Abrir Mapa</a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="section-title">Informações de Contato</div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="telefone_principal" class="required">Telefone Principal:</label>
                            <input type="tel" id="telefone_principal" name="telefone_principal" required pattern="\\(\\d{2}\\) \\d{5}-\\d{4}" placeholder="(00) 00000-0000" inputmode="numeric">
                            <div class="error-message" id="telefone_principal-error">Telefone deve estar no formato (00) 00000-0000</div>
                            <div class="whatsapp-confirm" id="whatsapp_confirm" style="display: none;">
                                <p style="margin: 0 0 8px 0; font-size: 14px;">Este número é do WhatsApp?</p>
                                <div class="whatsapp-buttons">
                                    <button type="button" class="whatsapp-btn whatsapp-yes" onclick="copyToWhatsApp(true, false)">Sim</button>
                                    <button type="button" class="whatsapp-btn whatsapp-no" onclick="copyToWhatsApp(false, false)">Não</button>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="whatsapp_principal" class="required">WhatsApp Principal:</label>
                            <input type="tel" id="whatsapp_principal" name="whatsapp_principal" required pattern="\\(\\d{2}\\) \\d{5}-\\d{4}" placeholder="(00) 00000-0000" inputmode="numeric">
                            <div class="error-message" id="whatsapp_principal-error">WhatsApp deve estar no formato (00) 00000-0000</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="telefone_secundario">Telefone Secundário:</label>
                            <input type="tel" id="telefone_secundario" name="telefone_secundario" pattern="\\(\\d{2}\\) \\d{5}-\\d{4}" placeholder="(00) 00000-0000" inputmode="numeric">
                            <div class="error-message" id="telefone_secundario-error">Telefone deve estar no formato (00) 00000-0000</div>
                        </div>
                        <div class="form-group">
                            <label for="whatsapp_secundario">WhatsApp Secundário:</label>
                            <input type="tel" id="whatsapp_secundario" name="whatsapp_secundario" pattern="\\(\\d{2}\\) \\d{5}-\\d{4}" placeholder="(00) 00000-0000" inputmode="numeric">
                            <div class="error-message" id="whatsapp_secundario-error">WhatsApp deve estar no formato (00) 00000-0000</div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="email" class="required">E-mail:</label>
                        <input type="email" id="email" name="email" required>
                        <div class="error-message" id="email-error">E-mail deve ser válido</div>
                    </div>
                    
                    <div class="section-title">Informações de Cobrança Banco do Brasil</div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="agencia" class="required">Agência:</label>
                            <input type="text" id="agencia" name="agencia" required minlength="3" maxlength="10" inputmode="numeric">
                            <div class="error-message" id="agencia-error">Agência é obrigatória</div>
                        </div>
                        <div class="form-group">
                            <label for="conta" class="required">Conta:</label>
                            <input type="text" id="conta" name="conta" required minlength="3" maxlength="15" inputmode="numeric">
                            <div class="error-message" id="conta-error">Conta é obrigatória</div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="vencimento_debito" class="required">Vencimento:</label>
                        <select id="vencimento_debito" name="vencimento_debito" required>
                            <option value="">Selecione o dia</option>
                            <option value="05">Dia 05</option>
                            <option value="10">Dia 10</option>
                            <option value="15">Dia 15</option>
                            <option value="20">Dia 20</option>
                            <option value="25">Dia 25</option>
                        </select>
                        <div class="error-message" id="vencimento_debito-error">Vencimento é obrigatório</div>
                    </div>
                    
                    <div class="section-title">Formulário do Telefone Fixo</div>
                    
                    <div class="form-group">
                        <button type="button" class="autofill-button" onclick="autofillTelefoneFixo('debito')">🔄 Preencher com informações do Cliente</button>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="cliente_telefone" class="required">Cliente:</label>
                            <input type="text" id="cliente_telefone" name="cliente_telefone" required minlength="3" maxlength="100">
                            <div class="error-message" id="cliente_telefone-error">Nome do cliente é obrigatório</div>
                        </div>
                        <div class="form-group">
                            <label for="cpf_telefone" class="required">CPF:</label>
                            <input type="text" id="cpf_telefone" name="cpf_telefone" required pattern="\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}" placeholder="000.000.000-00" inputmode="numeric">
                            <div class="error-message" id="cpf_telefone-error">CPF deve estar no formato 000.000.000-00</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="cidade_telefone" class="required">Cidade:</label>
                            <input type="text" id="cidade_telefone" name="cidade_telefone" required minlength="2" maxlength="100">
                            <div class="error-message" id="cidade_telefone-error">Cidade é obrigatória</div>
                        </div>
                        <div class="form-group">
                            <label for="bairro_telefone" class="required">Bairro:</label>
                            <input type="text" id="bairro_telefone" name="bairro_telefone" required minlength="2" maxlength="100">
                            <div class="error-message" id="bairro_telefone-error">Bairro é obrigatório</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="numero_endereco_telefone" class="required">Número:</label>
                            <input type="text" id="numero_endereco_telefone" name="numero_endereco_telefone" required minlength="1" maxlength="10">
                            <div class="error-message" id="numero_endereco_telefone-error">Número é obrigatório</div>
                        </div>
                        <div class="form-group">
                            <label for="vendedor_telefone" class="required">Vendedor:</label>
                            <input type="text" id="vendedor_telefone" name="vendedor_telefone" required minlength="2" maxlength="100">
                            <div class="error-message" id="vendedor_telefone-error">Vendedor é obrigatório</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="contato_telefone" class="required">Contato:</label>
                            <input type="tel" id="contato_telefone" name="contato_telefone" required pattern="\\(\\d{2}\\) \\d{5}-\\d{4}" placeholder="(00) 00000-0000" inputmode="numeric">
                            <div class="error-message" id="contato_telefone-error">Contato deve estar no formato (00) 00000-0000</div>
                        </div>
                        <div class="form-group">
                            <label for="taxa_telefone" class="required">Taxa:</label>
                            <input type="text" id="taxa_telefone" name="taxa_telefone" required placeholder="R$ 0,00" inputmode="decimal">
                            <div class="error-message" id="taxa_telefone-error">Taxa é obrigatória</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="id_caixa_telefone">ID Caixa:</label>
                            <input type="text" id="id_caixa_telefone" name="id_caixa_telefone" minlength="2" maxlength="50">
                            <div class="error-message" id="id_caixa_telefone-error">ID da Caixa deve ter pelo menos 2 caracteres</div>
                        </div>
                        <div class="form-group">
                            <label for="operadora_telefone">Operadora:</label>
                            <input type="text" id="operadora_telefone" name="operadora_telefone" minlength="2" maxlength="50">
                            <div class="error-message" id="operadora_telefone-error">Operadora deve ter pelo menos 2 caracteres</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="fidelidade_telefone" class="required">Fidelidade:</label>
                            <select id="fidelidade_telefone" name="fidelidade_telefone" required>
                                <option value="">Selecione</option>
                                <option value="Sim">Sim</option>
                                <option value="Não">Não</option>
                            </select>
                            <div class="error-message" id="fidelidade_telefone-error">Selecione uma opção</div>
                        </div>
                        <div class="form-group">
                            <label for="portabilidade_telefone" class="required">Portabilidade:</label>
                            <select id="portabilidade_telefone" name="portabilidade_telefone" required>
                                <option value="">Selecione</option>
                                <option value="Sim">Sim</option>
                                <option value="Não">Não</option>
                            </select>
                            <div class="error-message" id="portabilidade_telefone-error">Selecione uma opção</div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="observacao_telefone">Observação:</label>
                        <textarea id="observacao_telefone" name="observacao_telefone" maxlength="500" placeholder="Digite observações adicionais aqui..."></textarea>
                    </div>
                    
                    <div class="section-title">Outros</div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="plano" class="required">Plano:</label>
                            <select id="plano" name="plano" required>
                                <option value="">Selecione</option>
                                <option value="600MB de Internet + Fixo - R$ 119,80">600MB de Internet + Fixo - R$ 119,80</option>
                                <option value="900MB de Internet + Fixo - R$ 169,80">900MB de Internet + Fixo - R$ 169,80</option>
                            </select>
                            <div class="error-message" id="plano-error">Selecione um plano</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="inserir_rede_mesh" class="required">Inserir Rede Mesh:</label>
                            <select id="inserir_rede_mesh" name="inserir_rede_mesh" required>
                                <option value="">Selecione</option>
                                <option value="Sim">Sim</option>
                                <option value="Não">Não</option>
                            </select>
                            <div class="error-message" id="inserir_rede_mesh-error">Selecione uma opção</div>
                        </div>
                    </div>
                </div>
                
                <!-- Boleto -->
                <div id="boleto" class="form-section">
                    <div class="section-title">Dados Pessoais</div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="nome_boleto" class="required">Nome:</label>
                            <input type="text" id="nome_boleto" name="nome_boleto" required minlength="3" maxlength="100">
                            <div class="error-message" id="nome_boleto-error">Nome deve ter pelo menos 3 caracteres</div>
                        </div>
                        <div class="form-group">
                            <label for="cpf_boleto" class="required">CPF:</label>
                            <input type="text" id="cpf_boleto" name="cpf_boleto" required pattern="\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}" placeholder="000.000.000-00" inputmode="numeric">
                            <div class="error-message" id="cpf_boleto-error">CPF deve estar no formato 000.000.000-00</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="rg_boleto" class="required">RG:</label>
                            <input type="text" id="rg_boleto" name="rg_boleto" required minlength="5" maxlength="20">
                            <div class="error-message" id="rg_boleto-error">RG deve ter entre 5 e 20 caracteres</div>
                        </div>
                        <div class="form-group">
                            <label for="data_nascimento_boleto" class="required">Data de Nascimento:</label>
                            <input type="text" id="data_nascimento_boleto" name="data_nascimento_boleto" required placeholder="DD/MM/AAAA">
                            <div class="error-message" id="data_nascimento_boleto-error">Data de nascimento inválida. Cliente deve ter 18 anos ou mais.</div>
                        </div>
                    </div>
                    
                    <div class="section-title">Endereço do Cliente</div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="cep_boleto" class="required">CEP:</label>
                            <input type="text" id="cep_boleto" name="cep_boleto" required pattern="\\d{5}-\\d{3}" placeholder="00000-000" inputmode="numeric">
                            <div class="error-message" id="cep_boleto-error">CEP deve estar no formato 00000-000</div>
                        </div>
                        <div class="form-group">
                            <label for="numero_boleto" class="required">Número:</label>
                            <input type="text" id="numero_boleto" name="numero_boleto" required minlength="1" maxlength="10">
                            <div class="error-message" id="numero_boleto-error">Número é obrigatório</div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <button type="button" class="gps-button" id="gps_button_boleto">📍 Usar GPS para preencher endereço</button>
                        <div id="loading_boleto" class="loading">Buscando endereço...</div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="endereco_boleto" class="required">Endereço:</label>
                            <input type="text" id="endereco_boleto" name="endereco_boleto" required minlength="5" maxlength="200">
                            <div class="error-message" id="endereco_boleto-error">Endereço é obrigatório</div>
                        </div>
                        <div class="form-group">
                            <label for="bairro_boleto" class="required">Bairro:</label>
                            <input type="text" id="bairro_boleto" name="bairro_boleto" required minlength="2" maxlength="100">
                            <div class="error-message" id="bairro_boleto-error">Bairro é obrigatório</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="cidade_boleto" class="required">Cidade:</label>
                            <input type="text" id="cidade_boleto" name="cidade_boleto" required minlength="2" maxlength="100">
                            <div class="error-message" id="cidade_boleto-error">Cidade é obrigatória</div>
                        </div>
                        <div class="form-group">
                            <label for="ponto_referencia_boleto">Ponto de Referência:</label>
                            <input type="text" id="ponto_referencia_boleto" name="ponto_referencia_boleto" maxlength="200">
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="coordenadas_boleto">Coordenadas:</label>
                            <input type="text" id="coordenadas_boleto" name="coordenadas_boleto" readonly>
                        </div>
                        <div class="form-group">
                            <label for="localizacao_mapa_boleto">Localização (Link do Mapa):</label>
                            <div style="display: flex; gap: 10px; align-items: center;">
                                <input type="text" id="localizacao_mapa_boleto" name="localizacao_mapa_boleto" readonly style="flex: 1;">
                                <a href="#" id="map_link_boleto" class="map-link" target="_blank" style="display: none;">🗺️ Abrir Mapa</a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="section-title">Informações de Contato</div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="telefone_principal_boleto" class="required">Telefone Principal:</label>
                            <input type="tel" id="telefone_principal_boleto" name="telefone_principal_boleto" required pattern="\\(\\d{2}\\) \\d{5}-\\d{4}" placeholder="(00) 00000-0000" inputmode="numeric">
                            <div class="error-message" id="telefone_principal_boleto-error">Telefone deve estar no formato (00) 00000-0000</div>
                            <div class="whatsapp-confirm" id="whatsapp_confirm_boleto" style="display: none;">
                                <p style="margin: 0 0 8px 0; font-size: 14px;">Este número é do WhatsApp?</p>
                                <div class="whatsapp-buttons">
                                    <button type="button" class="whatsapp-btn whatsapp-yes" onclick="copyToWhatsApp(true, true)">Sim</button>
                                    <button type="button" class="whatsapp-btn whatsapp-no" onclick="copyToWhatsApp(false, true)">Não</button>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="whatsapp_principal_boleto" class="required">WhatsApp Principal:</label>
                            <input type="tel" id="whatsapp_principal_boleto" name="whatsapp_principal_boleto" required pattern="\\(\\d{2}\\) \\d{5}-\\d{4}" placeholder="(00) 00000-0000" inputmode="numeric">
                            <div class="error-message" id="whatsapp_principal_boleto-error">WhatsApp deve estar no formato (00) 00000-0000</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="telefone_secundario_boleto">Telefone Secundário:</label>
                            <input type="tel" id="telefone_secundario_boleto" name="telefone_secundario_boleto" pattern="\\(\\d{2}\\) \\d{5}-\\d{4}" placeholder="(00) 00000-0000" inputmode="numeric">
                            <div class="error-message" id="telefone_secundario_boleto-error">Telefone deve estar no formato (00) 00000-0000</div>
                        </div>
                        <div class="form-group">
                            <label for="whatsapp_secundario_boleto">WhatsApp Secundário:</label>
                            <input type="tel" id="whatsapp_secundario_boleto" name="whatsapp_secundario_boleto" pattern="\\(\\d{2}\\) \\d{5}-\\d{4}" placeholder="(00) 00000-0000" inputmode="numeric">
                            <div class="error-message" id="whatsapp_secundario_boleto-error">WhatsApp deve estar no formato (00) 00000-0000</div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="email_boleto" class="required">E-mail:</label>
                        <input type="email" id="email_boleto" name="email_boleto" required>
                        <div class="error-message" id="email_boleto-error">E-mail deve ser válido</div>
                    </div>
                    
                    <div class="section-title">Informações de Cobrança</div>
                    
                    <div class="form-group">
                        <label for="vencimento_boleto" class="required">Vencimento:</label>
                        <select id="vencimento_boleto" name="vencimento_boleto" required>
                            <option value="">Selecione o dia</option>
                            <option value="01">Dia 01</option>
                            <option value="05">Dia 05</option>
                            <option value="08">Dia 08</option>
                            <option value="10">Dia 10</option>
                            <option value="12">Dia 12</option>
                            <option value="15">Dia 15</option>
                            <option value="20">Dia 20</option>
                        </select>
                        <div class="error-message" id="vencimento_boleto-error">Vencimento é obrigatório</div>
                    </div>
                    
                    <div class="section-title">Formulário do Telefone Fixo</div>
                    
                    <div class="form-group">
                        <button type="button" class="autofill-button" onclick="autofillTelefoneFixo('boleto')">🔄 Preencher com informações do Cliente</button>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="cliente_telefone_boleto" class="required">Cliente:</label>
                            <input type="text" id="cliente_telefone_boleto" name="cliente_telefone_boleto" required minlength="3" maxlength="100">
                            <div class="error-message" id="cliente_telefone_boleto-error">Nome do cliente é obrigatório</div>
                        </div>
                        <div class="form-group">
                            <label for="cpf_telefone_boleto" class="required">CPF:</label>
                            <input type="text" id="cpf_telefone_boleto" name="cpf_telefone_boleto" required pattern="\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}" placeholder="000.000.000-00" inputmode="numeric">
                            <div class="error-message" id="cpf_telefone_boleto-error">CPF deve estar no formato 000.000.000-00</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="cidade_telefone_boleto" class="required">Cidade:</label>
                            <input type="text" id="cidade_telefone_boleto" name="cidade_telefone_boleto" required minlength="2" maxlength="100">
                            <div class="error-message" id="cidade_telefone_boleto-error">Cidade é obrigatória</div>
                        </div>
                        <div class="form-group">
                            <label for="bairro_telefone_boleto" class="required">Bairro:</label>
                            <input type="text" id="bairro_telefone_boleto" name="bairro_telefone_boleto" required minlength="2" maxlength="100">
                            <div class="error-message" id="bairro_telefone_boleto-error">Bairro é obrigatório</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="numero_endereco_telefone_boleto" class="required">Número:</label>
                            <input type="text" id="numero_endereco_telefone_boleto" name="numero_endereco_telefone_boleto" required minlength="1" maxlength="10">
                            <div class="error-message" id="numero_endereco_telefone_boleto-error">Número é obrigatório</div>
                        </div>
                        <div class="form-group">
                            <label for="vendedor_telefone_boleto" class="required">Vendedor:</label>
                            <input type="text" id="vendedor_telefone_boleto" name="vendedor_telefone_boleto" required minlength="2" maxlength="100">
                            <div class="error-message" id="vendedor_telefone_boleto-error">Vendedor é obrigatório</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="contato_telefone_boleto" class="required">Contato:</label>
                            <input type="tel" id="contato_telefone_boleto" name="contato_telefone_boleto" required pattern="\\(\\d{2}\\) \\d{5}-\\d{4}" placeholder="(00) 00000-0000" inputmode="numeric">
                            <div class="error-message" id="contato_telefone_boleto-error">Contato deve estar no formato (00) 00000-0000</div>
                        </div>
                        <div class="form-group">
                            <label for="taxa_telefone_boleto" class="required">Taxa de Instalação:</label>
                            <input type="text" id="taxa_telefone_boleto" name="taxa_telefone_boleto" required placeholder="R$ 0,00" inputmode="decimal">
                            <div class="error-message" id="taxa_telefone_boleto-error">Taxa é obrigatória</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="id_caixa_telefone_boleto">ID Caixa:</label>
                            <input type="text" id="id_caixa_telefone_boleto" name="id_caixa_telefone_boleto" minlength="2" maxlength="50">
                            <div class="error-message" id="id_caixa_telefone_boleto-error">ID da Caixa deve ter pelo menos 2 caracteres</div>
                        </div>
                        <div class="form-group">
                            <label for="operadora_telefone_boleto">Operadora:</label>
                            <input type="text" id="operadora_telefone_boleto" name="operadora_telefone_boleto" minlength="2" maxlength="50">
                            <div class="error-message" id="operadora_telefone_boleto-error">Operadora deve ter pelo menos 2 caracteres</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="fidelidade_telefone_boleto" class="required">FIDELIDADE:</label>
                            <select id="fidelidade_telefone_boleto" name="fidelidade_telefone_boleto" required>
                                <option value="">Selecione</option>
                                <option value="Sim">Sim</option>
                                <option value="Não">Não</option>
                            </select>
                            <div class="error-message" id="fidelidade_telefone_boleto-error">Selecione uma opção</div>
                        </div>
                        <div class="form-group">
                            <label for="portabilidade_telefone_boleto" class="required">Portabilidade:</label>
                            <select id="portabilidade_telefone_boleto" name="portabilidade_telefone_boleto" required>
                                <option value="">Selecione</option>
                                <option value="Sim">Sim</option>
                                <option value="Não">Não</option>
                            </select>
                            <div class="error-message" id="portabilidade_telefone_boleto-error">Selecione uma opção</div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="observacao_telefone_boleto">Observação:</label>
                        <textarea id="observacao_telefone_boleto" name="observacao_telefone_boleto" maxlength="500" placeholder="Digite observações adicionais aqui..."></textarea>
                    </div>
                    
                    <div class="section-title">Outros</div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="plano_boleto" class="required">Plano:</label>
                            <select id="plano_boleto" name="plano_boleto" required>
                                <option value="">Selecione</option>
                                <option value="600MB de Internet + Fixo - R$ 139,80">600MB de Internet + Fixo - R$ 139,80</option>
                                <option value="900MB de Internet + Fixo - R$ 189,80">900MB de Internet + Fixo - R$ 189,80</option>
                            </select>
                            <div class="error-message" id="plano_boleto-error">Selecione um plano</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="inserir_rede_mesh_boleto" class="required">Inserir Rede Mesh:</label>
                            <select id="inserir_rede_mesh_boleto" name="inserir_rede_mesh_boleto" required>
                                <option value="">Selecione</option>
                                <option value="Sim">Sim</option>
                                <option value="Não">Não</option>
                            </select>
                            <div class="error-message" id="inserir_rede_mesh_boleto-error">Selecione uma opção</div>
                        </div>
                    </div>
                </div>
                
                <div class="success-message" id="successMessage">✅ Dados copiados com sucesso! Agora você pode colar no WhatsApp.</div>
                
                <div class="action-buttons">
                    <button type="button" class="copy-btn" id="copyButton">📋 Copiar</button>
                    <button type="button" class="save-btn" id="saveButton">💾 Salvar PDF</button>
                    <button type="button" class="clear-btn" id="clearButton">🗑️ Limpar Formulário</button>
                </div>
            </form>
        </div>
    `,

    // ========================================
    // PF - SOMENTE TELEFONE
    // ========================================
    'pf-telefone': `
        <div class="container formulario-container">
            <div class="logo">
                <img src="https://i.imgur.com/SEr4lkm.png" alt="Logomarca">
            </div>
            
            <h1>Abertura de Chamados - Telefone Fixo</h1>
            
            <div class="payment-options">
                <div class="payment-option active" data-target="debito">Débito em Conta</div>
                <div class="payment-option" data-target="boleto">Boleto</div>
            </div>
            
            <form id="chamadoForm">
                <!-- Débito em Conta -->
                <div id="debito" class="form-section active">
                    <div class="section-title">Dados Pessoais</div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="nome" class="required">Nome:</label>
                            <input type="text" id="nome" name="nome" required minlength="3" maxlength="100">
                            <div class="error-message" id="nome-error">Nome deve ter pelo menos 3 caracteres</div>
                        </div>
                        <div class="form-group">
                            <label for="cpf" class="required">CPF:</label>
                            <input type="text" id="cpf" name="cpf" required pattern="\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}" placeholder="000.000.000-00" inputmode="numeric">
                            <div class="error-message" id="cpf-error">CPF deve estar no formato 000.000.000-00</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="rg" class="required">RG:</label>
                            <input type="text" id="rg" name="rg" required minlength="5" maxlength="20">
                            <div class="error-message" id="rg-error">RG deve ter entre 5 e 20 caracteres</div>
                        </div>
                        <div class="form-group">
                            <label for="data_nascimento" class="required">Data de Nascimento:</label>
                            <input type="text" id="data_nascimento" name="data_nascimento" required placeholder="DD/MM/AAAA">
                            <div class="error-message" id="data_nascimento-error">Data de nascimento inválida. Cliente deve ter 18 anos ou mais.</div>
                        </div>
                    </div>
                    
                    <div class="section-title">Endereço do Cliente</div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="cep" class="required">CEP:</label>
                            <input type="text" id="cep" name="cep" required pattern="\\d{5}-\\d{3}" placeholder="00000-000" inputmode="numeric">
                            <div class="error-message" id="cep-error">CEP deve estar no formato 00000-000</div>
                        </div>
                        <div class="form-group">
                            <label for="numero" class="required">Número:</label>
                            <input type="text" id="numero" name="numero" required minlength="1" maxlength="10">
                            <div class="error-message" id="numero-error">Número é obrigatório</div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <button type="button" class="gps-button" id="gps_button">📍 Usar GPS para preencher endereço</button>
                        <div id="loading" class="loading">Buscando endereço...</div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="endereco" class="required">Endereço:</label>
                            <input type="text" id="endereco" name="endereco" required minlength="5" maxlength="200">
                            <div class="error-message" id="endereco-error">Endereço é obrigatório</div>
                        </div>
                        <div class="form-group">
                            <label for="bairro" class="required">Bairro:</label>
                            <input type="text" id="bairro" name="bairro" required minlength="2" maxlength="100">
                            <div class="error-message" id="bairro-error">Bairro é obrigatório</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="cidade" class="required">Cidade:</label>
                            <input type="text" id="cidade" name="cidade" required minlength="2" maxlength="100">
                            <div class="error-message" id="cidade-error">Cidade é obrigatória</div>
                        </div>
                        <div class="form-group">
                            <label for="ponto_referencia">Ponto de Referência:</label>
                            <input type="text" id="ponto_referencia" name="ponto_referencia" maxlength="200">
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="coordenadas">Coordenadas:</label>
                            <input type="text" id="coordenadas" name="coordenadas" readonly>
                        </div>
                        <div class="form-group">
                            <label for="localizacao_mapa">Localização (Link do Mapa):</label>
                            <div style="display: flex; gap: 10px; align-items: center;">
                                <input type="text" id="localizacao_mapa" name="localizacao_mapa" readonly style="flex: 1;">
                                <a href="#" id="map_link" class="map-link" target="_blank" style="display: none;">🗺️ Abrir Mapa</a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="section-title">Informações de Contato</div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="telefone_principal" class="required">Telefone Principal:</label>
                            <input type="tel" id="telefone_principal" name="telefone_principal" required pattern="\\(\\d{2}\\) \\d{5}-\\d{4}" placeholder="(00) 00000-0000" inputmode="numeric">
                            <div class="error-message" id="telefone_principal-error">Telefone deve estar no formato (00) 00000-0000</div>
                            <div class="whatsapp-confirm" id="whatsapp_confirm" style="display: none;">
                                <p style="margin: 0 0 8px 0; font-size: 14px;">Este número é do WhatsApp?</p>
                                <div class="whatsapp-buttons">
                                    <button type="button" class="whatsapp-btn whatsapp-yes" onclick="copyToWhatsApp(true, false)">Sim</button>
                                    <button type="button" class="whatsapp-btn whatsapp-no" onclick="copyToWhatsApp(false, false)">Não</button>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="whatsapp_principal" class="required">WhatsApp Principal:</label>
                            <input type="tel" id="whatsapp_principal" name="whatsapp_principal" required pattern="\\(\\d{2}\\) \\d{5}-\\d{4}" placeholder="(00) 00000-0000" inputmode="numeric">
                            <div class="error-message" id="whatsapp_principal-error">WhatsApp deve estar no formato (00) 00000-0000</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="telefone_secundario">Telefone Secundário:</label>
                            <input type="tel" id="telefone_secundario" name="telefone_secundario" pattern="\\(\\d{2}\\) \\d{5}-\\d{4}" placeholder="(00) 00000-0000" inputmode="numeric">
                            <div class="error-message" id="telefone_secundario-error">Telefone deve estar no formato (00) 00000-0000</div>
                        </div>
                        <div class="form-group">
                            <label for="whatsapp_secundario">WhatsApp Secundário:</label>
                            <input type="tel" id="whatsapp_secundario" name="whatsapp_secundario" pattern="\\(\\d{2}\\) \\d{5}-\\d{4}" placeholder="(00) 00000-0000" inputmode="numeric">
                            <div class="error-message" id="whatsapp_secundario-error">WhatsApp deve estar no formato (00) 00000-0000</div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="email" class="required">E-mail:</label>
                        <input type="email" id="email" name="email" required>
                        <div class="error-message" id="email-error">E-mail deve ser válido</div>
                    </div>
                    
                    <div class="section-title">Informações de Cobrança Banco do Brasil</div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="agencia" class="required">Agência:</label>
                            <input type="text" id="agencia" name="agencia" required minlength="3" maxlength="10" inputmode="numeric">
                            <div class="error-message" id="agencia-error">Agência é obrigatória</div>
                        </div>
                        <div class="form-group">
                            <label for="conta" class="required">Conta:</label>
                            <input type="text" id="conta" name="conta" required minlength="3" maxlength="15" inputmode="numeric">
                            <div class="error-message" id="conta-error">Conta é obrigatória</div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="vencimento_debito" class="required">Vencimento:</label>
                        <select id="vencimento_debito" name="vencimento_debito" required>
                            <option value="">Selecione o dia</option>
                            <option value="05">Dia 05</option>
                            <option value="10">Dia 10</option>
                            <option value="15">Dia 15</option>
                            <option value="20">Dia 20</option>
                            <option value="25">Dia 25</option>
                        </select>
                        <div class="error-message" id="vencimento_debito-error">Vencimento é obrigatório</div>
                    </div>
                    
                    <div class="section-title">Outros</div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="cliente_sem_fronteiras" class="required">Cliente Sem Fronteiras:</label>
                            <select id="cliente_sem_fronteiras" name="cliente_sem_fronteiras" required onchange="updatePlanoAndTaxa(false)">
                                <option value="">Selecione</option>
                                <option value="sim">Sim</option>
                                <option value="nao">Não</option>
                            </select>
                            <div class="error-message" id="cliente_sem_fronteiras-error">Selecione uma opção</div>
                        </div>
                        <div class="form-group">
                            <label for="plano" class="required">Plano:</label>
                            <select id="plano" name="plano" required>
                                <option value="">Selecione</option>
                                <option value="R$ 19,80">R$ 19,80 (Cliente Sem Fronteiras)</option>
                                <option value="R$ 39,80">R$ 39,80 (Não cliente)</option>
                            </select>
                            <div class="error-message" id="plano-error">Selecione um plano</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="taxa_instalacao" class="required">Taxa de Instalação:</label>
                            <input type="text" id="taxa_instalacao" name="taxa_instalacao" required placeholder="R$ 0,00" inputmode="decimal" readonly>
                            <div class="error-message" id="taxa_instalacao-error">Taxa de instalação é obrigatória</div>
                        </div>
                        <div class="form-group">
                            <label for="id_caixa">ID da Caixa:</label>
                            <input type="text" id="id_caixa" name="id_caixa" minlength="2" maxlength="50">
                            <div class="error-message" id="id_caixa-error">ID da Caixa deve ter pelo menos 2 caracteres</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="operadora">Operadora:</label>
                            <input type="text" id="operadora" name="operadora" minlength="2" maxlength="50">
                            <div class="error-message" id="operadora-error">Operadora deve ter pelo menos 2 caracteres</div>
                        </div>
                        <div class="form-group">
                            <label for="fidelidade" class="required">Fidelidade:</label>
                            <select id="fidelidade" name="fidelidade" required>
                                <option value="">Selecione</option>
                                <option value="sim">Sim</option>
                                <option value="nao">Não</option>
                            </select>
                            <div class="error-message" id="fidelidade-error">Selecione uma opção</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="portabilidade" class="required">Portabilidade:</label>
                            <select id="portabilidade" name="portabilidade" required>
                                <option value="">Selecione</option>
                                <option value="sim">Sim</option>
                                <option value="nao">Não</option>
                            </select>
                            <div class="error-message" id="portabilidade-error">Selecione uma opção</div>
                        </div>
                        <div class="form-group">
                            <label for="vendedor" class="required">Vendedor:</label>
                            <input type="text" id="vendedor" name="vendedor" required minlength="2" maxlength="100">
                            <div class="error-message" id="vendedor-error">Vendedor é obrigatório</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="contato">Contato:</label>
                            <input type="text" id="contato" name="contato" minlength="2" maxlength="100">
                            <div class="error-message" id="contato-error">Contato deve ter pelo menos 2 caracteres</div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="observacoes">Observações:</label>
                        <textarea id="observacoes" name="observacoes" maxlength="500"></textarea>
                    </div>
                </div>
                
                <!-- Boleto -->
                <div id="boleto" class="form-section">
                    <div class="section-title">Dados Pessoais</div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="nome_boleto" class="required">Nome:</label>
                            <input type="text" id="nome_boleto" name="nome_boleto" required minlength="3" maxlength="100">
                            <div class="error-message" id="nome_boleto-error">Nome deve ter pelo menos 3 caracteres</div>
                        </div>
                        <div class="form-group">
                            <label for="cpf_boleto" class="required">CPF:</label>
                            <input type="text" id="cpf_boleto" name="cpf_boleto" required pattern="\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}" placeholder="000.000.000-00" inputmode="numeric">
                            <div class="error-message" id="cpf_boleto-error">CPF deve estar no formato 000.000.000-00</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="rg_boleto" class="required">RG:</label>
                            <input type="text" id="rg_boleto" name="rg_boleto" required minlength="5" maxlength="20">
                            <div class="error-message" id="rg_boleto-error">RG deve ter entre 5 e 20 caracteres</div>
                        </div>
                        <div class="form-group">
                            <label for="data_nascimento_boleto" class="required">Data de Nascimento:</label>
                            <input type="text" id="data_nascimento_boleto" name="data_nascimento_boleto" required placeholder="DD/MM/AAAA">
                            <div class="error-message" id="data_nascimento_boleto-error">Data de nascimento inválida. Cliente deve ter 18 anos ou mais.</div>
                        </div>
                    </div>
                    
                    <div class="section-title">Endereço do Cliente</div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="cep_boleto" class="required">CEP:</label>
                            <input type="text" id="cep_boleto" name="cep_boleto" required pattern="\\d{5}-\\d{3}" placeholder="00000-000" inputmode="numeric">
                            <div class="error-message" id="cep_boleto-error">CEP deve estar no formato 00000-000</div>
                        </div>
                        <div class="form-group">
                            <label for="numero_boleto" class="required">Número:</label>
                            <input type="text" id="numero_boleto" name="numero_boleto" required minlength="1" maxlength="10">
                            <div class="error-message" id="numero_boleto-error">Número é obrigatório</div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <button type="button" class="gps-button" id="gps_button_boleto">📍 Usar GPS para preencher endereço</button>
                        <div id="loading_boleto" class="loading">Buscando endereço...</div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="endereco_boleto" class="required">Endereço:</label>
                            <input type="text" id="endereco_boleto" name="endereco_boleto" required minlength="5" maxlength="200">
                            <div class="error-message" id="endereco_boleto-error">Endereço é obrigatório</div>
                        </div>
                        <div class="form-group">
                            <label for="bairro_boleto" class="required">Bairro:</label>
                            <input type="text" id="bairro_boleto" name="bairro_boleto" required minlength="2" maxlength="100">
                            <div class="error-message" id="bairro_boleto-error">Bairro é obrigatório</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="cidade_boleto" class="required">Cidade:</label>
                            <input type="text" id="cidade_boleto" name="cidade_boleto" required minlength="2" maxlength="100">
                            <div class="error-message" id="cidade_boleto-error">Cidade é obrigatória</div>
                        </div>
                        <div class="form-group">
                            <label for="ponto_referencia_boleto">Ponto de Referência:</label>
                            <input type="text" id="ponto_referencia_boleto" name="ponto_referencia_boleto" maxlength="200">
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="coordenadas_boleto">Coordenadas:</label>
                            <input type="text" id="coordenadas_boleto" name="coordenadas_boleto" readonly>
                        </div>
                        <div class="form-group">
                            <label for="localizacao_mapa_boleto">Localização (Link do Mapa):</label>
                            <div style="display: flex; gap: 10px; align-items: center;">
                                <input type="text" id="localizacao_mapa_boleto" name="localizacao_mapa_boleto" readonly style="flex: 1;">
                                <a href="#" id="map_link_boleto" class="map-link" target="_blank" style="display: none;">🗺️ Abrir Mapa</a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="section-title">Informações de Contato</div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="telefone_principal_boleto" class="required">Telefone Principal:</label>
                            <input type="tel" id="telefone_principal_boleto" name="telefone_principal_boleto" required pattern="\\(\\d{2}\\) \\d{5}-\\d{4}" placeholder="(00) 00000-0000" inputmode="numeric">
                            <div class="error-message" id="telefone_principal_boleto-error">Telefone deve estar no formato (00) 00000-0000</div>
                            <div class="whatsapp-confirm" id="whatsapp_confirm_boleto" style="display: none;">
                                <p style="margin: 0 0 8px 0; font-size: 14px;">Este número é do WhatsApp?</p>
                                <div class="whatsapp-buttons">
                                    <button type="button" class="whatsapp-btn whatsapp-yes" onclick="copyToWhatsApp(true, true)">Sim</button>
                                    <button type="button" class="whatsapp-btn whatsapp-no" onclick="copyToWhatsApp(false, true)">Não</button>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="whatsapp_principal_boleto" class="required">WhatsApp Principal:</label>
                            <input type="tel" id="whatsapp_principal_boleto" name="whatsapp_principal_boleto" required pattern="\\(\\d{2}\\) \\d{5}-\\d{4}" placeholder="(00) 00000-0000" inputmode="numeric">
                            <div class="error-message" id="whatsapp_principal_boleto-error">WhatsApp deve estar no formato (00) 00000-0000</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="telefone_secundario_boleto">Telefone Secundário:</label>
                            <input type="tel" id="telefone_secundario_boleto" name="telefone_secundario_boleto" pattern="\\(\\d{2}\\) \\d{5}-\\d{4}" placeholder="(00) 00000-0000" inputmode="numeric">
                            <div class="error-message" id="telefone_secundario_boleto-error">Telefone deve estar no formato (00) 00000-0000</div>
                        </div>
                        <div class="form-group">
                            <label for="whatsapp_secundario_boleto">WhatsApp Secundário:</label>
                            <input type="tel" id="whatsapp_secundario_boleto" name="whatsapp_secundario_boleto" pattern="\\(\\d{2}\\) \\d{5}-\\d{4}" placeholder="(00) 00000-0000" inputmode="numeric">
                            <div class="error-message" id="whatsapp_secundario_boleto-error">WhatsApp deve estar no formato (00) 00000-0000</div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="email_boleto" class="required">E-mail:</label>
                        <input type="email" id="email_boleto" name="email_boleto" required>
                        <div class="error-message" id="email_boleto-error">E-mail deve ser válido</div>
                    </div>
                    
                    <div class="section-title">Informações de Cobrança</div>
                    
                    <div class="form-group">
                        <label for="vencimento_boleto" class="required">Vencimento:</label>
                        <select id="vencimento_boleto" name="vencimento_boleto" required>
                            <option value="">Selecione o dia</option>
                            <option value="01">Dia 01</option>
                            <option value="05">Dia 05</option>
                            <option value="08">Dia 08</option>
                            <option value="10">Dia 10</option>
                            <option value="12">Dia 12</option>
                            <option value="15">Dia 15</option>
                            <option value="20">Dia 20</option>
                        </select>
                        <div class="error-message" id="vencimento_boleto-error">Vencimento é obrigatório</div>
                    </div>
                    
                    <div class="section-title">Outros</div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="cliente_sem_fronteiras_boleto" class="required">Cliente Sem Fronteiras:</label>
                            <select id="cliente_sem_fronteiras_boleto" name="cliente_sem_fronteiras_boleto" required onchange="updatePlanoAndTaxa(true)">
                                <option value="">Selecione</option>
                                <option value="sim">Sim</option>
                                <option value="nao">Não</option>
                            </select>
                            <div class="error-message" id="cliente_sem_fronteiras_boleto-error">Selecione uma opção</div>
                        </div>
                        <div class="form-group">
                            <label for="plano_boleto" class="required">Plano:</label>
                            <select id="plano_boleto" name="plano_boleto" required>
                                <option value="">Selecione</option>
                                <option value="R$ 19,80">R$ 19,80 (Cliente Sem Fronteiras)</option>
                                <option value="R$ 39,80">R$ 39,80 (Não cliente)</option>
                            </select>
                            <div class="error-message" id="plano_boleto-error">Selecione um plano</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="taxa_instalacao_boleto" class="required">Taxa de Instalação:</label>
                            <input type="text" id="taxa_instalacao_boleto" name="taxa_instalacao_boleto" required placeholder="R$ 0,00" inputmode="decimal" readonly>
                            <div class="error-message" id="taxa_instalacao_boleto-error">Taxa de instalação é obrigatória</div>
                        </div>
                        <div class="form-group">
                            <label for="id_caixa_boleto">ID da Caixa:</label>
                            <input type="text" id="id_caixa_boleto" name="id_caixa_boleto" minlength="2" maxlength="50">
                            <div class="error-message" id="id_caixa_boleto-error">ID da Caixa deve ter pelo menos 2 caracteres</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="operadora_boleto">Operadora:</label>
                            <input type="text" id="operadora_boleto" name="operadora_boleto" minlength="2" maxlength="50">
                            <div class="error-message" id="operadora_boleto-error">Operadora deve ter pelo menos 2 caracteres</div>
                        </div>
                        <div class="form-group">
                            <label for="fidelidade_boleto" class="required">Fidelidade:</label>
                            <select id="fidelidade_boleto" name="fidelidade_boleto" required>
                                <option value="">Selecione</option>
                                <option value="sim">Sim</option>
                                <option value="nao">Não</option>
                            </select>
                            <div class="error-message" id="fidelidade_boleto-error">Selecione uma opção</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="portabilidade_boleto" class="required">Portabilidade:</label>
                            <select id="portabilidade_boleto" name="portabilidade_boleto" required>
                                <option value="">Selecione</option>
                                <option value="sim">Sim</option>
                                <option value="nao">Não</option>
                            </select>
                            <div class="error-message" id="portabilidade_boleto-error">Selecione uma opção</div>
                        </div>
                        <div class="form-group">
                            <label for="vendedor_boleto" class="required">Vendedor:</label>
                            <input type="text" id="vendedor_boleto" name="vendedor_boleto" required minlength="2" maxlength="100">
                            <div class="error-message" id="vendedor_boleto-error">Vendedor é obrigatório</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="contato_boleto">Contato:</label>
                            <input type="text" id="contato_boleto" name="contato_boleto" minlength="2" maxlength="100">
                            <div class="error-message" id="contato_boleto-error">Contato deve ter pelo menos 2 caracteres</div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="observacoes_boleto">Observações:</label>
                        <textarea id="observacoes_boleto" name="observacoes_boleto" maxlength="500"></textarea>
                    </div>
                </div>
                
                <div class="success-message" id="successMessage">✅ Dados copiados com sucesso! Agora você pode colar no WhatsApp.</div>
                
                <div class="action-buttons">
                    <button type="button" class="copy-btn" id="copyButton">📋 Copiar</button>
                    <button type="button" class="save-btn" id="saveButton">💾 Salvar PDF</button>
                    <button type="button" class="clear-btn" id="clearButton">🗑️ Limpar Formulário</button>
                </div>
            </form>
        </div>
    `,

    // ========================================
    // PJ - SOMENTE INTERNET
    // ========================================
    'pj-internet': `
        <div class="container formulario-container">
            <div class="logo">
                <img src="https://i.imgur.com/SEr4lkm.png" alt="Logomarca">
            </div>
            
            <h1>Abertura de Chamados - Novos Clientes PJ</h1>
            
            <div class="payment-options">
                <div class="payment-option active" data-target="debito">Débito em Conta</div>
                <div class="payment-option" data-target="boleto">Boleto</div>
            </div>
            
            <form id="chamadoForm">
                <!-- Débito em Conta -->
                <div id="debito" class="form-section active">
                    <div class="section-title">Dados da Empresa</div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="razao_social" class="required">Razão Social:</label>
                            <input type="text" id="razao_social" name="razao_social" required minlength="3" maxlength="200">
                            <div class="error-message" id="razao_social-error">Razão Social deve ter pelo menos 3 caracteres</div>
                        </div>
                        <div class="form-group">
                            <label for="nome_fantasia" class="required">Nome Fantasia:</label>
                            <input type="text" id="nome_fantasia" name="nome_fantasia" required minlength="3" maxlength="200">
                            <div class="error-message" id="nome_fantasia-error">Nome Fantasia deve ter pelo menos 3 caracteres</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="cnpj" class="required">CNPJ:</label>
                            <input type="text" id="cnpj" name="cnpj" required pattern="\\d{2}\\.\\d{3}\\.\\d{3}/\\d{4}-\\d{2}" placeholder="00.000.000/0000-00" inputmode="numeric">
                            <div class="error-message" id="cnpj-error">CNPJ deve estar no formato 00.000.000/0000-00</div>
                        </div>
                        <div class="form-group">
                            <label for="inscricao_estadual">Inscrição Estadual:</label>
                            <input type="text" id="inscricao_estadual" name="inscricao_estadual" maxlength="20">
                            <div class="error-message" id="inscricao_estadual-error">Inscrição Estadual deve ter até 20 caracteres</div>
                        </div>
                    </div>
                    
                    <div class="section-title">Endereço da Empresa</div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="cep" class="required">CEP:</label>
                            <input type="text" id="cep" name="cep" required pattern="\\d{5}-\\d{3}" placeholder="00000-000" inputmode="numeric">
                            <div class="error-message" id="cep-error">CEP deve estar no formato 00000-000</div>
                        </div>
                        <div class="form-group">
                            <label for="numero" class="required">Número:</label>
                            <input type="text" id="numero" name="numero" required minlength="1" maxlength="10">
                            <div class="error-message" id="numero-error">Número é obrigatório</div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <button type="button" class="gps-button" id="gps_button">📍 Usar GPS para preencher endereço</button>
                        <div id="loading" class="loading">Buscando endereço...</div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="endereco" class="required">Endereço:</label>
                            <input type="text" id="endereco" name="endereco" required minlength="5" maxlength="200">
                            <div class="error-message" id="endereco-error">Endereço é obrigatório</div>
                        </div>
                        <div class="form-group">
                            <label for="bairro" class="required">Bairro:</label>
                            <input type="text" id="bairro" name="bairro" required minlength="2" maxlength="100">
                            <div class="error-message" id="bairro-error">Bairro é obrigatório</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="cidade" class="required">Cidade:</label>
                            <input type="text" id="cidade" name="cidade" required minlength="2" maxlength="100">
                            <div class="error-message" id="cidade-error">Cidade é obrigatória</div>
                        </div>
                        <div class="form-group">
                            <label for="ponto_referencia">Ponto de Referência:</label>
                            <input type="text" id="ponto_referencia" name="ponto_referencia" maxlength="200">
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="coordenadas">Coordenadas:</label>
                            <input type="text" id="coordenadas" name="coordenadas" readonly>
                        </div>
                        <div class="form-group">
                            <label for="localizacao_mapa">Localização (Link do Mapa):</label>
                            <div style="display: flex; gap: 10px; align-items: center;">
                                <input type="text" id="localizacao_mapa" name="localizacao_mapa" readonly style="flex: 1;">
                                <a href="#" id="map_link" class="map-link" target="_blank" style="display: none;">🗺️ Abrir Mapa</a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="section-title">Informações de Contato</div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="telefone_principal" class="required">Telefone Principal:</label>
                            <input type="tel" id="telefone_principal" name="telefone_principal" required pattern="\\(\\d{2}\\) \\d{5}-\\d{4}" placeholder="(00) 00000-0000" inputmode="numeric">
                            <div class="error-message" id="telefone_principal-error">Telefone deve estar no formato (00) 00000-0000</div>
                            <div class="whatsapp-confirm" id="whatsapp_confirm" style="display: none;">
                                <p style="margin: 0 0 8px 0; font-size: 14px;">Este número é do WhatsApp?</p>
                                <div class="whatsapp-buttons">
                                    <button type="button" class="whatsapp-btn whatsapp-yes" onclick="copyToWhatsApp(true, false)">Sim</button>
                                    <button type="button" class="whatsapp-btn whatsapp-no" onclick="copyToWhatsApp(false, false)">Não</button>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="whatsapp_principal" class="required">WhatsApp Principal:</label>
                            <input type="tel" id="whatsapp_principal" name="whatsapp_principal" required pattern="\\(\\d{2}\\) \\d{5}-\\d{4}" placeholder="(00) 00000-0000" inputmode="numeric">
                            <div class="error-message" id="whatsapp_principal-error">WhatsApp deve estar no formato (00) 00000-0000</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="telefone_secundario">Telefone Secundário:</label>
                            <input type="tel" id="telefone_secundario" name="telefone_secundario" pattern="\\(\\d{2}\\) \\d{5}-\\d{4}" placeholder="(00) 00000-0000" inputmode="numeric">
                            <div class="error-message" id="telefone_secundario-error">Telefone deve estar no formato (00) 00000-0000</div>
                        </div>
                        <div class="form-group">
                            <label for="whatsapp_secundario">WhatsApp Secundário:</label>
                            <input type="tel" id="whatsapp_secundario" name="whatsapp_secundario" pattern="\\(\\d{2}\\) \\d{5}-\\d{4}" placeholder="(00) 00000-0000" inputmode="numeric">
                            <div class="error-message" id="whatsapp_secundario-error">WhatsApp deve estar no formato (00) 00000-0000</div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="email" class="required">E-mail:</label>
                        <input type="email" id="email" name="email" required>
                        <div class="error-message" id="email-error">E-mail deve ser válido</div>
                    </div>
                    
                    <div class="section-title">Informações do Contratante</div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="nome_contratante" class="required">Nome do Contratante:</label>
                            <input type="text" id="nome_contratante" name="nome_contratante" required minlength="3" maxlength="100">
                            <div class="error-message" id="nome_contratante-error">Nome do Contratante deve ter pelo menos 3 caracteres</div>
                        </div>
                        <div class="form-group">
                            <label for="cpf_contratante" class="required">CPF do Contratante:</label>
                            <input type="text" id="cpf_contratante" name="cpf_contratante" required pattern="\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}" placeholder="000.000.000-00" inputmode="numeric">
                            <div class="error-message" id="cpf_contratante-error">CPF deve estar no formato 000.000.000-00</div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="cargo_contratante" class="required">Cargo do Contratante:</label>
                        <select id="cargo_contratante" name="cargo_contratante" required>
                            <option value="">Selecione o cargo</option>
                        </select>
                        <div class="error-message" id="cargo_contratante-error">Cargo do Contratante é obrigatório</div>
                        <div id="cargo_info" class="cargo-instruction" style="display: none;"></div>
                    </div>
                    
                    <div class="section-title">Informações de Cobrança Banco do Brasil</div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="agencia" class="required">Agência:</label>
                            <input type="text" id="agencia" name="agencia" required minlength="3" maxlength="10" inputmode="numeric">
                            <div class="error-message" id="agencia-error">Agência é obrigatória</div>
                        </div>
                        <div class="form-group">
                            <label for="conta" class="required">Conta:</label>
                            <input type="text" id="conta" name="conta" required minlength="3" maxlength="15" inputmode="numeric">
                            <div class="error-message" id="conta-error">Conta é obrigatória</div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="vencimento_debito" class="required">Vencimento:</label>
                        <select id="vencimento_debito" name="vencimento_debito" required>
                            <option value="">Selecione o dia</option>
                            <option value="05">Dia 05</option>
                            <option value="10">Dia 10</option>
                            <option value="15">Dia 15</option>
                            <option value="20">Dia 20</option>
                            <option value="25">Dia 25</option>
                        </select>
                        <div class="error-message" id="vencimento_debito-error">Vencimento é obrigatório</div>
                    </div>
                    
                    <div class="section-title">Outros</div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="fidelidade" class="required">Aceita a Fidelidade:</label>
                            <select id="fidelidade" name="fidelidade" required>
                                <option value="">Selecione</option>
                                <option value="sim">Sim</option>
                                <option value="nao">Não</option>
                            </select>
                            <div class="error-message" id="fidelidade-error">Selecione uma opção</div>
                        </div>
                        <div class="form-group">
                            <label for="taxa_instalacao" class="required">Taxa de Instalação:</label>
                            <input type="text" id="taxa_instalacao" name="taxa_instalacao" required placeholder="R$ 0,00" inputmode="decimal">
                            <div class="error-message" id="taxa_instalacao-error">Taxa de instalação é obrigatória</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="plano" class="required">Plano:</label>
                            <select id="plano" name="plano" required>
                                <option value="">Selecione</option>
                                <option value="700MB - R$ 99,90">700MB - R$ 99,90</option>
                                <option value="900MB - R$ 149,90">900MB - R$ 149,90</option>
                            </select>
                            <div class="error-message" id="plano-error">Selecione um plano</div>
                        </div>
                        <div class="form-group">
                            <label for="id_caixa">ID da Caixa:</label>
                            <input type="text" id="id_caixa" name="id_caixa" minlength="2" maxlength="50">
                            <div class="error-message" id="id_caixa-error">ID da Caixa deve ter pelo menos 2 caracteres</div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="vendedor" class="required">Vendedor:</label>
                        <input type="text" id="vendedor" name="vendedor" required minlength="2" maxlength="100">
                        <div class="error-message" id="vendedor-error">Vendedor é obrigatório</div>
                    </div>
                </div>
                
                <!-- Boleto -->
                <div id="boleto" class="form-section">
                    <div class="section-title">Dados da Empresa</div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="razao_social_boleto" class="required">Razão Social:</label>
                            <input type="text" id="razao_social_boleto" name="razao_social_boleto" required minlength="3" maxlength="200">
                            <div class="error-message" id="razao_social_boleto-error">Razão Social deve ter pelo menos 3 caracteres</div>
                        </div>
                        <div class="form-group">
                            <label for="nome_fantasia_boleto" class="required">Nome Fantasia:</label>
                            <input type="text" id="nome_fantasia_boleto" name="nome_fantasia_boleto" required minlength="3" maxlength="200">
                            <div class="error-message" id="nome_fantasia_boleto-error">Nome Fantasia deve ter pelo menos 3 caracteres</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="cnpj_boleto" class="required">CNPJ:</label>
                            <input type="text" id="cnpj_boleto" name="cnpj_boleto" required pattern="\\d{2}\\.\\d{3}\\.\\d{3}/\\d{4}-\\d{2}" placeholder="00.000.000/0000-00" inputmode="numeric">
                            <div class="error-message" id="cnpj_boleto-error">CNPJ deve estar no formato 00.000.000/0000-00</div>
                        </div>
                        <div class="form-group">
                            <label for="inscricao_estadual_boleto">Inscrição Estadual:</label>
                            <input type="text" id="inscricao_estadual_boleto" name="inscricao_estadual_boleto" maxlength="20">
                            <div class="error-message" id="inscricao_estadual_boleto-error">Inscrição Estadual deve ter até 20 caracteres</div>
                        </div>
                    </div>
                    
                    <div class="section-title">Endereço da Empresa</div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="cep_boleto" class="required">CEP:</label>
                            <input type="text" id="cep_boleto" name="cep_boleto" required pattern="\\d{5}-\\d{3}" placeholder="00000-000" inputmode="numeric">
                            <div class="error-message" id="cep_boleto-error">CEP deve estar no formato 00000-000</div>
                        </div>
                        <div class="form-group">
                            <label for="numero_boleto" class="required">Número:</label>
                            <input type="text" id="numero_boleto" name="numero_boleto" required minlength="1" maxlength="10">
                            <div class="error-message" id="numero_boleto-error">Número é obrigatório</div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <button type="button" class="gps-button" id="gps_button_boleto">📍 Usar GPS para preencher endereço</button>
                        <div id="loading_boleto" class="loading">Buscando endereço...</div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="endereco_boleto" class="required">Endereço:</label>
                            <input type="text" id="endereco_boleto" name="endereco_boleto" required minlength="5" maxlength="200">
                            <div class="error-message" id="endereco_boleto-error">Endereço é obrigatório</div>
                        </div>
                        <div class="form-group">
                            <label for="bairro_boleto" class="required">Bairro:</label>
                            <input type="text" id="bairro_boleto" name="bairro_boleto" required minlength="2" maxlength="100">
                            <div class="error-message" id="bairro_boleto-error">Bairro é obrigatório</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="cidade_boleto" class="required">Cidade:</label>
                            <input type="text" id="cidade_boleto" name="cidade_boleto" required minlength="2" maxlength="100">
                            <div class="error-message" id="cidade_boleto-error">Cidade é obrigatória</div>
                        </div>
                        <div class="form-group">
                            <label for="ponto_referencia_boleto">Ponto de Referência:</label>
                            <input type="text" id="ponto_referencia_boleto" name="ponto_referencia_boleto" maxlength="200">
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="coordenadas_boleto">Coordenadas:</label>
                            <input type="text" id="coordenadas_boleto" name="coordenadas_boleto" readonly>
                        </div>
                        <div class="form-group">
                            <label for="localizacao_mapa_boleto">Localização (Link do Mapa):</label>
                            <div style="display: flex; gap: 10px; align-items: center;">
                                <input type="text" id="localizacao_mapa_boleto" name="localizacao_mapa_boleto" readonly style="flex: 1;">
                                <a href="#" id="map_link_boleto" class="map-link" target="_blank" style="display: none;">🗺️ Abrir Mapa</a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="section-title">Informações de Contato</div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="telefone_principal_boleto" class="required">Telefone Principal:</label>
                            <input type="tel" id="telefone_principal_boleto" name="telefone_principal_boleto" required pattern="\\(\\d{2}\\) \\d{5}-\\d{4}" placeholder="(00) 00000-0000" inputmode="numeric">
                            <div class="error-message" id="telefone_principal_boleto-error">Telefone deve estar no formato (00) 00000-0000</div>
                            <div class="whatsapp-confirm" id="whatsapp_confirm_boleto" style="display: none;">
                                <p style="margin: 0 0 8px 0; font-size: 14px;">Este número é do WhatsApp?</p>
                                <div class="whatsapp-buttons">
                                    <button type="button" class="whatsapp-btn whatsapp-yes" onclick="copyToWhatsApp(true, true)">Sim</button>
                                    <button type="button" class="whatsapp-btn whatsapp-no" onclick="copyToWhatsApp(false, true)">Não</button>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="whatsapp_principal_boleto" class="required">WhatsApp Principal:</label>
                            <input type="tel" id="whatsapp_principal_boleto" name="whatsapp_principal_boleto" required pattern="\\(\\d{2}\\) \\d{5}-\\d{4}" placeholder="(00) 00000-0000" inputmode="numeric">
                            <div class="error-message" id="whatsapp_principal_boleto-error">WhatsApp deve estar no formato (00) 00000-0000</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="telefone_secundario_boleto">Telefone Secundário:</label>
                            <input type="tel" id="telefone_secundario_boleto" name="telefone_secundario_boleto" pattern="\\(\\d{2}\\) \\d{5}-\\d{4}" placeholder="(00) 00000-0000" inputmode="numeric">
                            <div class="error-message" id="telefone_secundario_boleto-error">Telefone deve estar no formato (00) 00000-0000</div>
                        </div>
                        <div class="form-group">
                            <label for="whatsapp_secundario_boleto">WhatsApp Secundário:</label>
                            <input type="tel" id="whatsapp_secundario_boleto" name="whatsapp_secundario_boleto" pattern="\\(\\d{2}\\) \\d{5}-\\d{4}" placeholder="(00) 00000-0000" inputmode="numeric">
                            <div class="error-message" id="whatsapp_secundario_boleto-error">WhatsApp deve estar no formato (00) 00000-0000</div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="email_boleto" class="required">E-mail:</label>
                        <input type="email" id="email_boleto" name="email_boleto" required>
                        <div class="error-message" id="email_boleto-error">E-mail deve ser válido</div>
                    </div>
                    
                    <div class="section-title">Informações do Contratante</div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="nome_contratante_boleto" class="required">Nome do Contratante:</label>
                            <input type="text" id="nome_contratante_boleto" name="nome_contratante_boleto" required minlength="3" maxlength="100">
                            <div class="error-message" id="nome_contratante_boleto-error">Nome do Contratante deve ter pelo menos 3 caracteres</div>
                        </div>
                        <div class="form-group">
                            <label for="cpf_contratante_boleto" class="required">CPF do Contratante:</label>
                            <input type="text" id="cpf_contratante_boleto" name="cpf_contratante_boleto" required pattern="\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}" placeholder="000.000.000-00" inputmode="numeric">
                            <div class="error-message" id="cpf_contratante_boleto-error">CPF deve estar no formato 000.000.000-00</div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="cargo_contratante_boleto" class="required">Cargo do Contratante:</label>
                        <select id="cargo_contratante_boleto" name="cargo_contratante_boleto" required>
                            <option value="">Selecione o cargo</option>
                        </select>
                        <div class="error-message" id="cargo_contratante_boleto-error">Cargo do Contratante é obrigatório</div>
                        <div id="cargo_info_boleto" class="cargo-instruction" style="display: none;"></div>
                    </div>
                    
                    <div class="section-title">Informações de Cobrança</div>
                    
                    <div class="form-group">
                        <label for="vencimento_boleto" class="required">Vencimento:</label>
                        <select id="vencimento_boleto" name="vencimento_boleto" required>
                            <option value="">Selecione o dia</option>
                            <option value="01">Dia 01</option>
                            <option value="05">Dia 05</option>
                            <option value="08">Dia 08</option>
                            <option value="10">Dia 10</option>
                            <option value="12">Dia 12</option>
                            <option value="15">Dia 15</option>
                            <option value="20">Dia 20</option>
                        </select>
                        <div class="error-message" id="vencimento_boleto-error">Vencimento é obrigatório</div>
                    </div>
                    
                    <div class="section-title">Outros</div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="fidelidade_boleto" class="required">Aceita a Fidelidade:</label>
                            <select id="fidelidade_boleto" name="fidelidade_boleto" required>
                                <option value="">Selecione</option>
                                <option value="sim">Sim</option>
                                <option value="nao">Não</option>
                            </select>
                            <div class="error-message" id="fidelidade_boleto-error">Selecione uma opção</div>
                        </div>
                        <div class="form-group">
                            <label for="taxa_instalacao_boleto" class="required">Taxa de Instalação:</label>
                            <input type="text" id="taxa_instalacao_boleto" name="taxa_instalacao_boleto" required placeholder="R$ 0,00" inputmode="decimal">
                            <div class="error-message" id="taxa_instalacao_boleto-error">Taxa de instalação é obrigatória</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="plano_boleto" class="required">Plano:</label>
                            <select id="plano_boleto" name="plano_boleto" required>
                                <option value="">Selecione</option>
                                <option value="700MB - R$ 119,90">700MB - R$ 119,90</option>
                                <option value="900MB - R$ 169,90">900MB - R$ 169,90</option>
                            </select>
                            <div class="error-message" id="plano_boleto-error">Selecione um plano</div>
                        </div>
                        <div class="form-group">
                            <label for="id_caixa_boleto">ID da Caixa:</label>
                            <input type="text" id="id_caixa_boleto" name="id_caixa_boleto" minlength="2" maxlength="50">
                            <div class="error-message" id="id_caixa_boleto-error">ID da Caixa deve ter pelo menos 2 caracteres</div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="vendedor_boleto" class="required">Vendedor:</label>
                        <input type="text" id="vendedor_boleto" name="vendedor_boleto" required minlength="2" maxlength="100">
                        <div class="error-message" id="vendedor_boleto-error">Vendedor é obrigatório</div>
                    </div>
                </div>
                
                <div class="success-message" id="successMessage">✅ Dados copiados com sucesso! Agora você pode colar no WhatsApp.</div>
                
                <div class="action-buttons">
                    <button type="button" class="copy-btn" id="copyButton">📋 Copiar</button>
                    <button type="button" class="save-btn" id="saveButton">💾 Salvar PDF</button>
                    <button type="button" class="clear-btn" id="clearButton">🗑️ Limpar Formulário</button>
                </div>
            </form>
        </div>
    `,

    // ========================================
    // PJ - INTERNET + TELEFONE
    // ========================================
    'pj-internet-telefone': `
        <div class="container formulario-container">
            <div class="logo">
                <img src="https://i.imgur.com/SEr4lkm.png" alt="Logomarca">
            </div>
            
            <h1>Abertura de Chamados - Pessoa Jurídica (Internet + Telefone Fixo)</h1>
            
            <div class="payment-options">
                <div class="payment-option active" data-target="debito">Débito em Conta</div>
                <div class="payment-option" data-target="boleto">Boleto</div>
            </div>
            
            <form id="chamadoForm">
                <!-- Débito em Conta -->
                <div id="debito" class="form-section active">
                    <div class="section-title">Dados da Empresa</div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="razao_social" class="required">Razão Social:</label>
                            <input type="text" id="razao_social" name="razao_social" required minlength="3" maxlength="200">
                            <div class="error-message" id="razao_social-error">Razão Social deve ter pelo menos 3 caracteres</div>
                        </div>
                        <div class="form-group">
                            <label for="nome_fantasia">Nome Fantasia:</label>
                            <input type="text" id="nome_fantasia" name="nome_fantasia" minlength="3" maxlength="200">
                            <div class="error-message" id="nome_fantasia-error">Nome Fantasia deve ter pelo menos 3 caracteres</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="cnpj" class="required">CNPJ:</label>
                            <input type="text" id="cnpj" name="cnpj" required pattern="\\d{2}\\.\\d{3}\\.\\d{3}/\\d{4}-\\d{2}" placeholder="00.000.000/0000-00" inputmode="numeric">
                            <div class="error-message" id="cnpj-error">CNPJ deve estar no formato 00.000.000/0000-00</div>
                        </div>
                        <div class="form-group">
                            <label for="inscricao_estadual">Inscrição Estadual:</label>
                            <input type="text" id="inscricao_estadual" name="inscricao_estadual" minlength="3" maxlength="50">
                            <div class="error-message" id="inscricao_estadual-error">Inscrição Estadual deve ter pelo menos 3 caracteres</div>
                        </div>
                    </div>
                    
                    <div class="section-title">Endereço da Empresa</div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="cep" class="required">CEP:</label>
                            <input type="text" id="cep" name="cep" required pattern="\\d{5}-\\d{3}" placeholder="00000-000" inputmode="numeric">
                            <div class="error-message" id="cep-error">CEP deve estar no formato 00000-000</div>
                        </div>
                        <div class="form-group">
                            <label for="numero" class="required">Número:</label>
                            <input type="text" id="numero" name="numero" required minlength="1" maxlength="10">
                            <div class="error-message" id="numero-error">Número é obrigatório</div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <button type="button" class="gps-button" id="gps_button">📍 Usar GPS para preencher endereço</button>
                        <div id="loading" class="loading">Buscando endereço...</div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="endereco" class="required">Endereço:</label>
                            <input type="text" id="endereco" name="endereco" required minlength="5" maxlength="200">
                            <div class="error-message" id="endereco-error">Endereço é obrigatório</div>
                        </div>
                        <div class="form-group">
                            <label for="bairro" class="required">Bairro:</label>
                            <input type="text" id="bairro" name="bairro" required minlength="2" maxlength="100">
                            <div class="error-message" id="bairro-error">Bairro é obrigatório</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="cidade" class="required">Cidade:</label>
                            <input type="text" id="cidade" name="cidade" required minlength="2" maxlength="100">
                            <div class="error-message" id="cidade-error">Cidade é obrigatória</div>
                        </div>
                        <div class="form-group">
                            <label for="ponto_referencia">Ponto de Referência:</label>
                            <input type="text" id="ponto_referencia" name="ponto_referencia" maxlength="200">
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="coordenadas">Coordenadas:</label>
                            <input type="text" id="coordenadas" name="coordenadas" readonly>
                        </div>
                        <div class="form-group">
                            <label for="localizacao_mapa">Localização (Link do Mapa):</label>
                            <div style="display: flex; gap: 10px; align-items: center;">
                                <input type="text" id="localizacao_mapa" name="localizacao_mapa" readonly style="flex: 1;">
                                <a href="#" id="map_link" class="map-link" target="_blank" style="display: none;">🗺️ Abrir Mapa</a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="section-title">Informações de Contato</div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="email" class="required">E-mail:</label>
                            <input type="email" id="email" name="email" required>
                            <div class="error-message" id="email-error">E-mail deve ser válido</div>
                        </div>
                        <div class="form-group">
                            <label for="telefone_principal" class="required">Telefone Principal:</label>
                            <input type="tel" id="telefone_principal" name="telefone_principal" required pattern="\\(\\d{2}\\) \\d{5}-\\d{4}" placeholder="(00) 00000-0000" inputmode="numeric">
                            <div class="error-message" id="telefone_principal-error">Telefone deve estar no formato (00) 00000-0000</div>
                            <div class="whatsapp-confirm" id="whatsapp_confirm" style="display: none;">
                                <p style="margin: 0 0 8px 0; font-size: 14px;">Este número é do WhatsApp?</p>
                                <div class="whatsapp-buttons">
                                    <button type="button" class="whatsapp-btn whatsapp-yes" onclick="copyToWhatsApp(true, false)">Sim</button>
                                    <button type="button" class="whatsapp-btn whatsapp-no" onclick="copyToWhatsApp(false, false)">Não</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="whatsapp_principal" class="required">WhatsApp Principal:</label>
                            <input type="tel" id="whatsapp_principal" name="whatsapp_principal" required pattern="\\(\\d{2}\\) \\d{5}-\\d{4}" placeholder="(00) 00000-0000" inputmode="numeric">
                            <div class="error-message" id="whatsapp_principal-error">WhatsApp deve estar no formato (00) 00000-0000</div>
                        </div>
                        <div class="form-group">
                            <label for="telefone_secundario">Telefone Secundário:</label>
                            <input type="tel" id="telefone_secundario" name="telefone_secundario" pattern="\\(\\d{2}\\) \\d{5}-\\d{4}" placeholder="(00) 00000-0000" inputmode="numeric">
                            <div class="error-message" id="telefone_secundario-error">Telefone deve estar no formato (00) 00000-0000</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="whatsapp_secundario">WhatsApp Secundário:</label>
                            <input type="tel" id="whatsapp_secundario" name="whatsapp_secundario" pattern="\\(\\d{2}\\) \\d{5}-\\d{4}" placeholder="(00) 00000-0000" inputmode="numeric">
                            <div class="error-message" id="whatsapp_secundario-error">WhatsApp deve estar no formato (00) 00000-0000</div>
                        </div>
                        <div class="form-group">
                            <label for="plano" class="required">Plano:</label>
                            <select id="plano" name="plano" required>
                                <option value="">Selecione</option>
                                <option value="600MB de Internet + Fixo - R$ 119,80">600MB de Internet + Fixo - R$ 119,80</option>
                                <option value="900MB de Internet + Fixo - R$ 169,80">900MB de Internet + Fixo - R$ 169,80</option>
                            </select>
                            <div class="error-message" id="plano-error">Selecione um plano</div>
                        </div>
                    </div>
                    
                    <div class="section-title">Dados do Contratante</div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="nome_contratante" class="required">Nome do Contratante:</label>
                            <input type="text" id="nome_contratante" name="nome_contratante" required minlength="3" maxlength="100">
                            <div class="error-message" id="nome_contratante-error">Nome do Contratante deve ter pelo menos 3 caracteres</div>
                        </div>
                        <div class="form-group">
                            <label for="cpf_contratante" class="required">CPF:</label>
                            <input type="text" id="cpf_contratante" name="cpf_contratante" required pattern="\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}" placeholder="000.000.000-00" inputmode="numeric">
                            <div class="error-message" id="cpf_contratante-error">CPF deve estar no formato 000.000.000-00</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="cargo_contratante" class="required">Cargo do Contratante:</label>
                            <select id="cargo_contratante" name="cargo_contratante" required>
                                <option value="">Selecione o cargo</option>
                            </select>
                            <div class="error-message" id="cargo_contratante-error">Selecione um cargo</div>
                            <div class="cargo-instruction" id="cargo_instruction">O cargo será filtrado automaticamente com base no tipo de instituição</div>
                        </div>
                        <div class="form-group">
                            <label for="vendedor" class="required">Vendedor:</label>
                            <input type="text" id="vendedor" name="vendedor" required minlength="2" maxlength="100">
                            <div class="error-message" id="vendedor-error">Vendedor é obrigatório</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="id_caixa">ID da Caixa:</label>
                            <input type="text" id="id_caixa" name="id_caixa" minlength="2" maxlength="50">
                            <div class="error-message" id="id_caixa-error">ID da Caixa deve ter pelo menos 2 caracteres</div>
                        </div>
                        <div class="form-group">
                            <label for="inserir_rede_mesh" class="required">Inserir Rede Mesh:</label>
                            <select id="inserir_rede_mesh" name="inserir_rede_mesh" required>
                                <option value="">Selecione</option>
                                <option value="Sim">Sim</option>
                                <option value="Não">Não</option>
                            </select>
                            <div class="error-message" id="inserir_rede_mesh-error">Selecione uma opção</div>
                        </div>
                    </div>
                    
                    <div class="section-title">Informações de Cobrança Banco do Brasil</div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="agencia" class="required">Agência:</label>
                            <input type="text" id="agencia" name="agencia" required minlength="3" maxlength="10" inputmode="numeric">
                            <div class="error-message" id="agencia-error">Agência é obrigatória</div>
                        </div>
                        <div class="form-group">
                            <label for="conta" class="required">Conta:</label>
                            <input type="text" id="conta" name="conta" required minlength="3" maxlength="15" inputmode="numeric">
                            <div class="error-message" id="conta-error">Conta é obrigatória</div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="vencimento_debito" class="required">Vencimento:</label>
                        <select id="vencimento_debito" name="vencimento_debito" required>
                            <option value="">Selecione o dia</option>
                            <option value="05">Dia 05</option>
                            <option value="10">Dia 10</option>
                            <option value="15">Dia 15</option>
                            <option value="20">Dia 20</option>
                            <option value="25">Dia 25</option>
                        </select>
                        <div class="error-message" id="vencimento_debito-error">Vencimento é obrigatório</div>
                    </div>
                    
                    <div class="section-title">Formulário do Telefone Fixo</div>
                    
                    <div class="form-group">
                        <button type="button" class="autofill-button" onclick="autofillTelefoneFixo('debito')">🔄 Preencher com informações da Empresa</button>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="cliente_telefone" class="required">Cliente:</label>
                            <input type="text" id="cliente_telefone" name="cliente_telefone" required minlength="3" maxlength="100">
                            <div class="error-message" id="cliente_telefone-error">Nome do cliente é obrigatório</div>
                        </div>
                        <div class="form-group">
                            <label for="cpf_telefone" class="required">CPF:</label>
                            <input type="text" id="cpf_telefone" name="cpf_telefone" required pattern="\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}" placeholder="000.000.000-00" inputmode="numeric">
                            <div class="error-message" id="cpf_telefone-error">CPF deve estar no formato 000.000.000-00</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="cidade_telefone" class="required">Cidade:</label>
                            <input type="text" id="cidade_telefone" name="cidade_telefone" required minlength="2" maxlength="100">
                            <div class="error-message" id="cidade_telefone-error">Cidade é obrigatória</div>
                        </div>
                        <div class="form-group">
                            <label for="bairro_telefone" class="required">Bairro:</label>
                            <input type="text" id="bairro_telefone" name="bairro_telefone" required minlength="2" maxlength="100">
                            <div class="error-message" id="bairro_telefone-error">Bairro é obrigatório</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="numero_endereco_telefone" class="required">Número:</label>
                            <input type="text" id="numero_endereco_telefone" name="numero_endereco_telefone" required minlength="1" maxlength="10">
                            <div class="error-message" id="numero_endereco_telefone-error">Número é obrigatório</div>
                        </div>
                        <div class="form-group">
                            <label for="vendedor_telefone" class="required">Vendedor:</label>
                            <input type="text" id="vendedor_telefone" name="vendedor_telefone" required minlength="2" maxlength="100">
                            <div class="error-message" id="vendedor_telefone-error">Vendedor é obrigatório</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="contato_telefone" class="required">Contato:</label>
                            <input type="tel" id="contato_telefone" name="contato_telefone" required pattern="\\(\\d{2}\\) \\d{5}-\\d{4}" placeholder="(00) 00000-0000" inputmode="numeric">
                            <div class="error-message" id="contato_telefone-error">Contato deve estar no formato (00) 00000-0000</div>
                        </div>
                        <div class="form-group">
                            <label for="taxa_telefone" class="required">Taxa:</label>
                            <input type="text" id="taxa_telefone" name="taxa_telefone" required placeholder="R$ 0,00" inputmode="decimal">
                            <div class="error-message" id="taxa_telefone-error">Taxa é obrigatória</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="id_caixa_telefone">ID Caixa:</label>
                            <input type="text" id="id_caixa_telefone" name="id_caixa_telefone" minlength="2" maxlength="50">
                            <div class="error-message" id="id_caixa_telefone-error">ID da Caixa deve ter pelo menos 2 caracteres</div>
                        </div>
                        <div class="form-group">
                            <label for="operadora_telefone">Operadora:</label>
                            <input type="text" id="operadora_telefone" name="operadora_telefone" minlength="2" maxlength="50">
                            <div class="error-message" id="operadora_telefone-error">Operadora deve ter pelo menos 2 caracteres</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="fidelidade_telefone" class="required">Fidelidade:</label>
                            <select id="fidelidade_telefone" name="fidelidade_telefone" required>
                                <option value="">Selecione</option>
                                <option value="Sim">Sim</option>
                                <option value="Não">Não</option>
                            </select>
                            <div class="error-message" id="fidelidade_telefone-error">Selecione uma opção</div>
                        </div>
                        <div class="form-group">
                            <label for="portabilidade_telefone" class="required">Portabilidade:</label>
                            <select id="portabilidade_telefone" name="portabilidade_telefone" required>
                                <option value="">Selecione</option>
                                <option value="Sim">Sim</option>
                                <option value="Não">Não</option>
                            </select>
                            <div class="error-message" id="portabilidade_telefone-error">Selecione uma opção</div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="observacao_telefone">Observação:</label>
                        <textarea id="observacao_telefone" name="observacao_telefone" maxlength="500" placeholder="Digite observações adicionais aqui..."></textarea>
                    </div>
                </div>
                
                <!-- Boleto -->
                <div id="boleto" class="form-section">
                    <div class="section-title">Dados da Empresa</div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="razao_social_boleto" class="required">Razão Social:</label>
                            <input type="text" id="razao_social_boleto" name="razao_social_boleto" required minlength="3" maxlength="200">
                            <div class="error-message" id="razao_social_boleto-error">Razão Social deve ter pelo menos 3 caracteres</div>
                        </div>
                        <div class="form-group">
                            <label for="nome_fantasia_boleto">Nome Fantasia:</label>
                            <input type="text" id="nome_fantasia_boleto" name="nome_fantasia_boleto" minlength="3" maxlength="200">
                            <div class="error-message" id="nome_fantasia_boleto-error">Nome Fantasia deve ter pelo menos 3 caracteres</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="cnpj_boleto" class="required">CNPJ:</label>
                            <input type="text" id="cnpj_boleto" name="cnpj_boleto" required pattern="\\d{2}\\.\\d{3}\\.\\d{3}/\\d{4}-\\d{2}" placeholder="00.000.000/0000-00" inputmode="numeric">
                            <div class="error-message" id="cnpj_boleto-error">CNPJ deve estar no formato 00.000.000/0000-00</div>
                        </div>
                        <div class="form-group">
                            <label for="inscricao_estadual_boleto">Inscrição Estadual:</label>
                            <input type="text" id="inscricao_estadual_boleto" name="inscricao_estadual_boleto" minlength="3" maxlength="50">
                            <div class="error-message" id="inscricao_estadual_boleto-error">Inscrição Estadual deve ter pelo menos 3 caracteres</div>
                        </div>
                    </div>
                    
                    <div class="section-title">Endereço da Empresa</div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="cep_boleto" class="required">CEP:</label>
                            <input type="text" id="cep_boleto" name="cep_boleto" required pattern="\\d{5}-\\d{3}" placeholder="00000-000" inputmode="numeric">
                            <div class="error-message" id="cep_boleto-error">CEP deve estar no formato 00000-000</div>
                        </div>
                        <div class="form-group">
                            <label for="numero_boleto" class="required">Número:</label>
                            <input type="text" id="numero_boleto" name="numero_boleto" required minlength="1" maxlength="10">
                            <div class="error-message" id="numero_boleto-error">Número é obrigatório</div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <button type="button" class="gps-button" id="gps_button_boleto">📍 Usar GPS para preencher endereço</button>
                        <div id="loading_boleto" class="loading">Buscando endereço...</div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="endereco_boleto" class="required">Endereço:</label>
                            <input type="text" id="endereco_boleto" name="endereco_boleto" required minlength="5" maxlength="200">
                            <div class="error-message" id="endereco_boleto-error">Endereço é obrigatório</div>
                        </div>
                        <div class="form-group">
                            <label for="bairro_boleto" class="required">Bairro:</label>
                            <input type="text" id="bairro_boleto" name="bairro_boleto" required minlength="2" maxlength="100">
                            <div class="error-message" id="bairro_boleto-error">Bairro é obrigatório</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="cidade_boleto" class="required">Cidade:</label>
                            <input type="text" id="cidade_boleto" name="cidade_boleto" required minlength="2" maxlength="100">
                            <div class="error-message" id="cidade_boleto-error">Cidade é obrigatória</div>
                        </div>
                        <div class="form-group">
                            <label for="ponto_referencia_boleto">Ponto de Referência:</label>
                            <input type="text" id="ponto_referencia_boleto" name="ponto_referencia_boleto" maxlength="200">
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="coordenadas_boleto">Coordenadas:</label>
                            <input type="text" id="coordenadas_boleto" name="coordenadas_boleto" readonly>
                        </div>
                        <div class="form-group">
                            <label for="localizacao_mapa_boleto">Localização (Link do Mapa):</label>
                            <div style="display: flex; gap: 10px; align-items: center;">
                                <input type="text" id="localizacao_mapa_boleto" name="localizacao_mapa_boleto" readonly style="flex: 1;">
                                <a href="#" id="map_link_boleto" class="map-link" target="_blank" style="display: none;">🗺️ Abrir Mapa</a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="section-title">Informações de Contato</div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="email_boleto" class="required">E-mail:</label>
                            <input type="email" id="email_boleto" name="email_boleto" required>
                            <div class="error-message" id="email_boleto-error">E-mail deve ser válido</div>
                        </div>
                        <div class="form-group">
                            <label for="telefone_principal_boleto" class="required">Telefone Principal:</label>
                            <input type="tel" id="telefone_principal_boleto" name="telefone_principal_boleto" required pattern="\\(\\d{2}\\) \\d{5}-\\d{4}" placeholder="(00) 00000-0000" inputmode="numeric">
                            <div class="error-message" id="telefone_principal_boleto-error">Telefone deve estar no formato (00) 00000-0000</div>
                            <div class="whatsapp-confirm" id="whatsapp_confirm_boleto" style="display: none;">
                                <p style="margin: 0 0 8px 0; font-size: 14px;">Este número é do WhatsApp?</p>
                                <div class="whatsapp-buttons">
                                    <button type="button" class="whatsapp-btn whatsapp-yes" onclick="copyToWhatsApp(true, true)">Sim</button>
                                    <button type="button" class="whatsapp-btn whatsapp-no" onclick="copyToWhatsApp(false, true)">Não</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="whatsapp_principal_boleto" class="required">WhatsApp Principal:</label>
                            <input type="tel" id="whatsapp_principal_boleto" name="whatsapp_principal_boleto" required pattern="\\(\\d{2}\\) \\d{5}-\\d{4}" placeholder="(00) 00000-0000" inputmode="numeric">
                            <div class="error-message" id="whatsapp_principal_boleto-error">WhatsApp deve estar no formato (00) 00000-0000</div>
                        </div>
                        <div class="form-group">
                            <label for="telefone_secundario_boleto">Telefone Secundário:</label>
                            <input type="tel" id="telefone_secundario_boleto" name="telefone_secundario_boleto" pattern="\\(\\d{2}\\) \\d{5}-\\d{4}" placeholder="(00) 00000-0000" inputmode="numeric">
                            <div class="error-message" id="telefone_secundario_boleto-error">Telefone deve estar no formato (00) 00000-0000</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="whatsapp_secundario_boleto">WhatsApp Secundário:</label>
                            <input type="tel" id="whatsapp_secundario_boleto" name="whatsapp_secundario_boleto" pattern="\\(\\d{2}\\) \\d{5}-\\d{4}" placeholder="(00) 00000-0000" inputmode="numeric">
                            <div class="error-message" id="whatsapp_secundario_boleto-error">WhatsApp deve estar no formato (00) 00000-0000</div>
                        </div>
                        <div class="form-group">
                            <label for="plano_boleto" class="required">Plano:</label>
                            <select id="plano_boleto" name="plano_boleto" required>
                                <option value="">Selecione</option>
                                <option value="600MB de Internet + Fixo - R$ 139,80">600MB de Internet + Fixo - R$ 139,80</option>
                                <option value="900MB de Internet + Fixo - R$ 189,80">900MB de Internet + Fixo - R$ 189,80</option>
                            </select>
                            <div class="error-message" id="plano_boleto-error">Selecione um plano</div>
                        </div>
                    </div>
                    
                    <div class="section-title">Dados do Contratante</div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="nome_contratante_boleto" class="required">Nome do Contratante:</label>
                            <input type="text" id="nome_contratante_boleto" name="nome_contratante_boleto" required minlength="3" maxlength="100">
                            <div class="error-message" id="nome_contratante_boleto-error">Nome do Contratante deve ter pelo menos 3 caracteres</div>
                        </div>
                        <div class="form-group">
                            <label for="cpf_contratante_boleto" class="required">CPF:</label>
                            <input type="text" id="cpf_contratante_boleto" name="cpf_contratante_boleto" required pattern="\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}" placeholder="000.000.000-00" inputmode="numeric">
                            <div class="error-message" id="cpf_contratante_boleto-error">CPF deve estar no formato 000.000.000-00</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="cargo_contratante_boleto" class="required">Cargo do Contratante:</label>
                            <select id="cargo_contratante_boleto" name="cargo_contratante_boleto" required>
                                <option value="">Selecione o cargo</option>
                            </select>
                            <div class="error-message" id="cargo_contratante_boleto-error">Selecione um cargo</div>
                            <div class="cargo-instruction" id="cargo_instruction_boleto">O cargo será filtrado automaticamente com base no tipo de instituição</div>
                        </div>
                        <div class="form-group">
                            <label for="vendedor_boleto" class="required">Vendedor:</label>
                            <input type="text" id="vendedor_boleto" name="vendedor_boleto" required minlength="2" maxlength="100">
                            <div class="error-message" id="vendedor_boleto-error">Vendedor é obrigatório</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="id_caixa_boleto">ID da Caixa:</label>
                            <input type="text" id="id_caixa_boleto" name="id_caixa_boleto" minlength="2" maxlength="50">
                            <div class="error-message" id="id_caixa_boleto-error">ID da Caixa deve ter pelo menos 2 caracteres</div>
                        </div>
                        <div class="form-group">
                            <label for="inserir_rede_mesh_boleto" class="required">Inserir Rede Mesh:</label>
                            <select id="inserir_rede_mesh_boleto" name="inserir_rede_mesh_boleto" required>
                                <option value="">Selecione</option>
                                <option value="Sim">Sim</option>
                                <option value="Não">Não</option>
                            </select>
                            <div class="error-message" id="inserir_rede_mesh_boleto-error">Selecione uma opção</div>
                        </div>
                    </div>
                    
                    <div class="section-title">Informações de Cobrança</div>
                    
                    <div class="form-group">
                        <label for="vencimento_boleto" class="required">Vencimento:</label>
                        <select id="vencimento_boleto" name="vencimento_boleto" required>
                            <option value="">Selecione o dia</option>
                            <option value="01">Dia 01</option>
                            <option value="05">Dia 05</option>
                            <option value="08">Dia 08</option>
                            <option value="10">Dia 10</option>
                            <option value="12">Dia 12</option>
                            <option value="15">Dia 15</option>
                            <option value="20">Dia 20</option>
                        </select>
                        <div class="error-message" id="vencimento_boleto-error">Vencimento é obrigatório</div>
                    </div>
                    
                    <div class="section-title">Formulário do Telefone Fixo</div>
                    
                    <div class="form-group">
                        <button type="button" class="autofill-button" onclick="autofillTelefoneFixo('boleto')">🔄 Preencher com informações da Empresa</button>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="cliente_telefone_boleto" class="required">Cliente:</label>
                            <input type="text" id="cliente_telefone_boleto" name="cliente_telefone_boleto" required minlength="3" maxlength="100">
                            <div class="error-message" id="cliente_telefone_boleto-error">Nome do cliente é obrigatório</div>
                        </div>
                        <div class="form-group">
                            <label for="cpf_telefone_boleto" class="required">CPF:</label>
                            <input type="text" id="cpf_telefone_boleto" name="cpf_telefone_boleto" required pattern="\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}" placeholder="000.000.000-00" inputmode="numeric">
                            <div class="error-message" id="cpf_telefone_boleto-error">CPF deve estar no formato 000.000.000-00</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="cidade_telefone_boleto" class="required">Cidade:</label>
                            <input type="text" id="cidade_telefone_boleto" name="cidade_telefone_boleto" required minlength="2" maxlength="100">
                            <div class="error-message" id="cidade_telefone_boleto-error">Cidade é obrigatória</div>
                        </div>
                        <div class="form-group">
                            <label for="bairro_telefone_boleto" class="required">Bairro:</label>
                            <input type="text" id="bairro_telefone_boleto" name="bairro_telefone_boleto" required minlength="2" maxlength="100">
                            <div class="error-message" id="bairro_telefone_boleto-error">Bairro é obrigatório</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="numero_endereco_telefone_boleto" class="required">Número:</label>
                            <input type="text" id="numero_endereco_telefone_boleto" name="numero_endereco_telefone_boleto" required minlength="1" maxlength="10">
                            <div class="error-message" id="numero_endereco_telefone_boleto-error">Número é obrigatório</div>
                        </div>
                        <div class="form-group">
                            <label for="vendedor_telefone_boleto" class="required">Vendedor:</label>
                            <input type="text" id="vendedor_telefone_boleto" name="vendedor_telefone_boleto" required minlength="2" maxlength="100">
                            <div class="error-message" id="vendedor_telefone_boleto-error">Vendedor é obrigatório</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="contato_telefone_boleto" class="required">Contato:</label>
                            <input type="tel" id="contato_telefone_boleto" name="contato_telefone_boleto" required pattern="\\(\\d{2}\\) \\d{5}-\\d{4}" placeholder="(00) 00000-0000" inputmode="numeric">
                            <div class="error-message" id="contato_telefone_boleto-error">Contato deve estar no formato (00) 00000-0000</div>
                        </div>
                        <div class="form-group">
                            <label for="taxa_telefone_boleto" class="required">Taxa de Instalação:</label>
                            <input type="text" id="taxa_telefone_boleto" name="taxa_telefone_boleto" required placeholder="R$ 0,00" inputmode="decimal">
                            <div class="error-message" id="taxa_telefone_boleto-error">Taxa é obrigatória</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="id_caixa_telefone_boleto">ID Caixa:</label>
                            <input type="text" id="id_caixa_telefone_boleto" name="id_caixa_telefone_boleto" minlength="2" maxlength="50">
                            <div class="error-message" id="id_caixa_telefone_boleto-error">ID da Caixa deve ter pelo menos 2 caracteres</div>
                        </div>
                        <div class="form-group">
                            <label for="operadora_telefone_boleto">Operadora:</label>
                            <input type="text" id="operadora_telefone_boleto" name="operadora_telefone_boleto" minlength="2" maxlength="50">
                            <div class="error-message" id="operadora_telefone_boleto-error">Operadora deve ter pelo menos 2 caracteres</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="fidelidade_telefone_boleto" class="required">FIDELIDADE:</label>
                            <select id="fidelidade_telefone_boleto" name="fidelidade_telefone_boleto" required>
                                <option value="">Selecione</option>
                                <option value="Sim">Sim</option>
                                <option value="Não">Não</option>
                            </select>
                            <div class="error-message" id="fidelidade_telefone_boleto-error">Selecione uma opção</div>
                        </div>
                        <div class="form-group">
                            <label for="portabilidade_telefone_boleto" class="required">Portabilidade:</label>
                            <select id="portabilidade_telefone_boleto" name="portabilidade_telefone_boleto" required>
                                <option value="">Selecione</option>
                                <option value="Sim">Sim</option>
                                <option value="Não">Não</option>
                            </select>
                            <div class="error-message" id="portabilidade_telefone_boleto-error">Selecione uma opção</div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="observacao_telefone_boleto">Observação:</label>
                        <textarea id="observacao_telefone_boleto" name="observacao_telefone_boleto" maxlength="500" placeholder="Digite observações adicionais aqui..."></textarea>
                    </div>
                </div>
                
                <div class="success-message" id="successMessage">✅ Dados copiados com sucesso! Agora você pode colar no WhatsApp.</div>
                
                <div class="action-buttons">
                    <button type="button" class="copy-btn" id="copyButton">📋 Copiar</button>
                    <button type="button" class="save-btn" id="saveButton">💾 Salvar PDF</button>
                    <button type="button" class="clear-btn" id="clearButton">🗑️ Limpar Formulário</button>
                </div>
            </form>
        </div>
    `,

    // ========================================
    // PJ - SOMENTE TELEFONE
    // ========================================
    'pj-telefone': `
        <div class="container formulario-container">
            <div class="logo">
                <img src="https://i.imgur.com/SEr4lkm.png" alt="Logomarca">
            </div>
            
            <h1>Abertura de Chamados PJ - Telefone Fixo</h1>
            
            <div class="payment-options">
                <div class="payment-option active" data-target="debito">Débito em Conta</div>
                <div class="payment-option" data-target="boleto">Boleto</div>
            </div>
            
            <form id="chamadoForm">
                <!-- Débito em Conta -->
                <div id="debito" class="form-section active">
                    <div class="section-title">Dados da Empresa</div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="razao_social" class="required">Razão Social:</label>
                            <input type="text" id="razao_social" name="razao_social" required minlength="3" maxlength="200">
                            <div class="error-message" id="razao_social-error">Razão social deve ter pelo menos 3 caracteres</div>
                        </div>
                        <div class="form-group">
                            <label for="nome_fantasia">Nome Fantasia:</label>
                            <input type="text" id="nome_fantasia" name="nome_fantasia" maxlength="200">
                            <div class="error-message" id="nome_fantasia-error">Nome fantasia deve ter pelo menos 2 caracteres</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="cnpj" class="required">CNPJ:</label>
                            <input type="text" id="cnpj" name="cnpj" required pattern="\\d{2}\\.\\d{3}\\.\\d{3}/\\d{4}-\\d{2}" placeholder="00.000.000/0000-00" inputmode="numeric">
                            <div class="error-message" id="cnpj-error">CNPJ deve estar no formato 00.000.000/0000-00</div>
                        </div>
                        <div class="form-group">
                            <label for="inscricao_estadual">Inscrição Estadual:</label>
                            <input type="text" id="inscricao_estadual" name="inscricao_estadual" maxlength="20">
                            <div class="error-message" id="inscricao_estadual-error">Inscrição estadual deve ter no máximo 20 caracteres</div>
                        </div>
                    </div>
                    
                    <div class="section-title">Endereço da Empresa</div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="cep" class="required">CEP:</label>
                            <input type="text" id="cep" name="cep" required pattern="\\d{5}-\\d{3}" placeholder="00000-000" inputmode="numeric">
                            <div class="error-message" id="cep-error">CEP deve estar no formato 00000-000</div>
                        </div>
                        <div class="form-group">
                            <label for="numero" class="required">Número:</label>
                            <input type="text" id="numero" name="numero" required minlength="1" maxlength="10">
                            <div class="error-message" id="numero-error">Número é obrigatório</div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <button type="button" class="gps-button" id="gps_button">📍 Usar GPS para preencher endereço</button>
                        <div id="loading" class="loading">Buscando endereço...</div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="endereco" class="required">Endereço:</label>
                            <input type="text" id="endereco" name="endereco" required minlength="5" maxlength="200">
                            <div class="error-message" id="endereco-error">Endereço é obrigatório</div>
                        </div>
                        <div class="form-group">
                            <label for="bairro" class="required">Bairro:</label>
                            <input type="text" id="bairro" name="bairro" required minlength="2" maxlength="100">
                            <div class="error-message" id="bairro-error">Bairro é obrigatório</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="cidade" class="required">Cidade:</label>
                            <input type="text" id="cidade" name="cidade" required minlength="2" maxlength="100">
                            <div class="error-message" id="cidade-error">Cidade é obrigatória</div>
                        </div>
                        <div class="form-group">
                            <label for="ponto_referencia">Ponto de Referência:</label>
                            <input type="text" id="ponto_referencia" name="ponto_referencia" maxlength="200">
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="coordenadas">Coordenadas:</label>
                            <input type="text" id="coordenadas" name="coordenadas" readonly>
                        </div>
                        <div class="form-group">
                            <label for="localizacao_mapa">Localização (Link do Mapa):</label>
                            <div style="display: flex; gap: 10px; align-items: center;">
                                <input type="text" id="localizacao_mapa" name="localizacao_mapa" readonly style="flex: 1;">
                                <a href="#" id="map_link" class="map-link" target="_blank" style="display: none;">🗺️ Abrir Mapa</a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="section-title">Informações de Contato</div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="telefone_principal" class="required">Telefone Principal:</label>
                            <input type="tel" id="telefone_principal" name="telefone_principal" required pattern="\\(\\d{2}\\) \\d{5}-\\d{4}" placeholder="(00) 00000-0000" inputmode="numeric">
                            <div class="error-message" id="telefone_principal-error">Telefone deve estar no formato (00) 00000-0000</div>
                            <div class="whatsapp-confirm" id="whatsapp_confirm" style="display: none;">
                                <p style="margin: 0 0 8px 0; font-size: 14px;">Este número é do WhatsApp?</p>
                                <div class="whatsapp-buttons">
                                    <button type="button" class="whatsapp-btn whatsapp-yes" onclick="copyToWhatsApp(true, false)">Sim</button>
                                    <button type="button" class="whatsapp-btn whatsapp-no" onclick="copyToWhatsApp(false, false)">Não</button>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="whatsapp_principal" class="required">WhatsApp Principal:</label>
                            <input type="tel" id="whatsapp_principal" name="whatsapp_principal" required pattern="\\(\\d{2}\\) \\d{5}-\\d{4}" placeholder="(00) 00000-0000" inputmode="numeric">
                            <div class="error-message" id="whatsapp_principal-error">WhatsApp deve estar no formato (00) 00000-0000</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="telefone_secundario">Telefone Secundário:</label>
                            <input type="tel" id="telefone_secundario" name="telefone_secundario" pattern="\\(\\d{2}\\) \\d{5}-\\d{4}" placeholder="(00) 00000-0000" inputmode="numeric">
                            <div class="error-message" id="telefone_secundario-error">Telefone deve estar no formato (00) 00000-0000</div>
                        </div>
                        <div class="form-group">
                            <label for="whatsapp_secundario">WhatsApp Secundário:</label>
                            <input type="tel" id="whatsapp_secundario" name="whatsapp_secundario" pattern="\\(\\d{2}\\) \\d{5}-\\d{4}" placeholder="(00) 00000-0000" inputmode="numeric">
                            <div class="error-message" id="whatsapp_secundario-error">WhatsApp deve estar no formato (00) 00000-0000</div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="email" class="required">E-mail:</label>
                        <input type="email" id="email" name="email" required>
                        <div class="error-message" id="email-error">E-mail deve ser válido</div>
                    </div>
                    
                    <div class="section-title">Informações de Cobrança Banco do Brasil</div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="agencia" class="required">Agência:</label>
                            <input type="text" id="agencia" name="agencia" required minlength="3" maxlength="10" inputmode="numeric">
                            <div class="error-message" id="agencia-error">Agência é obrigatória</div>
                        </div>
                        <div class="form-group">
                            <label for="conta" class="required">Conta:</label>
                            <input type="text" id="conta" name="conta" required minlength="3" maxlength="15" inputmode="numeric">
                            <div class="error-message" id="conta-error">Conta é obrigatória</div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="vencimento_debito" class="required">Vencimento:</label>
                        <select id="vencimento_debito" name="vencimento_debito" required>
                            <option value="">Selecione o dia</option>
                            <option value="05">Dia 05</option>
                            <option value="10">Dia 10</option>
                            <option value="15">Dia 15</option>
                            <option value="20">Dia 20</option>
                            <option value="25">Dia 25</option>
                        </select>
                        <div class="error-message" id="vencimento_debito-error">Vencimento é obrigatório</div>
                    </div>
                    
                    <div class="section-title">Outros</div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="cliente_sem_fronteiras" class="required">Cliente Sem Fronteiras:</label>
                            <select id="cliente_sem_fronteiras" name="cliente_sem_fronteiras" required onchange="updatePlanoAndTaxa(false)">
                                <option value="">Selecione</option>
                                <option value="sim">Sim</option>
                                <option value="nao">Não</option>
                            </select>
                            <div class="error-message" id="cliente_sem_fronteiras-error">Selecione uma opção</div>
                        </div>
                        <div class="form-group">
                            <label for="plano" class="required">Plano:</label>
                            <select id="plano" name="plano" required>
                                <option value="">Selecione</option>
                                <option value="R$ 19,80">R$ 19,80 (Cliente Sem Fronteiras)</option>
                                <option value="R$ 39,80">R$ 39,80 (Não cliente)</option>
                                <option value="R$ 59,80">R$ 59,80 (Plano Empresarial)</option>
                                <option value="R$ 79,80">R$ 79,80 (Plano Corporativo)</option>
                            </select>
                            <div class="error-message" id="plano-error">Selecione um plano</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="taxa_instalacao" class="required">Taxa de Instalação:</label>
                            <input type="text" id="taxa_instalacao" name="taxa_instalacao" required placeholder="R$ 0,00" inputmode="decimal" readonly>
                            <div class="error-message" id="taxa_instalacao-error">Taxa de instalação é obrigatória</div>
                        </div>
                        <div class="form-group">
                            <label for="id_caixa">ID da Caixa:</label>
                            <input type="text" id="id_caixa" name="id_caixa" minlength="2" maxlength="50">
                            <div class="error-message" id="id_caixa-error">ID da Caixa deve ter pelo menos 2 caracteres</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="operadora">Operadora:</label>
                            <input type="text" id="operadora" name="operadora" minlength="2" maxlength="50">
                            <div class="error-message" id="operadora-error">Operadora deve ter pelo menos 2 caracteres</div>
                        </div>
                        <div class="form-group">
                            <label for="fidelidade" class="required">Fidelidade:</label>
                            <select id="fidelidade" name="fidelidade" required>
                                <option value="">Selecione</option>
                                <option value="sim">Sim</option>
                                <option value="nao">Não</option>
                            </select>
                            <div class="error-message" id="fidelidade-error">Selecione uma opção</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="portabilidade" class="required">Portabilidade:</label>
                            <select id="portabilidade" name="portabilidade" required>
                                <option value="">Selecione</option>
                                <option value="sim">Sim</option>
                                <option value="nao">Não</option>
                            </select>
                            <div class="error-message" id="portabilidade-error">Selecione uma opção</div>
                        </div>
                        <div class="form-group">
                            <label for="vendedor" class="required">Vendedor:</label>
                            <input type="text" id="vendedor" name="vendedor" required minlength="2" maxlength="100">
                            <div class="error-message" id="vendedor-error">Vendedor é obrigatório</div>
                        </div>
                    </div>
                    
                    <div class="section-title">Dados do Contratante</div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="nome_contratante" class="required">Nome do Contratante:</label>
                            <input type="text" id="nome_contratante" name="nome_contratante" required minlength="3" maxlength="100">
                            <div class="error-message" id="nome_contratante-error">Nome do contratante deve ter pelo menos 3 caracteres</div>
                        </div>
                        <div class="form-group">
                            <label for="cpf_contratante" class="required">CPF do Contratante:</label>
                            <input type="text" id="cpf_contratante" name="cpf_contratante" required pattern="\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}" placeholder="000.000.000-00" inputmode="numeric">
                            <div class="error-message" id="cpf_contratante-error">CPF deve estar no formato 000.000.000-00</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="cargo_contratante" class="required">Cargo do Contratante:</label>
                            <select id="cargo_contratante" name="cargo_contratante" required>
                                <option value="">Selecione o cargo</option>
                            </select>
                            <div class="error-message" id="cargo_contratante-error">Cargo do contratante é obrigatório</div>
                        </div>
                        <div class="form-group">
                            <label for="contato">Contato:</label>
                            <input type="text" id="contato" name="contato" minlength="2" maxlength="100">
                            <div class="error-message" id="contato-error">Contato deve ter pelo menos 2 caracteres</div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="observacoes">Observações:</label>
                        <textarea id="observacoes" name="observacoes" maxlength="500"></textarea>
                    </div>
                </div>
                
                <!-- Boleto -->
                <div id="boleto" class="form-section">
                    <div class="section-title">Dados da Empresa</div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="razao_social_boleto" class="required">Razão Social:</label>
                            <input type="text" id="razao_social_boleto" name="razao_social_boleto" required minlength="3" maxlength="200">
                            <div class="error-message" id="razao_social_boleto-error">Razão social deve ter pelo menos 3 caracteres</div>
                        </div>
                        <div class="form-group">
                            <label for="nome_fantasia_boleto">Nome Fantasia:</label>
                            <input type="text" id="nome_fantasia_boleto" name="nome_fantasia_boleto" maxlength="200">
                            <div class="error-message" id="nome_fantasia_boleto-error">Nome fantasia deve ter pelo menos 2 caracteres</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="cnpj_boleto" class="required">CNPJ:</label>
                            <input type="text" id="cnpj_boleto" name="cnpj_boleto" required pattern="\\d{2}\\.\\d{3}\\.\\d{3}/\\d{4}-\\d{2}" placeholder="00.000.000/0000-00" inputmode="numeric">
                            <div class="error-message" id="cnpj_boleto-error">CNPJ deve estar no formato 00.000.000/0000-00</div>
                        </div>
                        <div class="form-group">
                            <label for="inscricao_estadual_boleto">Inscrição Estadual:</label>
                            <input type="text" id="inscricao_estadual_boleto" name="inscricao_estadual_boleto" maxlength="20">
                            <div class="error-message" id="inscricao_estadual_boleto-error">Inscrição estadual deve ter no máximo 20 caracteres</div>
                        </div>
                    </div>
                    
                    <div class="section-title">Endereço da Empresa</div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="cep_boleto" class="required">CEP:</label>
                            <input type="text" id="cep_boleto" name="cep_boleto" required pattern="\\d{5}-\\d{3}" placeholder="00000-000" inputmode="numeric">
                            <div class="error-message" id="cep_boleto-error">CEP deve estar no formato 00000-000</div>
                        </div>
                        <div class="form-group">
                            <label for="numero_boleto" class="required">Número:</label>
                            <input type="text" id="numero_boleto" name="numero_boleto" required minlength="1" maxlength="10">
                            <div class="error-message" id="numero_boleto-error">Número é obrigatório</div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <button type="button" class="gps-button" id="gps_button_boleto">📍 Usar GPS para preencher endereço</button>
                        <div id="loading_boleto" class="loading">Buscando endereço...</div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="endereco_boleto" class="required">Endereço:</label>
                            <input type="text" id="endereco_boleto" name="endereco_boleto" required minlength="5" maxlength="200">
                            <div class="error-message" id="endereco_boleto-error">Endereço é obrigatório</div>
                        </div>
                        <div class="form-group">
                            <label for="bairro_boleto" class="required">Bairro:</label>
                            <input type="text" id="bairro_boleto" name="bairro_boleto" required minlength="2" maxlength="100">
                            <div class="error-message" id="bairro_boleto-error">Bairro é obrigatório</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="cidade_boleto" class="required">Cidade:</label>
                            <input type="text" id="cidade_boleto" name="cidade_boleto" required minlength="2" maxlength="100">
                            <div class="error-message" id="cidade_boleto-error">Cidade é obrigatória</div>
                        </div>
                        <div class="form-group">
                            <label for="ponto_referencia_boleto">Ponto de Referência:</label>
                            <input type="text" id="ponto_referencia_boleto" name="ponto_referencia_boleto" maxlength="200">
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="coordenadas_boleto">Coordenadas:</label>
                            <input type="text" id="coordenadas_boleto" name="coordenadas_boleto" readonly>
                        </div>
                        <div class="form-group">
                            <label for="localizacao_mapa_boleto">Localização (Link do Mapa):</label>
                            <div style="display: flex; gap: 10px; align-items: center;">
                                <input type="text" id="localizacao_mapa_boleto" name="localizacao_mapa_boleto" readonly style="flex: 1;">
                                <a href="#" id="map_link_boleto" class="map-link" target="_blank" style="display: none;">🗺️ Abrir Mapa</a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="section-title">Informações de Contato</div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="telefone_principal_boleto" class="required">Telefone Principal:</label>
                            <input type="tel" id="telefone_principal_boleto" name="telefone_principal_boleto" required pattern="\\(\\d{2}\\) \\d{5}-\\d{4}" placeholder="(00) 00000-0000" inputmode="numeric">
                            <div class="error-message" id="telefone_principal_boleto-error">Telefone deve estar no formato (00) 00000-0000</div>
                            <div class="whatsapp-confirm" id="whatsapp_confirm_boleto" style="display: none;">
                                <p style="margin: 0 0 8px 0; font-size: 14px;">Este número é do WhatsApp?</p>
                                <div class="whatsapp-buttons">
                                    <button type="button" class="whatsapp-btn whatsapp-yes" onclick="copyToWhatsApp(true, true)">Sim</button>
                                    <button type="button" class="whatsapp-btn whatsapp-no" onclick="copyToWhatsApp(false, true)">Não</button>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="whatsapp_principal_boleto" class="required">WhatsApp Principal:</label>
                            <input type="tel" id="whatsapp_principal_boleto" name="whatsapp_principal_boleto" required pattern="\\(\\d{2}\\) \\d{5}-\\d{4}" placeholder="(00) 00000-0000" inputmode="numeric">
                            <div class="error-message" id="whatsapp_principal_boleto-error">WhatsApp deve estar no formato (00) 00000-0000</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="telefone_secundario_boleto">Telefone Secundário:</label>
                            <input type="tel" id="telefone_secundario_boleto" name="telefone_secundario_boleto" pattern="\\(\\d{2}\\) \\d{5}-\\d{4}" placeholder="(00) 00000-0000" inputmode="numeric">
                            <div class="error-message" id="telefone_secundario_boleto-error">Telefone deve estar no formato (00) 00000-0000</div>
                        </div>
                        <div class="form-group">
                            <label for="whatsapp_secundario_boleto">WhatsApp Secundário:</label>
                            <input type="tel" id="whatsapp_secundario_boleto" name="whatsapp_secundario_boleto" pattern="\\(\\d{2}\\) \\d{5}-\\d{4}" placeholder="(00) 00000-0000" inputmode="numeric">
                            <div class="error-message" id="whatsapp_secundario_boleto-error">WhatsApp deve estar no formato (00) 00000-0000</div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="email_boleto" class="required">E-mail:</label>
                        <input type="email" id="email_boleto" name="email_boleto" required>
                        <div class="error-message" id="email_boleto-error">E-mail deve ser válido</div>
                    </div>
                    
                    <div class="section-title">Informações de Cobrança</div>
                    
                    <div class="form-group">
                        <label for="vencimento_boleto" class="required">Vencimento:</label>
                        <select id="vencimento_boleto" name="vencimento_boleto" required>
                            <option value="">Selecione o dia</option>
                            <option value="01">Dia 01</option>
                            <option value="05">Dia 05</option>
                            <option value="08">Dia 08</option>
                            <option value="10">Dia 10</option>
                            <option value="12">Dia 12</option>
                            <option value="15">Dia 15</option>
                            <option value="20">Dia 20</option>
                        </select>
                        <div class="error-message" id="vencimento_boleto-error">Vencimento é obrigatório</div>
                    </div>
                    
                    <div class="section-title">Outros</div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="cliente_sem_fronteiras_boleto" class="required">Cliente Sem Fronteiras:</label>
                            <select id="cliente_sem_fronteiras_boleto" name="cliente_sem_fronteiras_boleto" required onchange="updatePlanoAndTaxa(true)">
                                <option value="">Selecione</option>
                                <option value="sim">Sim</option>
                                <option value="nao">Não</option>
                            </select>
                            <div class="error-message" id="cliente_sem_fronteiras_boleto-error">Selecione uma opção</div>
                        </div>
                        <div class="form-group">
                            <label for="plano_boleto" class="required">Plano:</label>
                            <select id="plano_boleto" name="plano_boleto" required>
                                <option value="">Selecione</option>
                                <option value="R$ 19,80">R$ 19,80 (Cliente Sem Fronteiras)</option>
                                <option value="R$ 39,80">R$ 39,80 (Não cliente)</option>
                                <option value="R$ 59,80">R$ 59,80 (Plano Empresarial)</option>
                                <option value="R$ 79,80">R$ 79,80 (Plano Corporativo)</option>
                            </select>
                            <div class="error-message" id="plano_boleto-error">Selecione um plano</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="taxa_instalacao_boleto" class="required">Taxa de Instalação:</label>
                            <input type="text" id="taxa_instalacao_boleto" name="taxa_instalacao_boleto" required placeholder="R$ 0,00" inputmode="decimal" readonly>
                            <div class="error-message" id="taxa_instalacao_boleto-error">Taxa de instalação é obrigatória</div>
                        </div>
                        <div class="form-group">
                            <label for="id_caixa_boleto">ID da Caixa:</label>
                            <input type="text" id="id_caixa_boleto" name="id_caixa_boleto" minlength="2" maxlength="50">
                            <div class="error-message" id="id_caixa_boleto-error">ID da Caixa deve ter pelo menos 2 caracteres</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="operadora_boleto">Operadora:</label>
                            <input type="text" id="operadora_boleto" name="operadora_boleto" minlength="2" maxlength="50">
                            <div class="error-message" id="operadora_boleto-error">Operadora deve ter pelo menos 2 caracteres</div>
                        </div>
                        <div class="form-group">
                            <label for="fidelidade_boleto" class="required">Fidelidade:</label>
                            <select id="fidelidade_boleto" name="fidelidade_boleto" required>
                                <option value="">Selecione</option>
                                <option value="sim">Sim</option>
                                <option value="nao">Não</option>
                            </select>
                            <div class="error-message" id="fidelidade_boleto-error">Selecione uma opção</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="portabilidade_boleto" class="required">Portabilidade:</label>
                            <select id="portabilidade_boleto" name="portabilidade_boleto" required>
                                <option value="">Selecione</option>
                                <option value="sim">Sim</option>
                                <option value="nao">Não</option>
                            </select>
                            <div class="error-message" id="portabilidade_boleto-error">Selecione uma opção</div>
                        </div>
                        <div class="form-group">
                            <label for="vendedor_boleto" class="required">Vendedor:</label>
                            <input type="text" id="vendedor_boleto" name="vendedor_boleto" required minlength="2" maxlength="100">
                            <div class="error-message" id="vendedor_boleto-error">Vendedor é obrigatório</div>
                        </div>
                    </div>
                    
                    <div class="section-title">Dados do Contratante</div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="nome_contratante_boleto" class="required">Nome do Contratante:</label>
                            <input type="text" id="nome_contratante_boleto" name="nome_contratante_boleto" required minlength="3" maxlength="100">
                            <div class="error-message" id="nome_contratante_boleto-error">Nome do contratante deve ter pelo menos 3 caracteres</div>
                        </div>
                        <div class="form-group">
                            <label for="cpf_contratante_boleto" class="required">CPF do Contratante:</label>
                            <input type="text" id="cpf_contratante_boleto" name="cpf_contratante_boleto" required pattern="\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}" placeholder="000.000.000-00" inputmode="numeric">
                            <div class="error-message" id="cpf_contratante_boleto-error">CPF deve estar no formato 000.000.000-00</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="cargo_contratante_boleto" class="required">Cargo do Contratante:</label>
                            <select id="cargo_contratante_boleto" name="cargo_contratante_boleto" required>
                                <option value="">Selecione o cargo</option>
                            </select>
                            <div class="error-message" id="cargo_contratante_boleto-error">Cargo do contratante é obrigatório</div>
                        </div>
                        <div class="form-group">
                            <label for="contato_boleto">Contato:</label>
                            <input type="text" id="contato_boleto" name="contato_boleto" minlength="2" maxlength="100">
                            <div class="error-message" id="contato_boleto-error">Contato deve ter pelo menos 2 caracteres</div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="observacoes_boleto">Observações:</label>
                        <textarea id="observacoes_boleto" name="observacoes_boleto" maxlength="500"></textarea>
                    </div>
                </div>
                
                <div class="success-message" id="successMessage">✅ Dados copiados com sucesso! Agora você pode colar no WhatsApp.</div>
                
                <div class="action-buttons">
                    <button type="button" class="copy-btn" id="copyButton">📋 Copiar</button>
                    <button type="button" class="save-btn" id="saveButton">💾 Salvar PDF</button>
                    <button type="button" class="clear-btn" id="clearButton">🗑️ Limpar Formulário</button>
                </div>
            </form>
        </div>
    `
};