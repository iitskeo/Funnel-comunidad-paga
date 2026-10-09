# Handoff de estilo: Biblioteca @itskeo5

Todo lo necesario para que una página nueva (por ejemplo, un funnel) se vea igual que
https://biblioteca.kene00vargas.workers.dev.

- **`tokens.css`** (en esta misma carpeta): cópialo al proyecto nuevo e impórtalo primero. Trae colores, tipografías, radios, botones, campos, marcos de video, foco, selección, grano y entradas suaves.

Si le pasas esto a otra IA, dale este archivo completo y `tokens.css`, y dile: *"Usa exactamente estos tokens y reglas; no inventes colores ni tipografías nuevas."*

---

## 1. La idea en una línea

Fondo casi negro con un tinte verde, **un solo color de acento (verde menta)**, títulos con carácter (Bricolage Grotesque), texto limpio (Geist), mucho aire, formas redondeadas y movimiento corto y suave. Los videos van siempre dentro de un **marco** para no perderse en el fondo.

## 2. Paleta

Un solo acento en toda la página. Nada de segundos colores para "variar": la jerarquía se hace con el menta, el blanco y el gris.

### Modo oscuro (el principal)

| Token | Hex | Para qué |
| --- | --- | --- |
| `--bg` | `#0e1311` | Fondo de la página. Un tono por encima del negro, con tinte verde, para que los videos negros se distingan. |
| `--bg-2` | `#141b18` | Fondo de bloques hundidos: buscador, campos, cajas de prompt. |
| `--surface` | `#1a221e` | Superficies elevadas: marco de videos, hover de botones secundarios. |
| `--surface-2` | `#222c27` | Chips y etiquetas sobre superficies. |
| `--line` | `#2d3933` | Bordes y divisores. |
| `--text` | `#e8eeeb` | Texto principal (nunca blanco puro). |
| `--muted` | `#94a29b` | Texto secundario, ayudas, fechas. |
| `--accent` | `#72e4b0` | **El menta.** Botón principal, foco, palabra resaltada, detalles. |
| `--on-accent` | `#03170d` | Texto encima del menta (casi negro verdoso). |

### Modo claro (automático si el sistema está en claro)

| Token | Hex |
| --- | --- |
| `--bg` | `#eff3f1` |
| `--bg-2` | `#e6ece9` |
| `--surface` | `#f8faf9` |
| `--surface-2` | `#dde5e1` |
| `--line` | `#cfd9d4` |
| `--text` | `#0f1412` |
| `--muted` | `#55625c` |
| `--accent` | `#23935f` (más oscuro, para que se vea sobre fondo claro) |
| `--on-accent` | `#03170d` |

### De dónde sale el menta

Del texto verde de los videos de @itskeo5: el centro del texto mide `#7eeaba` y, con su brillo alrededor, `#67dba5`. `#72e4b0` es el punto medio.

### Contrastes medidos (WCAG)

| Combinación | Oscuro | Claro |
| --- | --- | --- |
| Texto sobre fondo | 15.95 | 16.62 |
| Gris (muted) sobre fondo | 7.05 | 5.71 |
| Menta sobre fondo | 12.00 | 3.47 * |
| Texto del botón sobre menta | 11.87 | 4.78 |

\* En modo claro el menta solo sirve para botones, bordes, foco y textos grandes, no para texto pequeño.

### Colores fuera de la paleta (solo estos)

- Error: `#f2777a`, para el texto o el borde de un campo con error. Fondo del aviso: `color-mix(in oklab, #f2777a 14%, var(--bg-2))`.
- Sombra de video: `0 40px 80px -40px rgb(0 0 0 / 0.85)` en oscuro y `0 40px 70px -40px rgb(15 45 30 / 0.4)` en claro.
- Resaltado de búsqueda (`<mark>`): `color-mix(in oklab, var(--accent) 28%, transparent)`.

## 3. Tipografía

| Rol | Fuente | Pesos | Dónde |
| --- | --- | --- | --- |
| Títulos (display) | **Bricolage Grotesque** (variable) | 650–800 | h1, h2, logo, títulos de tarjetas, frase del pie |
| Texto | **Geist** (variable) | 400–600 | Párrafos, botones, campos |
| Mono | **Geist Mono** (variable) | 400 | Solo prompts, código y fechas. No como adorno. |

Cómo cargarlas:
- Con npm (lo que usa la biblioteca): `@fontsource-variable/bricolage-grotesque`, `@fontsource-variable/geist`, `@fontsource-variable/geist-mono`.
- Sin npm: Google Fonts, `family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Geist:wght@100..900&family=Geist+Mono:wght@100..900` (el link completo está al inicio de `tokens.css`).

### Escala

| Elemento | Tamaño | Peso | Interletrado | Interlineado |
| --- | --- | --- | --- | --- |
| Palabra gigante (logo de la intro) | `clamp(7rem, 28vw, 32rem)` | 800 | márgenes `-0.075em` por letra | 1 |
| Título de sección (h2 grande) | `clamp(2.75rem, 6vw, 5.5rem)` | 700 | `-0.04em` | 0.95 |
| Título de página (h1) | `clamp(2.5rem, 4.6vw, 4.25rem)` | 700 | `-0.035em` | 1 |
| Título de héroe con texto al lado | `clamp(1.875rem, 3.2vw, 3rem)` | 700 | `-0.035em` | 1.02 |
| Subtítulo / título de tarjeta grande | `clamp(1.5rem, 2.4vw, 2rem)` | 700 | `-0.03em` | 1.1 |
| Título de tarjeta | `1.0625rem` | 650 | `-0.02em` | 1.3 |
| Texto | `16px` | 400 | normal | 1.6 |
| Texto destacado del héroe | `1.125rem` | 400 | normal | 1.6 |
| Ayudas, metadatos | `0.875rem` | 400 | normal | 1.5 |
| Mono (prompts) | `0.875rem` (`0.75`–`0.8125` en tarjetas) | 400 | `-0.01em` | 1.6–1.7 |

Reglas:
- Títulos con `text-wrap: balance`. Interletrado nunca más apretado que `-0.04em` (salvo la palabra gigante).
- Para enfatizar parte de un título, la segunda parte va en gris (`--muted`), no en otro color ni en otra fuente: **"Cada video, <span gris>con su prompt.</span>"**
- Párrafos con un ancho máximo de 38–65 caracteres (`max-width: 38ch`… `65ch`).

## 4. Forma, espacio y capas

| Token | Valor | Uso |
| --- | --- | --- |
| `--radius` | `20px` | Videos, bloques, paneles |
| `--radius-sm` | `12px` | Campos de formulario, avisos, miniaturas pequeñas |
| píldora | `999px` | **Todo lo interactivo**: botones, buscador, chips, paginación |
| `--marco` | `6px` | Margen interior del marco de los videos |
| `--gutter` | `clamp(16px, 4vw, 40px)` | Margen lateral de la página |
| `--max` | `1320px` | Ancho máximo del contenido |
| `--nav-h` | `64px` | Alto de la barra superior |

- Separación entre secciones: `clamp(80px, 12vw, 140px)`. Dentro de un grupo: 8–16 px. Entre grupos: 24–48 px.
- **Marco de video**: fondo `--surface`, borde de 1 px `color-mix(in oklab, var(--text) 13%, transparent)`, `padding: 6px` y radio interior `calc(var(--radius) - var(--marco))`. Al pasar el mouse, el borde se tiñe de menta (45 %) y sube 4 px.
- Grano de película: capa fija al 4.5 % de opacidad sobre toda la página (incluida en `tokens.css`).
- Capas (z-index): 10 navegación, 20 enlace "saltar al contenido", 30 grano.

## 5. Componentes

**Botón principal**: píldora de 48 px de alto, fondo menta, texto `--on-accent`, peso 500. En hover se aclara hacia el texto (`color-mix(... 88%, var(--text))`) y el ícono baja 2 px. Al presionar: `scale(0.97)`.

**Botón secundario**: píldora con borde `--line` y fondo transparente. En hover, fondo `--surface`.

**Regla de botones**: una sola acción principal por pantalla. Los textos de los botones dicen la acción ("Ver prompts", "Copiar", "Publicar"), en 1 a 3 palabras, sin cortarse en dos líneas.

**Campos**: alto mínimo de 48 px, radio 12 px, fondo `--bg-2`, borde `--line`. En foco, borde menta más un halo de 4 px de menta al 18 %. La etiqueta va **arriba** (nunca solo el placeholder) y la ayuda debajo, en gris y `0.875rem`.

**Buscador / campo protagonista**: píldora de 60 px de alto con ícono de lupa.

**Barra superior**: fija, de 64 px, con fondo `--bg` al 82 % y desenfoque de 14 px; borde inferior suave. Logo en Bricolage 700: "itskeo" + "/biblioteca" en gris.

**Bloque de prompt (código o texto para copiar)**: caja con radio 20 px, fondo `--bg-2` y borde `--line`. El botón "Copiar" en menta va arriba a la derecha y al copiar cambia a "Copiado" con un leve desenfoque en la transición.

**Pie**: frase grande en Bricolage, con la segunda mitad en gris, y abajo una fila con el © y el botón "Seguir en TikTok".

**Íconos**: Phosphor (estilo regular), siempre en línea con el texto. Nada de emojis como íconos.

## 6. Movimiento

| Token | Curva | Uso |
| --- | --- | --- |
| `--ease-out` | `cubic-bezier(0.23, 1, 0.32, 1)` | Respuestas de UI: botones, hover, aparecer |
| `--ease` | `cubic-bezier(0.16, 1, 0.3, 1)` | Entradas largas (la intro) |
| `--ease-in-out` | `cubic-bezier(0.77, 0, 0.175, 1)` | Cosas que se mueven de un lado a otro en pantalla |

| Qué | Duración |
| --- | --- |
| Presionar un botón | 160 ms, `scale(0.97)` |
| Hover (color, borde) | 200 ms |
| Elementos que aparecen al hacer scroll | 600 ms, subir 24 px, escalonado 50 ms |
| Entrada de la intro (letra por letra) | 1.2 s por letra, 70 ms entre letras |

Reglas (criterio de Emil Kowalski + taste):
- Nada aparece desde `scale(0)`; si escala, empieza en `0.95`.
- El hover que mueve cosas solo con mouse: `@media (hover: hover) and (pointer: fine)`.
- Lo que se repite mucho (escribir, filtrar, cambiar de página) **no** se anima.
- Un solo momento animado protagonista por página (en la biblioteca, la entrada de "itskeo").
- Respetar "reducir movimiento": la página se ve quieta. Una clase `anim` en `<html>` activa las animaciones solo si el sistema lo permite:
  `if (!matchMedia('(prefers-reduced-motion: reduce)').matches) document.documentElement.classList.add('anim')`
- Para que algo aparezca al hacer scroll: clase `revelar`, y un `IntersectionObserver` que le agrega `visible` al entrar en pantalla.
- Sin librerías de animación: CSS + `IntersectionObserver` alcanzan, y la página carga más rápido.

## 7. Voz y textos

- En **primera persona** y cercano: "Aquí dejo los prompts exactos de mis videos. Cópialos, juega con ellos y etiquétame con lo que salga."
- Frases cortas. Subtítulos de 20 palabras como máximo.
- Los errores dicen qué pasó y qué hacer: "Ningún prompt dice «x» todavía. Prueba con otra palabra."
- **Nunca** guion largo (—) ni medio (–). Usar punto, coma o dos puntos.
- Nada de palabras vacías tipo "eleva", "potencia", "revoluciona".

## 8. Lo que NO se hace (para mantener el estilo)

- Un segundo color de acento, degradados de color en textos o el "morado de IA".
- Etiquetas pequeñas en mayúsculas encima de los títulos ("eyebrows"), ni numerar secciones (01 / 02).
- Tres tarjetas iguales en fila como estructura de la página.
- Blanco o negro puros.
- Videos sin marco sobre el fondo (se pierden).
- Sombras duras o brillos de neón.
- Cuadros modales para algo que no lo necesita.

## 9. Aplicado a un funnel

- **Héroe**: título grande en Bricolage con la segunda mitad en gris, subtítulo de máximo 20 palabras y **un** botón menta. Si hay video, va enmarcado a la derecha (en celular, abajo).
- **Beneficios**: evita las tres tarjetas iguales. Mejor una lista vertical con espacio generoso, o bloques de distinto tamaño.
- **Prueba social**: citas de máximo 3 líneas, con nombre y quién es. Videos siempre enmarcados.
- **Precio u oferta**: un bloque `--surface` con radio 20 px y el botón principal menta. El precio en Bricolage 700.
- **Formulario o checkout**: campos como en la sección 5, con la etiqueta arriba y los errores debajo en `#f2777a`.
- **Una sola acción por pantalla**, repetida con el mismo texto en todo el funnel (no "Compra ya" en un lado y "Quiero entrar" en otro).
- **Cierre**: frase grande en Bricolage, como el pie de la biblioteca.
