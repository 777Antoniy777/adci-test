const wrapper = document.querySelector('.news__wrapper');
const button = wrapper.querySelector('.news__button');

const onButtonClick = (evt) => {
  evt.preventDefault();
  wrapper.classList.toggle('list-show');
  button.classList.toggle('button-scale');
};

button.addEventListener('click', onButtonClick);
