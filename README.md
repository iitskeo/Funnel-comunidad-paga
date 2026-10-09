# Funnel Comunidad Plus

Funnel de tres páginas con el estilo de la Biblioteca @itskeo5 (`docs/ESTILO.md`, `tokens.css`).

1. **`index.html`**: landing de la biblioteca de prompts gratis, con el checkout de Whop embebido (`planBiblioteca`).
2. **`gracias.html`**: confirma el acceso gratis y ofrece Comunidad Plus a 5 USD al mes (`planPlus`), con el botón "No gracias, ir a la biblioteca".
3. **`bienvenido.html`**: gracias por apoyar, y redirige a la comunidad Plus en Whop a los 6 segundos.

Los IDs de plan y los links están todos en **`config.js`**. Para probar sin cobrar, cambia `entorno` a `'sandbox'` (con planes de sandbox).

## Publicar

Son archivos estáticos: sirven tal cual en Cloudflare Pages/Workers, Netlify, Vercel o cualquier hosting. Para probar local:

```sh
python3 -m http.server 8000
```

Y abre http://localhost:8000.
