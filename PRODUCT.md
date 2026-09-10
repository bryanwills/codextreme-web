# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro 7 + React 19 + Tailwind CSS v4, i18n es/en, static output, hosted at codextreme.es

## Users

- **Principal:** Gamers y entusiastas de PC (16-35) que buscan Windows 10/11 ligero para máximo FPS, baja latencia y mínimo consumo de recursos. Usan el sitio en desktop oscuro, con urgencia por descargar e instalar rápido.
- **Secundario:** Técnicos / DIY makers que quieren aprender a crear su propia ISO con NTLite, siguen guías paso a paso y valoran transparencia sobre qué se eliminó.
- **Terciario:** Usuarios casuales y sysadmins que exploran herramientas recomendadas, software runtime y optimizaciones Win Optimizer para afinar su instalación existente.
- Todos valoran claridad técnica, honesty sobre seguridad, y comunidad open source (GitHub stars, Discord).

## Product Purpose

CodeXtremeOS es un proyecto open source de XOscarDevX que publica ISOs de Windows 10/11 modificadas con NTLite (hasta 3.2–5 GB, bloatware eliminado, telemetría reducida, soporte UWP/Xbox/MS Store opcional) y el conocimiento para replicarlas. El sitio debe: presentar las ediciones disponibles, proveer descargas verificadas, enseñar vía guías/herramientas/software/optimizer, y fomentar que el usuario cree su propia ISO personalizada con confianza.

Éxito = descarga completada sin fricción, comprensión de diferencias entre builds (24H2/23H2/22H2), y progresión hacia guías o herramientas post-descarga. Métrica proxy: clicks a descargas externas (MediaFire/Drive) + tiempo en guías.

## Positioning

La mejor ISO Windows gaming creada con transparencia total: no solo entrega un sistema extremo y liviano, sino que documenta cada tweak, recomienda el stack de herramientas open source, y entrega un optimizer con registros editables. Competidores ofrecen ISOs cerradas; CodeXtreme publica el "cómo" (NTLite + guías Hellbovine) y alienta al usuario a compilar la suya.

## Operating Context

- Flujo clásico: Hero → ¿Qué es? → Features → Descargas (3 variantes 25H2/24H2/23H2 + 22H2 legacy) → NTLite disclaimer → Guías/Herramientas/Software/Optimizer.
- Entorno: uso nocturno, pantallas 1080p-4K, Windows, Discord/YouTube como canales de soporte.
- Herramientas reales del ecosistema: NTLite, ChrisTitus WinUtil/Winhance, PowerToys, Windhawk, BleachBit, O&O ShutUp, etc.
- Monetización: enlaces de descarga externos, sin paywall; necesita banner informativo NTLite y recomendación de creación propia por seguridad.
- Idiomas: es (default del contenido) y en, routing sin prefix para en.

## Capabilities and Constraints

- ISOs: 25H2 (5 GB, todo bloatware removido, WinUtil/Winhance en escritorio), 24H2 (3.6 GB, Intel RST), 23H2 (4.8 GB), 10 22H2 Legacy (3.8 GB). Todas: x64 UEFI, full updatable, sin apps UWP preinstaladas, telemetría eliminada, updates pausadas.
- Páginas: Home, Descargas, Guías (8 guías video), Herramientas (13 tools), Software (21 runtimes/apps), Optimizer (8 categorías con tweaks de registro).
- Restricción: no inventar claims de +FPS o benchmarks sin etiquetar como ilustrativo; usar solo features listadas. No romper i18n ni rutas astro:i18n. Mantener SEO meta, sitemap, y enlaces externos con rel noopener.
- Debe seguir siendo estático, sin backend.

## Brand Commitments

- Nombre: CodeXtremeOS (una palabra, O y S mayúsculas). Mantener mención a XOscarDevX.
- Tono actual: técnico, directo, con emojis moderados. Nueva voz puede ser más editorial pero mantener claridad.
- Sin restricciones visuales: libertad total para redefinir paleta, tipografía y sistema (usuario lo confirmó). No hay logo vectorial obligatorio; tipográfico es aceptable.

## Evidence on Hand

- Contenido real: i18n/ui.ts con todas las labels, src/data/*.ts con tweak definitions, enlaces MediaFire/Drive, guías YouTube NTLite.
- Assets: public/favicon.webp, public/image.png (og), grid-pattern.svg (revisar).
- Repositorios GitHub: codextreme-web (stars/forks como proof potencial).
- Ausencias: benchmarks auditados, testimonios verificados, fotos de producto OS (screenshots VM). No fabricar precios/clientes.

## Product Principles

1. Transparencia radical sobre qué se tocó y cómo replicarlo.
2. Performance demostrable sobre marketing; datos primero, claims después.
3. Dark-first técnico: la interfaz debe sentirse como el OS que promete (rápida, sin bloat).
4. Documentar antes de descargar: el usuario entiende tradeoffs antes del click.
5. Open source comunitario: cada herramienta merece crédito y star.

## Accessibility & Inclusion

- Soporte lector de pantalla, navegación por teclado, alto contraste opcional (AccessibilityToolbar existente). Mantener 4.5:1 contraste mínimo. No bloquear zoom 200%. Mantener lang alternates.
