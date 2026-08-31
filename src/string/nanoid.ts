/**
 * @func nanoid
 * @desc Generate a URL-safe random string (A-Z a-z 0-9 _ -)
 *
 * Prefer Web Crypto's `getRandomValues` (cryptographically secure); fall back to
 * `Math.random` when unsupported (only suitable for non-security scenarios such as DOM ids).
 *
 * Based on nanoid's approach; at the default length of 21, the collision probability
 * is comparable to UUID v4.
 *
 * @param {number} size length, default 21
 * @returns {string} random string
 * @see https://github.com/ai/nanoid
 * @example nanoid() // 'V1StGXR8_Z5jdHi6B-myT'
 * @example nanoid(10) // 'IRFa-VaY2b'
 */
const ALPHABET = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';

const nanoid = (size = 21): string => {
  const len = Math.max(1, Math.floor(size));
  const mask = (2 << (31 - Math.clz32(ALPHABET.length - 1))) - 1;
  const step = Math.ceil((1.6 * mask * len) / ALPHABET.length);

  let id = '';
  const cryptoObj: Crypto | undefined =
    typeof globalThis !== 'undefined' ? (globalThis.crypto as Crypto) : undefined;

  if (cryptoObj && typeof cryptoObj.getRandomValues === 'function') {
    // Rejection sampling: discard random bytes outside the alphabet range to keep the distribution uniform
    while (id.length < len) {
      const bytes = cryptoObj.getRandomValues(new Uint8Array(step));
      for (let i = 0; i < step && id.length < len; i++) {
        // Take the low 6 bits; the mask filters out out-of-range parts
        const index = bytes[i] & 63;
        if (index < ALPHABET.length) id += ALPHABET[index];
      }
    }
    return id;
  }

  // Fallback path: for environments with low security requirements
  for (let i = 0; i < len; i++) {
    id += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }
  return id;
};

export { nanoid };
