// Highlights the menu link of the section that is currently on screen.
const links = document.querySelectorAll('.site-header nav a');
const sections = document.querySelectorAll('main section');

function setActive(id) {
  links.forEach((link) => {
    const isActive = link.getAttribute('href') === '#' + id;
    link.classList.toggle('active', isActive);
    if (isActive) {
      link.setAttribute('aria-current', 'true');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

function update() {
  const atBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 4;
  if (atBottom) {
    setActive(sections[sections.length - 1].id);
    return;
  }
  const line = window.innerHeight * 0.4;
  let current = sections[0].id;
  sections.forEach((section) => {
    if (section.getBoundingClientRect().top <= line) {
      current = section.id;
    }
  });
  setActive(current);
}

window.addEventListener('scroll', update, { passive: true });
window.addEventListener('resize', update);
update();

// Scroll animations: elements slide/fade in when they enter the screen
const animated = document.querySelectorAll('.reveal, .reveal-img');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else if (entry.boundingClientRect.top > 0) {

        entry.target.classList.remove('visible');
      }
      // If it left through the top, keep it visible.
    });
  }, { threshold: 0.15 });
  animated.forEach((el) => observer.observe(el));
} else {
  animated.forEach((el) => el.classList.add('visible'));
}