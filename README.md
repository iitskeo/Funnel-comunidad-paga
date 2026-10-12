# Funnel Comunidad Plus

Landing de una sola página con el estilo de la Biblioteca @itskeo5 (`docs/ESTILO.md`, `tokens.css`).

- **`index.html`**: muestra la biblioteca gratis y Comunidad Plus. Cada botón va al checkout link de Whop (`whop.com/checkout/plan_...`), así la persona pone su correo una vez y termina dentro de Whop con la sesión abierta.
- `gracias.html` y `bienvenido.html` son del funnel anterior (checkout embebido) y ya no están en el recorrido.

Los IDs de plan y los links están todos en **`config.js`**. Para probar sin cobrar, cambia `entorno` a `'sandbox'` (con planes de sandbox).

## Publicar en Whop

El proyecto de Whop (`whop apps init --app_type website`) es TanStack Start. Las páginas van en `public/` y la ruta `/` redirige a `/inicio.html` (`whop/index.tsx`). Para copiar todo:

```powershell
cd K:\automatizacion\funnel
git pull
.\copiar-a-whop.ps1
cd itskeo1
whop apps deploy
```

## Probar en local

```sh
python3 -m http.server 8000
```

## Para continuar el trabajo

Lee `HANDOFF.md`: estado actual, decisiones, comandos para publicar y pendientes.
