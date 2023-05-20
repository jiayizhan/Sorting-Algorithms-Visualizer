var display = null;
var array = [];
var domArray = null;

function initialize(_display) {
  display = _display;
}

function show(len) {
  display.innerHTML = "";
  len = parseInt(len);
  array.length = len;
  const itemLength = 100 / len;
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

export { initialize, show };
