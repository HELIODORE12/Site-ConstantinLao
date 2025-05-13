// Script principal pour le portfolio de Constantin Lao

document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const menuToggle = document.querySelector('.menu-toggle');
    const navBar = document.querySelector('.nav-bar');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const backToTopBtn = document.querySelector('.back-to-top');
    const themeToggle = document.querySelector('.theme-toggle');
    const preloader = document.querySelector('.preloader');
    
    // Préchargeur
    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('fade-out');
        }, 500);
    });
    
    // Vérifier si un thème est stocké dans localStorage
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        // Mettre à jour l'icône du bouton de thème
        if (currentTheme === 'dark') {
            themeToggle.querySelector('i').classList.remove('fa-sun');
            themeToggle.querySelector('i').classList.add('fa-moon');
        }
    }
    
    // Fonction pour changer de thème
    function switchTheme() {
        const icon = themeToggle.querySelector('i');
        
        if (document.documentElement.getAttribute('data-theme') === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'dark');
        }
    }
    
    // Événement pour le bouton de changement de thème
    if (themeToggle) {
        themeToggle.addEventListener('click', switchTheme);
    }
    
    // Menu mobile toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navBar.classList.toggle('active');
            // Change l'icône du menu
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Fermer le menu mobile quand on clique sur un lien
    const navLinks = document.querySelectorAll('.nav-bar ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navBar.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    // Navigation active au scroll
    const sections = document.querySelectorAll('section');
    
    function setActiveNav() {
        let scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
        
        // Afficher/masquer le bouton "Retour en haut"
        if (scrollPosition > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    }
    
    window.addEventListener('scroll', setActiveNav);
    
    // Fonctionnalité du bouton "Retour en haut"
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Filtrage des projets
    if (filterBtns.length > 0 && projectCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Retirer la classe active de tous les boutons
                filterBtns.forEach(btn => btn.classList.remove('active'));
                // Ajouter la classe active au bouton cliqué
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                projectCards.forEach(card => {
                    if (filterValue === 'all') {
                        card.style.display = 'block';
                    } else {
                        if (card.getAttribute('data-category') === filterValue) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
    
    // Smooth scroll pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Validation du formulaire de contact
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Ne pas prévenir le comportement par défaut pour permettre à Formspree de traiter le formulaire
            // e.preventDefault();
            
            // Afficher un message de chargement
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.disabled = true;
            
            // Le formulaire sera soumis à Formspree
        });
    }
    
    // Validation du formulaire de newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                alert('Merci de vous être abonné à ma newsletter !');
                newsletterForm.reset();
            } else {
                alert('Veuillez entrer une adresse email valide.');
            }
        });
    }
    
    // Animation au défilement pour les éléments
    function revealOnScroll() {
        const elements = document.querySelectorAll('.about-content, .skills-content, .project-card, .contact-content');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('reveal');
            }
        });
    }
    
    // Ajouter la classe CSS pour l'animation
    const style = document.createElement('style');
    style.textContent = `
        .about-content, .skills-content, .project-card, .contact-content {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .reveal {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Déclencher l'animation au chargement de la page
    revealOnScroll();
    
    // Déclencher l'animation au scroll
    window.addEventListener('scroll', revealOnScroll);
    
    // Initialiser l'état du bouton "Retour en haut" au chargement
    setActiveNav();
    
    // Lazy loading des images pour améliorer les performances
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback pour les navigateurs qui ne supportent pas IntersectionObserver
            images.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
    }
    
    // Exécuter le lazy loading
    lazyLoadImages();
    
    // Protection contre la copie et l'inspection du code
    // Note: Ceci n'est pas une protection complète, juste une barrière légère
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });
    
    // Protection avancée contre les outils de développement
    (function() {
        function detectDevTools() {
            const widthThreshold = window.outerWidth - window.innerWidth > 160;
            const heightThreshold = window.outerHeight - window.innerHeight > 160;
            
            if (widthThreshold || heightThreshold) {
                document.body.innerHTML = '<div style="text-align:center;padding:50px;"><h1>Accès non autorisé</h1><p>L\'utilisation des outils de développement n\'est pas autorisée sur ce site.</p></div>';
            }
        }
        
        window.addEventListener('resize', detectDevTools);
        setInterval(detectDevTools, 1000);
    })();
    
    document.addEventListener('keydown', function(e) {
        // Ctrl+U (afficher le code source)
        if (e.ctrlKey && e.keyCode == 85) {
            e.preventDefault();
            window.location.href = 'fake-source.html';
            return false;
        }
        
        // Ctrl+Shift+I ou F12 (outils de développement)
        if ((e.ctrlKey && e.shiftKey && e.keyCode == 73) || e.keyCode == 123) {
            e.preventDefault();
            return false;
        }
        
        // Ctrl+Shift+C (inspecteur d'éléments)
        if (e.ctrlKey && e.shiftKey && e.keyCode == 67) {
            e.preventDefault();
            return false;
        }
        
        // Ctrl+S (enregistrer la page)
        if (e.ctrlKey && e.keyCode == 83) {
            e.preventDefault();
            return false;
        }
    });
});
