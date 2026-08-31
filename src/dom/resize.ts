/**
 * @func windowResize
 * @desc H5 soft-keyboard collapse / pop-up callback.
 *
 * How it works: a soft keyboard popping up changes window.innerHeight; we listen to the
 * resize event and compare against the initial height to detect it. Under SSR it does not
 * register a listener (returns a no-op directly).
 *
 * @param {Function} downCb callback fired when the soft keyboard collapses (after popping up)
 * @param {Function} upCb callback fired when the soft keyboard pops up
 * @returns {Function} function to cancel the listener
 * @example
 * const off = windowResize(
 *   () => console.log('键盘收起'),
 *   () => console.log('键盘弹起')
 * )
 * // when no longer needed
 * off()
 */
export const windowResize = (downCb?: (height: number) => void, upCb?: (height: number) => void): (() => void) => {
  const noop = () => {};
  if (typeof window === 'undefined') return noop;

  const onDown = typeof downCb === 'function' ? downCb : noop;
  const onUp = typeof upCb === 'function' ? upCb : noop;
  let clientHeight = window.innerHeight;

  const handler = () => {
    const height = window.innerHeight;
    if (height === clientHeight) {
      onDown(height);
      return;
    }
    if (height < clientHeight) {
      onUp(height);
      return;
    }
    // A larger height means the keyboard has collapsed; sync the baseline
    clientHeight = height;
    onDown(height);
  };

  window.addEventListener('resize', handler);

  return () => window.removeEventListener('resize', handler);
};

/**
 * @func watchResize
 * @desc Watch window size changes, getting width/height in the callback (based on ResizeObserver, falling back to the resize event)
 * @param {Function} callback size-change callback
 * @returns {Function} function to cancel the listener
 * @example
 * const off = watchResize(({ width, height }) => console.log(width, height))
 */
export const watchResize = (callback: (size: { width: number; height: number }) => void): (() => void) => {
  const noop = () => {};
  if (typeof window === 'undefined' || typeof callback !== 'function') return noop;

  const emit = () => callback({ width: window.innerWidth, height: window.innerHeight });

  if (typeof ResizeObserver !== 'undefined' && document.documentElement) {
    const observer = new ResizeObserver(emit);
    observer.observe(document.documentElement);
    emit();
    return () => observer.disconnect();
  }

  window.addEventListener('resize', emit);
  emit();
  return () => window.removeEventListener('resize', emit);
};
