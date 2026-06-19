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
  }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' });
  reveals.forEach((el) => io.observe(el));
  // Sikkerhetsnett: ingen seksjon skal kunne bli stående usynlig
  setTimeout(() => reveals.forEach((el) => el.classList.add('in')), 1800);
} else {
  reveals.forEach((el) => el.classList.add('in'));
}

// Kontaktskjema – sender via Formspree når endepunkt er satt opp,
// ellers vises en lokal bekreftelse (demo-modus).
// Meldinger tilpasses sidens språk (<html lang>): no / en / pl.
const I18N = {
  no: {
    invalid: 'Fyll inn navn, e-post og en kort beskrivelse av saken.',
    demo: 'Takk! (Demo) Koble skjemaet til Formspree for å motta henvendelser på e-post. Ring gjerne 98 67 29 29.',
    sending: 'Sender …',
    ok: 'Takk for henvendelsen! Vi tar kontakt med deg så snart som mulig.',
    fail: 'Noe gikk galt. Ring oss gjerne på 98 67 29 29, eller send e-post til at@advokattorgersen.no.',
    neterr: 'Kunne ikke sende nå. Ring oss på 98 67 29 29, eller send e-post til at@advokattorgersen.no.',
  },
  en: {
    invalid: 'Please enter your name, email and a short description of your case.',
    demo: 'Thank you! (Demo) Connect the form to Formspree to receive enquiries by email. Feel free to call 98 67 29 29.',
    sending: 'Sending …',
    ok: 'Thank you for your enquiry! We will get back to you as soon as possible.',
    fail: 'Something went wrong. Please call us on 98 67 29 29, or email at@advokattorgersen.no.',
    neterr: 'Could not send right now. Please call us on 98 67 29 29, or email at@advokattorgersen.no.',
  },
  pl: {
    invalid: 'Podaj imię i nazwisko, adres e-mail oraz krótki opis sprawy.',
    demo: 'Dziękujemy! (Demo) Podłącz formularz do Formspree, aby otrzymywać zgłoszenia e-mailem. Zadzwoń do nas: 98 67 29 29.',
    sending: 'Wysyłanie …',
    ok: 'Dziękujemy za wiadomość! Skontaktujemy się z Tobą najszybciej, jak to możliwe.',
    fail: 'Coś poszło nie tak. Zadzwoń do nas: 98 67 29 29 lub napisz na at@advokattorgersen.no.',
    neterr: 'Nie udało się wysłać. Zadzwoń do nas: 98 67 29 29 lub napisz na at@advokattorgersen.no.',
  },
};
const T = I18N[(document.documentElement.lang || 'no').slice(0, 2)] || I18N.no;

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
      setStatus(T.invalid, false);
      form.reportValidity();
      return;
    }

    const action = form.getAttribute('action') || '';
    const configured = action.includes('formspree.io/f/') && !action.includes('REPLACE_WITH_YOUR_ID');

    // Demo-modus: ingen backend koblet til ennå.
    if (!configured) {
      setStatus(T.demo);
      form.reset();
      return;
    }

    const btn = form.querySelector('button[type="submit"]');
    const original = btn ? btn.textContent : '';
    if (btn) { btn.disabled = true; btn.textContent = T.sending; }

    try {
      const res = await fetch(action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus(T.ok);
        form.reset();
      } else {
        setStatus(T.fail, false);
      }
    } catch (err) {
      setStatus(T.neterr, false);
    } finally {
      if (btn) { btn.disabled = false; btn.textContent = original; }
    }
  });
}
