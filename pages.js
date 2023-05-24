import "animate.css";

document.documentElement.style.setProperty("--animate-duration", "250ms");
document.documentElement.style.setProperty("--animate-delay", "10ms");

const theoryPage = document.getElementById("theory-page");

const animateCSS = (element, animation, prefix = "animate__") =>
  // We create a Promise and return it
  new Promise((resolve) => {
    const animationName = `${prefix}${animation}`;

    element.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      element.classList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    }

    element.addEventListener("animationend", handleAnimationEnd, {
      once: true,
    });
  });

const showPage = (algorithm) => {
  theoryPage.classList.add("show");
  animateCSS(theoryPage, "slideInRight");
};

const closePage = () => {
  animateCSS(theoryPage, "slideOutRight").then((_) => {
    theoryPage.classList.remove("show");
  });
};

export { showPage, closePage };
