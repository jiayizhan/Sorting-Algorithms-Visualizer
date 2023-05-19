export default function bubblesort(arr) {
  const a = [...arr];
  const N = a.length;

  let i = 0;
  let j;
  let swap;

  do {
    swap = false;
    for (j = 0; j < N - i - 1; ++j) {
      if (a[j] > a[j + 1]) {
        swap = true;
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
      }
    }
    i += 1;
  } while (swap);

  console.log(a);

  return [];
}
