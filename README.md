# Landing Template

Template de landing page con SvelteKit 2, Svelte 5, Tailwind 4, GSAP, Lenis y Theatre.js.

---

## 1. Contexto del Negocio

Completa esta seccion antes de personalizar la landing.

| Campo | Valor |
|---|---|
| **Que vende** | _Ej: Servicio de consultoria digital_ |
| **Cobertura** | _Ej: Mexico, LATAM_ |
| **Tamano empresa** | _Ej: 10-50 empleados_ |
| **ICP (Cliente Ideal)** | _Ej: Directores de marketing en empresas medianas B2B_ |
| **Pains** | _Ej: No generan leads calificados, su sitio no convierte_ |
| **JTBD** | _Ej: Quiero un canal digital que genere prospectos predecibles_ |
| **Tono de comunicacion** | _Ej: Profesional pero cercano, sin tecnicismos_ |

---

## 2. Marca

| Campo | Valor |
|---|---|
| **Nombre** | _TuMarca_ |
| **Estilo visual** | _Ej: Minimalista, limpio, corporativo_ |
| **Tono** | _Ej: Confiable, directo, experto_ |
| **Tipografia** | Inter (por defecto, cambiar en `src/app.css`) |

### Colores

Los colores se configuran en `src/app.css` dentro de `:root` y `.dark`:

```css
:root {
  --primary: hsl(221 83% 53%);        /* Azul principal */
  --primary-foreground: hsl(0 0% 100%); /* Texto sobre primary */
  --background: hsl(220 20% 97%);      /* Fondo general */
  --foreground: hsl(220 20% 10%);      /* Texto general */
  --muted-foreground: hsl(220 9% 46%); /* Texto secundario */
  --border: hsl(220 13% 91%);          /* Bordes */
  --destructive: hsl(0 72% 51%);       /* Errores */
}
```

Para cambiar la paleta, modifica los valores HSL. Las variables `--color-prim`, `--color-sec`, etc. mantienen compatibilidad con el sistema anterior.

---

## 3. Estructura de Componentes

```
src/
  components/
    Navbar.svelte         -- Nav sticky con blur, CTA, menu mobile
    Features.svelte       -- Grid de beneficios con iconos SVG
    SocialProof.svelte    -- Stats animados, testimonios, logos
    FAQ.svelte            -- Accordion de preguntas frecuentes
    ContactForm.svelte    -- Formulario con validacion real-time
    Footer.svelte         -- Links legales, redes, copyright
    WhatsAppFloat.svelte  -- Boton flotante WhatsApp
    WhatsAppModal.svelte  -- Modal de contacto WhatsApp
    Modal.svelte          -- Modal base reutilizable
  lib/
    features.js           -- Feature flags (animaciones on/off)
    animations.js         -- Helpers GSAP/Lenis/SplitType
    analytics.js          -- Tracking Orwel + Google Analytics
    orwel.js              -- Inicializacion de Orwel
    utm.js                -- Captura de parametros UTM
    utils.js              -- Utilidad cn() para clases CSS
  routes/
    +layout.svelte        -- Layout raiz (init animaciones, orwel, UTM)
    +page.svelte          -- Pagina principal con todas las secciones
```

### Agregar / quitar secciones

Las secciones se importan en `src/routes/+page.svelte`. Para quitar una, elimina su import y su uso en el template. Cada componente es independiente.

### Personalizar contenido

Cada componente recibe props con valores por defecto. Pasa tus propios valores desde `+page.svelte`:

```svelte
<Features
  title="Nuestros Servicios"
  items={[
    { icon: 'zap', title: 'Titulo', description: 'Descripcion' },
  ]}
/>
```

Iconos disponibles: `zap`, `shield`, `trending-up`, `headphones`, `star`, `check`.

---

## 4. Configuracion

### Variables de entorno

Copia `.env.example` a `.env` y completa:

```
PUBLIC_MODE=production
PUBLIC_ORWEL_KEY=tu_api_key_aqui
```

### Google Analytics

Edita el ID en `src/app.html`. Reemplaza `G-XXXXXXXXXX` con tu ID real:

```
var id = 'G-TU_ID_REAL';
```

Si el ID contiene `XXXX`, el script no se carga (seguro para desarrollo).

### WhatsApp

Cambia el numero en `+page.svelte`:

```svelte
<WhatsAppFloat phone="521234567890" />
```

Formato: codigo de pais + numero sin espacios.

### SEO

- **Meta tags**: Editar `<svelte:head>` en `+page.svelte`
- **OG Image**: Reemplazar URL en `og:image`
- **Sitemap**: Editar `static/sitemap.xml` con tu dominio
- **Robots**: Editar `static/robots.txt` con tu dominio

---

## 5. Animaciones

Todas las animaciones se controlan desde `src/lib/features.js`:

```javascript
export const features = {
  smoothScroll: true,       // Lenis smooth scroll
  gsapAnimations: true,     // Animaciones GSAP (fadeIn, slideUp, etc.)
  gsapScrollTrigger: true,  // Activar en scroll (requiere gsapAnimations)
  textSplitting: true,      // Split text reveal (requiere gsapAnimations)
  theatreStudio: false,     // Theatre.js studio (solo dev)
};
```

Cambia `true`/`false` para activar o desactivar cada sistema. Los cambios aplican sin reiniciar.

### Helpers disponibles en `animations.js`

| Funcion | Uso |
|---|---|
| `fadeIn(el, opts)` | Fade + slide desde abajo |
| `slideUp(el, opts)` | Slide vertical |
| `staggerChildren(parent, selector, opts)` | Animacion escalonada de hijos |
| `splitTextReveal(el, opts)` | Reveal palabra por palabra |
| `counterAnimation(el, opts)` | Contador numerico animado |
| `initLenis()` | Inicializar smooth scroll |
| `initTheatreStudio()` | Inicializar Theatre.js |

---

## 6. Deploy

### Vercel (configurado por defecto)

```bash
npm run build
```

El proyecto usa `@sveltejs/adapter-vercel`. Conecta el repo a Vercel y se deploye automaticamente en cada push.

### Variables de entorno en Vercel

Agrega en Vercel > Settings > Environment Variables:

- `PUBLIC_MODE` = `production`
- `PUBLIC_ORWEL_KEY` = tu key

---

## Stack

- **Framework**: SvelteKit 2 + Svelte 5 (runes)
- **Estilos**: Tailwind CSS 4 (CSS-first)
- **Animaciones**: GSAP + ScrollTrigger, Lenis, SplitType, Theatre.js
- **UI**: shadcn-svelte compatible (bits-ui, tailwind-variants)
- **Analytics**: Orwel + Google Analytics (gtag)
- **Deploy**: Vercel
