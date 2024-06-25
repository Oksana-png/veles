const btnSearch = document.querySelector('.search-btn svg');
btnSearch?.addEventListener('click', () => {
  document.querySelector('.search-input').focus();
});

function tabsStart() {
  const tabs = document.querySelectorAll('.tabs__item');

  tabs.forEach((tab, i) => {
    const title = tab.querySelector('.tabs__item-title');
    title.addEventListener('click', () => {
      tab.classList.toggle('active');
      if (tab.classList.contains('active')) {
        title.querySelector('.fontawesome use').setAttribute("xlink:href", "assets/libs/fontawesome/solid.svg#minus");
      } else {
        title.querySelector('.fontawesome use').setAttribute("xlink:href", "assets/libs/fontawesome/solid.svg#plus");
      }
    });
  });
}

function tabsTwoStart() {
  const tabs = document.querySelectorAll('.direction__item');

  tabs.forEach((tab, i) => {
    const title = tab.querySelector('.direction__item-title');
    title.addEventListener('click', () => {
      tab.classList.toggle('active');
    });
  });
}

// шапка вылазит сверху при скролле
const scrollHeader = () => {
  scrollStart();
  
  window.addEventListener("scroll", (e) => {
    scrollStart();
  });
  
  
  function scrollStart() {
    const header = document.querySelector(".header");
    const headerFixed = document.querySelector(".header-bottom");
    
    if (window.pageYOffset >= 200 && window.pageYOffset < 210 && window.innerWidth > 991) {
      headerFixed.style.transition = "none";
      headerFixed.style.transform = "translateY(-100%)";
      header.style.paddingBottom = "120px";
      headerFixed.classList.add('fixed');
    } else if (window.pageYOffset >= 210 && window.innerWidth > 991) {
      headerFixed.style.transition = "transform 0.6s ease-out";
      headerFixed.classList.add('fixed');
      headerFixed.style.transform = "translateY(0)";
    } else if (window.pageYOffset > 220 && window.pageYOffset < 250 && window.innerWidth > 991) {
      headerFixed.style.transition = "transform 0.6s ease-out";
      headerFixed.style.transform = "translateY(-100%)";
    } else {
      headerFixed.style.transition = "none";
      header.style.paddingBottom = "0";
      headerFixed.style.transform = "translateY(0)";
      headerFixed.classList.remove('fixed');
    }
  }
}

function phoneMask() {
  const eventCalllback = (e) => {
    var el = e.target,
    clearVal = el.dataset.phoneClear,
    pattern = el.dataset.phonePattern,
    matrix_def = "+_ (___) ___ __ __",
    matrix = pattern ? pattern : matrix_def,
    i = 0,
    def = matrix.replace(/\D/g, ""),
    val = e.target.value.replace(/\D/g, "");
    if (clearVal !== 'false' && e.type === 'blur') {
        if (val.length < matrix.match(/([\_\d])/g).length) {
            e.target.value = '';
            return;
        }
    }
    if (def.length >= val.length) val = def;
    e.target.value = matrix.replace(/./g, function (a) {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
    });
  }


  var phone_inputs = document.querySelectorAll('[data-phone-pattern]');
  for (let elem of phone_inputs) {
      for (let ev of ['input', 'blur', 'focus']) {
          elem.addEventListener(ev, eventCalllback);
      }
  }
}


// МОДАЛКИ
function modalAll() {
  const modalClose = (selector) => {
    const modal = document.querySelector(selector);
    const modalBody = modal.querySelector('.modal__body');
    const inputs = document.querySelectorAll(".modal.active input");

    modal.classList.remove('active');
    modalBody.classList.remove('active');
    document.querySelector('html').style.overflowY = 'scroll';

    inputs.forEach(input => {
      input.value = "";
    });
  }

  const modalOpen = (selector) => {
    const elem = selector;
    const modal = document.querySelector(elem);
    const modalBody = modal.querySelector('.modal__body');

    modal.classList.add('active');
    modalBody.classList.add('active');
    document.querySelector('html').style.overflowY = 'hidden';

    modal.addEventListener('click', (e) => {
      if (e.target.closest(".modal-close")) {
        modalClose(elem);
      }
      if (e.target.closest(".modal__body")) {
        return;
      }
      modalClose(elem);
    });
  }

  // Список всех модалок с классами и классами кнопок
  const modal = () => {
    const buttonOpenForm = document.querySelectorAll('.btn-open-consultation');
    buttonOpenForm.forEach((btn) => {
      btn.addEventListener('click', () => {
        modalOpen('.modal__form');
      });
    });

    const btnsOpenQuiz = document.querySelectorAll('.btn-open-quiz');
    btnsOpenQuiz.forEach((btn) => {
      btn.addEventListener('click', () => {
        modalOpen('.modal__quiz');
      })
    })
  }

  modal();
}

function burgerMenu() {
  const btnBurger = document.querySelector('.header-bottom__menu--burger');
  const burgerMenu = document.querySelector('.burger-menu');
  btnBurger.addEventListener('click', () => {
    burgerMenu.classList.toggle('active');
    btnBurger.classList.toggle('active');
    if (burgerMenu.classList.contains('active')) {
      document.querySelector('html').style.overflow = 'hidden';
    } else {
      document.querySelector('html').style.overflow = 'scroll';
    }
  });

  const menusDropdown = document.querySelectorAll('.burger-menu .dropdown-catalog');
  const btnsOpenMenus = document.querySelectorAll('.dropdown-catalog > .fontawesome');

  btnsOpenMenus.forEach((btnOpen) => {
    btnOpen.addEventListener('click', (e) => {
      const target = e.target;
      const menuOpen = target.closest('.dropdown-catalog');
      const submenu = menuOpen.querySelector('.dropdown-catalog__hidden');
      submenu.classList.toggle('active');
    })
  });
}

function lang() {
  const langList = document.querySelector('.languages');
  const allItems = langList.querySelectorAll('li:not(.active)');
  const activeItem = langList.querySelector('li.active');
  
  const active = document.createElement('li');
  active.classList.add('active');
  [...activeItem.children].forEach(element => {
    active.append(element);
  });

  const subMenu = document.createElement('ul');
  subMenu.classList.add('languages-sub');
  allItems.forEach(itm => {
    [...itm.children].forEach(el => {
      let item = document.createElement('li');
      item.append(el);
  
      subMenu.append(item);
    });
  })

  active.append(subMenu);

  langList.innerHTML = '';
  langList.append(active);



  const btnOpenLang = document.querySelector('.languages li.active>.fontawesome');
  btnOpenLang?.addEventListener('click', () => {
    document.querySelector('.languages .languages-sub').classList.toggle('active');
  });
}



tabsStart();
tabsTwoStart();
scrollHeader();
phoneMask();
modalAll();
burgerMenu();
lang();

const swiperClients = new Swiper('.swiper-clients', {
  // speed: 4000,
  loop: true,
  spaceBetween: 0,
  slidesPerView: 4,
  grabCursor: true,
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
  },


  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
    },
    450: {
      slidesPerView: 2,
    },
    // when window width is >= 480px
    768: {
      slidesPerView: 3,
    },
    // when window width is >= 640px
    1024: {
      slidesPerView: 4,
    }
  }

});


const swiperServices = new Swiper('.swiper-services-slider', {
  // speed: 4000,
  loop: true,
  spaceBetween: 0,
  slidesPerView: 4,
  grabCursor: true,
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true,
  },
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
    },
    450: {
      slidesPerView: 2,
    },
    // when window width is >= 480px
    768: {
      slidesPerView: 3,
    },
    // when window width is >= 640px
    1024: {
      slidesPerView: 4,
    }
  }
});


const swiperKargo = new Swiper('.swiper-kargo', {
  // speed: 4000,
  loop: true,
  spaceBetween: 0,
  slidesPerView: 4,
  grabCursor: true,

  navigation: {
    nextEl: '.swiper-kargo .navigation-new__arrow--right',
    prevEl: '.swiper-kargo .navigation-new__arrow--left',
  },

  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
    },
    450: {
      slidesPerView: 2,
    },
    // when window width is >= 480px
    768: {
      slidesPerView: 3,
    },
    // when window width is >= 640px
    1024: {
      slidesPerView: 4,
    }
  }
});


// КВИЗ
const quizSteps = new Swiper('.form-steps__swiper', {
  loop: false,
  spaceBetween: 0,
  navigation: {
    nextEl: '.form-steps__nav .btn-next',
    prevEl: '.form-steps__nav .btn-prev',
  },
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },
  allowTouchMove: false,
  breakpoints: {
    // when window width is >= 320px
    200: {
      autoHeight: true,
    },
    // when window width is >= 640px
    768: {
      autoHeight: false,
    }
  }
});


const quizStepsBtnNext = document.querySelector(".form-steps__nav .btn-next");
const quizStepsBtnPrev = document.querySelector(".form-steps__nav .btn-prev");
quizStepsBtnNext&&quizStepsBtnNext.addEventListener("click", function(e){
  submitIs();
});

quizStepsBtnPrev&&quizStepsBtnPrev.addEventListener("click", function(e){
  submitIs();
});

const submitIs = () => {
  const btnSubmit = document.querySelector('.form-steps__nav .btn-submit');
  if (quizSteps.isEnd) {
    btnSubmit.style.display = 'block';
  } else {
    btnSubmit.style.display = 'none';
  }
}


// КВИЗ В ГЛАВНОМ БЛОКЕ
const quizHero = new Swiper('.hero-quiz__swiper', {
  loop: false,
  spaceBetween: 0,
  navigation: {
    nextEl: '.hero-quiz__nav .btn-next',
    prevEl: '.hero-quiz__nav .btn-prev',
  },
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },
  allowTouchMove: false,
  autoHeight: true,
});


const quizHeroBtnNext = document.querySelector(".hero-quiz__nav .btn-next");
const quizHeroBtnPrev = document.querySelector(".hero-quiz__nav .btn-prev");
quizHeroBtnNext&&quizHeroBtnNext.addEventListener("click", function(e){
  submitIsHero();
});

quizHeroBtnPrev&&quizHeroBtnPrev.addEventListener("click", function(e){
  submitIsHero();
});

const submitIsHero = () => {
  const btnSubmit = document.querySelector('.hero-quiz__nav .btn-submit');
  if (quizHero.isEnd) {
    btnSubmit.style.display = 'block';
  } else {
    btnSubmit.style.display = 'none';
  }
}

const quiz = new Swiper('.quiz-form__swiper', {
  loop: false,
  spaceBetween: 0,
  pagination: {
    el: ".quiz .swiper-pagination",
    type: "progressbar",
  },
  navigation: {
    nextEl: '.quiz-form__nav--next',
    prevEl: '.quiz-form__nav--prev',
  },
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },
  allowTouchMove: false,
  autoHeight: true,
});

const quizBtnNext = document.querySelector(".quiz-form__nav--next");
const quizBtnPrev = document.querySelector(".quiz-form__nav--prev");
const indexSlide = document.querySelector(".quiz-form__pagin--number");
quizBtnNext&&quizBtnNext.addEventListener("click", function(e){
  submitIsQuiz();
  indexSlide.textContent = Number(indexSlide.textContent) + 1;
});

quizBtnPrev&&quizBtnPrev.addEventListener("click", function(e){
  submitIsQuiz();
  indexSlide.textContent = Number(indexSlide.textContent) - 1;
});

const submitIsQuiz = () => {
  const btnSubmit = document.querySelector('.quiz-form__swiper .btn-submit');
  if (quiz.isEnd) {
    btnSubmit.style.display = 'block';
  } else {
    btnSubmit.style.display = 'none';
  }
}