const body = document.querySelector('body');
const button = body.querySelector('.nav__button');

const onButtonClick = (evt) => {
  evt.preventDefault();
  body.classList.toggle('menu-open');
};

button.addEventListener('click', onButtonClick);
