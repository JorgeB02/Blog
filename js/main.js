/**
 * Funciones principales para el blog de Jorge Bravo
 * Este archivo contiene las funciones de manipulación del DOM y gestión de contenido
 */

// Manejo de la navegación móvil
document.addEventListener('DOMContentLoaded', () => {
    // Navegación móvil
    const menuToggle = document.querySelector('.menu-toggle');
    const navigation = document.getElementById('navigation');
  
    if (menuToggle && navigation) {
      menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navigation.classList.toggle('active');
        
        // Actualizar atributo ARIA
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
        menuToggle.setAttribute('aria-expanded', !isExpanded);
      });
    }
    
    // Resaltar código si hay bloques de código en la página
    if (typeof hljs !== 'undefined') {
      document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightElement(block);
      });
    }
    
    // Activar enlaces actuales
    activateCurrentNavLinks();
  });
  
  /**
   * Resaltar el enlace actual en la navegación
   */
  function activateCurrentNavLinks() {
    const currentPage = window.location.pathname.split('/').pop();
    
    // Eliminar 'active' de todos los enlaces
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
    });
    
    // Añadir 'active' al enlace correspondiente
    let activeLink;
  
    if (currentPage === '' || currentPage === 'index.html') {
      activeLink = document.querySelector('.nav-link[href="index.html"]');
    } else if (currentPage === 'writeups.html' || currentPage.includes('writeup-')) {
      activeLink = document.querySelector('.nav-link[href="writeups.html"]');
    } else if (currentPage === 'blog.html' || currentPage.includes('blog-')) {
      activeLink = document.querySelector('.nav-link[href="blog.html"]');
    } else if (currentPage === 'about.html') {
      activeLink = document.querySelector('.nav-link[href="about.html"]');
    }
  
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }
  
  /**
   * Cargar contenido reciente en la página de inicio
   * @param {string} contentType - Tipo de contenido ('articles' o 'writeups')
   * @param {string} containerId - ID del contenedor donde se cargará el contenido
   * @param {number} limit - Número máximo de elementos a mostrar
   */
  function loadRecentContent(contentType, containerId, limit) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Determinar qué datos cargar
    const data = contentType === 'articles' ? articlesData : writeupsData;
    
    // Ordenar por fecha (más reciente primero)
    const sortedData = [...data].sort((a, b) => 
      new Date(b.created_at) - new Date(a.created_at)
    );
    
    // Limitar al número especificado
    const limitedData = sortedData.slice(0, limit);
    
    // Limpiar contenedor
    container.innerHTML = '';
    
    // Si no hay datos, mostrar mensaje
    if (limitedData.length === 0) {
      container.innerHTML = `
        <div class="no-posts">
          <p>No hay ${contentType === 'articles' ? 'artículos' : 'write-ups'} disponibles todavía.</p>
        </div>
      `;
      return;
    }
    
    // Generar HTML para cada elemento
    limitedData.forEach(item => {
      let itemHtml = '';
      
      if (contentType === 'articles') {
        itemHtml = createArticleCardHtml(item);
      } else {
        itemHtml = createWriteupCardHtml(item);
      }
      
      container.innerHTML += itemHtml;
    });
    
    // Animar la entrada de las tarjetas
    setTimeout(() => {
      const cards = container.querySelectorAll('.post-card, .article-card, .writeup-card');
      cards.forEach((card, index) => {
        setTimeout(() => {
          card.style.opacity = '1';
        }, index * 100);
      });
    }, 100);
  }
  
  /**
   * Cargar todo el contenido en páginas de listado
   * @param {string} contentType - Tipo de contenido ('articles' o 'writeups')
   * @param {string} containerId - ID del contenedor donde se cargará el contenido
   */
  function loadAllContent(contentType, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Determinar qué datos cargar
    const data = contentType === 'articles' ? articlesData : writeupsData;
    
    // Ordenar por fecha (más reciente primero)
    const sortedData = [...data].sort((a, b) => 
      new Date(b.created_at) - new Date(a.created_at)
    );
    
    // Limpiar contenedor
    container.innerHTML = '';
    
    // Si no hay datos, mostrar mensaje
    if (sortedData.length === 0) {
      container.innerHTML = `
        <div class="${contentType === 'articles' ? 'no-articles' : 'no-writeups'}">
          <p>No hay ${contentType === 'articles' ? 'artículos' : 'write-ups'} disponibles todavía.</p>
        </div>
      `;
      return;
    }
    
    // Generar HTML para cada elemento
    sortedData.forEach(item => {
      let itemHtml = '';
      
      if (contentType === 'articles') {
        itemHtml = createArticleCardHtml(item, true);
      } else {
        itemHtml = createWriteupCardHtml(item, true);
      }
      
      container.innerHTML += itemHtml;
    });
    
    // Animar la entrada de las tarjetas
    setTimeout(() => {
      const cards = container.querySelectorAll('.article-card, .writeup-card');
      cards.forEach((card, index) => {
        setTimeout(() => {
          card.style.opacity = '1';
        }, index * 100);
      });
    }, 100);
  }
  
  /**
   * Filtrar contenido según criterios
   * @param {string} contentType - Tipo de contenido ('articles' o 'writeups')
   * @param {string} containerId - ID del contenedor donde se actualiza el contenido
   * @param {Object} filters - Criterios de filtrado
   */
  function filterContent(contentType, containerId, filters) {
    const container = document.getElementById(containerId);
    const noResults = document.getElementById('no-results');
    if (!container) return;
    
    // Determinar qué datos filtrar
    const data = contentType === 'articles' ? articlesData : writeupsData;
    
    // Aplicar filtros
    const filteredData = data.filter(item => {
      // Filtrar por categoría/provider
      if (filters.category && item.category !== filters.category) {
        return false;
      }
      
      if (filters.provider && item.provider !== filters.provider) {
        return false;
      }
      
      // Filtrar por dificultad (solo para writeups)
      if (filters.difficulty && item.difficulty !== filters.difficulty) {
        return false;
      }
      
      // Filtrar por búsqueda
      if (filters.search && filters.search.trim() !== '') {
        const searchTerm = filters.search.toLowerCase();
        const titleMatch = item.title.toLowerCase().includes(searchTerm);
        const descriptionMatch = item.description.toLowerCase().includes(searchTerm);
        const tagsMatch = item.tags.some(tag => tag.toLowerCase().includes(searchTerm));
        
        if (!titleMatch && !descriptionMatch && !tagsMatch) {
          return false;
        }
      }
      
      return true;
    });
    
    // Ordenar por fecha (más reciente primero)
    const sortedData = [...filteredData].sort((a, b) => 
      new Date(b.created_at) - new Date(a.created_at)
    );
    
    // Limpiar contenedor
    container.innerHTML = '';
    
    // Si no hay resultados, mostrar mensaje
    if (sortedData.length === 0) {
      if (noResults) noResults.style.display = 'block';
      return;
    } else {
      if (noResults) noResults.style.display = 'none';
    }
    
    // Generar HTML para cada elemento
    sortedData.forEach(item => {
      let itemHtml = '';
      
      if (contentType === 'articles') {
        itemHtml = createArticleCardHtml(item, true);
      } else {
        itemHtml = createWriteupCardHtml(item, true);
      }
      
      container.innerHTML += itemHtml;
    });
    
    // Animar la entrada de las tarjetas
    const cards = container.querySelectorAll('.article-card, .writeup-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = '1';
      }, index * 50); // Más rápido para filtrados
    });
  }
  
  /**
   * Crear HTML para una tarjeta de artículo
   * @param {Object} article - Datos del artículo
   * @param {boolean} includeDataAttributes - Si se deben incluir atributos data-* para filtrado
   * @returns {string} HTML de la tarjeta
   */
  function createArticleCardHtml(article, includeDataAttributes = false) {
    const formattedDate = formatDate(article.created_at);
    const iconEmoji = icons.categories[article.category] || '📝';
    
    // Preparar atributos data-* para filtrado si es necesario
    let dataAttributes = '';
    if (includeDataAttributes) {
      dataAttributes = `data-category="${article.category}" data-tags="${article.tags.join(',')}"`;
    }

    // Corregir la ruta del enlace para asegurar que apunte al HTML correcto
    const articleUrl = `blog/articulos/${article.slug}.html`;
    
    return `
      <article class="article-card" ${dataAttributes}>
        <a href="${articleUrl}" class="article-link">
          <div class="article-image">
            ${article.featured_image 
              ? `<img src="${article.featured_image}" alt="${article.title}" class="article-thumbnail">`
              : `<div class="article-thumbnail-default">${iconEmoji}</div>`
            }
          </div>
          
          <div class="article-content">
            <h2 class="article-title">${article.title}</h2>
            <p class="article-excerpt">${article.description || 'Sin descripción'}</p>
            
            <div class="article-meta">
              <span class="article-date">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px;">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                ${formattedDate}
              </span>
              <span class="category-badge category-${article.category}">${article.category}</span>
            </div>
            
            ${article.tags && article.tags.length > 0 ? `
              <div class="article-tags">
                ${article.tags.slice(0, 3).map(tag => `<span class="tag-badge">${tag}</span>`).join('')}
                ${article.tags.length > 3 ? `<span class="tag-badge tag-more">+${article.tags.length - 3}</span>` : ''}
              </div>
            ` : ''}
          </div>
        </a>
      </article>
    `;
  }
  
  /**
   * Crear HTML para una tarjeta de write-up
   * @param {Object} writeup - Datos del write-up
   * @param {boolean} includeDataAttributes - Si se deben incluir atributos data-* para filtrado
   * @returns {string} HTML de la tarjeta
   */
  function createWriteupCardHtml(writeup, includeDataAttributes = false) {
    const formattedDate = formatDate(writeup.created_at);
    const iconEmoji = icons.providers[writeup.provider] || '📝';
    const difficultyLabel = icons.difficulties[writeup.difficulty] || 'Media';
    
    // Preparar atributos data-* para filtrado si es necesario
    let dataAttributes = '';
    if (includeDataAttributes) {
      dataAttributes = `data-provider="${writeup.provider}" data-difficulty="${writeup.difficulty}" data-tags="${writeup.tags.join(',')}"`;
    }

    // Corregir la ruta del enlace para asegurar que apunte al HTML correcto
    const writeupUrl = `blog/writeups/${writeup.slug}.html`;
    
    return `
      <article class="writeup-card" ${dataAttributes}>
        <a href="${writeupUrl}" class="writeup-link">
          <div class="writeup-image">
            ${writeup.featured_image 
              ? `<img src="${writeup.featured_image}" alt="${writeup.title}" class="writeup-thumbnail">`
              : `<div class="writeup-thumbnail-default">${iconEmoji}</div>`
            }
            <span class="difficulty-badge difficulty-${writeup.difficulty || 'medium'}">
              ${difficultyLabel}
            </span>
          </div>
          
          <div class="writeup-content">
            <h2 class="writeup-title">${writeup.title}</h2>
            <p class="writeup-excerpt">${writeup.description || 'Sin descripción'}</p>
            
            <div class="writeup-meta">
              <span class="writeup-date">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 4px;">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                ${formattedDate}
              </span>
              <span class="provider-badge provider-${writeup.provider}">
                ${writeup.provider}
              </span>
            </div>
            
            ${writeup.tags && writeup.tags.length > 0 ? `
              <div class="writeup-tags">
                ${writeup.tags.slice(0, 3).map(tag => `<span class="tag-badge">${tag}</span>`).join('')}
                ${writeup.tags.length > 3 ? `<span class="tag-badge tag-more">+${writeup.tags.length - 3}</span>` : ''}
              </div>
            ` : ''}
          </div>
        </a>
      </article>
    `;
  }
  
  /**
   * Formatear fecha en formato legible
   * @param {string} dateString - Fecha en formato YYYY-MM-DD
   * @returns {string} Fecha formateada
   */
  function formatDate(dateString) {
    const date = new Date(dateString);
    
    // Opciones de formato
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    
    return date.toLocaleDateString('es-ES', options);
  }