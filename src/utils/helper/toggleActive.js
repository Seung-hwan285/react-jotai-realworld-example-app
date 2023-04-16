export const toggleActive = (dom1, dom2) => () => {
  dom1.classList.remove('disabled');
  dom1.classList.add('active');
  dom2.classList.remove('active');
  dom2.classList.add('disabled');
};
