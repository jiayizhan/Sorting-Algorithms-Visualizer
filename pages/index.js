import { SHORT_HAND } from "../sorts/sort_algorithms";
import "animate.css";
import "./style.css";

document.documentElement.style.setProperty("--animate-duration", "250ms");
document.documentElement.style.setProperty("--animate-delay", "10ms");

const theoryPage = document.getElementById("theory-page");

const animateCSS = (element, animation, prefix = "animate__") =>
  // We create a Promise and return it
  new Promise((resolve) => {
    const animationName = `${prefix}${animation}`;

    const node = document.querySelector(element);
    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    }

    node.addEventListener("animationend", handleAnimationEnd, {
      once: true,
    });
  });

const renderPage = async (algorithm) => {
  const res = await fetch(`/pages/template.html`);
  const html = await res.text();
  document.querySelector(".container").innerHTML = html;
};

const showPage = (algorithm) => {
  renderPage(SHORT_HAND[algorithm]);
  theoryPage.classList.add("show");
  animateCSS(".container", "slideInRight");
};

const closePage = () => {
  animateCSS(".container", "slideOutRight").then((_) => {
    theoryPage.classList.remove("show");
  });
};

export { showPage, closePage };
