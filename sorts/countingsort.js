const mxK = 1000;

export default function countingsort(arr) {
  const a = [...arr];
  const N = a.length;

  const count = Array(mxK + 1).fill(0);
  for (const item of a) count[item] += 1;
  for (let i = 1; i < count.length; ++i) count[i] += count[i - 1];

  // output charater array:
  const output = Array(N);
  for (let i = 0; i < N; ++i) {
    output[count[a[i]] - 1] = a[i];
    count[a[i]] -= 1;
  }

  return [];
}
