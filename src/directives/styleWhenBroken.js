export default function styleWhenBroken(el) {
  el.classList.remove("broken-image");
  if (!el.onerror) {
    el.onerror = () => {
      el.classList.add("broken-image");
    };
  }
}
