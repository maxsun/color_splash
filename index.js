
/**
 * Add a css rule to the
 * @param {string} ruleText The rule to add.
 */
function insertStyleSheetRule(ruleText) {
  const sheets = document.styleSheets;
  const sheet = sheets[sheets.length - 1];
  sheet.insertRule(
      ruleText,
      sheet.hasOwnProperty('rules') ? sheet.rules.length : sheet.cssRules.length
  );
}

/**
 * Open a window from (x, y)
 * @param {Node} window The window to open.
 * @param {number} x
 * @param {number} y
 */
function openWindow(window, x, y) {
  const windows = document.querySelectorAll('.window');
  windows.forEach((window) => {
    window.style.zIndex -= 1;
  });
  window.style.zIndex = windows.length;
  window.classList.add('open');
  window.addEventListener('animationend', (e) => {
    window.classList.remove('open');
  });

  // Set the animation coordinates
  insertStyleSheetRule(`
  @keyframes open {
    0% {
        -webkit-clip-path: circle(0% at ${x}px ${y}px);
        clip-path: circle(0% at ${x}px ${y}px); 
    } 
    100% { 
        -webkit-clip-path: circle(150% at ${x}px ${y}px); 
        clip-path: circle(150% at ${x}px ${y}px); 
    } 
  }`);
}

window.onload = function() {
  let i = 0;
  const onclick = (e) => {
    console.log(e);
    e.preventDefault();
    if (e.type === 'touchstart') {
      e = e.touches[0];
    }
    document.body.style.setProperty('--mouse-y', e.clientY + 'px');
    document.body.style.setProperty('--mouse-x', e.clientX + 'px');
    const windows = document.querySelectorAll('.window');
    openWindow(windows[i], e.clientX, e.clientY);
    i = (i + 1) % windows.length;
  };
  document.body.addEventListener('touchstart', onclick, false );
  document.body.addEventListener('click', onclick, false);
};
