const header = document.querySelector('header');
const footer = document.querySelector('footer');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  
  // Move texture upwards as user scrolls down
  header.style.setProperty('--texture-pos', `${scrollY}px`);
  footer.style.setProperty('--texture-pos', `${scrollY}px`);
});