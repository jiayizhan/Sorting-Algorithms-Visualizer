import { getSortingAnimation } from "./utilities";
import SORT_ALGORITHM from "./sorts/sort_algorithms";

const sortSelect = document.getElementById("sort-select");
const btnToggleTheory = document.getElementById("toggle-theory");
const lengthInput = document.getElementById("length-count");
const lengthLabel = document.querySelector('label[for="length-count"]');
const display = document.getElementById("display");

let arrayLength = 100;
let itemLength;
let domArray;
const array = [];

sliderMove();
fillDisplay(arrayLength);

document.getElementById("btn-newArray").onclick = () => {
  fillDisplay(arrayLength);
};

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

lengthInput.onmousemove = sliderMove;
lengthInput.onchange = (e) => {
  sliderMove(e);
  fillDisplay(arrayLength);
};
function sliderMove(e) {
  lengthLabel.textContent = e?.target.value ?? 100;
  arrayLength = parseInt(lengthLabel.textContent);
  itemLength = 100 / arrayLength;
}

function fillDisplay(len) {
  display.innerHTML = "";
  array.length = len;
  for (let i = 0, left = 0; i < len; ++i, left += itemLength) {
    array[i] = Math.floor(Math.random() * 996) + 5;
    const div = document.createElement("div");
    div.style.height = `${array[i] / 10}%`;
    div.style.width = `${itemLength}%`;
    div.style.left = `${left}%`;
    if (len < 30) div.classList.add("border");
    display.append(div);
  }
  domArray = display.querySelectorAll("div");
}
