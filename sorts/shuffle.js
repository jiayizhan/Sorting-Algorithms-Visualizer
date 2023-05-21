import ACTIONS from "./actions";

export default function shuffle(arr) {
  const N = arr.length;
  const animations = [];
  for (let i = 0; i < N; ++i)
    animations.push([ACTIONS.swap, i, Math.floor(Math.random() * N)]);
  return animations;
}
