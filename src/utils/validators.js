export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
export const isPhone = (v) => !v || /^[0-9]{10}$/.test(v);
export const minLength = (v, n) => (v || '').length >= n;
