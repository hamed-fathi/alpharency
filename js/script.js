"use strict";

//query selectors:
const btnBackToTop = document.querySelector(`.arrow-top-container`);
const header = document.querySelector(`.header`);
const sectionHero = document.querySelector(`.section-hero`);
const sectionFaq = document.querySelector(`.section-faq`);
const faqBtn = document.querySelector(`.faq`);
const aboutUsBtn = document.querySelector(`.about-us`);
const sectionStatues = document.querySelector(`.section-statues`);
const contactUsBtn = document.querySelector(`.contact-us`);
const footer = document.querySelector(`.footer`);
const mainNav = document.querySelector(`.main-nav`);
const sectionCourses = document.querySelector(`.section-courses`);
////////////////////////////////////////
//scroll codes:

// back to top btn:
btnBackToTop.addEventListener(`click`, function (e) {
  e.preventDefault();
  header.scrollIntoView({ behavior: "smooth" });
});

// scroll to faq:
faqBtn.addEventListener("click", function (e) {
  e.preventDefault();
  sectionFaq.scrollIntoView({ behavior: `smooth` });
});

// scroll to about us:
aboutUsBtn.addEventListener(`click`, function (e) {
  e.preventDefault();
  sectionStatues.scrollIntoView({ behavior: "smooth" });
});

////////////////////////////////////////
//sticky navigation:
const navHeight = mainNav.getBoundingClientRect().height;

const obsCallback = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    mainNav.classList.add(`sticky`);
  } else {
    mainNav.classList.remove(`sticky`);
  }
};

const headerObserver = new IntersectionObserver(obsCallback, {
  root: null,
  threshold: 0.01, // Use a tiny threshold instead of 0
  rootMargin: `-${navHeight}px 0px 0px 0px`, // Explicitly define margins
});

headerObserver.observe(header);
///////////////////////////////////////

/////////////////////////// testimonial slider:
const slides = document.querySelectorAll(`.slider`);
const sliderBtn = document.querySelector(`.slider-arrow-btn`);
const dotContainer = document.querySelector(`.test-slider-dots`);

// init:
let curSlide = 0;

const maxSlide = slides.length - 1;

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${130 * (i - slide)}%)`)
  );
};

const nextSlide = function () {
  if (curSlide === maxSlide) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  goToSlide(curSlide);
  activateDot(curSlide);
};

goToSlide(0);

sliderBtn.addEventListener(`click`, nextSlide);

const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      `beforeend`,
      `<button class="test-slider-dot test-side-dots" data-slide="${i}"></button> `
    );
  });
};

createDots();

// dots also change the slider page:
dotContainer.addEventListener(`click`, function (e) {
  if (e.target.classList.contains(`test-slider-dot`)) {
    const slide = e.target.dataset.slide;
    goToSlide(slide);
    activateDot(slide);
  }
});

const activateDot = function (slide) {
  document
    .querySelectorAll(`.test-slider-dot`)
    .forEach((dot) => dot.classList.remove(`test-slider-dot-active`));

  document
    .querySelector(`.test-slider-dot[data-slide="${slide}"]`)
    .classList.add(`test-slider-dot-active`);
};

activateDot(0);

/////////////////////////// courses slider:
const cSlide = document.querySelectorAll(`.courses-card`);

// init:
let curCSlide = 0;

const goToCSlide = function (slide) {
  cSlide.forEach(
    (s, i) => (s.style.transform = `translateX(${112 * (i - slide)}%)`)
  );
};

goToCSlide(curCSlide);

const maxCSlide = cSlide.length;

const nextCSlide = function () {
  if (curCSlide === maxCSlide - 1) {
    curCSlide = 0;
  } else {
    curCSlide++;
  }
  goToCSlide(curCSlide);
  cActiveDot(curCSlide);
};
const prevCSlide = function () {
  if (curCSlide === 0) {
    curCSlide = maxCSlide - 1;
  } else {
    curCSlide--;
  }
  goToCSlide(curCSlide);
  cActiveDot(curCSlide);
};

const leftArrow = document.querySelector(`.left-arrow`);
const rightArrow = document.querySelector(`.right-arrow`);
leftArrow.addEventListener(`click`, prevCSlide);
rightArrow.addEventListener(`click`, nextCSlide);

const cDotContainer = document.querySelector(`.slider-dots`);

const cCreateDots = function () {
  cSlide.forEach(function (_, i) {
    cDotContainer.insertAdjacentHTML(
      `beforeend`,
      `<button class="slider-dot side-dots" data-slide="${i}"></button>`
    );
  });
};
cCreateDots();

// dots also change the slider page:
cDotContainer.addEventListener(`click`, function (e) {
  if (e.target.classList.contains(`slider-dot`)) {
    const slide = e.target.dataset.slide;
    curCSlide = Number(slide); // Update curCSlide to the clicked dot's slide

    goToCSlide(curCSlide);
    cActiveDot(curCSlide);
  }
});

const cActiveDot = function (slide) {
  document
    .querySelectorAll(`.slider-dot`)
    .forEach((dot) => dot.classList.remove(`dots__dot--active`));

  document
    .querySelector(`.slider-dot[data-slide="${slide}"]`)
    .classList.add(`dots__dot--active`);
};

cActiveDot(curCSlide);

/////////////////////////// top courses slider
const tCSlide = document.querySelectorAll(`.top-courses-card`);

// init:
let curTCSlide = 0;

const goToTCSlide = function (slide) {
  tCSlide.forEach(
    (s, i) => (s.style.transform = `translateX(${112 * (i - slide)}%)`)
  );
};
goToTCSlide(curTCSlide);

const maxTCSlide = tCSlide.length;

const nextTCSlide = function () {
  if (curTCSlide === maxTCSlide - 1) {
    curTCSlide = 0;
  } else {
    curTCSlide++;
  }
  goToTCSlide(curTCSlide);
  tCAtivateDot(curTCSlide);
};

const prevTCSlide = function () {
  if (curTCSlide === 0) {
    curTCSlide = maxTCSlide - 1;
  } else {
    curTCSlide--;
  }
  goToTCSlide(curTCSlide);
  tCAtivateDot(curTCSlide);
};

const leftArrowTC = document.querySelector(`.left-arrow-topcourse`);
const rightArrowTC = document.querySelector(`.right-arrow-topcourse`);

leftArrowTC.addEventListener(`click`, prevTCSlide);
rightArrowTC.addEventListener(`click`, nextTCSlide);

const tCDotContainer = document.querySelector(`.slider-dots-topcourse`);

const tCCreateDots = function () {
  tCSlide.forEach(function (_, i) {
    tCDotContainer.insertAdjacentHTML(
      `beforeend`,
      `<button class="tCslider-dot side-dots" data-slide="${i}"></button>`
    );
  });
};

tCCreateDots();

// dots also change the slider page:
tCDotContainer.addEventListener(`click`, function (e) {
  if (e.target.classList.contains(`tCslider-dot`)) {
    const slide = e.target.dataset.slide;
    curTCSlide = Number(slide);
    goToTCSlide(curTCSlide);
    tCAtivateDot(curTCSlide);
  }
});

const tCAtivateDot = function (slide) {
  document
    .querySelectorAll(`.tCslider-dot`)
    .forEach((dot) => dot.classList.remove(`dots__dot--active`));

  document
    .querySelector(`.tCslider-dot[data-slide="${slide}"]`)
    .classList.add(`dots__dot--active`);
};

tCAtivateDot(curTCSlide);

/////////////////////////// blog slider

const bSlide = document.querySelectorAll(`.slider-card`);

// init:
let curBSlide = 0;

const goToBSlide = function (slide) {
  bSlide.forEach(
    (s, i) => (s.style.transform = `translateX(${112 * (i - slide)}%)`)
  );
};

goToBSlide(curBSlide);

const maxBSlide = bSlide.length;

const nextBSlide = function () {
  if (curBSlide === maxBSlide - 1) {
    curBSlide = 0;
  } else {
    curBSlide++;
  }
  goToBSlide(curBSlide);
  bActiveDot(curBSlide);
};

const prevBSlide = function () {
  if (curBSlide === 0) {
    curBSlide = maxBSlide - 1;
  } else {
    curBSlide--;
  }
  goToBSlide(curBSlide);
  bActiveDot(curBSlide);
};

const leftArrowA = document.querySelector(`.left-arrow--b`);
const leftArrowB = document.querySelector(`.right-arrow--b`);

leftArrowA.addEventListener(`click`, prevBSlide);
leftArrowB.addEventListener(`click`, nextBSlide);

const bDotContainer = document.querySelector(`.blog-slider-dots`);

const bCreateDots = function () {
  bSlide.forEach(function (_, i) {
    bDotContainer.insertAdjacentHTML(
      `beforeend`,
      `<button class="Bslider-dot side-dots" data-slide="${i}"></button>`
    );
  });
};
bCreateDots();

// dots also change the slider page:
bDotContainer.addEventListener(`click`, function (e) {
  if (e.target.classList.contains(`Bslider-dot`)) {
    const slide = e.target.dataset.slide;
    curBSlide = Number(slide);
    goToBSlide(curBSlide);
    bActiveDot(curBSlide);
  }
});

const bActiveDot = function (slide) {
  document
    .querySelectorAll(`.Bslider-dot`)
    .forEach((dot) => dot.classList.remove(`dots__dot--active`));
  document
    .querySelector(`.Bslider-dot[data-slide="${slide}"]`)
    .classList.add(`dots__dot--active`);
};
bActiveDot(curBSlide);

/////////////////////////// blog slider

const catSlide = document.querySelectorAll(`.cat-slide`);

// init:

let curCatSlide = 0;

const goToCatSlide = function (slide) {
  catSlide.forEach(
    (s, i) => (s.style.transform = `translateY(${110 * (i - slide)}%)`)
  );
};
const maxCatSlide = catSlide.length;

goToCatSlide(curCatSlide);

const nextCatSlide = function () {
  if (curCatSlide === maxCatSlide - 1) {
    curCatSlide = 0;
  } else {
    curCatSlide++;
  }
  goToCatSlide(curCatSlide);
  catActiveDot(curCatSlide);
};

const prevCatSlide = function () {
  if (curCatSlide === 0) {
    curCatSlide = maxCatSlide - 1;
  } else {
    curCatSlide--;
  }
  goToCatSlide(curCatSlide);
  catActiveDot(curCatSlide);
};

const topArrow = document.querySelector(`.cat-arrow`);

topArrow.addEventListener(`click`, nextCatSlide);

// mobile version arrows:
const leftArrowM2 = document.querySelector(`.cat-mobile-left--2`);
const rightArrowM2 = document.querySelector(`.cat-mobile-right--2`);
leftArrowM2.addEventListener(`click`, prevCatSlide);
rightArrowM2.addEventListener(`click`, nextCatSlide);

const catDotContainer = document.querySelector(`.cat-dots`);

const catCreateDots = function () {
  catSlide.forEach(function (_, i) {
    catDotContainer.insertAdjacentHTML(
      `beforeend`,
      `<button class="catslider-dot side-dots" data-slide="${i}"></button>`
    );
  });
};
catCreateDots();

// dots also change the slider page:
catDotContainer.addEventListener(`click`, function (e) {
  if (e.target.classList.contains(`catslider-dot`)) {
    const slide = e.target.dataset.slide;
    curCatSlide = Number(slide);
    goToCatSlide(curCatSlide);
    catActiveDot(curCatSlide);
  }
});

const catActiveDot = function (slide) {
  document
    .querySelectorAll(`.catslider-dot`)
    .forEach((dot) => dot.classList.remove(`dots__dot--active`));
  document
    .querySelector(`.catslider-dot[data-slide="${slide}"]`)
    .classList.add(`dots__dot--active`);
};
catActiveDot(curCatSlide);

///////////////////////////// mobile cat slider

const catMSlide = document.querySelectorAll(`.cat-sd`);

// init:
let curCatMSlide = 0;

const goToCatMSlide = function (slide) {
  catMSlide.forEach(
    (s, i) =>
      (s.style.transform = `translate(-50%, -50%) translateX(${
        120 * (i - slide)
      }%)`)
  );
  console.log(slide);
};
goToCatMSlide(curCatMSlide);

const maxCatMSlide = catMSlide.length;

const nextCatMSlide = function () {
  if (curCatMSlide === maxCatMSlide - 1) {
    curCatMSlide = 0;
  } else {
    curCatMSlide++;
  }
  goToCatMSlide(curCatMSlide);
  catMAtivateDot(curCatMSlide);
};

const preCatMSlide = function () {
  if (curCatMSlide === 0) {
    curCatMSlide = maxCatMSlide - 1;
  } else {
    curCatMSlide--;
  }
  goToCatMSlide(curCatMSlide);
  catMAtivateDot(curCatMSlide);
};

const leftArrowM = document.querySelector(`.cat-mobile-left`);
const rightArrowM = document.querySelector(`.cat-mobile-right`);

leftArrowM.addEventListener(`click`, preCatMSlide);
rightArrowM.addEventListener(`click`, nextCatMSlide);

// add dots
const catMContainer = document.querySelector(`.slider-mdots`);

const catMCreateDots = function () {
  catMSlide.forEach(function (_, i) {
    catMContainer.insertAdjacentHTML(
      `beforeend`,
      `<button class="catMSlider-dot side-dots" data-slide="${i}"></button>`
    );
  });
};

catMCreateDots();

// dots also change the slider page:
catMContainer.addEventListener(`click`, function (e) {
  if (e.target.classList.contains(`catMSlider-dot`)) {
    const slide = e.target.dataset.slide;
    curCatMSlide = Number(slide);
    goToCatMSlide(curCatMSlide);
    catMAtivateDot(curCatMSlide);
  }
});

const catMAtivateDot = function (slide) {
  document
    .querySelectorAll(`.catMSlider-dot`)
    .forEach((dot) => dot.classList.remove(`dots__dot--active`));

  document
    .querySelector(`.catMSlider-dot[data-slide="${slide}"]`)
    .classList.add(`dots__dot--active`);
};

catMAtivateDot(curCatMSlide);

///////////////////////// light mode:
let lightMode = localStorage.getItem(`lightmode`);

const themeSwitch = document.querySelector(`.theme-switch`);

const enableLightmode = () => {
  document.body.classList.add(`lightmode`);
  localStorage.setItem(`lightmode`, `active`);
};

const disableLightmode = () => {
  document.body.classList.remove(`lightmode`);
  localStorage.setItem(`lightmode`, null);
};

// check from localStorage that if last time site was on light mode :
if (lightMode === `active`) enableLightmode();

themeSwitch.addEventListener(`click`, () => {
  // update lightmode in locale:
  lightMode = localStorage.getItem(`lightmode`);

  lightMode !== "active" ? enableLightmode() : disableLightmode();
  // // same as:
  // if (lightMode !== "active") {
  //   enableLightmode();
  // } else {
  //   disableLightmode();
  // }
  // console.log(localStorage);
});

//light mode mobile:

let lightModeMobile = localStorage.getItem(`lightmode`);

const themeSwitchMobile = document.querySelector(`.theme-switch--2`);

const enableLightmodeMobile = () => {
  document.body.classList.add(`lightmode`);
  localStorage.setItem(`lightmode`, `active`);
};

const disableLightmodeMobile = () => {
  document.body.classList.remove(`lightmode`);
  localStorage.setItem(`lightmode`, null);
};

// check from localStorage that if last time site was on light mode :
if (lightModeMobile === `active`) enableLightmodeMobile();

themeSwitchMobile.addEventListener(`click`, () => {
  // update lightmode in locale:
  lightModeMobile = localStorage.getItem(`lightmode`);

  lightModeMobile !== "active"
    ? enableLightmodeMobile()
    : disableLightmodeMobile();
  // // same as:
  // if (lightModeMobile !== "active") {
  //   enableLightmodeMobile();
  // } else {
  //   disableLightmodeMobile();
  // }
  // console.log(localStorage);
});

// mobile menu:
const mobileMenuBtn = document.querySelector(".mobile-menu");
const mobilePopUpMenu = document.querySelector(".mobile-menu--2");
mobileMenuBtn.addEventListener(`click`, () => {
  mobilePopUpMenu.classList.toggle("hidden");
  mainNav.classList.toggle("scroll");
});

//mobile menu icon:

const mobileMenu = document.querySelectorAll(".mobile-menu-logo");

mobileMenu.forEach((menu) => {
  menu.addEventListener("click", () => {
    mobileMenu.forEach((b) => b.classList.toggle("hidden"));
  });
});

// Add touch support for sliders
function touchSupport(sliderContainer, swipeLeft, swipeRight) {
  let startX = 0;
  let endX = 0;
  // Get the starting X position
  sliderContainer.addEventListener(`touchstart`, (e) => {
    startX = e.touches[0].clientX;
  });
  // Update the current X position
  sliderContainer.addEventListener(`touchmove`, (e) => {
    endX = e.touches[0].clientX;
  });
  // calc move
  sliderContainer.addEventListener(`touchend`, (e) => {
    const diffX = startX - endX;
    if (diffX > 50) {
      //Swipe left
      swipeLeft();
    } else if (diffX < 50) {
      swipeRight();
    }
  });
}
//add touch support to the courses slider
const coursesSlider = document.querySelector(`.all-cards`);
touchSupport(
  coursesSlider,
  nextCSlide, // Function to go to the next slide
  prevCSlide // Function to go to the previous slide
);

//add touch support to the blog slider
const blogSlider = document.querySelector(`.blog-slider`);
touchSupport(
  blogSlider,
  nextBSlide, // Function to go to the next slide
  prevBSlide // Function to go to the previous slide
);

//add touch support to the categories slider
const categoriesSlider = document.querySelector(`.cat-slides`);
touchSupport(
  categoriesSlider,
  nextCatSlide, // Function to go to the next slide
  prevCatSlide // Function to go to the previous slide
);

// add touch support to the mobile cat slider
const mobileCat = document.querySelector(`.cat-cards-mobile`);
touchSupport(mobileCat, nextCatMSlide, preCatMSlide);

// add touch support to the best sales courses slider
const bestSaleSlider = document.querySelector(`.all-cards-topcourse`);
touchSupport(bestSaleSlider, nextTCSlide, prevTCSlide);
//
const testSlider = document.querySelector(`.slider-test`);
touchSupport(testSlider, () => {}, nextSlide);
// // test
// let startX = 0;
// let endX = 0;
// footer.addEventListener(`touchstart`, (e) => {
//   startX = e.touches[0].clientX;
// });
// // Update the current X position
// footer.addEventListener(`touchmove`, (e) => {
//   endX = e.touches[0].clientX;
// });
// // calc move
// footer.addEventListener(`touchend`, (e) => {
//   const diffX = startX - endX;
//   console.log(diffX);
// });
