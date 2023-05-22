import ACTIONS from "./actions";

const animations = [];

function heapify(arr, n, i) {
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  animations.push([ACTIONS.flash, largest]);

  if (left < n) {
    if (arr[left] > arr[largest]) {
      largest = left;
    }
  }

  if (right < n) {
    if (arr[right] > arr[largest]) {
      largest = right;
    }
  }

  if (largest != i) {
    animations.push([ACTIONS.compare, largest, i]);
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    animations.push([ACTIONS.swap, i, largest]);
    heapify(arr, n, largest);
  }
}

export default function heapsort(arr) {
  const a = [...arr];
  const N = a.length;

  animations.length = 0;

  for (let i = Math.floor(N / 2) - 1; i >= 0; --i) heapify(a, N, i);

  for (let i = N - 1; i > 0; --i) {
    [a[0], a[i]] = [a[i], a[0]];
    animations.push([ACTIONS.swap, 0, i]);
    heapify(a, i, 0);
  }

  return animations;
}
