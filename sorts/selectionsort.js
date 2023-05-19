export default function selectionsort(arr) {
  const a = [...arr];
  const N = a.length;

  let i, j, mnIndex;

  for (i = 0; i < N - 1; ++i) {
    mnIndex = i;
    for (j = i + 1; j < N; ++j) {
      if (a[j] < a[mnIndex]) {
        mnIndex = j;
      }
    }
    [a[i], a[mnIndex]] = [a[mnIndex], a[i]];
  }

  return [];
}
