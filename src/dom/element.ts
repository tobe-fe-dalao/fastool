/**
 * DOM element manipulation utilities
 * All functions are guarded for SSR (no window / document) environments
 */

/**
 * @func addEvent
 * @desc Bind an event to an element
 * @param {EventTarget} el target element
 * @param {string} event event name
 * @param {Function} handler event handler
 * @param {AddEventListenerOptions} options listener options (capture / passive / once, etc.)
 * @returns {void}
 * @example addEvent(window, 'resize', onResize, { passive: true });
 */
export function addEvent(
  el: EventTarget | null,
  event: string,
  handler: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions
): void {
  if (!el || typeof el.addEventListener !== 'function') return;
  el.addEventListener(event, handler, options);
}

/**
 * @func removeEvent
 * @desc Remove a bound event from an element
 * @param {EventTarget} el target element
 * @param {string} event event name
 * @param {Function} handler event handler
 * @param {EventlistenerOptions} options listener options; must match those used when binding
 * @returns {void}
 * @example removeEvent(window, 'resize', onResize);
 */
export function removeEvent(
  el: EventTarget | null,
  event: string,
  handler: EventListenerOrEventListenerObject,
  options?: boolean | EventListenerOptions
): void {
  if (!el || typeof el.removeEventListener !== 'function') return;
  el.removeEventListener(event, handler, options);
}

/**
 * @func addEventOnce
 * @desc Bind an event that runs only once, auto-unbinding after firing
 * @param {EventTarget} el target element
 * @param {string} event event name
 * @param {Function} handler event handler
 * @returns {void}
 * @example addEventOnce(document, 'DOMContentLoaded', init);
 */
export function addEventOnce(
  el: EventTarget | null,
  event: string,
  handler: EventListener
): void {
  if (!el || typeof el.addEventListener !== 'function') return;
  el.addEventListener(event, handler, { once: true });
}

/**
 * @func toggleClass
 * @desc Toggle an element's class; when force is passed, add or remove by boolean
 * @param {HTMLElement} el target element
 * @param {string} className class name
 * @param {boolean} force force flag; true adds, false removes
 * @returns {boolean} whether the class is present after the operation
 * @example toggleClass(el, 'active');
 * @example toggleClass(el, 'active', true); // force add
 */
export function toggleClass(el: HTMLElement | null, className: string, force?: boolean): boolean {
  if (!el || !className) return false;
  const has = el.classList.contains(className);
  const shouldAdd = force === undefined ? !has : force;
  if (shouldAdd) {
    el.classList.add(className);
  } else {
    el.classList.remove(className);
  }
  return shouldAdd;
}

/**
 * @func getStyle
 * @desc Get an element's computed style; returns the full CSSStyleDeclaration when no property is given
 * @param {HTMLElement} el target element
 * @param {string} property CSS property name (camelCase, e.g. backgroundColor)
 * @returns {string | CSSStyleDeclaration} style value
 * @example getStyle(el, 'fontSize') // '16px'
 */
export function getStyle(
  el: HTMLElement | null,
  property?: string
): string | CSSStyleDeclaration {
  if (!el || typeof window === 'undefined') return property ? '' : ({} as CSSStyleDeclaration);
  const style = window.getComputedStyle(el);
  if (!property) return style;
  return (style as any)[property] ?? '';
}

/**
 * @func getScrollPosition
 * @desc Get the current page scroll position
 * @returns {{ x: number, y: number }} horizontal and vertical scroll distances
 * @example getScrollPosition() // { x: 0, y: 320 }
 */
export function getScrollPosition(): { x: number; y: number } {
  if (typeof window === 'undefined') return { x: 0, y: 0 };
  return {
    x: window.pageXOffset || document.documentElement.scrollLeft || 0,
    y: window.pageYOffset || document.documentElement.scrollTop || 0,
  };
}

/**
 * @func copyToClipboard
 * @desc Copy text to the clipboard; prefers the Clipboard API, falling back to textarea + execCommand when unsupported
 * @param {string} text text to copy
 * @returns {Promise<boolean>} whether the copy succeeded
 * @example await copyToClipboard('hello');
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fall back to the execCommand approach
    }
  }

  if (typeof document === 'undefined') return false;
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
}

/**
 * @func downloadFile
 * @desc Trigger a browser download, supporting a URL or Blob
 * @param {string | Blob} source file URL or Blob object
 * @param {string} fileName file name to save as
 * @returns {void}
 * @example downloadFile('https://a.com/a.pdf', '报告.pdf');
 * @example downloadFile(blob, 'data.xlsx');
 */
export function downloadFile(source: string | Blob, fileName: string): void {
  if (typeof document === 'undefined') return;
  const url = typeof source === 'string' ? source : URL.createObjectURL(source);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  if (typeof source !== 'string') URL.revokeObjectURL(url);
}

/**
 * @func isInViewport
 * @desc Check whether an element is within the viewport (commonly used for image lazy-loading)
 * @param {HTMLElement} el target element
 * @param {number} offset margin in px, default 0
 * @returns {boolean}
 * @example if (isInViewport(img, 100)) { img.src = img.dataset.src }
 */
export function isInViewport(el: HTMLElement | null, offset = 0): boolean {
  if (!el || typeof el.getBoundingClientRect !== 'function') return false;
  const rect = el.getBoundingClientRect();
  const viewHeight = window.innerHeight || document.documentElement.clientHeight;
  const viewWidth = window.innerWidth || document.documentElement.clientWidth;
  return (
    rect.top - offset < viewHeight &&
    rect.bottom + offset > 0 &&
    rect.left - offset < viewWidth &&
    rect.right + offset > 0
  );
}
