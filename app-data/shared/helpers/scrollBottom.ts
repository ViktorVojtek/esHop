export const scrollBottom = () => {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth',
  });
};
