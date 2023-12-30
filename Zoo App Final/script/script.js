const scrollContainer = document.getElementById("scroll-container");
const sections = document.querySelectorAll("section");

let currentSection = 0;
let isScrolling = false;

function smoothScroll(element, targetPosition, duration) {
  const startPosition = element.scrollTop;
  const distance = targetPosition - startPosition;
  const startTime = performance.now();

  function scrollAnimation(currentTime) {
    const elapsedTime = currentTime - startTime;
    const scrollProgress = Math.min(elapsedTime / duration, 1);
    element.scrollTop = startPosition + distance * ease(scrollProgress);

    if (elapsedTime < duration) {
      requestAnimationFrame(scrollAnimation);
    }
  }
  function ease(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  }
  requestAnimationFrame(scrollAnimation);
}

function scrollContainers(event) {
  console.log(event);
  event.preventDefault();
  if (!isScrolling) {
    isScrolling = true;

    setTimeout(() => {
      isScrolling = false;
    }, 300);

    const delta = Math.sign(event.deltaY);
    const nextSection = Math.min(
      sections.length - 1,
      Math.max(0, currentSection + delta)
    );

    const targetPosition = sections[nextSection].offsetTop;
    smoothScroll(scrollContainer, targetPosition, 1500);
    console.log("next-->", nextSection);
    currentSection = nextSection;
  }
}

scrollContainer.addEventListener("wheel", scrollContainers);
