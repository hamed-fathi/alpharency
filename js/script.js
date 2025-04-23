"use strict";

//query selectors:
const btnBackToTop = document.querySelector(`.arrow-top-container`);
const header = document.querySelector(`.header`);
const sectionHero = document.querySelector(`.section-hero`);
const sectionTest = document.querySelector(`.section-testimonials`);
const testBtn = document.querySelector(`.test-btn`);
const aboutUsBtn = document.querySelector(`.about-us`);
const sectionStatues = document.querySelector(`.section-statues`);
const contactUsBtn = document.querySelector(`.contact-us`);
const footer = document.querySelector(`.footer`);
const mainNav = document.querySelector(`.main-nav`);
const sectionCourses = document.querySelector(`.section-courses`);
const cSlide = document.querySelectorAll(`.courses-card`);
const leftArrow = document.querySelector(`.left-arrow`);
const rightArrow = document.querySelector(`.right-arrow`);
const cDotContainer = document.querySelector(`.slider-dots`);
const tCSlide = document.querySelectorAll(`.top-courses-card`);
const leftArrowTC = document.querySelector(`.left-arrow-topcourse`);
const rightArrowTC = document.querySelector(`.right-arrow-topcourse`);
const tCDotContainer = document.querySelector(`.slider-dots-topcourse`);
const bSlide = document.querySelectorAll(`.slider-card`);
const leftArrowA = document.querySelector(`.left-arrow--b`);
const leftArrowB = document.querySelector(`.right-arrow--b`);
const bDotContainer = document.querySelector(`.blog-slider-dots`);
const slides = document.querySelectorAll(`.slider`);
const sliderBtn = document.querySelector(`.slider-arrow-btn`);
const dotContainer = document.querySelector(`.test-slider-dots`);
const catSlide = document.querySelectorAll(`.cat-slide`);
const topArrow = document.querySelector(`.cat-arrow`);
const leftArrowM2 = document.querySelector(`.cat-mobile-left--2`);
const rightArrowM2 = document.querySelector(`.cat-mobile-right--2`);
const catDotContainer = document.querySelector(`.cat-dots`);
const catMSlide = document.querySelectorAll(`.cat-sd`);
const leftArrowM = document.querySelector(`.cat-mobile-left`);
const rightArrowM = document.querySelector(`.cat-mobile-right`);
const catMContainer = document.querySelector(`.slider-mdots`);
const coursesSlider = document.querySelector(`.all-cards`);
const bestSaleSlider = document.querySelector(`.all-cards-topcourse`);
const blogSlider = document.querySelector(`.blog-slider`);
const testSlider = document.querySelector(`.slider-test`);
const categoriesSlider = document.querySelector(`.cat-slides`);
const mobileCat = document.querySelector(`.cat-cards-mobile`);

////////////////////////////////////////

// --- cookie mesaage ---
const message = document.createElement(`div`);
message.classList.add(`cookie`);
message.innerHTML = `We use cookies for improvment. <button class="cookie-btn">Got it!</button>`;
header.append(message);
const cookieBtn = document.querySelector(`.cookie-btn`);
cookieBtn.addEventListener(`click`, () => {
  message.remove();
  // //or
  // message.classList.add(`hidden`);
});

// --- sticky nav height ---
const mainNavHeight = mainNav.getBoundingClientRect().height;

// // --- scroll codes ---
// // --- back to top btn ---
// // --- new way(best when you dont have sticky nav) ---
// btnBackToTop.addEventListener(`click`, function (e) {
//   e.preventDefault();
//   header.scrollIntoView({ behavior: "smooth" });
// });

// --- use old method becuse of sticky nav ---
const scroller = function (btn, to) {
  btn.addEventListener(`click`, function (e) {
    e.preventDefault();
    // --- Check if elements exist ---
    if (!btn || !to) {
      console.error("Button not found!");
      return;
    }
    window.scrollTo({
      left: to.getBoundingClientRect().left + pageXOffset,
      top: to.getBoundingClientRect().top + pageYOffset - mainNavHeight,
      behavior: `smooth`,
    });
  });
};
scroller(btnBackToTop, header);

// --- scroll to faq ---
scroller(testBtn, sectionTest);

// --- scroll to about us ---
scroller(aboutUsBtn, sectionStatues);

// --- revealing on scroll ---
const allSections = document.querySelectorAll(`section`);

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove(`section--hidden`);
  observer.unobserve(entry.target);
};

const sectionObs = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  section.classList.add(`section--hidden`);
  sectionObs.observe(section);
});

//--- lazy loading images ---
const imgTarget = document.querySelectorAll(`img[data-src]`);

const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  // --- replace src with data-src ---
  entry.target.src = entry.target.dataset.src;
  // --- after chainging src, load event would be fired ---
  entry.target.addEventListener(`load`, () => {
    entry.target.classList.remove(`lazy-img`);
  });
  observer.unobserve(entry.target);
};

const imgObs = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  // rootMargin:`200px`,
});

imgTarget.forEach((img) => {
  imgObs.observe(img);
});

// --- fade nav links and icons ---
const fadeNav = function (eventName, hoverEl, commenParent, opacity) {
  mainNav.addEventListener(`${eventName}`, function (e) {
    if (e.target.closest(`.${hoverEl}`)) {
      const hovered = e.target.closest(`.${hoverEl}`);
      const sibling = hovered
        .closest(`.${commenParent}`)
        .querySelectorAll(`.${hoverEl}`);
      sibling.forEach((el) => {
        if (el !== hovered) {
          el.style.opacity = `${opacity}`;
        }
      });
    }
  });
};
fadeNav(`mouseover`, `header-text`, `header-links`, 0.5);
fadeNav(`mouseout`, `header-text`, `header-links`, 1);
fadeNav(`mouseover`, `list-item-icon`, `header-icons`, 0.5);
fadeNav(`mouseout`, `list-item-icon`, `header-icons`, 1);

// ---  slider function ---:
const sliderFunc = function (
  card,
  transRate,
  transXorY,
  leftArrow = null,
  rightArrow = null,
  topArrow = null,
  dotContainer,
  sliderDotClass,
  sideDotClass,
  activeDotClass,
  sliderContainer
) {
  // --- init ---:
  let curSlide = 0;
  const maxSlide = card.length;

  if (!card || !card.length) throw new Error("No cards provided");

  const goToSlide = function (sld) {
    card.forEach(
      (s, i) => (s.style.transform = `${transXorY}(${transRate * (i - sld)}%)`)
    );
  };
  goToSlide(curSlide);

  // --- next and prev slide func ---
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activeDot(curSlide);
  };
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activeDot(curSlide);
  };

  if (leftArrow) leftArrow.addEventListener(`click`, prevSlide);
  if (rightArrow) rightArrow.addEventListener(`click`, nextSlide);
  if (topArrow) topArrow.addEventListener(`click`, nextSlide);

  // --- create Dots ---
  // --- Clear existing dots ---
  dotContainer.innerHTML = "";
  const createDots = function () {
    card.forEach(function (_, i) {
      if (!dotContainer) throw new Error("dotContainer is required");
      dotContainer.insertAdjacentHTML(
        `beforeend`,
        `<button class="${sliderDotClass} ${sideDotClass}" data-slide="${i}"></button>`
      );
    });
  };
  createDots();

  // --- dots also change the slider page ---
  dotContainer.addEventListener(`click`, function (e) {
    if (e.target.classList.contains(`${sliderDotClass}`)) {
      const slide = e.target.dataset.slide;
      // --- Update curCSlide to the clicked dot's slide ---
      curSlide = Number(slide);

      goToSlide(curSlide);
      activeDot(curSlide);
    }
  });
  // --- active dots ---

  const activeDot = function (slide) {
    document
      .querySelectorAll(`.${sliderDotClass}`)
      .forEach((dot) => dot.classList.remove(`${activeDotClass}`));

    document
      .querySelector(`.${sliderDotClass}[data-slide="${slide}"]`)
      .classList.add(`${activeDotClass}`);
  };

  activeDot(curSlide);

  // // --- Add touch support for sliders ---

  let startX = 0;
  let endX = 0;
  // --- Get the starting X position ---
  sliderContainer.addEventListener(`touchstart`, (e) => {
    startX = e.touches[0].clientX;
  });
  // --- Update the current X position ---
  sliderContainer.addEventListener(`touchmove`, (e) => {
    endX = e.touches[0].clientX;
  });
  // --- calc move ---
  const swipeValue = 50;
  sliderContainer.addEventListener(`touchend`, (e) => {
    const diffX = startX - endX;
    if (diffX > swipeValue) {
      // --- Swipe left ---
      nextSlide();
    } else if (diffX < swipeValue) {
      // --- Swipe right ---
      prevSlide();
    }
  });

  // --- smooth scroll ---
};

// --- courses slider ---
sliderFunc(
  cSlide,
  112,
  `translateX`,
  leftArrow,
  rightArrow,
  null,
  cDotContainer,
  `slider-dot`,
  `side-dots`,
  `dots__dot--active`,
  coursesSlider
);

// --- top courses slider ---
sliderFunc(
  tCSlide,
  112,
  `translateX`,
  leftArrowTC,
  rightArrowTC,
  null,
  tCDotContainer,
  `tCslider-dot`,
  `side-dots`,
  `dots__dot--active`,
  bestSaleSlider
);

// --- blog slider ---
sliderFunc(
  bSlide,
  112,
  `translateX`,
  leftArrowA,
  leftArrowB,
  null,
  bDotContainer,
  `Bslider-dot`,
  `side-dots`,
  `dots__dot--active`,
  blogSlider
);

// --- testimonial slider ---
sliderFunc(
  slides,
  130,
  `translateX`,
  null,
  sliderBtn,
  null,
  dotContainer,
  `test-slider-dot`,
  `test-side-dots`,
  `test-slider-dot-active`,
  testSlider
);

// --- cat slider ---
sliderFunc(
  catSlide,
  110,
  `translateY`,
  leftArrowM2,
  rightArrowM2,
  topArrow,
  catDotContainer,
  `catslider-dot`,
  `side-dots`,
  `dots__dot--active`,
  categoriesSlider
);

// --- mobile cat slider ---
sliderFunc(
  catMSlide,
  120,
  `translate(-50%, -50%) translateX`,
  leftArrowM,
  rightArrowM,
  null,
  catMContainer,
  `catMSlider-dot`,
  `side-dots`,
  `dots__dot--active`,
  mobileCat
);

// ---  light mode ---
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

//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////

// grave yard

// // --- js way of sticky navigation ---
// const navHeight = mainNav.getBoundingClientRect().height;

// const obsCallback = function (entries) {
// // --- entries is arrays of thresholds ---
//   const [entry] = entries;
//   if (!entry.isIntersecting) {
//     mainNav.classList.add(`sticky`);
//   } else {
//     mainNav.classList.remove(`sticky`);
//   }
// };

// const headerObserver = new IntersectionObserver(obsCallback, {
//   root: null,
//   threshold: 0.1,
//   rootMargin: `-${navHeight}px 0px 0px 0px`,
// });

// headerObserver.observe(header);

/////////////////////////// fade nav links and icons:
// mainNav.addEventListener(`mouseover`, function (e) {
//   if (e.target.closest(".header-text")) {
//     const clicked = e.target;
//     const sibling = clicked
//       .closest(`.header-links`)
//       .querySelectorAll(`.header-text`);
//     sibling.forEach((el) => {
//       if (el !== clicked) {
//         el.style.opacity = 0.5;
//       }
//     });
//   }
// });

// mainNav.addEventListener(`mouseout`, function (e) {
//   if (e.target.closest(".header-text")) {
//     const clicked = e.target;
//     const sibling = clicked
//       .closest(`.header-links`)
//       .querySelectorAll(`.header-text`);
//     sibling.forEach((el) => {
//       if (el !== clicked) {
//         el.style.opacity = 1;
//       }
//     });
//   }
// });

// //used closest in clicked cus icons have more than just 1 element(svg inside):

// mainNav.addEventListener(`mouseover`, function (e) {
//   if (e.target.closest(`.list-item-icon`)) {
//     const clicked = e.target.closest(".list-item-icon");
//     const sibling = clicked
//       .closest(`.header-icons`)
//       .querySelectorAll(`.list-item-icon`);
//     sibling.forEach((el) => {
//       if (el !== clicked) {
//         el.style.opacity = 0.5;
//       }
//     });
//   }
// });

// mainNav.addEventListener(`mouseout`, function (e) {
//   if (e.target.closest(`.list-item-icon`)) {
//     const clicked = e.target.closest(".list-item-icon");
//     const sibling = clicked
//       .closest(`.header-icons`)
//       .querySelectorAll(`.list-item-icon`);
//     sibling.forEach((el) => {
//       if (el !== clicked) {
//         el.style.opacity = 1;
//       }
//     });
//   }
// });

///////////////////////////--- courses slider ---:
// // init:
// let curCSlide = 0;

// const goToCSlide = function (slide) {
//   cSlide.forEach(
//     (s, i) => (s.style.transform = `translateX(${112 * (i - slide)}%)`)
//   );
// };

// goToCSlide(curCSlide);

// const maxCSlide = cSlide.length;

// const nextCSlide = function () {
//   if (curCSlide === maxCSlide - 1) {
//     curCSlide = 0;
//   } else {
//     curCSlide++;
//   }
//   goToCSlide(curCSlide);
//   cActiveDot(curCSlide);
// };
// const prevCSlide = function () {
//   if (curCSlide === 0) {
//     curCSlide = maxCSlide - 1;
//   } else {
//     curCSlide--;
//   }
//   goToCSlide(curCSlide);
//   cActiveDot(curCSlide);
// };

// const leftArrow = document.querySelector(`.left-arrow`);
// const rightArrow = document.querySelector(`.right-arrow`);
// leftArrow.addEventListener(`click`, prevCSlide);
// rightArrow.addEventListener(`click`, nextCSlide);

// const cDotContainer = document.querySelector(`.slider-dots`);

// const cCreateDots = function () {
//   cSlide.forEach(function (_, i) {
//     cDotContainer.insertAdjacentHTML(
//       `beforeend`,
//       `<button class="slider-dot side-dots" data-slide="${i}"></button>`
//     );
//   });
// };
// cCreateDots();

// // dots also change the slider page:
// cDotContainer.addEventListener(`click`, function (e) {
//   if (e.target.classList.contains(`slider-dot`)) {
//     const slide = e.target.dataset.slide;
//     curCSlide = Number(slide); // Update curCSlide to the clicked dot's slide

//     goToCSlide(curCSlide);
//     cActiveDot(curCSlide);
//   }
// });

// const cActiveDot = function (slide) {
//   document
//     .querySelectorAll(`.slider-dot`)
//     .forEach((dot) => dot.classList.remove(`dots__dot--active`));

//   document
//     .querySelector(`.slider-dot[data-slide="${slide}"]`)
//     .classList.add(`dots__dot--active`);
// };

// cActiveDot(curCSlide);

/////////////////////////// --- top courses slider ---
// // init:
// let curTCSlide = 0;

// const goToTCSlide = function (slide) {
//   tCSlide.forEach(
//     (s, i) => (s.style.transform = `translateX(${112 * (i - slide)}%)`)
//   );
// };
// goToTCSlide(curTCSlide);

// const maxTCSlide = tCSlide.length;

// const nextTCSlide = function () {
//   if (curTCSlide === maxTCSlide - 1) {
//     curTCSlide = 0;
//   } else {
//     curTCSlide++;
//   }
//   goToTCSlide(curTCSlide);
//   tCAtivateDot(curTCSlide);
// };

// const prevTCSlide = function () {
//   if (curTCSlide === 0) {
//     curTCSlide = maxTCSlide - 1;
//   } else {
//     curTCSlide--;
//   }
//   goToTCSlide(curTCSlide);
//   tCAtivateDot(curTCSlide);
// };

// const leftArrowTC = document.querySelector(`.left-arrow-topcourse`);
// const rightArrowTC = document.querySelector(`.right-arrow-topcourse`);

// leftArrowTC.addEventListener(`click`, prevTCSlide);
// rightArrowTC.addEventListener(`click`, nextTCSlide);

// const tCDotContainer = document.querySelector(`.slider-dots-topcourse`);

// const tCCreateDots = function () {
//   tCSlide.forEach(function (_, i) {
//     tCDotContainer.insertAdjacentHTML(
//       `beforeend`,
//       `<button class="tCslider-dot side-dots" data-slide="${i}"></button>`
//     );
//   });
// };

// tCCreateDots();

// // dots also change the slider page:
// tCDotContainer.addEventListener(`click`, function (e) {
//   if (e.target.classList.contains(`tCslider-dot`)) {
//     const slide = e.target.dataset.slide;
//     curTCSlide = Number(slide);
//     goToTCSlide(curTCSlide);
//     tCAtivateDot(curTCSlide);
//   }
// });

// const tCAtivateDot = function (slide) {
//   document
//     .querySelectorAll(`.tCslider-dot`)
//     .forEach((dot) => dot.classList.remove(`dots__dot--active`));

//   document
//     .querySelector(`.tCslider-dot[data-slide="${slide}"]`)
//     .classList.add(`dots__dot--active`);
// };

// tCAtivateDot(curTCSlide);

/////////////////////////// blog slider

// // init:
// let curBSlide = 0;

// const goToBSlide = function (slide) {
//   bSlide.forEach(
//     (s, i) => (s.style.transform = `translateX(${112 * (i - slide)}%)`)
//   );
// };

// goToBSlide(curBSlide);

// const maxBSlide = bSlide.length;

// const nextBSlide = function () {
//   if (curBSlide === maxBSlide - 1) {
//     curBSlide = 0;
//   } else {
//     curBSlide++;
//   }
//   goToBSlide(curBSlide);
//   bActiveDot(curBSlide);
// };

// const prevBSlide = function () {
//   if (curBSlide === 0) {
//     curBSlide = maxBSlide - 1;
//   } else {
//     curBSlide--;
//   }
//   goToBSlide(curBSlide);
//   bActiveDot(curBSlide);
// };

// const leftArrowA = document.querySelector(`.left-arrow--b`);
// const leftArrowB = document.querySelector(`.right-arrow--b`);

// leftArrowA.addEventListener(`click`, prevBSlide);
// leftArrowB.addEventListener(`click`, nextBSlide);

// const bDotContainer = document.querySelector(`.blog-slider-dots`);

// const bCreateDots = function () {
//   bSlide.forEach(function (_, i) {
//     bDotContainer.insertAdjacentHTML(
//       `beforeend`,
//       `<button class="Bslider-dot side-dots" data-slide="${i}"></button>`
//     );
//   });
// };
// bCreateDots();

// // dots also change the slider page:
// bDotContainer.addEventListener(`click`, function (e) {
//   if (e.target.classList.contains(`Bslider-dot`)) {
//     const slide = e.target.dataset.slide;
//     curBSlide = Number(slide);
//     goToBSlide(curBSlide);
//     bActiveDot(curBSlide);
//   }
// });

// const bActiveDot = function (slide) {
//   document
//     .querySelectorAll(`.Bslider-dot`)
//     .forEach((dot) => dot.classList.remove(`dots__dot--active`));
//   document
//     .querySelector(`.Bslider-dot[data-slide="${slide}"]`)
//     .classList.add(`dots__dot--active`);
// };
// bActiveDot(curBSlide);

/////////////////////////////testimonial slider:
// const slides = document.querySelectorAll(`.slider`);
// const sliderBtn = document.querySelector(`.slider-arrow-btn`);
// const dotContainer = document.querySelector(`.test-slider-dots`);

// // init:
// let curSlide = 0;

// const maxSlide = slides.length - 1;

// const goToSlide = function (slide) {
//   slides.forEach(
//     (s, i) => (s.style.transform = `translateX(${130 * (i - slide)}%)`)
//   );
// };

// const nextSlide = function () {
//   if (curSlide === maxSlide) {
//     curSlide = 0;
//   } else {
//     curSlide++;
//   }

//   goToSlide(curSlide);
//   activateDot(curSlide);
// };

// goToSlide(0);

// sliderBtn.addEventListener(`click`, nextSlide);

// const createDots = function () {
//   slides.forEach(function (_, i) {
//     dotContainer.insertAdjacentHTML(
//       `beforeend`,
//       `<button class="test-slider-dot test-side-dots" data-slide="${i}"></button> `
//     );
//   });
// };

// createDots();

// // dots also change the slider page:
// dotContainer.addEventListener(`click`, function (e) {
//   if (e.target.classList.contains(`test-slider-dot`)) {
//     const slide = e.target.dataset.slide;
//     goToSlide(slide);
//     activateDot(slide);
//   }
// });

// const activateDot = function (slide) {
//   document
//     .querySelectorAll(`.test-slider-dot`)
//     .forEach((dot) => dot.classList.remove(`test-slider-dot-active`));

//   document
//     .querySelector(`.test-slider-dot[data-slide="${slide}"]`)
//     .classList.add(`test-slider-dot-active`);
// };

// activateDot(0);

/////////////////////////// cat slider

// const catSlide = document.querySelectorAll(`.cat-slide`);

// init:

// let curCatSlide = 0;

// const goToCatSlide = function (slide) {
//   catSlide.forEach(
//     (s, i) => (s.style.transform = `translateY(${110 * (i - slide)}%)`)
//   );
// };
// const maxCatSlide = catSlide.length;

// goToCatSlide(curCatSlide);

// const nextCatSlide = function () {
//   if (curCatSlide === maxCatSlide - 1) {
//     curCatSlide = 0;
//   } else {
//     curCatSlide++;
//   }
//   goToCatSlide(curCatSlide);
//   catActiveDot(curCatSlide);
// };

// const prevCatSlide = function () {
//   if (curCatSlide === 0) {
//     curCatSlide = maxCatSlide - 1;
//   } else {
//     curCatSlide--;
//   }
//   goToCatSlide(curCatSlide);
//   catActiveDot(curCatSlide);
// };

// const topArrow = document.querySelector(`.cat-arrow`);

// topArrow.addEventListener(`click`, nextCatSlide);

// mobile version arrows:
// const leftArrowM2 = document.querySelector(`.cat-mobile-left--2`);
// const rightArrowM2 = document.querySelector(`.cat-mobile-right--2`);
// leftArrowM2.addEventListener(`click`, prevCatSlide);
// rightArrowM2.addEventListener(`click`, nextCatSlide);

// const catDotContainer = document.querySelector(`.cat-dots`);

// const catCreateDots = function () {
//   catSlide.forEach(function (_, i) {
//     catDotContainer.insertAdjacentHTML(
//       `beforeend`,
//       `<button class="catslider-dot side-dots" data-slide="${i}"></button>`
//     );
//   });
// };
// catCreateDots();

// // dots also change the slider page:
// catDotContainer.addEventListener(`click`, function (e) {
//   if (e.target.classList.contains(`catslider-dot`)) {
//     const slide = e.target.dataset.slide;
//     curCatSlide = Number(slide);
//     goToCatSlide(curCatSlide);
//     catActiveDot(curCatSlide);
//   }
// });

// const catActiveDot = function (slide) {
//   document
//     .querySelectorAll(`.catslider-dot`)
//     .forEach((dot) => dot.classList.remove(`dots__dot--active`));
//   document
//     .querySelector(`.catslider-dot[data-slide="${slide}"]`)
//     .classList.add(`dots__dot--active`);
// };
// catActiveDot(curCatSlide);

// ///////////////////////////// mobile cat slider

// const catMSlide = document.querySelectorAll(`.cat-sd`);

// // init:
// let curCatMSlide = 0;

// const goToCatMSlide = function (slide) {
//   catMSlide.forEach(
//     (s, i) =>
//       (s.style.transform = `translate(-50%, -50%) translateX(${
//         120 * (i - slide)
//       }%)`)
//   );
// };
// goToCatMSlide(curCatMSlide);

// const maxCatMSlide = catMSlide.length;

// const nextCatMSlide = function () {
//   if (curCatMSlide === maxCatMSlide - 1) {
//     curCatMSlide = 0;
//   } else {
//     curCatMSlide++;
//   }
//   goToCatMSlide(curCatMSlide);
//   catMAtivateDot(curCatMSlide);
// };

// const preCatMSlide = function () {
//   if (curCatMSlide === 0) {
//     curCatMSlide = maxCatMSlide - 1;
//   } else {
//     curCatMSlide--;
//   }
//   goToCatMSlide(curCatMSlide);
//   catMAtivateDot(curCatMSlide);
// };

// const leftArrowM = document.querySelector(`.cat-mobile-left`);
// const rightArrowM = document.querySelector(`.cat-mobile-right`);

// leftArrowM.addEventListener(`click`, preCatMSlide);
// rightArrowM.addEventListener(`click`, nextCatMSlide);

// // add dots
// const catMContainer = document.querySelector(`.slider-mdots`);

// const catMCreateDots = function () {
//   catMSlide.forEach(function (_, i) {
//     catMContainer.insertAdjacentHTML(
//       `beforeend`,
//       `<button class="catMSlider-dot side-dots" data-slide="${i}"></button>`
//     );
//   });
// };

// catMCreateDots();

// // dots also change the slider page:
// catMContainer.addEventListener(`click`, function (e) {
//   if (e.target.classList.contains(`catMSlider-dot`)) {
//     const slide = e.target.dataset.slide;
//     curCatMSlide = Number(slide);
//     goToCatMSlide(curCatMSlide);
//     catMAtivateDot(curCatMSlide);
//   }
// });

// const catMAtivateDot = function (slide) {
//   document
//     .querySelectorAll(`.catMSlider-dot`)
//     .forEach((dot) => dot.classList.remove(`dots__dot--active`));

//   document
//     .querySelector(`.catMSlider-dot[data-slide="${slide}"]`)
//     .classList.add(`dots__dot--active`);
// };

// catMAtivateDot(curCatMSlide);

///////////////////////////// mobile cat slider

// // init:
// let curCatMSlide = 0;

// const goToCatMSlide = function (slide) {
//   catMSlide.forEach(
//     (s, i) =>
//       (s.style.transform = `translate(-50%, -50%) translateX(${
//         120 * (i - slide)
//       }%)`)
//   );
// };
// goToCatMSlide(curCatMSlide);

// const maxCatMSlide = catMSlide.length;

// const nextCatMSlide = function () {
//   if (curCatMSlide === maxCatMSlide - 1) {
//     curCatMSlide = 0;
//   } else {
//     curCatMSlide++;
//   }
//   goToCatMSlide(curCatMSlide);
//   catMAtivateDot(curCatMSlide);
// };

// const preCatMSlide = function () {
//   if (curCatMSlide === 0) {
//     curCatMSlide = maxCatMSlide - 1;
//   } else {
//     curCatMSlide--;
//   }
//   goToCatMSlide(curCatMSlide);
//   catMAtivateDot(curCatMSlide);
// };

// const leftArrowM = document.querySelector(`.cat-mobile-left`);
// const rightArrowM = document.querySelector(`.cat-mobile-right`);

// leftArrowM.addEventListener(`click`, preCatMSlide);
// rightArrowM.addEventListener(`click`, nextCatMSlide);

// // add dots
// const catMContainer = document.querySelector(`.slider-mdots`);

// const catMCreateDots = function () {
//   catMSlide.forEach(function (_, i) {
//     catMContainer.insertAdjacentHTML(
//       `beforeend`,
//       `<button class="catMSlider-dot side-dots" data-slide="${i}"></button>`
//     );
//   });
// };

// catMCreateDots();

// // dots also change the slider page:
// catMContainer.addEventListener(`click`, function (e) {
//   if (e.target.classList.contains(`catMSlider-dot`)) {
//     const slide = e.target.dataset.slide;
//     curCatMSlide = Number(slide);
//     goToCatMSlide(curCatMSlide);
//     catMAtivateDot(curCatMSlide);
//   }
// });

// const catMAtivateDot = function (slide) {
//   document
//     .querySelectorAll(`.catMSlider-dot`)
//     .forEach((dot) => dot.classList.remove(`dots__dot--active`));

//   document
//     .querySelector(`.catMSlider-dot[data-slide="${slide}"]`)
//     .classList.add(`dots__dot--active`);
// };

// catMAtivateDot(curCatMSlide);

///////////////////////// Add touch support for sliders
// function touchSupport(sliderContainer, swipeLeft, swipeRight) {
//   let startX = 0;
//   let endX = 0;
//   // Get the starting X position
//   sliderContainer.addEventListener(`touchstart`, (e) => {
//     startX = e.touches[0].clientX;
//   });
//   // Update the current X position
//   sliderContainer.addEventListener(`touchmove`, (e) => {
//     endX = e.touches[0].clientX;
//   });
//   // calc move
//   sliderContainer.addEventListener(`touchend`, (e) => {
//     const diffX = startX - endX;
//     if (diffX > 50) {
//       //Swipe left
//       swipeLeft();
//     } else if (diffX < 50) {
//       swipeRight();
//     }
//   });
// }
// //add touch support to the courses slider
// const coursesSlider = document.querySelector(`.all-cards`);
// touchSupport(
//   coursesSlider,
//   nextCSlide, // Function to go to the next slide
//   prevCSlide // Function to go to the previous slide
// );

// //add touch support to the blog slider
// const blogSlider = document.querySelector(`.blog-slider`);
// touchSupport(
//   blogSlider,
//   nextBSlide, // Function to go to the next slide
//   prevBSlide // Function to go to the previous slide
// );

// //add touch support to the categories slider
// const categoriesSlider = document.querySelector(`.cat-slides`);
// touchSupport(
//   categoriesSlider,
//   nextCatSlide, // Function to go to the next slide
//   prevCatSlide // Function to go to the previous slide
// );

// //add touch support to the mobile cat slider
// const mobileCat = document.querySelector(`.cat-cards-mobile`);
// touchSupport(mobileCat, nextCatMSlide, preCatMSlide);

// //add touch support to the best sales courses slider
// const bestSaleSlider = document.querySelector(`.all-cards-topcourse`);
// touchSupport(bestSaleSlider, nextTCSlide, prevTCSlide);
///////////////
// const testSlider = document.querySelector(`.slider-test`);
// touchSupport(testSlider, nextSlide, () => {});
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
