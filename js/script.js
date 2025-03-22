// Water Ripple Effect
$(".bcon").ripples({
  resolution: 512,
  dropRadius: 20,
  perturbance: 0.04,
});

setInterval(function () {
  var $el = $(".bcon");
  var x = Math.random() * $el.outerWidth();
  var y = Math.random() * $el.outerHeight();
  var dropRadius = 30;
  var strength = 0.08 + Math.random() * 0.1;

  $el.ripples("drop", x, y, dropRadius, strength);
}, 1000);

// Initialize AOS (Animate on Scroll)
AOS.init({
  useClassNames: true,
  initClassName: false,
  animatedClassName: "animated",
});

// Counter Animation
document.addEventListener("DOMContentLoaded", function () {
  let counters = document.querySelectorAll(".c_count");

  function startCounting(counter) {
    let targetNumber = parseInt(counter.innerText);
    counter.innerHTML = `<span class="counter-num">0</span><span>+</span>`;

    let countSpan = counter.querySelector(".counter-num");
    let duration = 2000 + targetNumber * 2; // Higher numbers take longer
    let steps = 100; // Total steps for smooth counting
    let increment = Math.ceil(targetNumber / steps);
    let delay = Math.ceil(duration / steps);
    let current = 0;

    function updateCount() {
      if (current < targetNumber) {
        current += increment;
        if (current > targetNumber) current = targetNumber;
        countSpan.innerText = current;
        setTimeout(updateCount, delay);
      }
    }

    updateCount();
  }

  let observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startCounting(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => {
    observer.observe(counter);
  });

  // slider
  let slides = document.querySelectorAll(".slide");
  let dots = document.querySelectorAll(".dot");
  let currentIndex = 1; // Set the middle image as active initially (index 1)

  function updateSlider() {
    slides.forEach((slide, index) => {
      slide.classList.remove("active", "next", "prev");
    });

    dots.forEach((dot) => dot.classList.remove("active"));

    slides[currentIndex].classList.add("active");
    slides[(currentIndex + 1) % slides.length].classList.add("next");
    slides[(currentIndex - 1 + slides.length) % slides.length].classList.add(
      "prev"
    );

    dots[currentIndex].classList.add("active");
  }

  function changeSlide(index) {
    currentIndex = index;
    updateSlider();
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      changeSlide(index); // Change slide when a dot is clicked
    });
  });

  slides.forEach((slide, index) => {
    slide.addEventListener("click", () => {
      changeSlide(index); // Change slide when an image is clicked
    });
  });

  updateSlider(); // Initialize the slider
});
