/**
 * @func openNewTag
 * @desc Open a URL in a new window / tab
 * @param {string} url target URL
 * @param {number} tagType how to open: 1 new tab (default), 2 fixed-size popup window
 * @returns {void}
 * @example openNewTag('https://example.com');
 * @example openNewTag('https://example.com', 2);
 */
export function openNewTag(url: string, tagType: number = 1): void {
  if (typeof window === 'undefined' || !url) return;
  if (tagType === 1) {
    window.open(url, '_blank');
  } else if (tagType === 2) {
    window.open(
      url,
      '_blank',
      'width=800,height=600,top=150,left=300,toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes'
    );
  }
}
