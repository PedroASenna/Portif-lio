// Configuração da API
const API_CONFIG = {
    // Para desenvolvimento local
    local: '/api/register',
    // Para produção (altere para seu domínio)
    production: 'https://seudominio.com/api/register'
};

// Detectar ambiente
const isProduction = window.location.hostname !== 'localhost' && 
                    window.location.hostname !== '127.0.0.1' && 
                    !window.location.hostname.includes('192.168');

const API_URL = isProduction ? API_CONFIG.production : API_CONFIG.local;

// Inicialização quando o DOM carregar
document.addEventListener('DOMContentLoaded', function() {
    initAnimations();
    initFormHandlers();
    initSmoothScroll();
});

// Configurar animações de scroll
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observar todos os elementos com fade-in
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Configurar manipuladores do formulário
function initFormHandlers() {
    const form = document.getElementById('contactForm');
    const telefoneInput = document.getElementById('telefone');
    
    // Máscara para telefone
    telefoneInput.addEventListener('input', formatTelefone);
    
    // Envio do formulário
    form.addEventListener('submit', handleFormSubmit);
    
    // Validação em tempo real
    form.querySelectorAll('input[required]').forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

// Formatação do telefone
function formatTelefone(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length <= 11) {
        if (value.length === 11) {
            value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else if (value.length === 10) {
            value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
        } else if (value.length > 6) {
            value = value.replace(/(\d{2})(\d{4})(\d+)/, '($1) $2-$3');
        } else if (value.length > 2) {
            value = value.replace(/(\d{2})(\d+)/, '($1) $2');
        }
    }
    
    e.target.value = value;
}

// Validação de campo individual
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Remover erros anteriores
    clearFieldError(e);
    
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'Este campo é obrigatório');
        return false;
    }
    
    if (field.type === 'email' && value && !isValidEmail(value)) {
        showFieldError(field, 'Digite um email válido');
        return false;
    }
    
    if (field.name === 'telefone' && value && value.replace(/\D/g, '').length < 10) {
        showFieldError(field, 'Digite um telefone válido');
        return false;
    }
    
    return true;
}

// Limpar erro do campo
function clearFieldError(e) {
    const field = e.target;
    const errorElement = field.parentNode.querySelector('.field-error');
    
    if (errorElement) {
        errorElement.remove();
    }
    
    field.classList.remove('error');
}

// Mostrar erro no campo
function showFieldError(field, message) {
    field.classList.add('error');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.color = '#dc3545';
    errorElement.style.fontSize = '0.8rem';
    errorElement.style.marginTop = '0.25rem';
    
    field.parentNode.appendChild(errorElement);
}

// Validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Manipular envio do formulário
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    
    // Validar todos os campos
    let isValid = true;
    form.querySelectorAll('input[required]').forEach(input => {
        if (!validateField({target: input})) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        showMessage(errorMessage, 'Por favor, corrija os erros no formulário');
        return;
    }
    
    // Configurar estado de carregamento
    setLoadingState(submitBtn, true);
    hideMessages();
    
    try {
        // Preparar dados
        const data = {
            nome: form.nome.value,
            email: form.email.value,
            telefone: form.telefone.value,
            nascimento: form.nascimento.value,
            profissao: form.profissao.value,
            empresa: form.empresa.value,
            mensagem: form.mensagem.value
        };
        
        // Enviar requisição
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (response.ok && result.id) {
            showMessage(successMessage, '✅ Cadastro realizado com sucesso! Entraremos em contato em breve.');
            form.reset();
            
            // Scroll para a mensagem de sucesso
            successMessage.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
            
            // Opcional: enviar evento para Google Analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submit', {
                    'event_category': 'contact',
                    'event_label': 'portfolio_contact_form'
                });
            }
            
        } else {
            showMessage(errorMessage, result.error || 'Erro ao enviar formulário');
        }
        
    } catch (error) {
        console.error('Erro ao enviar formulário:', error);
        showMessage(errorMessage, 'Erro de conexão. Verifique sua internet e tente novamente.');
        
    } finally {
        setLoadingState(submitBtn, false);
    }
}

// Configurar estado de carregamento do botão
function setLoadingState(button, loading) {
    if (loading) {
        button.disabled = true;
        button.innerHTML = '<span class="loading"></span> Enviando...';
    } else {
        button.disabled = false;
        button.innerHTML = 'Enviar Solicitação';
    }
}

// Mostrar mensagem
function showMessage(element, message) {
    element.textContent = message;
    element.style.display = 'block';
    
    // Auto-hide após 5 segundos se for mensagem de sucesso
    if (element.classList.contains('success-message')) {
        setTimeout(() => {
            element.style.display = 'none';
        }, 5000);
    }
}

// Esconder mensagens
function hideMessages() {
    document.getElementById('successMessage').style.display = 'none';
    document.getElementById('errorMessage').style.display = 'none';
}

// Scroll suave para links internos
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80; // Offset para header fixo (se houver)
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Adicionar estilos CSS para erro de campo via JavaScript
function addErrorStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .form-group input.error,
        .form-group textarea.error,
        .form-group select.error {
            border-color: #dc3545 !important;
            background: #fff5f5 !important;
        }
        
        .field-error {
            color: #dc3545;
            font-size: 0.8rem;
            margin-top: 0.25rem;
        }
    `;
    document.head.appendChild(style);
}

// Adicionar os estilos quando a página carregar
addErrorStyles();

// Função para debug (remover em produção)
function debugFormData(data) {
    console.log('Dados do formulário:', data);
}

// Detector de conexão (opcional)
function checkConnection() {
    return navigator.onLine;
}

// Listener para mudanças de conexão
window.addEventListener('online', function() {
    console.log('Conexão restaurada');
});

window.addEventListener('offline', function() {
    console.log('Conexão perdida');
    showMessage(document.getElementById('errorMessage'), 
        'Sem conexão com a internet. Verifique sua conexão e tente novamente.');
});

// Prevenir envio duplo do formulário
let isSubmitting = false;

// Modificar a função handleFormSubmit para incluir proteção contra envio duplo
const originalHandleFormSubmit = handleFormSubmit;
handleFormSubmit = async function(e) {
    if (isSubmitting) {
        e.preventDefault();
        return;
    }
    
    isSubmitting = true;
    
    try {
        await originalHandleFormSubmit.call(this, e);
    } finally {
        // Permitir novo envio após 2 segundos
        setTimeout(() => {
            isSubmitting = false;
        }, 2000);
    }
};