export function formatINR(n) {
  if (n === null || n === undefined) return '—';
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(2)} Cr`;
  if (n >= 100000)   return `₹${(n / 100000).toFixed(2)} L`;
  return `₹${n.toLocaleString('en-IN')}`;
}

export function formatINRFull(n) {
  if (n === null || n === undefined) return '—';
  return `₹${n.toLocaleString('en-IN')}`;
}

export function pct(collected, demand) {
  if (!demand) return 0;
  return Math.round((collected / demand) * 100);
}
