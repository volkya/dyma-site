const STORAGE_KEY = 'dyma-theme';

function currentTheme() {
  const fromDom = document.documentElement.getAttribute('data-theme');
  if (fromDom === 'light' || fromDom === 'dark') {
    return fromDom;
  }
  return 'dark';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.style.colorScheme = theme;
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* private mode / blocked storage */
  }
  const toggle = document.querySelector('.theme-toggle');
  if (toggle) {
    toggle.setAttribute(
      'aria-label',
      theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode',
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  applyTheme(currentTheme());
  const toggle = document.querySelector('.theme-toggle');
  if (!toggle) {
    return;
  }
  toggle.addEventListener('click', () => {
    applyTheme(currentTheme() === 'dark' ? 'light' : 'dark');
  });
});
