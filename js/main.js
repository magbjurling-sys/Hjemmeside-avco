// Mobil-meny
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
if (toggle && links) {
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
}

// Nedtrekk: på mobil åpnes undermeny ved klikk på «parent»-lenke
document.querySelectorAll('.nav-links .has-sub > .parent').forEach((parent) => {
  parent.addEventListener('click', (e) => {
    if (window.matchMedia('(max-width: 820px)').matches) {
      e.preventDefault();
      parent.parentElement.classList.toggle('open');
    }
  });
});

// Scroll-reveal
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && reveals.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add('in'));
}

// Kontaktskjema – sender via Formspree når endepunkt er satt opp,
// ellers vises en lokal bekreftelse (demo-modus).
const form = document.querySelector('#kontaktskjema');
if (form) {
  const status = form.querySelector('.form-status');
  const setStatus = (msg, ok = true) => {
    if (!status) return;
    status.textContent = msg;
    status.style.color = ok ? '#a9905f' : '#a33';
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      setStatus('Fyll inn navn, e-post og en kort beskrivelse av saken.', false);
      form.reportValidity();
      return;
    }

    const action = form.getAttribute('action') || '';
    const configured = action.includes('formspree.io/f/') && !action.includes('REPLACE_WITH_YOUR_ID');

    // Demo-modus: ingen backend koblet til ennå.
    if (!configured) {
      setStatus('Takk! (Demo) Koble skjemaet til Formspree for å motta henvendelser på e-post. Ring gjerne 98 67 29 29.');
      form.reset();
      return;
    }

    const btn = form.querySelector('button[type="submit"]');
    const original = btn ? btn.textContent : '';
    if (btn) { btn.disabled = true; btn.textContent = 'Sender …'; }

    try {
      const res = await fetch(action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('Takk for henvendelsen! Vi tar kontakt med deg så snart som mulig.');
        form.reset();
      } else {
        setStatus('Noe gikk galt. Ring oss gjerne på 98 67 29 29, eller send e-post til at@advokattorgersen.no.', false);
      }
    } catch (err) {
      setStatus('Kunne ikke sende nå. Ring oss på 98 67 29 29, eller send e-post til at@advokattorgersen.no.', false);
    } finally {
      if (btn) { btn.disabled = false; btn.textContent = original; }
    }
  });
}
