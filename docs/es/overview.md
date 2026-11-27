# The Meowpany · sitio web

El sitio web público de The Meowpany: un sitio estático y bilingüe (español e inglés) hecho con
[Astro](https://astro.build), publicado en GitHub Pages. No tiene servidor propio: los formularios
hablan con servicios gratuitos directamente desde el navegador y, si un servicio no está configurado
o no responde, abren el programa de correo del visitante.

## Ejecutarlo

```sh
npm ci --force       # ver abajo; también cambia al compilador WebAssembly en CPU sin AVX2
npm run dev          # http://localhost:4321
npm run build        # sitio estático en dist/
npm run preview      # sirve dist/ en segundo plano; `npx astro preview stop` lo detiene
```

`--force` es obligatorio: el paquete del compilador WebAssembly declara `cpu: wasm32` y npm se niega a
instalarlo en x64 sin esa opción. No cambia nada más en este proyecto (0 vulnerabilidades, sin
conflictos de dependencias pares), pero también silenciaría un conflicto nuevo, así que revise
`npm ls` después de agregar una dependencia.

`SITE_URL` y `BASE_PATH` fijan la dirección pública para los enlaces canónicos y el mapa del sitio;
el workflow de Pages los completa. Sin ellos, la compilación asume la raíz del dominio.

## Herramientas gratuitas

| Página | Qué obtiene el visitante | Respaldada por |
| --- | --- | --- |
| `/auditoria/`, `/en/audit/` | Una auditoría real de su sitio, con las correcciones ordenadas por impacto | `src/lib/audit.ts`: Google PageSpeed Insights desde el navegador |
| `/estimar/`, `/en/estimate/` | Una propuesta imprimible dimensionada con puntos de función IFPUG | `src/lib/estimator.ts`, en el navegador, con la calibración de Core |
| `/retorno/`, `/en/roi/` | Cuánto le cuesta el trabajo manual y en cuánto tiempo se recupera la inversión | `src/lib/roi.ts`, en el navegador |
| `/agendar/`, `/en/book/` | Una llamada de 30 minutos, o la primera versión funcional gratis (`?for=prototype`) | Enlace de Cal.com, o una solicitud por `src/lib/leads.ts` |

Todos los formularios entregan por `src/lib/leads.ts`: un contrato `LeadSink` con un adaptador de
Web3Forms y el correo como respaldo. Sumar un proveedor es sumar un adaptador, sin tocar los formularios.

`npm test` ejecuta las pruebas unitarias de `src/lib/`.

## Dónde está cada cosa

| Ruta | Qué contiene |
| --- | --- |
| `src/i18n.ts` | Las rutas en ambos idiomas y los textos compartidos de la interfaz |
| `src/content.ts` | Todo dato que afirma el sitio, en ambos idiomas: servicios, proceso, garantías, cifras de mercado con su fuente, herramientas, preguntas frecuentes y la oferta de primera versión. Las cifras salen del plan de negocio (revisión 99) |
| `src/pricing.ts` | Condiciones de lanzamiento y planes de soporte. No hay lista de precios: cada proyecto se cotiza aparte |
| `src/site.ts` | Correo, número de WhatsApp, LinkedIn y las claves públicas de los servicios de formularios, agenda y auditoría |
| `src/lib/` | Lógica del navegador con pruebas unitarias. `leads.ts`, `audit.ts` y `estimator.ts` son los módulos `web-leads`, `web-audit` y `estimator` de meowpany-engineering (0.1.0); se cambian primero allí |
| `src/news/` | Novedades en Markdown (`es/` y `en/`): un archivo nuevo es una novedad nueva, en el listado, en el RSS y en la portada |
| `src/site.ts` → `availability` | Horario de llamadas, anticipación, horizonte y feriados de la agenda (`src/lib/slots.ts`) |
| `src/views/Brand.astro` | El manual de marca (`/marca/`, `/en/brand/`) |
| `src/styles/global.css` | El sistema de diseño, sobre los colores de la marca: rosa capucha #CA678E, carbón #433F45 y gris cálido |
| `public/brand/` | Los activos reales de la marca, tomados de Core: el gato (SVG) y el logotipo (PNG, con una copia clara para fondos oscuros) |
| `src/views/` | Diseños de página compartidos por las rutas en español y en inglés |
| `src/locales/es/` | Las páginas en español, con nombre en inglés según la página que reflejan; sus URL en español salen de `src/i18n.ts` |
| `src/pages/` | La página de inicio en español y las rutas en inglés bajo `/en/` |
| `src/layouts/Base.astro` | La estructura de la página, incluida la Content-Security-Policy (Pages no puede enviar encabezados) |

## Antes de publicar

- Configure el número de WhatsApp en `src/site.ts`; mientras esté vacío, los botones de WhatsApp
  quedan ocultos.
- Cree una clave de acceso gratuita de Web3Forms con themeowpany+web@gmail.com (ver [email.md](email.md)) y póngala en
  `services.web3formsKey` de `src/site.ts`. Mientras tanto, los formularios abren el correo del visitante.
- Cree una clave gratuita de la API de PageSpeed Insights restringida al dominio del sitio y póngala
  en `services.pagespeedKey`: sin ella, Google suele rechazar las auditorías por falta de cupo.
- Opcional: un enlace de reservas de Cal.com (`services.bookingUrl`).
- Inscriba la base de datos de contactos ante la URCDP antes de publicar el formulario (Ley 18.331).

## CPU antiguas

El compilador nativo de Astro usa instrucciones AVX y falla con «Illegal instruction» en CPU que no
las tienen, como el Celeron 2955U. `scripts/use-wasm-compiler.mjs` se ejecuta después de cada
instalación y elimina el binario nativo en esas máquinas, así Astro usa su compilador WebAssembly.

Vea [deploy.md](deploy.md) para publicarlo.
