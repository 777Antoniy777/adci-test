import { tns } from '../../../node_modules/tiny-slider/src/tiny-slider';

const slider = tns({
  container: '.slider',
  items: 1,
  slideBy: 'page',
  center: true,
  controls: false,
  mouseDrag: true,
});
