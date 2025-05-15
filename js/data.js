/**
 * Datos estáticos para el blog de Jorge Bravo
 * Este archivo contiene los datos de los write-ups y artículos del blog
 */

// Datos de los Write-ups
const writeupsData = [
    {
      title: "Dog",
      slug: "dog",
      description: "Explotación de un gestor de contenido Backdrop CMS con un repositorio Git expuesto, credenciales almacenadas y módulo inseguro",
      type: "writeup",
      provider: "hackthebox",
      difficulty: "easy",
      featured_image: "img/writeups/dog/dog.png",
      tags: ["Enumeración web", "Git", "Backdrop CMS", "Configuración insegura"],
      created_at: "2025-04-27T14:16:03.841Z",
      updated_at: "2025-04-27T14:27:53.644Z"
    },    
    {
      title: "Heal",
      slug: "heal",
      description: "Heal es una máquina enfocada en la explotación de vulnerabilidades en aplicaciones web Ruby on Rails, combinando técnicas de enumeración, explotación de LFI y escalada de privilegios para obtener acceso root. Ofrece un buen reto para practicar análisis de aplicaciones y explotación remota",
      type: "writeup",
      provider: "hackthebox",
      difficulty: "medium",
      featured_image: "img/writeups/heal/heal.png",
      tags: ["LFI", "Subdomain Enumeration", "Exposed Admin Panel", "Burp Suite Analysis"],
      created_at: "2025-05-15T14:16:03.841Z",
      updated_at: "2025-05-15T14:27:53.644Z"
    }
    // Aquí se pueden agregar más write-ups cuando estén disponibles
  ];
  
  // Datos de los Artículos
  const articlesData = [
    {
      title: "El auge de los ciberataques impulsados por IA generativa en 2025",
      slug: "el-auge-de-los-ataques-de-ia-generativa",
      description: "La inteligencia artificial generativa está revolucionando la forma en que se ejecutan los ciberataques. Desde phishing hasta malware polimórfico, analizamos su evolución, técnicas actuales y perspectivas futuras.",
      type: "blog",
      category: "ciberseguridad",
      featured_image: "img/articles/el-auge-de-los-ataques-con-ia-generativa/image.png",
      tags: ["ia generativa", "ciberseguridad", "seguridad empresarial", "phishing", "malware"],
      created_at: "2025-05-13T00:00:00.000Z",
      updated_at: "2025-05-13T14:33:31.318Z"
    },
    {
      title: "Cómo el Zero Trust está redefiniendo la seguridad empresarial en 2025",
      slug: "como-el-zero-trust-esta-redefiniendo-la-seguridad-empresarial-en-2025",
      description: "Análisis de la evolución del modelo Zero Trust y su impacto en la ciberseguridad empresarial actual",
      type: "blog",
      category: "ciberseguridad",
      featured_image: "img/articles/como-el-zero-trust-esta-redefiniendo-la-seguridad-empresarial-en-2025/zero-trust.jpg",
      tags: ["zero trust", "ciberseguridad", "ZTNA", "seguridad empresarial", "identidad digital"],
      created_at: "2025-04-26T10:51:30.266Z",
      updated_at: "2025-04-27T18:38:31.318Z"
    }
    // Aquí se pueden agregar más artículos cuando estén disponibles
  ];
  
  // Iconos para las categorías y proveedores
  const icons = {
    categories: {
      'ciberseguridad': '🛡️',
      'it': '💻',
      'ia': '🧠',
      'redes': '🌐',
      'programacion': '👨‍💻',
      'otros': '📝'
    },
    providers: {
      'hackthebox': '🧪',
      'tryhackme': '🔐',
      'vulnhub': '💻',
      'hackthissite': '🔓',
      'rootme': '🛡️'
    },
    difficulties: {
      'easy': 'Fácil',
      'medium': 'Media',
      'hard': 'Difícil',
      'insane': 'Insane'
    }
  };