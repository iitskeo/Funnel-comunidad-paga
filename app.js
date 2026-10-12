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

  // Dentro del navegador de TikTok / Instagram / Facebook la sesión de Whop no
  // se guarda. Mostramos un aviso con un link que intenta abrir el navegador.
  const ua = navigator.userAgent;
  const enApp = /musical_ly|Bytedance|TikTok|trill|Instagram|FBAN|FBAV|FB_IAB/i.test(ua);
  const avisoApp = document.querySelector('[data-salir-app]');
  if (enApp && avisoApp) {
    const url = location.href;
    const android = /Android/i.test(ua);
    const ios = /iPhone|iPad|iPod/i.test(ua);
    let salida = '';
    if (android) {
      salida = 'intent://' + url.replace(/^https?:\/\//, '') +
        '#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=' +
        encodeURIComponent(url) + ';end';
    } else if (ios) {
      salida = 'x-safari-' + url;
    }
    const nombre = /Instagram/i.test(ua) ? 'Instagram' : /FBAN|FBAV|FB_IAB/i.test(ua) ? 'Facebook' : 'TikTok';
    avisoApp.querySelector('strong').textContent = 'Estás dentro de ' + nombre + '.';
    const link = avisoApp.querySelector('[data-salir-link]');
    if (salida) link.href = salida;
    else link.hidden = true;
    avisoApp.hidden = false;
  }

  // En escritorio algunos botones bajan a otro punto (ej. el checkout completo)
  document.querySelectorAll('[data-escritorio]').forEach((a) => {
    a.addEventListener('click', (e) => {
      if (!matchMedia('(min-width: 900px)').matches) return;
      const destino = document.querySelector(a.dataset.escritorio);
      if (!destino) return;
      e.preventDefault();
      destino.scrollIntoView({ block: 'start' });
    });
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
