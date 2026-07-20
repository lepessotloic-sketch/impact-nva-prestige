/* Applique la configuration (config.js) aux éléments de la page. */
document.addEventListener('DOMContentLoaded', () => {
  const cfg = window.siteConfig || {};

  const setText = (selector, value) => {
    if (!value) return;
    document.querySelectorAll(selector).forEach(el => { el.textContent = value; });
  };

  setText('[data-brand]', cfg.brand);
  setText('[data-slogan]', cfg.slogan);
  setText('[data-zone]', cfg.zone);
  setText('[data-phone]', cfg.phone);
  setText('[data-email]', cfg.email);

  if (cfg.email) {
    document.querySelectorAll('[data-email-link]').forEach(el => {
      el.setAttribute('href', 'mailto:' + cfg.email);
    });
  }

  /* Statistiques : le bloc n'apparaît que s'il y a de vrais chiffres */
  const statsWrap = document.getElementById('proof-stats');
  if (statsWrap && Array.isArray(cfg.stats) && cfg.stats.length) {
    cfg.stats.forEach(s => {
      const div = document.createElement('div');
      div.className = 'stat';
      const value = document.createElement('span');
      value.className = 'stat-value';
      value.dataset.countTo = s.valeur;
      value.dataset.countPrefix = s.prefixe || '';
      value.dataset.countSuffix = s.suffixe || '';
      value.textContent = (s.prefixe || '') + s.valeur + (s.suffixe || '');
      const label = document.createElement('span');
      label.className = 'stat-label';
      label.textContent = ' ' + s.label;
      div.appendChild(value);
      div.appendChild(label);
      statsWrap.appendChild(div);
    });
    statsWrap.hidden = false;
  }

  /* Avis clients : le bloc n'apparaît que s'il y a de vrais avis */
  const reviewsWrap = document.getElementById('proof-reviews');
  if (reviewsWrap && Array.isArray(cfg.avis) && cfg.avis.length) {
    cfg.avis.forEach(a => {
      const card = document.createElement('article');
      card.className = 'review-card';
      const stars = document.createElement('p');
      stars.className = 'stars';
      const n = Math.max(1, Math.min(5, a.note || 5));
      stars.textContent = '★'.repeat(n) + '☆'.repeat(5 - n);
      const quote = document.createElement('blockquote');
      quote.textContent = '« ' + a.texte + ' »';
      const author = document.createElement('cite');
      author.textContent = a.auteur || '';
      card.appendChild(stars);
      card.appendChild(quote);
      card.appendChild(author);
      reviewsWrap.appendChild(card);
    });
    reviewsWrap.hidden = false;
  }
});
