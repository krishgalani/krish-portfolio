// ===================================
// Language Switching
// ===================================
(function() {
  const STORAGE_KEY = 'portfolio-lang';
  
  // Get all elements with data-en and data-zh
  const translatableElements = document.querySelectorAll('[data-en]');
  
  // Language toggle button
  const langToggle = document.getElementById('lang-toggle');
  
  // Current language
  let currentLang = localStorage.getItem(STORAGE_KEY) || 'en';
  
  // Initialize language
  function init() {
    // Set initial language
    setLanguage(currentLang);
    
    // Add click handler
    langToggle.addEventListener('click', toggleLanguage);
  }
  
  // Toggle language
  function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'zh' : 'en';
    localStorage.setItem(STORAGE_KEY, currentLang);
    setLanguage(currentLang);
  }
  
  // Set language
  function setLanguage(lang) {
    // Update HTML lang attribute
    document.documentElement.lang = lang === 'zh' ? 'zh' : 'en';
    
    // Update toggle button
    langToggle.textContent = lang === 'en' ? 'EN/中' : '中/EN';
    langToggle.setAttribute('aria-label', lang === 'en' ? 'Switch to Chinese' : '切換到英文');
    
    // Update all translatable elements
    translatableElements.forEach(el => {
      const text = el.getAttribute(`data-${lang}`);
      if (text) {
        if (el.children.length === 0 && el.childNodes.length <= 1) {
          el.textContent = text;
        } else {
          el.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
              node.textContent = text;
            }
          });
        }
      }
    });
    
    // Update section title styling (use pixel font for both languages)
    const sectionTitles = document.querySelectorAll('.section__title');
    sectionTitles.forEach(title => {
      title.style.fontFamily = 'var(--font-family-pixel)';
      title.style.letterSpacing = '0.05em';
    });
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

// ===================================
// Website Toggle
// ===================================
(function() {
  const toggleButtons = document.querySelectorAll('.websites-toggle__btn');
  const grids = document.querySelectorAll('.websites-grid');
  
  // Initialize: activate templates tab by default
  function initDefaultTab() {
    const templatesTab = document.querySelector('[data-category="templates"]');
    if (templatesTab) {
      templatesTab.click();
    }
  }
  
  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDefaultTab);
  } else {
    initDefaultTab();
  }
  
  toggleButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.getAttribute('data-category');
      
      // Update button states
      toggleButtons.forEach(btn => {
        btn.classList.remove('websites-toggle__btn--active');
        btn.setAttribute('aria-selected', 'false');
      });
      button.classList.add('websites-toggle__btn--active');
      button.setAttribute('aria-selected', 'true');
      
      // Show/hide grids with animation
      grids.forEach(grid => {
        if (grid.id === `websites-${category}`) {
          grid.removeAttribute('hidden');
          grid.offsetHeight;
          grid.classList.add('websites-grid--active');
        } else {
          grid.classList.remove('websites-grid--active');
          setTimeout(() => {
            if (!grid.classList.contains('websites-grid--active')) {
              grid.setAttribute('hidden', '');
            }
          }, 300);
        }
      });
    });
  });
})();

// ===================================
// Project Cards GitHub Fetch
// ===================================
(function() {
  const projectCards = document.querySelectorAll('.project-card[data-repo]');
  
  projectCards.forEach(card => {
    const repo = card.getAttribute('data-repo');
    const titleEl = card.querySelector('.project-card__title');
    const descEl = card.querySelector('.project-card__description');
    const linkEl = card.querySelector('.project-card__link');
    
    fetch(`https://api.github.com/repos/krishgalani/${repo}`)
      .then(response => {
        if (!response.ok) throw new Error('Not found');
        return response.json();
      })
      .then(data => {
        titleEl.textContent = data.name;
        descEl.textContent = data.description || 'No description available';
        linkEl.href = data.html_url;
      })
      .catch(error => {
        console.warn(`Could not fetch repo ${repo}:`, error);
      });
  });
})();