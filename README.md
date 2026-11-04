# Funnel Comunidad Plus

Landing de una sola página con el estilo de la Biblioteca @itskeo5 (`docs/ESTILO.md`, `tokens.css`).

- **`index.html`**: muestra la biblioteca gratis y Comunidad Plus. Cada botón va al checkout link de Whop (`whop.com/checkout/plan_...`), así la persona pone su correo una vez y termina dentro de Whop con la sesión abierta. Los IDs de plan están directamente en los dos botones de ese archivo.
- `img/`: capturas de la sección de validación (cursos, Motionabi, métricas y perfil de un miembro, llamadas en vivo). El script las copia a `public/img/`.
- `tokens.css` y `docs/ESTILO.md` son la referencia de estilo.

## Publicar en Whop

El proyecto de Whop (`whop apps init --app_type website`) es TanStack Start. La landing va en `public/inicio.html` y la ruta `/` redirige ahí (`whop/index.tsx`). El script también borra del sitio los archivos del funnel anterior. Para copiar todo:

```powershell
cd K:\automatizacion\funnel
git pull
.\copiar-a-whop.ps1
cd itskeo1
whop apps deploy
```

Desde CMD: `powershell -ExecutionPolicy Bypass -File .\copiar-a-whop.ps1`.

## Probar en local

```sh
python3 -m http.server 8000
```

## Para continuar el trabajo

Lee `HANDOFF.md`: estado actual, decisiones, comandos para publicar y pendientes.
