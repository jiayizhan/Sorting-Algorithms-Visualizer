function __merge(arr, left, mid, right, animations = []) {
  const N1 = mid - left + 1;
  const N2 = right - mid;

  const L = [];
  const R = [];

  let i, j, k;

  for (i = 0; i < N1; ++i) L.push(arr[left + i]);
  for (i = 0; i < N2; ++i) R.push(arr[mid + i + 1]);

  i = 0;
  j = 0;
  k = left;

  while (i < N1 && j < N2) {
    if (L[i] <= R[j]) {
      arr[k] = L[i];
      i += 1;
    } else {
      arr[k] = R[j];
      j += 1;
    }
    k += 1;
  }

  while (i < N1) {
    arr[k] = L[i];
    i += 1;
    k += 1;
  }

  while (j < N2) {
    arr[k] = R[j];
    j += 1;
    k += 1;
  }
}

function __mergesort(arr, start, end, animations = []) {
  if (start >= end) return;

  const mid = start + Math.floor((end - start) / 2);

  __mergesort(arr, start, mid);
  __mergesort(arr, mid + 1, end);

  __merge(arr, start, mid, end);
}

export default function mergesort(arr) {
  const a = [...arr];
  const N = a.length;

  __mergesort(a, 0, N - 1);

  return [];
}
