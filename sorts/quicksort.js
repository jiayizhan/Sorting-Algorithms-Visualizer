const randomPivot = (left, right) =>
  Math.floor(Math.random() * (right - left + 1)) + left;

const swap = (arr, i, j) => {
  [arr[i], arr[j]] = [arr[j], arr[i]];
};

function __quicksort(arr, left, right) {
  if (left >= right) return;

  const pivot = randomPivot(left, right);
  const pivotValue = arr[pivot];

  swap(arr, pivot, right);

  let i = left;
  for (let j = left; j < right; ++j) {
    if (arr[j] < pivotValue) {
      swap(arr, i, j);
      i += 1;
    }
  }

  swap(arr, i, right);

  __quicksort(arr, left, i - 1);
  __quicksort(arr, i + 1, right);
}

export default function quicksort(arr) {
  const a = [...arr];
  const N = a.length;

  __quicksort(a, 0, N - 1);
  console.log(a);

  return [];
}

quicksort([5, 4, 6, 786, 23, 543, 1, 765, 87, 34, 543, 2, 45, 654, 213, 1]);
