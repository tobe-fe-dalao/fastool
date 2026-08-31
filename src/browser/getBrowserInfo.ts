/**
 * @func getBrowserInfo
 * @desc Get the browser type and version (returns unknown under SSR)
 * @returns {{ type: string, version: number }} browser info
 * @example getBrowserInfo() // { type: 'Chrome', version: 120 }
 */
export const getBrowserInfo = (): { type: string; version: number } => {
  if (typeof navigator === 'undefined') return { type: 'unknown', version: -1 };

  const ua = navigator.userAgent.toLowerCase();
  const pick = (reg: RegExp): number => {
    const result = ua.match(reg);
    return result ? Number(result[1]) : -1;
  };

  if (ua.includes('msie')) return { type: 'IE', version: pick(/msie ([\d]+)/) };
  if (ua.match(/trident\/.+?rv:[\d.]+/)) return { type: 'IE', version: 11 };
  if (ua.includes('edg')) return { type: 'Edge', version: pick(/edg\/([\d]+)/) };
  if (ua.includes('edge')) return { type: 'Edge', version: pick(/edge\/([\d]+)/) };
  if (ua.includes('firefox')) return { type: 'Firefox', version: pick(/firefox\/([\d]+)/) };
  if (ua.includes('opr')) return { type: 'Opera', version: pick(/opr\/([\d]+)/) };
  if (ua.includes('chrome')) return { type: 'Chrome', version: pick(/chrome\/([\d]+)/) };
  if (ua.includes('safari')) return { type: 'Safari', version: pick(/version\/([\d]+)/) };
  return { type: 'unknown', version: -1 };
};
