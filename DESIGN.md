# Design

<!-- impeccable:design-schema 1 -->

## Visual World — Benchmark Lab

**Thesis:** Windows se demuestra en banco de pruebas, no se promete. La web es el laboratorio negro mate donde cada recurso es una métrica verificable.

### Palette & Material
- **Ground:** #07080B (vacuum) — fondo dominante, escena nocturna de taller
- **Surface:** #111318 (panel), #171A21, #0D0F13 (header/bench inner), #1C202B
- **Border:** #232730 (1px) y #2D3340 (hover) — elevación por borde, sin sombra fantasma
- **Text:** #F2F3F5 (principal), #8B92A8 (secundario), #61697E (mono/meta)
- **Signal:** #BFFF00 Lime (acento primario, 8% de superficie, CTAs, LIVE dot, barra llena), #7C5CFF Violet (eco de marca anterior, usado solo en detalles), #00E5FF Cyan (reservado), #FFB020 Amber (workshop/avisos), #FF3344 (tachado)
- Material: paneles mate con borde fino, highlight radial lime 6% solo en hover, grid 32px a 4% de opacidad como retícula de medición — no decoración.

### Typography
- **Display:** Clash Display 600/700, -0.03em a -0.04em tracking, 42–72px. Sin degradados; peso es la jerarquía.
- **Body:** Geist 400/500/600, 14–20px, 52–65ch medida, interlineado 1.6
- **Mono:** JetBrains Mono 400/500/600 solo para datos: métricas, tags, fechas, estados LIVE, hashes. Nunca como disfraz de “técnico” en copy.
- Escala: 11px mono meta, 13–14px body panel, 18–20px sub, 36–48px H1, 28–36px H2

### Composition & Topology
- Header bench: 64px, border-b #232730, backdrop-blur 14px, wordmark CX lime + display + LIVE pill mono, nav píldora centrada (pill #111318), CTA lime derecha.
- Hero: 12-col grid, 1.05fr/0.95fr en desktop, stack en mobile. Izq: pill verificación + H1 72px + sub 20px + 2 CTAs + meta mono. Der: panel bench con header ventana (3 dots + LIVE) + 3 barras comparativas + sparkline FPS + lista removed keep + footer mono.
- Bento: 12-col grid con spans variados (7/5, 5/7, 4/4/4, 6/6) — evita tarjetas mismo tamaño. Radios 16px consistentes, pills para controles pequeños.
- Telemetry wall: panel dividido en 4 celdas con divisores 1px, sin cards anidadas.
- Workshop callout: amber 6% con borde amber 20%, dos columnas (copy + dos cards internas).
- CTA final: centrado, 52px H2, fondo #0D0F13 con radial lime 8% superior.

### Controls & States
- Botones primarios: pill 36–48px, bg #BFFF00 texto negro, hover #D4FF4D, focus ring 2px #BFFF00/40
- Secundarios: bg #111318 border #232730 texto blanco, hover #171A21 border #2D3340
- Nav activa: pill blanca texto negro
- Card hover: border #2D3340 + radial lime 6%, sin elevación por sombra
- Links: underline offset 4px, decor #232730 → #BFFF00 en hover
- Focus visible: outline 2px #BFFF00 offset 2px

### Motion
- Un solo momento autoral: bench-in (translateY 12px + opacity 0→1, ease-out expo, 420ms) en hero panel y barras (stagger 80ms). Pulse-live 1.2–1.4s en dot LIVE. Sin entradas repetidas por sección; contenido visible por defecto.

### Responsive
- Desktop 1280px container, 24–32px gutters. Mobile: hero stack, bento col-span-12, telemetry wall stack, header nav colapsa a menú wrap con pills. Grid 32px se mantiene pero opacidad reduce a 2% en <768px.

### Assets
- Sin ilustración pictórica; solo geometría SVG (sparklines, barras, dots). No grain feTurbulence, no emoji como icono (SVG 1.6px stroke consistente).
- Imagen OG existente /image.png conservada.

### Honest Risk
Carga tipográfica externa (Clash Display vía Fontshare + Geist/JetBrains vía Google) — flash si CDN falla; fallback a system-ui bloquea layout shift por -0.03em tracking. Grid 32px marcado como advisory por detector pero justificado como retícula de medición de banco.

