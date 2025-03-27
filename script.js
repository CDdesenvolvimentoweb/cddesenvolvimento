// Variáveis globais
let observer;
let isMenuOpen = false;

// Função principal quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initPortfolioFilter();
    initHeroAnimation();
    initSmoothScroll();
    initFadeInAnimations();
    initContactForm();
    initNavbarScroll();
    initContactModal();
});

// Inicializa o menu mobile
function initMobileMenu() {
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    // Verificar tamanho da tela para mostrar ou esconder a navegação
    if (window.innerWidth > 768 && navLinks) {
        navLinks.style.display = 'flex';
        navLinks.style.opacity = '1';
        navLinks.style.transform = 'translateY(0)';
    }
    
    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            isMenuOpen = !isMenuOpen;
            if (isMenuOpen) {
                navLinks.style.display = 'flex';
                menuBtn.innerHTML = '<i class="fas fa-times"></i>';
                // Adiciona animação fade-in para os links
                setTimeout(() => {
                    navLinks.style.opacity = '1';
                    navLinks.style.transform = 'translateY(0)';
                }, 10);
            } else {
                navLinks.style.opacity = '0';
                navLinks.style.transform = 'translateY(-10px)';
                menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                // Remove display após a animação
                setTimeout(() => {
                    navLinks.style.display = 'none';
                }, 300);
            }
        });

        // Fecha o menu quando clicar em um link
        const navItems = document.querySelectorAll('.nav-links a');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                if (window.innerWidth <= 768 && isMenuOpen) {
                    isMenuOpen = false;
                    navLinks.style.opacity = '0';
                    navLinks.style.transform = 'translateY(-10px)';
                    menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    setTimeout(() => {
                        navLinks.style.display = 'none';
                    }, 300);
                }
            });
        });
    }

    // Adicionar estilos iniciais apenas para mobile
    if (navLinks) {
        navLinks.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        if (window.innerWidth <= 768) {
            navLinks.style.opacity = '0';
            navLinks.style.transform = 'translateY(-10px)';
        }
    }
}

// Inicializa o filtro de portfólio
function initPortfolioFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterBtns.length && portfolioItems.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove classe active de todos botões
                filterBtns.forEach(b => b.classList.remove('active'));
                
                // Adiciona classe active ao botão clicado
                btn.classList.add('active');
                
                // Obtém o filtro do botão clicado
                const filter = btn.getAttribute('data-filter');
                
                // Filtra os itens
                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        // Adiciona animação de fade-in com atraso para efeito cascata
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });

        // Garante que todos os itens estejam visíveis inicialmente
        portfolioItems.forEach(item => {
            item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        });
    }
}

// Inicializa a animação do hero
function initHeroAnimation() {
    const heroTitle = document.querySelector('.hero h1');
    const heroSubtitle = document.querySelector('.hero p');
    
    if (heroTitle && heroSubtitle) {
        // Configura atraso diferente para dispositivos móveis
        const isMobile = window.innerWidth <= 768;
        const titleDelay = isMobile ? 100 : 150;
        const subtitleDelay = isMobile ? 50 : 100;
        
        typeWriterEffect(heroTitle, titleDelay);
        
        // Inicia animação do subtítulo após o título
        setTimeout(() => {
            typeWriterEffect(heroSubtitle, subtitleDelay);
        }, heroTitle.textContent.length * titleDelay + 500);
    }
}

// Efeito de máquina de escrever
function typeWriterEffect(element, delay) {
    if (!element) return;
    
    const text = element.textContent;
    element.textContent = '';
    element.classList.add('typing');
    
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
            element.classList.remove('typing');
        }
    }, delay);
}

// Inicializa o scroll suave
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Ajusta o offset para a altura da navbar
                const offset = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Inicializa as animações de fade-in
function initFadeInAnimations() {
    const elementsToAnimate = document.querySelectorAll('.service-card, .portfolio-item, .about-content > div, .value-item, .about-values-grid > div');
    
    if (elementsToAnimate.length) {
        elementsToAnimate.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        // Usa Intersection Observer para detectar quando elementos estão visíveis
        observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    // Deixa de observar após animar
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 }); // 10% do elemento visível
        
        elementsToAnimate.forEach(element => {
            observer.observe(element);
        });
    }
}

// Inicializa o formulário de contato
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aqui você pode adicionar lógica para enviar o formulário via AJAX
            alert('Obrigado por entrar em contato! Retornaremos em breve.');
            contactForm.reset();
        });
    }
}

// Inicializa o efeito de scroll na navbar
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.08)';
            }
        });
    }
}

// Adiciona listener para redimensionamento da janela
window.addEventListener('resize', function() {
    const navLinks = document.querySelector('.nav-links');
    const menuBtn = document.querySelector('.menu-btn');
    
    // Restaura navegação quando a tela é redimensionada para desktop
    if (window.innerWidth > 768 && navLinks && menuBtn) {
        navLinks.style.display = 'flex';
        navLinks.style.opacity = '1';
        navLinks.style.transform = 'translateY(0)';
        isMenuOpen = false;
        menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    } else if (window.innerWidth <= 768 && navLinks && !isMenuOpen) {
        // Esconde a navegação em mobile se o menu não estiver aberto
        navLinks.style.display = 'none';
    }
    
    // Reinicia animação do hero para se ajustar ao tamanho da tela
    if (window.innerWidth <= 768) {
        const heroSpline = document.querySelector('.hero-spline-container');
        if (heroSpline) {
            heroSpline.style.opacity = '0.7';
        }
    } else {
        const heroSpline = document.querySelector('.hero-spline-container');
        if (heroSpline) {
            heroSpline.style.opacity = '0.9';
        }
    }
});

// Inicializa o modal de contato
function initContactModal() {
    const contactModal = document.getElementById('contact-modal');
    const projectModal = document.getElementById('project-modal');
    const closeContactBtn = document.querySelector('.close-modal');
    const closeProjectBtn = document.querySelector('.close-project-modal');
    const openModalButtons = document.querySelectorAll('.open-modal');
    const heroContactBtn = document.getElementById('contact-hero-btn');
    const describeProjectBtn = document.getElementById('describe-project-btn');
    const projectForm = document.querySelector('.project-form');
    
    // Abre o modal nos botões padrão com classe .open-modal
    openModalButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(contactModal);
        });
    });
    
    // Abre o modal no botão do hero section
    if (heroContactBtn) {
        heroContactBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(contactModal);
        });
    }
    
    // Fecha o modal quando clicar no X
    if (closeContactBtn) {
        closeContactBtn.addEventListener('click', () => closeModal(contactModal));
    }
    
    // Fecha o modal quando clicar fora dele
    window.addEventListener('click', function(e) {
        if (e.target == contactModal) {
            closeModal(contactModal);
        }
        if (e.target == projectModal) {
            closeModal(projectModal);
        }
    });
    
    // Fecha o modal com tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (contactModal.classList.contains('active')) {
                closeModal(contactModal);
            }
            if (projectModal.classList.contains('active')) {
                closeModal(projectModal);
            }
        }
    });
    
    // Abre o modal de descrição de projeto quando clicar no card
    if (describeProjectBtn) {
        describeProjectBtn.addEventListener('click', function(e) {
            e.preventDefault();
            closeModal(contactModal);
            
            // Pequeno atraso para garantir que o primeiro modal seja fechado
            setTimeout(() => {
                openModal(projectModal);
            }, 300);
        });
    }
    
    // Fecha o modal de projeto quando clicar no X
    if (closeProjectBtn) {
        closeProjectBtn.addEventListener('click', () => closeModal(projectModal));
    }
    
    // Processa o envio do formulário do projeto
    if (projectForm) {
        projectForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Coletar dados do formulário
            const projectName = document.getElementById('project-name').value;
            const projectType = document.getElementById('project-type').value;
            const projectDescription = document.getElementById('project-description').value;
            const projectContact = document.getElementById('project-contact').value;
            
            // Formatar a mensagem para o WhatsApp
            const projectTypeText = projectType ? 
                document.querySelector(`#project-type option[value="${projectType}"]`).textContent : 
                "Não especificado";
                
            let whatsappMessage = `*NOVO PROJETO*\n\n`;
            whatsappMessage += `*Nome do Projeto:* ${projectName}\n`;
            whatsappMessage += `*Tipo de Projeto:* ${projectTypeText}\n`;
            whatsappMessage += `*Descrição:* ${projectDescription}\n`;
            whatsappMessage += `*Contato:* ${projectContact}\n`;
            
            // Codificar a mensagem para URL
            const encodedMessage = encodeURIComponent(whatsappMessage);
            
            // Criar o link do WhatsApp (substitua o número pelo seu número de WhatsApp)
            const whatsappLink = `https://wa.me/5517999754390?text=${encodedMessage}`;
            
            // Mostrar mensagem de sucesso e redirecionar
            const submitButton = document.querySelector('.submit-project-btn');
            submitButton.disabled = true;
            submitButton.textContent = 'Enviando...';
            
            setTimeout(() => {
                // Limpar formulário
                projectForm.reset();
                
                // Mostrar mensagem rápida
                showRedirectMessage(projectForm, projectModal, whatsappLink);
                
                // Restaurar o botão
                submitButton.disabled = false;
                submitButton.textContent = 'Enviar Projeto';
            }, 1000);
        });
    }
    
    function openModal(modal) {
        document.body.style.overflow = 'hidden'; // Impede scroll da página
        modal.style.display = 'block';
        
        // Pequeno atraso para permitir que o modal seja exibido antes da animação
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
    }
    
    function closeModal(modal) {
        modal.classList.remove('active');
        
        // Aguarda a animação de fade-out terminar antes de ocultar completamente
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Restaura scroll da página
        }, 300);
    }
    
    function showRedirectMessage(form, modal, whatsappLink) {
        // Remove o formulário
        form.style.display = 'none';
        
        // Cria e mostra a mensagem de redirecionamento
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <h3>Projeto pronto para envio!</h3>
            <p>Clique no botão abaixo para enviar seu projeto diretamente pelo WhatsApp.</p>
            <a href="${whatsappLink}" target="_blank" class="submit-project-btn">Enviar via WhatsApp</a>
            <button class="submit-project-btn close-success-btn" style="background: #718096; margin-top: 10px;">Cancelar</button>
        `;
        
        // Adiciona ao modal
        modal.querySelector('.modal-content').appendChild(successDiv);
        
        // Mostra a mensagem
        successDiv.style.display = 'block';
        
        // Adiciona evento para o botão de fechar
        successDiv.querySelector('.close-success-btn').addEventListener('click', () => {
            // Fecha o modal
            closeModal(modal);
            
            // Limpa após fechar
            setTimeout(() => {
                form.style.display = 'flex';
                successDiv.remove();
            }, 300);
        });
    }
} 