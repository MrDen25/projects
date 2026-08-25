import './reset.scss';
import './style.scss';

const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-toggle__icon');

const savedTheme = localStorage.getItem('cv-theme');

if (savedTheme === 'dark') {
  document.body.classList.add('page--dark');
}

const updateThemeIcon = () => {
  if (!themeIcon) return;
  themeIcon.textContent = document.body.classList.contains('page--dark') ? '☾' : '☼';
};

updateThemeIcon();

themeToggle?.addEventListener('click', () => {
  document.body.classList.toggle('page--dark');

  const theme = document.body.classList.contains('page--dark') ? 'dark' : 'light';
  localStorage.setItem('cv-theme', theme);

  updateThemeIcon();
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));

    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  });
});
