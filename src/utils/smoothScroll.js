/**
 * Enhanced Smooth Scrolling Utility with simplified approach to prevent glitches
 */

import { easings } from './easings';

let activeScrollAnimationFrame = null;

/**
 * Initialize enhanced smooth scrolling
 * @returns {Object} Scroll instance that can be destroyed later
 */
export const initSmoothScroll = () => {
  // Setup scroll progress indicator
  const progressIndicator = setupScrollProgressIndicator();
  
  // Setup element reveal animations
  const observer = setupIntersectionObserver();

  // Only use custom JS anchor animation on larger screens.
  const shouldUseCustomAnchorScroll = window.innerWidth >= 768;
  const anchorElements = shouldUseCustomAnchorScroll
    ? Array.from(document.querySelectorAll('a[href^="#"]'))
    : [];
  
  // Handle hash links on page load
  if (window.location.hash) {
    const targetElement = document.querySelector(window.location.hash);
    if (targetElement) {
      window.requestAnimationFrame(() => {
        scrollToElement(window.location.hash, 100, 800);
      });
    }
  }
  
  if (shouldUseCustomAnchorScroll) {
    anchorElements.forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick);
    });
  }
  
  // Return methods for cleanup
  return {
    observer,
    disposeProgress: progressIndicator ? progressIndicator.dispose : null,
    anchorElements,
    shouldUseCustomAnchorScroll
  };
};

/**
 * Handle anchor link clicks for smooth scrolling
 */
const handleAnchorClick = (e) => {
  const href = e.currentTarget.getAttribute('href');
  if (href && href.startsWith('#') && href.length > 1) {
    const targetElement = document.querySelector(href);
    if (!targetElement) {
      console.warn(`Scrolling target not found: ${href}`);
      return;
    }

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
  if (!progressBar) {
    return null;
  }

  const updateScrollProgress = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = height > 0
      ? Math.max(0, Math.min(100, (scrollTop / height) * 100))
      : 0;

    progressBar.style.width = `${scrollPercentage}%`;
  };

  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  window.addEventListener('resize', updateScrollProgress, { passive: true });
  updateScrollProgress();

  return {
    progressBar,
    dispose: () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
    }
  };
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
  }, options);

  // Target all elements that should be animated
  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    observer.observe(el);
  });

  return observer;
};

/**
 * Smoothly scroll to element
 * @param {string} selector - The CSS selector of the target element
 * @param {number} offset - Offset in pixels
 * @param {number} duration - Animation duration in milliseconds
 */
export const scrollToElement = (selector, offset = 0, duration = 800) => {
  const target = document.querySelector(selector);
  if (!target) {
    console.warn(`Scroll target not found: ${selector}`);
    return false;
  }
  
  const maxScrollTop = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  const rawTargetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
  const targetPosition = Math.max(0, Math.min(rawTargetPosition, maxScrollTop));
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;

  // If no distance to travel, just return
  if (distance === 0) return true;

  if (duration <= 0 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.scrollTo({ top: targetPosition, behavior: 'auto' });
    return true;
  }

  if (activeScrollAnimationFrame !== null) {
    window.cancelAnimationFrame(activeScrollAnimationFrame);
    activeScrollAnimationFrame = null;
  }
  
  let startTime = null;
  
  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const scrollY = easings.easeOutQuart(timeElapsed, startPosition, distance, duration);
    const boundedScrollY = Math.max(0, Math.min(scrollY, maxScrollTop));
    
    window.scrollTo(0, boundedScrollY);
    
    if (timeElapsed < duration) {
      activeScrollAnimationFrame = requestAnimationFrame(animation);
    } else {
      window.scrollTo(0, targetPosition);
      activeScrollAnimationFrame = null;
    }
  }
  
  activeScrollAnimationFrame = requestAnimationFrame(animation);
  return true;
};

/**
 * Clean up the smooth scroll instance
 * @param {Object} instance - The instance returned from initSmoothScroll
 */
export const destroySmoothScroll = (instance) => {
  if (activeScrollAnimationFrame !== null) {
    window.cancelAnimationFrame(activeScrollAnimationFrame);
    activeScrollAnimationFrame = null;
  }

  if (!instance) return;
  
  if (instance.observer && instance.observer.disconnect) {
    instance.observer.disconnect();
  }

  // Clean up anchor click listeners only if they were added
  if (instance.shouldUseCustomAnchorScroll && instance.anchorElements) {
    instance.anchorElements.forEach(anchor => {
      // Use the same event listener type as it was added
      anchor.removeEventListener('click', handleAnchorClick);
    });
  }

  if (typeof instance.disposeProgress === 'function') {
    instance.disposeProgress();
  }
};
