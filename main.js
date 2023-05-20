import { getSortingAnimation } from "./utilities";
import SORT_ALGORITHM from "./public/sort_algorithms";

// document.querySelector('#app').innerHTML = ``
const sortSelect = document.getElementById("sort-select");
const btnToggleTheory = document.getElementById("toggle-theory");

for (const [sortName, sortValue] of Object.entries(SORT_ALGORITHM)) {
  sortSelect.innerHTML += `
    <option value="${sortValue}">${sortName}</option>
  `;
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
