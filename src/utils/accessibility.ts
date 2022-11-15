export const handlePageLoad = (opts?: {
  title?: string;
  noFocusH1?: boolean;
}) => {
  const { title, noFocusH1 } = opts || {};
  const h1 = document.querySelector("h1");
  if (h1 && !noFocusH1) {
    h1.tabIndex = -1;
    h1?.focus();
  }

  document.title = title || h1?.innerText || document.title;
};
