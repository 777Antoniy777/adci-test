import { tns } from '../../../node_modules/tiny-slider/src/tiny-slider';

const reviewsSlider = tns({
  container: '.slider',
  items: 1,
  slideBy: 'page',
  center: true,
  controls: false,
  nav: false,
  mouseDrag: true,
});

console.log(33);

// const mql = window.matchMedia('(max-width: 991px)');

// const isMediaTb = (e) => {
//   if (authorSlider.isOn) authorSlider.destroy();

//   if (e.matches) {
//     authorSlider = authorSlider.rebuild();
//   }
// };

// isMediaTb(mql);
// mql.addListener(isMediaTb);
