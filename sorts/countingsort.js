import ACTIONS from "./actions";

const mxK = 1000;

function __countingsort(arr, n, exp, animations) {
  const output = Array(n).fill(0);
  const count = Array(10).fill(0);

  let i, j;

  for (i = 0; i < n; ++i) {
    animations.push([ACTIONS.flash, i]);
    count[Math.floor(arr[i] / exp) % 10] += 1;
  }

  for (i = 1; i < 10; ++i) count[i] += count[i - 1];

  for (i = n - 1; i >= 0; --i) {
    j = Math.floor(arr[i] / exp) % 10;
    output[count[j] - 1] = arr[i];
    animations.push([ACTIONS.resize, count[j] - 1, arr[i]]);
    count[j] -= 1;
  }

  for (i = 0; i < n; ++i) arr[i] = output[i];
}

export default function countingsort(arr) {
  const a = [...arr];
  const N = a.length;

  const animations = [];

  const count = Array(mxK + 1).fill(0);
  for (let i = 0; i < N; ++i) {
    count[a[i]] += 1;
    animations.push([ACTIONS.flash, i]);
  }
  for (let i = 1; i < count.length; ++i) count[i] += count[i - 1];

  for (let i = 0; i < N; ++i) {
    animations.push([ACTIONS.resize, count[a[i]] - 1, a[i]]);
    count[a[i]] -= 1;
  }

  return animations;
}

export { __countingsort };
