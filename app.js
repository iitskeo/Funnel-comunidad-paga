/*
  Comportamiento compartido del funnel:
  - aparecer al hacer scroll (.revelar)
  - montar el checkout embebido de Whop en cada [data-checkout]
  - cuenta regresiva y redirección en la página de bienvenida
*/
(function () {
  const F = window.FUNNEL || {};

  // Enlaces que vienen de config.js: <a data-url="urlBiblioteca">
  document.querySelectorAll('[data-url]').forEach((a) => {
    const url = F[a.dataset.url];
    if (url) a.href = url;
  });

  // Botón de descargar la app de Whop según el celular
  const ua = navigator.userAgent;
  const ios = /iPhone|iPad|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const urlApp = ios ? F.urlAppIOS : /Android/.test(ua) ? F.urlAppAndroid : '';
  document.querySelectorAll('[data-app]').forEach((a) => {
    if (!urlApp) return;
    a.href = urlApp;
    a.target = '_blank';
    a.rel = 'noopener';
    a.hidden = false;
  });

  // Aparecer al hacer scroll
  const revelar = document.querySelectorAll('.revelar');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px' }
    );
    revelar.forEach((el) => io.observe(el));
  } else {
    revelar.forEach((el) => el.classList.add('visible'));
  }

  // Checkout embebido de Whop
  const contenedores = document.querySelectorAll('[data-checkout]');
  if (contenedores.length) {
    contenedores.forEach((el) => {
      const plan = F[el.dataset.checkout];
      const siguiente = new URL(el.dataset.siguiente, location.href).href;

      if (!plan || !/^plan_\w+$/.test(plan)) {
        el.innerHTML =
          '<p class="aviso aviso--error">Falta el plan de Whop en config.js. Pégalo y recarga.</p>';
        return;
      }

      // Whop llama a esta función al terminar el pago; mandamos al siguiente paso.
      const fn = 'alCompletar_' + el.dataset.checkout;
      window[fn] = function () {
        location.href = siguiente;
      };

      const div = document.createElement('div');
      div.setAttribute('data-whop-checkout-plan-id', plan);
      div.setAttribute('data-whop-checkout-theme', 'system');
      div.setAttribute('data-whop-checkout-theme-accent-color', 'mint');
      div.setAttribute('data-whop-checkout-return-url', siguiente);
      div.setAttribute('data-whop-checkout-on-complete', fn);
      div.setAttribute('data-whop-checkout-environment', F.entorno || 'production');
      el.appendChild(div);
    });

    const s = document.createElement('script');
    s.src = 'https://js.whop.com/static/checkout/loader.js';
    s.async = true;
    s.defer = true;
    document.head.appendChild(s);
  }

  // Bienvenida: cuenta regresiva y entrada a la comunidad
  const cuenta = document.querySelector('[data-cuenta]');
  if (cuenta && F.urlComunidadPlus) {
    let n = Number(cuenta.textContent) || 5;
    const t = setInterval(() => {
      n -= 1;
      cuenta.textContent = n;
      if (n <= 0) {
        clearInterval(t);
        location.href = F.urlComunidadPlus;
      }
    }, 1000);
  }
})();
