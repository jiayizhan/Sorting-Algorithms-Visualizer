import { __countingsort as countingsort } from "./countingsort";

function getMax(arr) {
  let mx = -Infinity;
  for (const a of arr) mx = Math.max(mx, a);
  return mx;
}

export default function radixsort(arr) {
  const a = [...arr];
  const N = a.length;

  const mx = getMax(a);

  for (let exp = 1; Math.floor(mx / exp) > 0; exp *= 10)
    countingsort(a, N, exp);

  console.log(a);

  return [];
}
