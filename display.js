import * as sortingAlgorithms from "./sorts/index";
import SORT_ALGORITHM from "./sorts/sort_algorithms";
import ACTIONS from "./sorts/actions";

var display = null;
var array = [];
var alt = [];
var continueAsync = false;

function initialize(_display) {
  display = _display;
}

function show(len) {
  continueAsync = false;
  display.innerHTML = "";
  len = parseInt(len);
  array.length = len;
  const mxWidth = display.getBoundingClientRect().width;
  const itemLength = mxWidth / len;
  alt = Array.from(Array(len).keys());
  for (let i = 0, left = 0; i < len; ++i, left += itemLength) {
    array[i] = Math.floor(Math.random() * 991) + 10;
    const div = document.createElement("div");
    div.style.height = `${array[i] / 10}%`;
    div.style.width = `${itemLength}px`;
    div.style.left = `${left}px`;
    if (len < 100) div.classList.add("border");
    display.append(div);
  }
}

function getAnimations(algorithm) {
  switch (algorithm) {
    case SORT_ALGORITHM.Bubblesort:
      return sortingAlgorithms.bubblesort(array);
    case SORT_ALGORITHM.Selectionsort:
      return sortingAlgorithms.selectionsort(array);
    case SORT_ALGORITHM.Mergesort:
      return sortingAlgorithms.mergesort(array);
    case SORT_ALGORITHM.Quicksort:
      return sortingAlgorithms.quicksort(array);
    case SORT_ALGORITHM.Countingsort:
      return sortingAlgorithms.countingsort(array);
    case SORT_ALGORITHM.Radixsort:
      return sortingAlgorithms.radixsort(array);
    case SORT_ALGORITHM.Heapsort:
      return sortingAlgorithms.heapsort(array);
    default:
      return [];
  }
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function disableButtons() {
  document.getElementById("btn-shuffle").disabled = true;
  document.getElementById("btn-sort").disabled = true;
}

function activeButtons() {
  document.getElementById("btn-shuffle").disabled = false;
  document.getElementById("btn-sort").disabled = false;
}

async function sort(algorithm) {
  continueAsync = true;
  disableButtons();
  const animations = getAnimations(algorithm);

  const domArray = display.querySelectorAll("div");

  let delayTime = Math.floor(5000 / (alt.length ** 2 / 3));

  document.documentElement.style.setProperty(
    "--item-transition",
    `${delayTime}ms`
  );

  let y =
    Math.floor(
      2891.697 *
        Math.E ** (-((alt.length - 1662.133) ** 2) / (2 * 437.8907 ** 2))
    ) + 1;

  if (
    algorithm === SORT_ALGORITHM.Quicksort ||
    algorithm === SORT_ALGORITHM.Mergesort
  ) {
    y = Math.floor(
      1.085018 - (-0.2319416 / 0.006953776) * (1 - Math.E ** (-0.006953776 * y))
    );
  }

  if (alt.length <= 20) y = 1;
  let cont = y;

  const btnSorting = document.getElementById("btn-stopSorting");
  btnSorting.style.visibility = "visible";
  btnSorting.onclick = (e) => {
    e.target.style.visibility = "hidden";
    activeButtons();
    continueAsync = false;
  };

  for (const [action, ...items] of animations) {
    if (!continueAsync) {
      activeButtons();
      return;
    }
    switch (action) {
      case ACTIONS.compare: {
        const [i, j] = items;
        domArray[alt[i]].style.background = "var(--compare1)";
        domArray[alt[j]].style.background = "var(--compare2)";
        if (cont % y === 0) await delay(delayTime);
        domArray[alt[i]].style.background = "var(--black)";
        domArray[alt[j]].style.background = "var(--black)";
        if (cont % y === 0) await delay(delayTime);
        break;
      }
      case ACTIONS.swap: {
        const [i, j] = items;
        const tempLeft = domArray[alt[i]].style.left;
        domArray[alt[i]].style.left = domArray[alt[j]].style.left;
        domArray[alt[j]].style.left = tempLeft;
        [alt[i], alt[j]] = [alt[j], alt[i]];
        [array[i], array[j]] = [array[j], array[i]];
        domArray[alt[i]].style.background = "var(--swap)";
        domArray[alt[j]].style.background = "var(--swap)";
        if (cont % y === 0) await delay(delayTime);
        domArray[alt[i]].style.background = "var(--black)";
        domArray[alt[j]].style.background = "var(--black)";
        break;
      }
      case ACTIONS.color: {
        const [i] = items;
        domArray[alt[i]].style.background = "var(--color)";
        if (cont % y === 0) await delay(delayTime);
        break;
      }
      case ACTIONS.decolorize: {
        const [i] = items;
        domArray[alt[i]].style.background = "var(--black)";
        if (cont % y === 0) await delay(delayTime);
        break;
      }
      case ACTIONS.flash: {
        const [i, primaryColor] = items;
        if (primaryColor) {
          domArray[alt[i]].style.background = "var(--success)";
          if (cont % y === 0) await delay(delayTime);
          domArray[alt[i]].style.background = "var(--black)";
          if (cont % y === 0) await delay(delayTime);
        } else {
          domArray[alt[i]].style.background = "var(--compare2)";
          if (cont % y === 0) await delay(delayTime);
          domArray[alt[i]].style.background = "var(--black)";
          if (cont % y === 0) await delay(delayTime);
        }
        break;
      }
    }
    cont += 1;
  }

  y = Math.ceil(y / 10);

  btnSorting.click();
  activeButtons();

  for (const i of alt) {
    domArray[i].style.background = "var(--teal)";
    if (cont % y === 0) await delay(delayTime);
    cont++;
  }
}

async function shuffle() {
  continueAsync = true;
  const animations = sortingAlgorithms.shuffle(array);
  const domArray = display.querySelectorAll("div");
  let delayTime = alt.length ** -1 * 10;
  document.documentElement.style.setProperty("--item-transition", `400ms`);
  let y =
    Math.floor(
      2891.697 *
        Math.E ** (-((alt.length - 1662.133) ** 2) / (2 * 437.8907 ** 2))
    ) + 1;
  if (alt.length <= 20) y = 1;
  let cont = y;
  for (const [_, i, j] of animations) {
    if (!continueAsync) return;
    const tempLeft = domArray[alt[i]].style.left;
    domArray[alt[i]].style.left = domArray[alt[j]].style.left;
    domArray[alt[j]].style.left = tempLeft;
    [alt[i], alt[j]] = [alt[j], alt[i]];
    [array[i], array[j]] = [array[j], array[i]];
    domArray[alt[i]].style.background = "var(--black)";
    domArray[alt[j]].style.background = "var(--black)";
    if (cont % y === 0) await delay(delayTime);
    cont += 1;
  }
}

export { initialize, show, sort, shuffle, activeButtons };
