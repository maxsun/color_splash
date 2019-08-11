
/**
 * Opens a ".window".
 * 1. Lowers all other windows' zIndex
 * 2. Collapse every window
 * 3. Un-collapse window (raise zIndex and remove .collapsed)
 * @param {Node} window The first number.
 */
function openWindow(window) {
  const windows = document.querySelectorAll('.window');
  windows.forEach((w) => {
    w.style.zIndex -= 1;
  });

  window.classList.add('notransition');
  window.classList.add('collapsed');

  setTimeout(() => {
    window.classList.remove('notransition');
    window.style.zIndex = windows.length + 1;
    window.classList.remove('collapsed');
  }, 10);
}

window.onload = function() {
  const windows = document.querySelectorAll('.window');
  let i = 0;
  openWindow(windows[i]);
  const onclick = (e) => {
    document.body.style.setProperty('--mouse-x', e.clientX + 'px');
    document.body.style.setProperty('--mouse-y', e.clientY + 'px');
    i = (i + 1) % windows.length;
    openWindow(windows[i]);
  };
  document.body.addEventListener('click', onclick);
  document.body.addEventListener('touchstart', onclick);
};
