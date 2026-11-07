# Handoff: funnel Comunidad Plus (itskeo)

Para la próxima sesión de Claude. Léelo completo antes de tocar nada. El usuario escribe en español y espera respuestas cortas y directas, en español.

## 1. Qué es esto

Funnel para la comunidad de **Whop** del usuario (@itskeo5 en TikTok). Él sube videos de IA y regala una **biblioteca de prompts** gratis. Quiere:

1. Que la gente se una gratis.
2. Ofrecerles **Comunidad Plus**, **12.99 USD/mes**: MCP de Motionabi, plantillas de edición, skills, tutoriales y todo lo nuevo.
3. Que quien compra termine dentro de la comunidad.

Repo: `iitskeo/funnel-comunidad-paga`. Rama de trabajo: `claude/elegant-rubin-pa4aq4`. No abrir PR salvo que lo pida.

## 2. Estado actual

**`index.html` es una landing de UNA sola página**, autocontenida (CSS inline, sin JavaScript propio salvo una línea que activa las animaciones):

- Barra: "itskeo/comunidad" + botón **Iniciar sesión** (`whop.com/login/?next=/itskeo/`).
- Línea "¿Ya te uniste antes? Inicia sesión y entras a todo."
- Título "Mi comunidad de IA. Gratis o con Plus." con su frase y la línea "**Más de 1,900 personas** ya están dentro".
- Tarjeta 1, **gratis arriba**, compacta y **sin precio** (el usuario pidió quitar "0 USD"): Biblioteca de prompts, "El prompt exacto de cada video" y "Acceso a recursos". Botón **"Unirme"** (ya no dice "gratis") a `https://whop.com/checkout/plan_SzoerRi0rgRxC`.
- Tarjeta 2, **Plus abajo**, destacada con borde menta y la etiqueta "Exclusivo" sobre el borde: **12.99 USD/mes**. Incluye: MCP de Motionabi (Nuevo), **AbiCut**: plantillas de edición con subtítulos, hooks y motions (Nuevo), skills, tutoriales, lo nuevo cada semana y sesiones en vivo cada semana (Pronto). Se quitó la línea "Todo lo de la comunidad gratis, incluido" a pedido del usuario. Botón "Unirme a Plus" a `https://whop.com/checkout/plan_OmPkW5yg4ePGg`. Micro: "Cancelas cuando quieras. Si ya eres de Plus, tu precio no cambia."
- Banner de la app de Whop al final (texto, sin botón de descarga).

Es **checkout link** (la persona paga en whop.com), NO checkout embebido.

**La oferta de lanzamiento de 5 USD terminó el 1 de nov 2026.** Se borró todo su código (contador, banner, fecha, script, estilos amarillos). No lo repongas. Si se hace otra promoción, se diseña de nuevo y se crea un plan aparte en Whop.

### Archivos

| Archivo | Para qué |
| --- | --- |
| `index.html` | La landing (la única página). |
| `tokens.css` | Estilo oficial como referencia (colores, fuentes, botones). Ya no se copia al sitio. |
| `docs/ESTILO.md` | Reglas de estilo completas. Leerlo antes de cambiar diseño. |
| `copiar-a-whop.ps1` | Copia la landing al proyecto de Whop y **borra del sitio** lo viejo. |
| `whop/index.tsx` | Va a `src/routes/index.tsx` del proyecto de Whop; redirige `/` a `/inicio.html`. |
| `.gitignore` | Ignora `itskeo1/` y `node_modules/`. |

Se borraron `gracias.html`, `bienvenido.html`, `config.js`, `app.js` y `estilos.css` (funnel anterior). `config.js` tenía el plan de 5 USD y `gracias.html` lo vendía embebido: por eso el script ahora también los quita de `public/` en el proyecto de Whop.

## 3. Cómo está montado en Whop

- El sitio vive en **https://itskeo1.whop.site/**. Es un proyecto **TanStack Start** (React) creado con `whop apps init --app_type website`.
- En el PC del usuario: el repo está en `K:\automatizacion\funnel` y el proyecto de Whop en `K:\automatizacion\funnel\itskeo1` (dentro del repo, ignorado por git).
- Lo que está en `public/` se sirve tal cual. La landing se copia como `public/inicio.html`.
- Páginas en vivo: `/` (redirige a `/inicio.html`). `/gracias.html` y `/bienvenido.html` **ya no deben existir**; tras desplegar hay que comprobar que dan 404.

## 4. Comandos para el usuario (CMD o PowerShell, Windows)

Una sola vez:

```powershell
# Necesita Git para Windows y Node.js 22 o más
npm install -g @whop/cli
whop login
```

Para publicar cada cambio (en **CMD** el .ps1 no corre solo; por eso el `powershell -ExecutionPolicy Bypass -File`):

```
cd K:\automatizacion\funnel
git checkout -- .
git fetch origin claude/elegant-rubin-pa4aq4
git checkout claude/elegant-rubin-pa4aq4
git pull origin claude/elegant-rubin-pa4aq4
powershell -ExecutionPolicy Bypass -File .\copiar-a-whop.ps1
cd itskeo1
whop apps deploy
```

Verificar después, en incógnito: `https://itskeo1.whop.site/inicio.html` muestra 12.99 USD y el botón de Plus abre un checkout de **12.99**, y `https://itskeo1.whop.site/gracias.html` da 404.

Ver en local (sin Whop): `python -m http.server 8000` en la carpeta del repo y abrir `http://localhost:8000`.

Si `whop apps deploy` en `K:\automatizacion\funnel` pregunta "doesn't look like a Vite app", es la carpeta equivocada: elegir Cancel y entrar a `itskeo1`.

## 5. IDs y links (todos dados por el usuario)

| Qué | Valor |
| --- | --- |
| Plan gratis | `plan_SzoerRi0rgRxC` |
| Plan Plus **actual** (12.99 USD/mes) | `plan_OmPkW5yg4ePGg` |
| Plan Plus **viejo** (5 USD/mes, solo para quien ya lo tiene) | `plan_RhVl5CaluBGH1`. **No usarlo en ningún link nuevo.** |
| App de la biblioteca | `https://whop.com/itskeo/exp_MoZZITX3DvCwNH/app/` |
| App de Comunidad Plus | `https://whop.com/itskeo/exp_IBUci0sjUP2q1Z/app/` |
| Comunidad (home) | `https://whop.com/itskeo/` |
| Login que devuelve a la comunidad | `https://whop.com/login/?next=/itskeo/` |
| App de Whop en iPhone | `https://apps.apple.com/app/whop/id1600181492` |

Los miembros que entraron antes del 1 de nov conservan 5 USD de por vida (eso lo maneja Whop, no la página). Si algo cobra donde no debe, revisar estos IDs primero.

## 6. Por qué es una sola landing con checkout links

El funnel anterior usaba checkout **embebido**. No dejaba la sesión abierta en whop.com: quien se unía gratis llegaba sin sesión a la página pública de la biblioteca y Whop rechazaba el correo ("ya existe"), sobre todo en el navegador interno de TikTok, y quien compraba Plus ponía el correo hasta 3 veces. Se pasó a **checkout links**, con la hipótesis de que al pagar en whop.com la persona queda dentro con la sesión abierta. Es una hipótesis, **no está probada**.

## 7. Pendiente

Cosas que no se pueden comprobar desde aquí (el entorno cloud no llega a whop.com):

1. A dónde deja Whop a la persona al terminar el checkout (gratis y Plus) y si queda logueada.
2. Si el plan tiene opción de **redirect URL** después del checkout.
3. Cómo se ve la landing en el celular real y desde la bio de TikTok. Medidas simuladas (Playwright): el botón "Unirme a Plus" termina en ~799 px; entra en 844 pero no en el navegador de TikTok (~720). El usuario quiere que se vea el botón: opciones pendientes son acortar el micro de abajo, o poner título y botón de la tarjeta gratis en una sola fila (ahorra ~50 px).
4. **AbiCut** (se escribe con B, "Abi" como en Motionabi): el usuario lo dictó como "Avi con B". Confirmar la ortografía exacta.
5. La línea de prueba social ("Más de 1,900") se actualiza a mano en `index.html`; el usuario confirmó que ya hay 1,900.
6. Cuando arranquen las **sesiones en vivo**, quitar la etiqueta "Pronto" de esa línea.
7. Actualizar en Whop los **mensajes de bienvenida** (ver punto 9): el link de Plus y el precio.
8. Si Plus promete "lo que no comparto en ningún otro lado" y "lo nuevo te llega primero", el usuario debe cumplirlo. Se le avisó.
9. Pop-ups de "X se suscribió": el usuario los pidió. Se acordó que solo se harían con **datos reales**, nunca nombres inventados ni miembros viejos presentados como recientes (sería engañoso y sin permiso de esas personas). Opciones honestas: testimonios con permiso, o uniones recientes leídas de la API de Whop desde una ruta de servidor en `itskeo1` (la clave nunca va en la página). Sin decidir.

## 8. Decisiones de producto y copy (el usuario las pidió, respétalas)

- Plus se presenta como **algo exclusivo que les sirve**, no como "apóyame".
- Gratis arriba, Plus abajo; la tarjeta gratis más baja que la de Plus.
- Botones con textos de acción, siempre los mismos: "Unirme" (gratis), "Unirme a Plus", "Iniciar sesión".
- "¿Ya te uniste antes? Inicia sesión" va arriba.
- Banner de la app de Whop: **al final**, texto, **sin botón de descarga**.
- El título "Mi comunidad de IA. Gratis o con Plus." y su frase **se devolvieron a pedido del usuario** (cree que el funnel anterior convertía más). No los quites sin que lo pida.
- Se probaron y descartaron: aviso para salir del navegador de TikTok, barra fija abajo con "Unirme a Plus", banner de oferta en varias versiones (colores, cajas, cintas). El usuario pidió **quitar todo lo de la oferta y el contador**.
- **Nada de escasez falsa.** Solo se usó urgencia mientras la fecha límite fue real.
- Voz: primera persona, cercana, frases cortas. **Nunca guion largo (—) ni medio (–)**: usar punto, coma o dos puntos. Sin emojis dentro de la página. Sin palabras vacías ("eleva", "potencia").
- Estilo: fondo oscuro verdoso, **un solo acento menta** (`#72e4b0`), títulos Bricolage Grotesque, texto Geist, botones píldora, sin degradados ni segundo color. (El amarillo de la oferta fue una excepción temporal y ya se quitó.)

## 9. Mensajes de bienvenida dentro de Whop (se editan en Whop, no en este repo)

**Ojo:** los borradores anteriores enlazaban al plan de **5 USD**. Hay que usar el nuevo link y precio.

Gratis, versión corta:

> ¡Bienvenido! Aquí tienes todos los prompts de mis videos, gratis. Descarga la app de Whop e inicia sesión con este mismo correo para no perderte nada. Y si quieres mis skills, plantillas de edición, tutoriales y todo lo nuevo apenas sale, únete a Comunidad Plus por 12.99 USD al mes: https://whop.com/checkout/plan_OmPkW5yg4ePGg

Plus, versión corta:

> ¡Gracias por unirte a Plus! Aquí tienes mis skills, plantillas de edición, tutoriales y todo lo nuevo apenas sale. Descarga la app de Whop e inicia sesión con este mismo correo para no perderte nada.

## 10. Gotchas

- **El entorno de Claude (cloud) no puede abrir whop.com ni docs.whop.com.** Todo lo de Whop (checkout, login, redirects, CLI) se probó solo de forma indirecta. Pídele al usuario que lo pruebe y dile qué mirar.
- Cada vez que se cambia algo hay que **copiar a Whop y desplegar** (punto 4). Si el usuario dice "sigue igual", casi siempre falta eso, o el navegador tiene caché (Ctrl+F5, o incógnito).
- El usuario a veces usa **CMD** en vez de PowerShell: `Select-String` y los `.ps1` no corren ahí.
- `copiar-a-whop.ps1` copia solo `inicio.html` y `index.tsx` y **borra** del `public/` de Whop los archivos viejos. Si se agrega una página nueva, hay que agregarla al script.
- No abras PR. Haz commits en la rama de trabajo y `git push -u origin claude/elegant-rubin-pa4aq4`.
- La carpeta `itskeo1/` NO debe subirse a git (está en `.gitignore`).
- Las imágenes para historias ("Quedan X días", precio) se hicieron aparte en la sesión y **no están en el repo**.

## 11. Cómo verifiqué diseño (rápido)

Servidor local y capturas con Playwright (Chromium viene en `/opt/pw-browsers`; instalar `playwright` con npm en una carpeta de trabajo, sin correr `playwright install`):

```sh
cd /home/user/Funnel-comunidad-paga && python3 -m http.server 8765 &
# viewports usados: 390x844 (iPhone), 390x720 (TikTok aprox.), 375x667 (SE), 1280x800 (escritorio)
# Revisar siempre: scrollWidth == ancho (sin scroll horizontal), modo oscuro y claro, capturas.
```

## 12. Preferencias del usuario

- Respuestas cortas, directas y en español. Explicar con listas simples.
- Quiere ver el resultado, no el proceso. **Enseña un mockup antes de aplicar** un cambio de diseño (lo pidió explícitamente). Usa capturas o `SendUserFile`.
- Si algo no se puede confirmar desde aquí, dilo claro y dile qué probar.
- Antes de operaciones externas (publicar, borrar) pregunta; para código dentro de la rama de trabajo, avanza.


## Actualización 4 nov: sección de validación (debajo de las dos tarjetas)

- Las tarjetas de arriba no cambian (se quitó el lead; la línea de prueba dice "Únete a más de 1,900 personas que ya crean con IA"; se quitó "Pronto" de las sesiones en vivo; se escribe **Abicut**, confirmado por captura).
- Debajo: "Resultados reales" (métricas y perfil de un miembro; **no** afirmar "5 días", la captura dice 3 oct a 1 nov), "Lo que te llevas por 12.99" (Motionabi 25 USD/mes y Abicut 14 USD/mes tachados, cursos/llamadas/lo nuevo sin precio a propósito), "Lo que dicen" (2 reseñas de Whop) y botón final a `plan_OmPkW5yg4ePGg`.
- Pendiente: confirmar que 25 y 14 son precios reales por separado (si no, cambiar el tachado por "Valor estimado"); permiso del miembro para mostrar su cuenta (se quitó la leyenda a pedido del usuario); zona horaria de las llamadas no se muestra.
- Las imágenes viven en `img/` y `copiar-a-whop.ps1` las copia a `public/img/`.
- Solo modo oscuro: se eliminó el modo claro (prefers-color-scheme) a pedido del usuario; la página se ve igual en todos los teléfonos.

## Actualización 7 nov: de página de elección a funnel

Orden nuevo de `index.html`: "¿Ya te uniste antes?" → h1 "Mi comunidad de IA." + texto grande descriptivo → Resultados reales → Lo que te llevas por 12.99 (con botón "Unirme a Plus" debajo) → Lo que dicen → "Elige cómo entrar" con **Comunidad Plus arriba y Biblioteca de prompts (Gratis) abajo**, al final de todo → aviso de la app. Ya no existe "comunidad gratis": solo la Biblioteca de prompts. Se quitó "Gratis o con Plus". Futuro: posible VSL arriba.

## Actualización 7 nov (b): estructura tipo página de evento, con nuestra paleta

Inspirado en event.monetise.com (sin copiar su paleta ni su contador). Orden: barra "Nuevo: MCP de Motionabi" → heroe centrado "Crea videos con IA sin saber editar." + CTA + "Sin saber editar · Sin experiencia" + "Más de 2,300 personas ya usan mi biblioteca" → Resultados reales → CTA → 5 bloques numerados de lo que incluye (Motionabi vale 25, Abicut vale 14) + total → CTA → Qué/Cuándo/Dónde → Reseñas → CTA → "¿Por qué confiar en mí?" con foto (`img/keo.jpg`, recortada sin la TV del fondo) y línea de tiempo → objeción "¿Por qué tan barato?" → tarjetas Plus y Biblioteca al final. Plus aparece 5 veces (`plan_OmPkW5yg4ePGg`).
Datos reales del usuario (7 nov): 2,315 en la biblioteca, 46 en Plus (no se muestra el 46 a propósito). Textos a confirmar por el usuario: "Llevo el código y la tecnología en el día a día", "construí Motionabi y Abicut", respuesta de la objeción, "la cuenta de un miembro de Plus".
- 7 nov (c): menos botones. Solo 2 botones "Ver planes" (heroe y tras lo que incluye) que bajan a #planes; el único checkout de Plus está en su tarjeta final.
- 7 nov (d): el precio de Plus (12.99) solo aparece en su tarjeta final. Se mantienen los valores de referencia (Motionabi 25, Abicut 14). Objeción ahora: "¿Por qué todo junto, si solo Motionabi vale 25 al mes?".
- 7 nov (e): un solo botón arriba, "Unirme a Plus" directo al checkout. Ningún botón salta a #planes: la biblioteca gratis solo se encuentra bajando hasta el final (decisión del usuario).
- 7 nov (f): sin la tarjeta de total bajo lo que incluye; más espacio antes de "Los detalles"; la tarjeta de la biblioteca ya no dice "Gratis".
- 7 nov (g): foto del usuario arriba del heroe (`img/keo-heroe.jpg`, sin recorte de fondo, recortada de alto). El botón de Plus termina en ~772 px en 390x844.
