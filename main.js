import SORT_ALGORITHM from "./sorts/sort_algorithms";
import * as display from "./display";
import { showPage, closePage } from "./pages";

const appHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty("--app-height", `${window.innerHeight}px`);
  if (window.innerWidth <= 769)
    document.getElementById("display").style.alignItems = "end";
};
window.addEventListener("resize", appHeight);
appHeight();

document.getElementById("logo").onclick = (e) => {
  e.target.classList.toggle("baseline");
  const baseline = e.target.classList.contains("baseline");
  e.target.src = baseline ? "/baseline-logo.svg" : "/logo.svg";
  document.getElementById("display").style.alignItems = baseline
    ? "end"
    : "center";
  document.querySelector("main").style.marginBottom = baseline ? "0" : "3px";
};

const sortSelect = document.getElementById("sort-select");
const btnToggleTheory = document.getElementById("toggle-theory");

for (const [sortName, sortValue] of Object.entries(SORT_ALGORITHM)) {
  sortSelect.innerHTML += `<option value="${sortValue}">${sortName}</option>`;
}

(() => {
  let prevTime;
  function toggle_(time) {
    if (prevTime === undefined) prevTime = time;
    if (time - prevTime > 900) {
      prevTime = time;
      btnToggleTheory.classList.toggle("_");
    }
    window.requestAnimationFrame(toggle_);
  }
  window.requestAnimationFrame(toggle_);
})();

///////////////////////////////////////////////////////////////

const maxLength = Math.floor(
  document.getElementById("display").getBoundingClientRect().width * 0.8
);
const lengthInput = document.getElementById("length-count");
const lengthLabel = document.querySelector('label[for="length-count"]');

lengthInput.max = maxLength.toString();
lengthInput.value = Math.floor(maxLength / 10).toString();
lengthLabel.textContent = lengthInput.value;

display.initialize(document.getElementById("display"));
display.show(lengthInput.value);

lengthInput.onmousemove = sliderMove;
lengthInput.onchange = (e) => {
  sliderMove(e);
  btnNewArray.click();
};
function sliderMove(e) {
  lengthLabel.textContent = e.target.value;
}

var btnNewArray = document.getElementById("btn-newArray");
btnNewArray.addEventListener("click", () => {
  display.show(lengthInput.value);
  document.getElementById("btn-stopSorting").style.visibility = "hidden";
  display.activeButtons();
});

var btnSort = document.getElementById("btn-sort");
btnSort.addEventListener("click", () => {
  display.sort(sortSelect.value);
});

var btnShuffle = document.getElementById("btn-shuffle");
btnShuffle.addEventListener("click", () => {
  display.shuffle();
});

var btnShowTheory = document.getElementById("toggle-theory");
btnShowTheory.addEventListener("click", () => {
  showPage(sortSelect.value);
});

var btnCloseTheory = document.getElementById("close-theory");
btnCloseTheory.addEventListener("click", () => {
  closePage();
});
