// Función para abrir el modal con imagen
function openDemoModal(title, imageSrc) {
    const modal = document.getElementById('demoModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const errorMessage = document.getElementById('errorMessage');

    console.log("Abriendo modal:", title, "con imagen:", imageSrc);

    // Establecer el título
    modalTitle.textContent = title;

    // Ocultar mensaje de error previo
    errorMessage.style.display = 'none';
    modalImage.style.display = 'block';

    // Configurar eventos para la imagen
    modalImage.onerror = function() {
        console.error("Error al cargar la imagen:", imageSrc);
        this.style.display = 'none';
        errorMessage.style.display = 'block';
    };

    modalImage.onload = function() {
        console.log("Imagen cargada correctamente:", imageSrc);
        this.style.display = 'block';
        errorMessage.style.display = 'none';
    };

    // Establecer la fuente de la imagen
    modalImage.src = imageSrc;

    // Mostrar el modal con animación
    modal.style.display = 'block';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);

    // Evitar scroll del fondo
    document.body.style.overflow = 'hidden';
}

// Función para cerrar el modal
function closeModal() {
    const modal = document.getElementById('demoModal');
    modal.classList.remove('show');

    // Permitir scroll del fondo nuevamente
    document.body.style.overflow = '';

    // Ocultar modal después de la animación
    setTimeout(() => {
        if (!modal.classList.contains('show')) {
            modal.style.display = 'none';
        }
    }, 300);
}

// Configuración del hamburger menu
function toggleHamburger() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
}

// Configuración cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    console.log("Documento cargado, configurando eventos...");

    // Configurar botón de cierre del modal
    const closeButton = document.querySelector('.close-modal');
    const modal = document.getElementById('demoModal');

    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
        console.log("Botón de cierre configurado");
    }

    // Cerrar modal al hacer clic fuera del contenido
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Cerrar modal con la tecla Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // Configurar botones demo con data attributes
    const demoBtns = document.querySelectorAll('.demo-btn');
    
    demoBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const project = this.getAttribute('data-project');
            
            switch(project) {
                case 'nasa':
                    openDemoModal('APPNASA - Demo', 'QRNASA.jpg');
                    break;
                case 'pomodoro':
                    openDemoModal('Pomodoronacho - Demo', 'QRPOMODORO.jpg');
                    break;
                default:
                    console.log('Proyecto no configurado:', project);
            }
        });
    });

    // Configurar hamburger menu
    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', toggleHamburger);
    }

    // Cerrar menu móvil al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const hamburger = document.querySelector('.hamburger');
            const navLinksContainer = document.querySelector('.nav-links');
            
            if (hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinksContainer.classList.remove('active');
            }
        });
    });

    // Configurar formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener datos del formulario
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // Aquí puedes agregar la lógica para enviar el formulario
            console.log('Formulario enviado:', { name, email, message });
            
            // Mostrar mensaje de confirmación (puedes personalizarlo)
            alert('¡Gracias por tu mensaje! Te contactaré pronto.');
            
            // Limpiar formulario
            this.reset();
        });
    }

    console.log("Todos los eventos configurados correctamente");
});