export const focusH1 = () => {
  const h1 = document.querySelector("h1");
  if (h1) {
    h1.tabIndex = -1;
    h1?.focus();
  }
};
