import { toggleActive } from './toggleActive.js';

export const handleYourFeedClick = () => {
  const yourFeedElement = document.querySelector('.nav-pills .nav-item a');
  const globalFeedElement = document.querySelector(
    '.nav-pills .nav-item:nth-child(2) a'
  );

  const setActive = toggleActive(yourFeedElement, globalFeedElement);
  setActive();
};

export const handleGlobalFeedClick = () => {
  const globalFeedElement = document.querySelector(
    '.nav-pills .nav-item:nth-child(2) a'
  );
  const yourFeedElement = document.querySelector('.nav-pills .nav-item a');
  const setActive = toggleActive(globalFeedElement, yourFeedElement);
  setActive();
};
