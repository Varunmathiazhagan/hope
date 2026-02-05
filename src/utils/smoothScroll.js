import { easings } from './easings';

/**
 * Initialize enhanced smooth scrolling
 * @returns {Object} Scroll instance that can be destroyed later
 */
export const initSmoothScroll = () => {
  // Don't use intensive scroll behavior on mobile - just set up indicators
  if (window.innerWidth < 768) {
    setupScrollProgressIndicator();
    setupIntersectionObserver();
    return null;
  }
  
  // Setup scroll progress indicator
  const progressBar = setupScrollProgressIndicator();
  
  const { progressBar, updateScrollProgress } = setupScrollProgressIndicator();

  // Setup element reveal animations
  const observer = setupIntersectionObserver();

  // Don't use intensive scroll behavior on mobile
  if (window.innerWidth < 768) {
    return {
      observer,
      progressBar,
      updateScrollProgress,
      handleAnchorClick: null
    };
  }
  
  // Handle hash links on page load
  if (window.location.hash) {
    setTimeout(() => {
      scrollToElement(window.location.hash, 100, 800);
    }, 500);
  }
  
  // Add event listeners for smooth scrolling to anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', handleAnchorClick);
  });
  
  // Return methods for cleanup
  return {
    observer,
    progressBar,
    updateScrollProgress,
    handleAnchorClick
  };
};

/**
 * Handle anchor link clicks for smooth scrolling
 */
const handleAnchorClick = (e) => {
  const href = e.currentTarget.getAttribute('href');
  if (href && href.startsWith('#') && href.length > 1) {
    e.preventDefault();
    scrollToElement(href, 80, 800);
  }
};

/**
 * Setup scroll progress indicator
 * @returns {HTMLElement} The progress bar element
 */
export const setupScrollProgressIndicator = () => {
  const progressBar = document.querySelector('.scroll-progress-bar');
  if (progressBar) {
    const updateScrollProgress = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercentage = Math.max(0, Math.min(100, (scrollTop / height) * 100));
      const scrollPercentage = height > 0 ? Math.max(0, Math.min(100, (scrollTop / height) * 100)) : 0;
      progressBar.style.width = `${scrollPercentage}%`;
    };
    
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress(); // Initial call
    
    return progressBar;
    return { progressBar, updateScrollProgress };
  }
  return null;
  return { progressBar: null, updateScrollProgress: null };
};

/**
 * Setup intersection observer for revealing elements on scroll
 * @returns {IntersectionObserver} The observer instance
 */
export const setupIntersectionObserver = () => {
  const options = {
    root: null, // Use viewport
    rootMargin: '0px',
    threshold: 0.15 // Element is 15% visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Optionally unobserve after animation is triggered
        if (entry.target.dataset.once === 'true') {
          observer.unobserve(entry.target);
        }
      } else if (!entry.target.dataset.once) {
        entry.target.classList.remove('active');
      }
    });
@@ -128,34 +132,36 @@ export const scrollToElement = (selector, offset = 0, duration = 800) => {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const scrollY = easings.easeOutQuart(timeElapsed, startPosition, distance, duration);
    
    window.scrollTo(0, scrollY);
    
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }
  
  requestAnimationFrame(animation);
};

/**
 * Clean up the smooth scroll instance
 * @param {Object} instance - The instance returned from initSmoothScroll
 */
export const destroySmoothScroll = (instance) => {
  if (!instance) return;
  
  if (instance.observer && instance.observer.disconnect) {
    instance.observer.disconnect();
  }
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.removeEventListener('click', instance.handleAnchorClick);
  });
  if (instance.handleAnchorClick) {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.removeEventListener('click', instance.handleAnchorClick);
    });
  }
  
  // Remove scroll progress indicator
  if (instance.progressBar) {
    window.removeEventListener('scroll', instance.updateScrollProgress);
  }
};
