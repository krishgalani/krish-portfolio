/**
 * Websites Section Toggle Functionality
 * Handles switching between Published Websites and Website Templates
 */
document.addEventListener('DOMContentLoaded', () => {
  const toggleButtons = document.querySelectorAll('.websites-toggle__btn');
  const publishedGrid = document.getElementById('websites-published');
  const templatesGrid = document.getElementById('websites-templates');
  const storageKey = 'websites-selected-tab';

  /**
   * Activates a specific tab category
   * @param {string} category - 'published' or 'templates'
   */
  function activateTab(category) {
    // Update button states
    toggleButtons.forEach((btn) => {
      const isActive = btn.dataset.category === category;
      btn.classList.toggle('websites-toggle__btn--active', isActive);
      btn.setAttribute('aria-selected', isActive);
    });

    // Update grid visibility with transition
    if (category === 'published') {
      publishedGrid.classList.add('websites-grid--active');
      publishedGrid.removeAttribute('hidden');
      templatesGrid.classList.remove('websites-grid--active');
      templatesGrid.setAttribute('hidden', '');
    } else {
      templatesGrid.classList.add('websites-grid--active');
      templatesGrid.removeAttribute('hidden');
      publishedGrid.classList.remove('websites-grid--active');
      publishedGrid.setAttribute('hidden', '');
    }

    // Persist selection in localStorage
    localStorage.setItem(storageKey, category);
  }

  // Attach click handlers to toggle buttons
  toggleButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const category = btn.dataset.category;
      activateTab(category);
    });

    // Keyboard navigation support
    btn.addEventListener('keydown', (e) => {
      const buttons = Array.from(toggleButtons);
      const currentIndex = buttons.indexOf(btn);

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % buttons.length;
        buttons[nextIndex].focus();
        buttons[nextIndex].click();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + buttons.length) % buttons.length;
        buttons[prevIndex].focus();
        buttons[prevIndex].click();
      }
    });
  });

  // Restore last selected tab from localStorage
  const savedTab = localStorage.getItem(storageKey);
  if (savedTab && (savedTab === 'published' || savedTab === 'templates')) {
    activateTab(savedTab);
  }

  // Handle reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReducedMotion.matches) {
    document.querySelectorAll('.websites-grid').forEach((grid) => {
      grid.style.transition = 'none';
    });
  }
});

/**
 * Fetches GitHub repository data and populates project cards
 */
document.addEventListener('DOMContentLoaded', () => {
  const projectCards = document.querySelectorAll('.project-card');
  const username = 'krishgalani';

  projectCards.forEach((card) => {
    const repoName = card.getAttribute('data-repo');
    const apiUrl = `https://api.github.com/repos/${username}/${repoName}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Populate card with fetched data
        const titleEl = card.querySelector('.project-card__title');
        const descriptionEl = card.querySelector('.project-card__description');
        const linkEl = card.querySelector('.project-card__link');

        if (titleEl) {
          titleEl.textContent = data.name || 'Untitled Project';
        }

        if (descriptionEl) {
          descriptionEl.textContent = data.description || 'No description available.';
        }

        if (linkEl && data.html_url) {
          linkEl.href = data.html_url;
        }
      })
      .catch((error) => {
        console.error(`Error fetching repo "${repoName}":`, error);

        // Show error state in card
        const descriptionEl = card.querySelector('.project-card__description');
        if (descriptionEl) {
          descriptionEl.textContent = 'Unable to load project details.';
          descriptionEl.style.color = '#ef4444';
        }
      });
  });
});