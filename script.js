// Objeto con el contenido de cada página
const pages = {
    inicio: `
        <h2>Bienvenido al Panel</h2>
        <p>Este es tu panel de control principal. Usa el menú lateral para navegar entre las diferentes secciones.</p>
        <div class="info-grid">
            <div class="info-card">
                <h3>📊 Fácil de usar</h3>
                <p>Interfaz intuitiva y simple de navegar</p>
            </div>
            <div class="info-card">
                <h3>🎨 Diseño moderno</h3>
                <p>Colores agradables y responsive</p>
            </div>
            <div class="info-card">
                <h3>⚡ Rápido</h3>
                <p>Carga instantánea de contenido</p>
            </div>
            <div class="info-card">
                <h3>🔧 Personalizable</h3>
                <p>Fácil de adaptar a tus necesidades</p>
            </div>
        </div>
    `,
    configuracion: `
        <h2>Configuración</h2>
        <div class="settings-container">
            <div class="setting-group">
                <h3>Preferencias Generales</h3>
                <label class="checkbox-label">
                    <input type="checkbox" checked>
                    <span>Recibir notificaciones</span>
                </label>
                <label class="checkbox-label">
                    <input type="checkbox" checked>
                    <span>Modo oscuro</span>
                </label>
            </div>
            <div class="setting-group">
                <h3>Privacidad</h3>
                <label class="checkbox-label">
                    <input type="checkbox" checked>
                    <span>Perfil público</span>
                </label>
                <label class="checkbox-label">
                    <input type="checkbox">
                    <span>Compartir datos de actividad</span>
                </label>
            </div>
            <div class="setting-group">
                <h3>Seguridad</h3>
                <label class="checkbox-label">
                    <input type="checkbox" checked>
                    <span>Autenticación de dos factores</span>
                </label>
                <button class="btn-secondary">Cambiar Contraseña</button>
            </div>
            <button class="btn-primary">Guardar Cambios</button>
        </div>
    `,
    contacto: `
        <h2>Contacto</h2>
        <p>¿Tienes preguntas o sugerencias? Contáctanos usando el formulario a continuación.</p>
        <form class="contact-form">
            <div class="form-group">
                <label for="nombre">Nombre *</label>
                <input type="text" id="nombre" name="nombre" required>
            </div>
            <div class="form-group">
                <label for="email">Email *</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
                <label for="asunto">Asunto *</label>
                <input type="text" id="asunto" name="asunto" required>
            </div>
            <div class="form-group">
                <label for="mensaje">Mensaje *</label>
                <textarea id="mensaje" name="mensaje" rows="6" required></textarea>
            </div>
            <button type="submit" class="btn-primary">Enviar Mensaje</button>
        </form>
    `
};

// Obtener elementos del DOM
const navButtons = document.querySelectorAll('.nav-btn');
const contentArea = document.getElementById('content-area');

// Cargar contenido inicial
document.addEventListener('DOMContentLoaded', () => {
    loadContent('inicio');
});

// Event listeners para los botones de navegación
navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const contentId = btn.dataset.content;
        loadContent(contentId);

        // Actualizar estado activo
        navButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

// Función para cargar contenido
function loadContent(contentId) {
    const content = pages[contentId];
    
    // Si es viajeros, cargarlo desde archivo externo
    if (contentId === 'viajeros') {
        loadExternalContent('viajeros');
        return;
    }
    
    if (content) {
        // Efecto de fade out
        contentArea.style.animation = 'none';
        setTimeout(() => {
            contentArea.innerHTML = content;
            // Efecto de fade in
            contentArea.style.animation = 'fadeIn 0.3s ease-in';
            
            // Agregar event listeners a elementos dinámicos
            setupDynamicElements();
        }, 50);
    }
}

// Función para cargar contenido desde un archivo HTML externo
function loadExternalContent(filename) {
    fetch(`${filename}.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`No se pudo cargar ${filename}.html`);
            }
            return response.text();
        })
        .then(html => {
            // Extraer solo el contenido del body, sin las etiquetas HTML completas
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const bodyContent = doc.body.innerHTML;
            
            // Efecto de fade out
            contentArea.style.animation = 'none';
            setTimeout(() => {
                contentArea.innerHTML = bodyContent;
                // Efecto de fade in
                contentArea.style.animation = 'fadeIn 0.3s ease-in';
                
                // Ejecutar scripts dinámicos si existen
                const scripts = contentArea.querySelectorAll('script');
                scripts.forEach(script => {
                    const newScript = document.createElement('script');
                    newScript.textContent = script.textContent;
                    contentArea.appendChild(newScript);
                });
                
                // Agregar event listeners a elementos dinámicos
                setupDynamicElements();
            }, 50);
        })
        .catch(error => {
            contentArea.innerHTML = `<h2>Error</h2><p>No se pudo cargar el contenido: ${error.message}</p>`;
            console.error('Error al cargar contenido externo:', error);
        });
}

// Configurar event listeners para elementos dinámicos
function setupDynamicElements() {
    // Botón editar perfil
    const editBtn = document.querySelector('.btn-edit');
    if (editBtn) {
        editBtn.addEventListener('click', () => {
            alert('Función de editar perfil no implementada aún');
        });
    }

    // Botón guardar cambios
    const saveBtn = document.querySelector('.btn-primary');
    if (saveBtn && document.querySelector('.settings-container')) {
        saveBtn.addEventListener('click', () => {
            alert('Cambios guardados correctamente');
        });
    }

    // Formulario de contacto
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Mensaje enviado correctamente');
            contactForm.reset();
        });
    }
}
