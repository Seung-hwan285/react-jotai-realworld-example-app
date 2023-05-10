export const domRemove = (domList) => domList.forEach((dom) => dom.remove());

export const createElement = (tagName, className) => {
  const element = document.createElement(tagName);

  if (className) {
    element.className = className;
  }
  return element;
};

export const appendChildrenToParent = (parent, ...children) => {
  children.forEach((child) => parent.appendChild(child));
};
