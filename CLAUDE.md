# Manuel Cortez — mcortezv

Sitio personal de Manuel Cortez. mcortezv.dev

## Stack

- **Framework**: SvelteKit 2 + Svelte 5 (runes)
- **Estilos**: Tailwind CSS 4 (CSS-first) + CSS custom properties
- **Componentes**: bits-ui (headless), shadcn/ui adaptado
- **Animaciones**: GSAP + ScrollTrigger, Lenis (smooth scroll), SplitType
- **Deploy**: Vercel (adapter-vercel)
- **Analytics**: Orwel + Google Analytics
- **Idioma**: Español primario, inglés futuro

## Marca — Identidad

- **Arquetipos**: Mago, Sabio, Explorador
- **Tagline**: "Builder. Growth. Water Tech."
- **Tono**: Directo, no frío. Autoridad ganada, no declarada. Honestidad de sistema.
- **Palabras clave del tono**: preciso, denso-en-ideas, honesto, sin-relleno, curioso
- **Anti-palabras** (NUNCA usar): innovador, apasionado, experto en, soluciones integrales, sinergia
- **CTA**: Un solo CTA por página. LinkedIn como destino final. Sin formulario, sin email público, sin cal.com.

## Voz y Contenido

- Cada oración justifica su existencia. Sin relleno.
- Las credenciales aparecen UNA vez, en contexto. No se repiten.
- TDAH + altas capacidades se nombra sin drama, como dato.
- Español preciso. Términos técnicos en inglés cuando corresponde, sin disculpa.
- Framing contextual por venture, no genérico.
- Categorías de contenido: Growth Industrial, Water Tech, TDAH + AACC, Reflexiones, Aprendizajes, Innovación.

## Paleta de Colores

### Primary — Cobalt (autoridad, profundidad)
| Token | Hex | Uso |
|-------|-----|-----|
| cobalt-900 | `#0e1f5c` | Fondos profundos, gradientes |
| cobalt-800 | `#1a3a8f` | **Botón primario, acentos de card, enlaces activos** |
| cobalt-600 | `#2952cc` | Hover states, bordes de énfasis, íconos |
| cobalt-400 | `#4a72e8` | Links de texto, subtítulos de acción |
| cobalt-100 | `#c0cffa` | Texto sobre fondos oscuros |
| cobalt-50 | `#e8edfb` | Background de hover en cards, ghost button fill |

### Primary — Indigo (transición, NO solo)
| Token | Hex | Uso |
|-------|-----|-----|
| indigo-900 | `#1e1260` | Solo en gradientes profundos |
| indigo-700 | `#3d2fa0` | Solo como transición de cobalt en hover profundo |
| indigo-500 | `#5a4dbf` | Acentos secundarios en dark mode |
| indigo-100 | `#d4cff5` | Fondos sutiles |

### Accent — Gold (ESCASO y deliberado)
| Token | Hex | Uso |
|-------|-----|-----|
| gold-800 | `#7a5500` | Fondo de badge gold |
| gold-600 | `#c9960a` | Borde de badge gold |
| gold-400 | `#f0c040` | Texto en badge gold |
| gold-100 | `#fdf0c0` | Highlight sutil |

> **Gold SOLO para**: Google Partner, NVIDIA Inception, UC Berkeley SkyDeck. Nada más.

### Neutrales
| Token | Hex | Uso |
|-------|-----|-----|
| ink | `#0d0d12` | Texto principal, headings |
| carbon | `#1c1c24` | Fondos secundarios dark |
| muted | `#6b6880` | Texto secundario, descripciones |
| border | `#d8d5e8` | Bordes, separadores |
| paper | `#f6f4f0` | **Background de página** (cálido, NO blanco puro) |
| white | `#ffffff` | Cards, superficies |

### Fondos de sección
- Default: `#f6f4f0` (paper)
- Ventures: `#0d0d12` (ink)
- Writing: `#eeeae4`
- Contact: `#1a3a8f` (cobalt-800)

## Tipografía

### Familias
| Rol | Fuente | Uso |
|-----|--------|-----|
| Display | **Cormorant Garamond** (300, 400, 600) | Hero, headings, nombres de venture, citas. Weight 300-400. Italic solo para énfasis semántico. |
| Body | **Epilogue** (300, 400, 500, 700) | Párrafos, descripciones, UI general. 300 texto largo, 400 lectura normal, 500 énfasis inline. |
| Mono | **DM Mono** (300, 400, 500) | Labels, tags, fechas, navegación, sistema. **Siempre uppercase + letter-spacing 0.1em–0.2em.** |

### Escala tipográfica
| Token | Size | Font | Weight | Line-height |
|-------|------|------|--------|-------------|
| hero | `clamp(4rem, 7vw, 6.5rem)` | display | 300 | 0.95 |
| h1 | `clamp(2.4rem, 4vw, 3.5rem)` | display | 300 | 1.1 |
| h2 | `clamp(1.8rem, 3vw, 2.6rem)` | display | 300 | 1.2 |
| h3 | `1.4rem` | display | 400 | 1.25 |
| body-lg | `1.05rem` | body | 300 | 1.75 |
| body | `1rem` | body | 400 | 1.7 |
| body-sm | `0.9rem` | body | 400 | 1.6 |
| label | `0.7rem` | mono | 500 | — |
| micro | `0.65rem` | mono | 400 | — |

## Spacing

- Section Y: `7rem`
- Section X: `3rem` (desktop), `1.5rem` (mobile)
- Card padding: `2.5rem` (lg), `1.5rem` (sm)
- Grid gap: `1px` (grid), `2rem` (cards)
- Max width: `1440px`

## Bordes y Radios

- Default: `1px solid #d8d5e8`
- Subtle: `0.5px solid #e4e2f0`
- Emphasis: `2px solid #1a3a8f`
- **Cards de venture: 0px border-radius** (esquinas rectas)
- Solo tags, inputs, badges: `4px` o `8px`
- **radius global: 0rem** (esquinas rectas por defecto)

## Componentes — Reglas

### Botones
- **Siempre font mono**, uppercase, letter-spacing 0.12em, border-radius 0px.
- Primary: fondo cobalt-800, hover cobalt-600 + translateY(-2px).
- Ghost: borde cobalt-800, fondo transparente, hover cobalt-50.
- Text: underline cobalt-400, hover cobalt-800.

### Cards
- **Venture (dark)**: fondo ink, esquinas rectas, accent-line bottom que anima de 0→100% en hover.
- **Post (light)**: fondo white, borde default, hover translateY(-4px) + borde cobalt-800.
- Tags en cards: font mono, 0.6rem, uppercase.

### Tags
- Default: borde, mono, uppercase, hover cambia a cobalt.
- Accent: fondo cobalt-900, texto cobalt-100.
- Gold: fondo `#2a1a00`, texto gold-400. **Solo para credenciales de alto valor.**

### Section Labels
- Font mono, 0.65rem, uppercase, cobalt-600, con línea horizontal después.

### TDAH Note
- Border-left cobalt-800, fondo `#f0eeea`, italic, color muted. Solo en /about.

## Animaciones

- **Principio**: El movimiento confirma — no entretiene. Siempre purposeful.
- Page reveal: opacity 0→1 + translateY(24px→0), stagger 100ms
- Card hover: translateY(0→-4px), border-color transition
- Venture accent: width 0→100% bottom border, 300ms ease
- Scroll reveal: IntersectionObserver, threshold 0.1, once
- Durations: fast 150ms, normal 200ms, slow 300ms, reveal 700ms
- Easing: default ease, enter ease-out, exit ease-in
- **NUNCA usar**: bounce, spring, elastic, rotate-in, scale-bounce

## Estructura del Sitio

```
/ .................. Home (hero, about, ventures, now, writing, polímata, contact)
/about ............. Bio expandida, credenciales, TDAH+AACC
/work .............. Vista general ventures
  /work/hyper ...... Hyper Digital + Hyper Labs
  /work/hyperflow .. HyperFlow OS
  /work/orwel ...... Orwel.io
  /work/watersy .... Watersy
  /work/aliar ...... ALIAR
/writing ........... Content hub
  /writing/[slug] .. Post individual
  /writing/tag/[tag] Filtro por categoría
/now ............... Qué construye Fernando ahora (actualizable mensual)
/uses .............. Stack y herramientas (fase 2)
/contact ........... Solo LinkedIn
```

## Ventures (ecosistema)

| # | Nombre | Categoría | Estado |
|---|--------|-----------|--------|
| 01 | Hyper Digital | Agencia + OS | activo |
| 02 | HyperFlow OS | SaaS | activo |
| 03 | Watersy | Water Tech | activo |
| 04 | ALIAR | Aceleración | activo |
| 05 | Orwel.io | AI | activo |
| 06 | Hyper Labs | Labs | activo |

## Convenciones de Código

- Path aliases: `$components`, `$lib`, `$src`
- Prettier: tabs, single quotes, 100px width, no trailing commas
- Componentes en `src/components/`
- Utilidades en `src/lib/`
- CSS variables definidas en `src/app.css`
- Variables de entorno: `PUBLIC_MODE`, `PUBLIC_ORWEL_KEY`
