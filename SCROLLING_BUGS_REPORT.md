# Scrolling Errors and Bugs Report

## Bugs Found

### 1. **Duplicate CSS Scrollbar Styles** ⚠️
**File:** `src/App.css`
**Lines:** ~105-120 and ~180+
**Issue:** The `::-webkit-scrollbar` and related pseudo-elements are defined twice, causing redundant CSS and potential style conflicts.
**Severity:** Low (cosmetic/performance)

### 2. **Inconsistent Scroll-to-Top Implementation** 🔴
**Files:** `src/components/Footer.js` vs `src/utils/smoothScroll.js`
**Issue:** 
- Footer uses: `window.scrollTo({ top: 0, behavior: 'smooth' })`
- Navbar/other components use: `scrollToElement()`
- This inconsistency can cause different animation behaviors and potential conflicts.
**Severity:** Medium

### 3. **Mobile Scroll Handling Inconsistency** 🔴
**File:** `src/utils/smoothScroll.js` (lines 24-25)
**Issue:** 
```javascript
const shouldUseCustomAnchorScroll = window.innerWidth >= 768;
```
On mobile (<768px), custom anchor scroll is disabled, BUT the Navbar still calls `scrollToElement()` in `handleNavLinkClick()`, potentially causing the function to silently fail.
**Severity:** Medium

### 4. **Duplicate Scroll Progress Listeners** 🔴
**Files:** `src/components/Navbar.js` and `src/utils/smoothScroll.js`
**Issue:** 
- `setupScrollProgressIndicator()` adds scroll listeners
- `handleScroll()` in Navbar adds additional scroll listeners
- Both update scroll progress, causing redundant calculations and potential lag
**Severity:** Medium (performance impact)

### 5. **Unsafe normalization function** ⚠️
**File:** `src/utils/smoothScroll.js` (line 9)
**Issue:** 
```javascript
const normalizeScrollSelector = (selector) => (
  selector === '#experience' ? '#education' : selector
);
```
- No `#experience` section exists in the codebase
- This dead-code mapping is confusing and unnecessary
- Should be removed or documented
**Severity:** Low

### 6. **Missing Error Handling** ⚠️
**File:** `src/utils/smoothScroll.js` (line 31)
**Issue:** If `document.querySelector(hash)` returns null on page load, the scroll silently fails without user feedback.
**Severity:** Low

### 7. **Event Listener Cleanup Issue** 🔴
**File:** `src/utils/smoothScroll.js` (line 167)
**Issue:** 
```javascript
anchor.removeEventListener('click', handleAnchorClick, false);
```
The third parameter should be `true` if the listener was added with capture phase, or should match the exact listener registration.
**Severity:** Low (potential memory leak in edge cases)

### 8. **Scroll Animation Frame Not Canceled** ⚠️
**File:** `src/utils/smoothScroll.js` (line 164)
**Issue:** When destroying smooth scroll, the active animation frame is canceled, but if a new scroll is triggered before cleanup, there could be a conflict.
**Severity:** Low

## Performance Issues

1. **Multiple scroll event listeners** firing on every scroll
2. **Duplicate CSS** increasing stylesheet size
3. **No passive event listener** optimization in some cases (though some do use `{ passive: true }`)

## Recommended Fixes Priority

1. **HIGH:** Remove duplicate CSS (easy win)
2. **HIGH:** Consolidate scroll listeners (performance)
3. **MEDIUM:** Fix mobile scroll handling consistency
4. **MEDIUM:** Standardize scroll-to-top implementation
5. **LOW:** Remove dead code (normalizeScrollSelector for #experience)
6. **LOW:** Add error handling for missing sections
