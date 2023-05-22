import ACTIONS from "./actions";

export default function selectionsort(arr) {
  const a = [...arr];
  const N = a.length;

  let i, j, mnIndex;

  const animations = [];

  for (i = 0; i < N - 1; ++i) {
    mnIndex = i;
    animations.push([ACTIONS.color, i]);
    for (j = i + 1; j < N; ++j) {
      animations.push([ACTIONS.flash, j, false]);
      if (a[j] < a[mnIndex]) {
        animations.push([ACTIONS.flash, j, true]);
        mnIndex = j;
      }
    }
    [a[i], a[mnIndex]] = [a[mnIndex], a[i]];
    animations.push([ACTIONS.swap, i, mnIndex]);
    animations.push([ACTIONS.decolorize, i]);
  }

  return animations;
}
