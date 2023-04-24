export const toggleActive = (dom1, dom2) => () => {
  dom1.classList.remove('disabled');
  dom1.classList.add('active');
  dom2.classList.remove('active');
  dom2.classList.add('disabled');
};

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
