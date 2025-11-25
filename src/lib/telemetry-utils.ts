export function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

export function randn(mean = 0, stdev = 1) {
  // simple gaussian
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  const num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  return num * stdev + mean;
}
