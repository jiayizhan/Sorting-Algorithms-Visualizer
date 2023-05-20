function heapify(arr, n, i) {
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  if (left < n && arr[left] > arr[largest]) largest = left;

  if (right < n && arr[right] > arr[largest]) largest = right;

  if (largest != i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}

export default function heapsort(arr) {
  const a = [...arr];
  const N = a.length;

  for (let i = Math.floor(N / 2) - 1; i >= 0; --i) heapify(a, N, i);

  for (let i = N - 1; i > 0; --i) {
    [a[0], a[i]] = [a[i], a[0]];
    heapify(a, i, 0);
  }

  return a;
}
