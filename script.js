// Función mejorada para abrir el modal con manejo de errores de imagen
function openDemoModal(title, imageSrc) {
    const modal = document.getElementById('demoModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    
    console.log("Abriendo modal con imagen:", imageSrc);
    
    // Establecemos el título
    modalTitle.textContent = title;
    
    // Añadimos un manejador de error para la imagen
    modalImage.onerror = function() {
      console.error("Error al cargar la imagen:", imageSrc);
      // Mostramos un mensaje en el modal en lugar de la imagen
      this.style.display = 'none';
      const errorMsg = document.createElement('p');
      errorMsg.textContent = "La imagen no pudo cargarse. Por favor verifica la ruta: " + imageSrc;
      errorMsg.style.color = "red";
      this.parentNode.appendChild(errorMsg);
    };
    
    // Añadimos un evento para confirmar cuando la imagen se carga correctamente
    modalImage.onload = function() {
      console.log("Imagen cargada correctamente:", imageSrc);
      this.style.display = 'block';
    };
    
    // Establecemos la fuente de la imagen
    modalImage.src = imageSrc;
    
    // Mostramos el modal con animación
    modal.style.display = 'block';
    setTimeout(() => {
      modal.classList.add('show');
    }, 10);
    
    // Evitamos el desplazamiento del fondo
    document.body.style.overflow = 'hidden';
  }
  
  // Modificación de la configuración del botón de Pomodoro App
  document.addEventListener('DOMContentLoaded', function() {
    console.log("Documento cargado, configurando modal...");
    
    // Configuramos el cierre del modal
    const closeButton = document.querySelector('.close-modal');
    const modal = document.getElementById('demoModal');
    
    if (!closeButton) {
      console.error("No se encontró el botón de cierre del modal");
    } else {
      closeButton.addEventListener('click', closeModal);
      console.log("Botón de cierre configurado");
    }
    
    // También cerramos el modal al hacer clic fuera de su contenido
    window.addEventListener('click', function(event) {
      if (event.target === modal) {
        closeModal();
      }
    });
    
    // Configuramos el botón "Ver Demo" del Pomodoro App
    const projectCards = document.querySelectorAll('.project-card');
    console.log("Número de tarjetas de proyecto encontradas:", projectCards.length);
    
    if (projectCards.length >= 2) {
      const pomodoroProjectCard = projectCards[1]; // El segundo card (índice 1)
      const pomodoroViewDemoButton = pomodoroProjectCard.querySelector('.project-links a:first-child');
      
      if (!pomodoroViewDemoButton) {
        console.error("No se encontró el botón 'Ver Demo' en la tarjeta del Pomodoro App");
      } else {
        console.log("Configurando el botón 'Ver Demo' del Pomodoro App");
        
        pomodoroViewDemoButton.addEventListener('click', function(e) {
          e.preventDefault();
          
          // Prueba con una URL de imagen absoluta para verificar si el problema es la ruta
          // Puedes comentar esta línea y descomentar la siguiente para usar tu imagen local
          //openDemoModal('Pomodoro App Demo', 'https://expo.dev/preview/update?message=cambio%20iconos&updateRuntimeVersion=1.0.0&createdAt=2025-05-09T12%3A53%3A33.172Z&slug=exp&projectId=4778d827-d099-4da2-86e2-2afcb489052a&group=18f93c23-e31b-4532-820f-f5b24eb8b224');
          
          // Descomentar la siguiente línea y ajustar la ruta a tu imagen local
           openDemoModal('Pomodoronacho', 'QRPOMODORO.jpg');
          
          console.log("Botón 'Ver Demo' del Pomodoro App clickeado");
        });
      }
    } else {
      console.error("No se encontraron suficientes tarjetas de proyecto");
    }
  });
  
  // Importante mantener la función de cierre del modal
  function closeModal() {
    const modal = document.getElementById('demoModal');
    modal.classList.remove('show');
    
    // Permitimos el desplazamiento del fondo otra vez
    document.body.style.overflow = '';
    
    // Después de la animación, ocultamos completamente el modal
    setTimeout(() => {
      if (!modal.classList.contains('show')) {
        modal.style.display = 'none';
      }
    }, 300);
  }