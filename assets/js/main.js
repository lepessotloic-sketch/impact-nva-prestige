
document.addEventListener('DOMContentLoaded', () => {
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach(el => revealObserver.observe(el));

  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;
      if (answer.style.maxHeight) {
        answer.style.maxHeight = null;
        answer.classList.remove('open');
      } else {
        answer.style.maxHeight = answer.scrollHeight + 'px';
        answer.classList.add('open');
      }
    });
  });

  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));

  document.querySelectorAll('.ba-slider').forEach(slider => {
    const range = slider.querySelector('.ba-range');
    const after = slider.querySelector('.ba-after-wrapper');
    const handle = slider.querySelector('.ba-handle');
    const update = () => {
      const v = range.value + '%';
      after.style.width = v;
      if (handle) handle.style.left = v;
    };
    if (range && after) { update(); range.addEventListener('input', update); }
  });
});
