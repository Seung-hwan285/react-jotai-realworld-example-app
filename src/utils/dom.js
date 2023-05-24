export const domRemove = (domList) => domList.forEach((dom) => dom.remove());

export const createElement = (tagName, className) => {
  const element = document.createElement(tagName);

  if (tagName !== 'img' && className) {
    element.className = className;
  } else {
    element.src = className;
  }
  return element;
};

export const appendChildrenToParent = (parent, ...children) => {
  children.forEach((child) => parent?.appendChild(child));
};
