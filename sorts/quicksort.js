import ACTIONS from "./actions";

const animations = [];

const randomPivot = (left, right) =>
  Math.floor(Math.random() * (right - left + 1)) + left;

const swap = (arr, i, j) => {
  [arr[i], arr[j]] = [arr[j], arr[i]];
};

function __quicksort(arr, left, right) {
  if (left >= right) return;

  const pivot = randomPivot(left, right);
  const pivotValue = arr[pivot];

  animations.push([ACTIONS.color, pivot])

  swap(arr, pivot, right);
  animations.push([ACTIONS.swap, pivot, right]);

  let i = left;
  for (let j = left; j < right; ++j) {
    animations.push([ACTIONS.compare, j, pivot]);
    if (arr[j] < pivotValue) {
      swap(arr, i, j);
      animations.push([ACTIONS.swap, j, i]);
      i += 1;
    }
  }

  swap(arr, i, right);
  animations.push([ACTIONS.swap, right, i]);
  animations.push([ACTIONS.decolorize, pivot])

  __quicksort(arr, left, i - 1);
  __quicksort(arr, i + 1, right);
}

export default function quicksort(arr) {
  const a = [...arr];
  const N = a.length;

  animations.length = 0;

  __quicksort(a, 0, N - 1);
  return animations;
}
