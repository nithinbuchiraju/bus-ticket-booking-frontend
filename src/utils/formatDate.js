// "2026-10-02" -> "02 Oct 2026" (parsed as a local date to avoid timezone shifts)
export function formatDate(value) {
  if (!value) return '';
  const [y, m, d] = value.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

// "21:00:00" -> "21:00"
export const formatTime = (value) => (value ? value.slice(0, 5) : '--:--');

export const formatDateTime = (value) =>
  value ? new Date(value).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : '';

export const formatCurrency = (n) => `₹${Number(n).toLocaleString('en-IN')}`;

export const todayISO = () => {
  const d = new Date();
  const pad = (x) => String(x).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};
