const html = document.querySelector('html');
const body = document.querySelector('body');
const popupButtonOpen = body.querySelector('.nav__link-popup');
const popupButtonClose = body.querySelector('.popup__button-close');
const overlay = body.querySelector('.overlay');

const toggleHiddenClass = () => {
  overlay.classList.toggle('visible');
  body.classList.toggle('overflow-hidden');
  html.classList.toggle('overflow-hidden');
};

const onButtonClick = (evt) => {
  evt.preventDefault();
  toggleHiddenClass();
};

const onOverlayClick = (evt) => {
  const target = evt.target;

  if (target === overlay) toggleHiddenClass();
};

const onEscClick = (evt) => {
  if (evt.keyCode === 27) {
    toggleHiddenClass();

    // window.removeEventListener('keydown', onEscClick);
  }
};

popupButtonOpen.addEventListener('click', onButtonClick);
popupButtonClose.addEventListener('click', onButtonClick);
overlay.addEventListener('click', onOverlayClick);
window.addEventListener('keydown', onEscClick);
