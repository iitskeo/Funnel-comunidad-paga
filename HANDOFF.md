# Handoff: funnel Comunidad Plus (itskeo)

Para la próxima sesión de Claude. Léelo completo antes de tocar nada. El usuario escribe en español y espera respuestas cortas y directas, en español.

## 1. Qué es esto

Funnel para la comunidad de **Whop** del usuario (@itskeo5 en TikTok). Él sube videos de IA y regala una **biblioteca de prompts** gratis. Quiere:

1. Que la gente se una gratis a la biblioteca.
2. Ofrecerles **Comunidad Plus**, **5 USD/mes**: sus skills, tutoriales, videos y todo lo nuevo, más la biblioteca.
3. Que quien compra Plus termine dentro de la comunidad.

Repo: `iitskeo/funnel-comunidad-paga`. Rama de trabajo: `claude/landing-prompts-library-27pb33`. No abrir PR salvo que lo pida.

## 2. Estado actual (último commit en GitHub: `f78c148`)

**`index.html` es ahora una landing de UNA sola página**, autocontenida (CSS inline, sin `config.js` ni `app.js`):

- Barra: "itskeo/comunidad" + botón **Iniciar sesión** (`whop.com/login/?next=/itskeo/`).
- Línea "¿Ya te uniste antes? Inicia sesión" arriba del banner de la app.
- Banner "Descarga la app de Whop e inicia sesión con el mismo correo".
- Título "Mi comunidad de IA. Gratis o con Plus."
- Tarjeta 1, **gratis arriba**: Biblioteca de prompts, 0 USD, botón "Unirme gratis" a `https://whop.com/checkout/plan_SzoerRi0rgRxC`.
- Tarjeta 2, **Plus abajo**, destacada con borde menta y etiqueta "Exclusivo": 5 USD/mes, botón "Unirme a Plus" a `https://whop.com/checkout/plan_RhVl5CaluBGH1`.
- Texto final: "Plus es el proceso completo. En TikTok ves el resultado; en Plus te llevas las herramientas y los pasos para hacerlo tú."

Es **checkout link** (la persona hace el pago en whop.com), NO checkout embebido.

**No sé si ya está publicado.** El usuario dijo "pongámoslo live para probar" y le di los comandos del punto 4. Pregúntale si ya desplegó y qué vio.

### Archivos

| Archivo | Para qué |
| --- | --- |
| `index.html` | Landing nueva de una página (la principal). |
| `gracias.html`, `bienvenido.html` | Funnel ANTERIOR (checkout embebido). Ya no están en el recorrido. Siguen en el repo y el script los copia. Se pueden borrar si el usuario confirma que se queda con la landing nueva. |
| `config.js`, `app.js`, `estilos.css` | Solo los usan `gracias.html` y `bienvenido.html`. |
| `tokens.css` | Estilo oficial (colores, fuentes, botones). No inventar colores ni tipografías. |
| `docs/ESTILO.md` | Reglas de estilo completas. Leerlo antes de cambiar diseño. |
| `copiar-a-whop.ps1` | Copia el funnel al proyecto de Whop. |
| `whop/index.tsx` | Va a `src/routes/index.tsx` del proyecto de Whop; redirige `/` a `/inicio.html`. |
| `.gitignore` | Ignora `itskeo1/` y `node_modules/`. |

## 3. Cómo está montado en Whop

- El sitio vive en **https://itskeo1.whop.site/**. Es un proyecto **TanStack Start** (React) creado con `whop apps init --app_type website`. La plantilla muestra "Welcome to TanStack Start" si no se reemplaza `src/routes/index.tsx`.
- En el PC del usuario: el repo está en `K:\automatizacion\funnel` y el proyecto de Whop en `K:\automatizacion\funnel\itskeo1` (dentro del repo, ignorado por git).
- Lo que está en `public/` se sirve tal cual. La landing se copia como `public/inicio.html`.
- Páginas en vivo: `/` (redirige a `/inicio.html`), `/gracias.html`, `/bienvenido.html`.

## 4. Comandos para el usuario (PowerShell, Windows)

Una sola vez:

```powershell
# Necesita Git para Windows y Node.js 22 o más
npm install -g @whop/cli
whop login
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned   # solo si Windows no deja correr el .ps1
```

Para publicar cada cambio:

```powershell
cd K:\automatizacion\funnel
git checkout -- .        # descarta cambios sueltos locales (ver Gotchas)
git pull
.\copiar-a-whop.ps1
cd itskeo1
whop apps deploy
```

Ver en local (sin Whop):

```powershell
cd K:\automatizacion\funnel
python -m http.server 8000     # o: npx serve .
# abrir http://localhost:8000
```

Ver como celular: F12, luego Ctrl+Shift+M, elegir iPhone 14 (390x844). Para simular el navegador de TikTok, medida a mano 390x720.

Si `whop apps deploy` en `K:\automatizacion\funnel` pregunta "doesn't look like a Vite app", es la carpeta equivocada: elegir Cancel y entrar a `itskeo1`.

## 5. IDs y links (todos dados por el usuario)

| Qué | Valor |
| --- | --- |
| Plan gratis (biblioteca) | `plan_SzoerRi0rgRxC` |
| Plan Plus (5 USD/mes) | `plan_RhVl5CaluBGH1` |
| App de la biblioteca | `https://whop.com/itskeo/exp_MoZZITX3DvCwNH/app/` |
| App de Comunidad Plus | `https://whop.com/itskeo/exp_IBUci0sjUP2q1Z/app/` |
| Comunidad (home) | `https://whop.com/itskeo/` |
| Login que devuelve a la comunidad | `https://whop.com/login/?next=/itskeo/` (el usuario confirmó que funciona) |
| App de Whop en iPhone | `https://apps.apple.com/app/whop/id1600181492` |

Ojo: al principio asumí los planes al revés y la landing cobró 5 USD. Ya está corregido: el gratis es `SzoerRi0rgRxC` y Plus es `RhVl5CaluBGH1`. Si algo cobra donde no debe, revisar esto primero.

## 6. Por qué se cambió de flujo (el problema real)

**Funnel anterior (checkout embebido):** landing con checkout gratis dentro de la página, luego `gracias.html` con la oferta de Plus y su checkout embebido, luego `bienvenido.html`.

Problemas que tuvo:

1. El checkout embebido **no deja la sesión abierta en whop.com**. Quien tocaba "Continuar gratis" llegaba sin sesión a la página pública de la biblioteca, que ofrece "Unirse gratis" otra vez y rechaza el correo ("ya existe"). Pasa sobre todo en el **navegador interno de TikTok**.
2. Quien volvía con el mismo link tampoco podía re-registrarse.
3. Quien compraba Plus ponía su correo hasta 3 veces (gratis, Plus, login).

Mitigación intermedia (ya en `gracias.html`/`config.js`): mandar por `whop.com/login/?next=...` con nota de "usa el mismo correo". Funciona pero deja fricción.

**Decisión nueva:** una sola landing con las dos opciones y **checkout links**. Hipótesis: al pagar en whop.com, Whop deja la sesión y la persona queda dentro, con el correo puesto una sola vez. Es una hipótesis, **no está probada**.

## 7. Pendiente / lo primero que hay que verificar

El usuario está probando en vivo. Cosas que NO he podido comprobar porque el entorno cloud no llega a whop.com ni a docs.whop.com (proxy bloquea):

1. **A dónde deja Whop a la persona al terminar el checkout gratis** y si queda logueada sin pedirle el correo otra vez. Es el punto central del cambio.
2. Si el plan tiene opción de **redirect después del checkout** (`redirect URL`). Si existe, se puede mandar a donde convenga.
3. Si el problema de "pantalla Unirse gratis" desaparece también dentro del navegador de TikTok.
4. Si **quien ya está unido y toca "Unirme gratis"** ve algo útil o un error de correo repetido. Para eso existe "Inicia sesión" arriba.
5. Cómo se ve la landing en el celular real del usuario y desde la bio de TikTok (las medidas siguientes son simuladas con Playwright).

Medidas simuladas de la landing nueva: en 390x844 (Safari) entra la tarjeta gratis completa y Plus casi completa; en 390x720 (TikTok) la tarjeta de Plus queda cortada abajo y hay que hacer un poco de scroll. El usuario lo sabe. Se ofrecieron dos ajustes y no eligió: mover el banner de la app al final, o compactar las tarjetas.

Otros pendientes menores:

- Decidir si se borran `gracias.html`, `bienvenido.html`, `config.js`, `app.js`, `estilos.css`.
- Si Plus va a prometer "lo que no comparto en ningún otro lado", "lo nuevo te llega primero" y "tutoriales paso a paso de cada video", el usuario debe cumplirlo. Se le avisó.
- Ofreció (sin decidir) frase de "precio de fundador": "quien entra ahora se queda en 5 USD para siempre". Solo si de verdad sube el precio después.
- **Oferta con fecha límite (decidida el 20 oct 2026, es real):** quien entra a Plus antes del **1 de noviembre, 12:00 (hora de Colombia, UTC-5)** se queda en 5 USD/mes para siempre; después el precio sube a **12.99 USD** (no 14.99). Quien ya es miembro de Plus conserva 5 USD. En `index.html`: recuadro con texto + contador dentro de la tarjeta de Plus, encima del botón; la fecha es la constante `FIN` del script al final. Pasada la fecha el script oculta el contador y muestra "12.99 USD /mes". Los checkout links no se tocaron.
- **Ojo:** la página solo muestra el precio, no lo cambia. El 1 de noviembre hay que subir el precio del plan en Whop (o crear un plan nuevo y cambiar el link), si no seguirá cobrando 5 USD. El contador usa el reloj del dispositivo.
- Nada de escasez falsa fuera de esa fecha.
- Etiqueta de la tarjeta Plus: "Tiempo limitado", montada sobre el borde de arriba (21 oct 2026). Pasada la fecha el script la cambia a "Exclusivo". Se quitó la frase "Todo lo que uso para crear mis videos de IA." para acortar la tarjeta.
- Se probó una barra fija abajo con "Unirme a Plus" y el usuario pidió **quitarla** (21 oct 2026). No la repongas sin que lo pida. El banner de la oferta con contador va **dentro de la tarjeta de Plus, justo encima del botón**, con el texto corto "Si te unes antes del 1 de noviembre, 5 USD para siempre. Después, 12.99 USD."

## 8. Decisiones de producto y copy (el usuario las pidió, respétalas)

- Plus se presenta como **algo exclusivo que les sirve**, no como "apóyame". Se quitó el enfoque de apoyo.
- Gratis arriba, Plus abajo; la tarjeta gratis más baja que la de Plus.
- Botones con textos de acción, siempre los mismos: "Unirme gratis", "Unirme a Plus", "Iniciar sesión".
- "¿Ya te uniste antes? Inicia sesión" va arriba, antes del banner de la app.
- Banner de la app de Whop: desde el 20 oct 2026 va **al final** de la página (antes estaba arriba). Es texto, **sin botón de descarga** (el botón no funcionaba y se quitó).
- Diseño simplificado (20 oct 2026, a pedido del usuario): sin párrafo bajo el título ni párrafo final "Plus es el proceso completo". Orden: "¿Ya te uniste antes?", tarjeta gratis (el título "Mi comunidad de IA. Gratis o con Plus." se quitó el 21 oct 2026 a pedido del usuario para subir las tarjetas; sigue en el HTML como `sr-only` por accesibilidad), tarjeta Plus (con la oferta y el contador encima del botón), banner de la app. Plus incluye "MCP de Motionabi: crea videos con Claude" (se escribe Motionabi) y "Cosas nuevas cada semana".
- Se probó y se **revirtió** un aviso para salir del navegador de TikTok (`intent://` y `x-safari-`). No lo repongas sin que lo pida.
- Voz: primera persona, cercana, frases cortas. **Nunca guion largo (—) ni medio (–)**: usar punto, coma o dos puntos. Sin emojis dentro de la página. Sin palabras vacías ("eleva", "potencia").
- Estilo: fondo oscuro verdoso, **un solo acento menta** (`#72e4b0`), títulos Bricolage Grotesque, texto Geist, botones píldora, sin degradados ni segundo color.

## 9. Mensajes de bienvenida dentro de Whop (redactados, aún no confirmo que los pegó)

Gratis, versión corta:

> ¡Bienvenido! Aquí tienes todos los prompts de mis videos, gratis. 📱 Descarga la app de Whop e inicia sesión con este mismo correo para no perderte nada. Y si quieres mis skills, tutoriales y todo lo nuevo apenas sale, únete a Comunidad Plus por 5 USD al mes. 👉 https://whop.com/checkout/plan_RhVl5CaluBGH1

Plus, versión corta:

> ¡Gracias por unirte a Plus! 🙌 Aquí tienes mis skills, tutoriales y todo lo nuevo apenas sale, además de la biblioteca de prompts. 📱 Descarga la app de Whop e inicia sesión con este mismo correo para no perderte nada.

(Esos mensajes se redactaron antes de quitar el tono de "apoyo". Si los vuelve a pedir, quita "me ayuda muchísimo" y similares.)

## 10. Gotchas

- **El entorno de Claude (cloud) no puede abrir whop.com ni docs.whop.com.** Todo lo de Whop (checkout, login, redirects, CLI) se probó solo de forma indirecta. Pídele al usuario que lo pruebe y dile qué mirar.
- **Otro chat de Claude editó archivos solo en el PC del usuario** (sin commit). Por eso los comandos incluyen `git checkout -- .` antes de `git pull`. Esos cambios ya estaban rehechos aquí.
- Cada vez que se cambia algo hay que **copiar a Whop y desplegar** (punto 4). Si el usuario dice "sigue igual", casi siempre falta eso, o el navegador tiene caché (Ctrl+F5, o ventana de incógnito).
- No abras PR. Haz commits en la rama de trabajo y haz push con `git push -u origin claude/landing-prompts-library-27pb33`.
- La carpeta `itskeo1/` NO debe subirse a git (está en `.gitignore`).

## 11. Cómo verifiqué diseño (rápido)

Servidor local y capturas con Playwright (Chromium ya viene instalado en `/opt/pw-browsers`; instalar `playwright` con npm en una carpeta de trabajo, sin correr `playwright install`):

```sh
cd /home/user/Funnel-comunidad-paga && python3 -m http.server 8765 &
# viewports usados: 390x844 (iPhone), 390x720 (TikTok aprox.), 375x667 (SE), 1280x800 (escritorio)
# Revisar siempre: scrollWidth == ancho (sin scroll horizontal), modo oscuro y claro, capturas.
```

Los checkouts de Whop no se ven en las capturas (el script de Whop no carga desde aquí), así que cualquier recuadro de checkout aparece vacío. Con checkout links ya no hay recuadro.

## 12. Preferencias del usuario

- Respuestas cortas, directas y en español. Explicar con listas simples.
- Quiere ver el resultado, no el proceso. Muéstrale capturas o manda el HTML con `SendUserFile` cuando proponga un diseño.
- Si algo no se puede confirmar desde aquí, dilo claro y dile qué probar.
- Antes de operaciones externas (publicar, borrar) pregunta; para código dentro de la rama de trabajo, avanza.
