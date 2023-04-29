export const toggleActive = (dom1, dom2, dom3, boolean) => () => {
  if (dom3) {
    dom1.classList.add('active');
    dom2.classList.remove('active');

    if (
      dom2.classList.contains('active') ||
      dom1.classList.contains('active')
    ) {
      dom3.classList.remove('active');
      if (boolean) {
        dom3.classList.add('active');
        dom1.classList.remove('active');
        dom2.classList.remove('active');
      }
    }
  } else {
    dom1.classList.add('active');
    dom2.classList.remove('active');
  }
};

export const handleYourFeedClick = () => {
  const yourFeedElement = document.querySelector('.nav-pills .nav-item a');
  const globalFeedElement = document.querySelector(
    '.nav-pills .nav-item:nth-child(2) a'
  );

  const tagFeedElement = document.querySelector(
    '.nav-pills .nav-item:nth-child(3) a'
  );

  const setActive = toggleActive(
    yourFeedElement,
    globalFeedElement,
    tagFeedElement
  );
  setActive();
};

export const handleGlobalFeedClick = () => {
  const globalFeedElement = document.querySelector(
    '.nav-pills .nav-item:nth-child(2) a'
  );
  const yourFeedElement = document.querySelector('.nav-pills .nav-item a');

  const tagFeedElement = document.querySelector(
    '.nav-pills .nav-item:nth-child(3) a'
  );
  const setActive = toggleActive(
    globalFeedElement,
    yourFeedElement,
    tagFeedElement
  );
  setActive();
};

export const handleTagsFeedClick = () => {
  const globalFeedElement = document.querySelector(
    '.nav-pills .nav-item:nth-child(2) a'
  );
  const yourFeedElement = document.querySelector('.nav-pills .nav-item a');
  const tagFeedElement = document.querySelector(
    '.nav-pills .nav-item:nth-child(3) a'
  );

  console.log(tagFeedElement);

  const setActive = toggleActive(
    globalFeedElement,
    yourFeedElement,
    tagFeedElement,
    true
  );
  setActive();
};
