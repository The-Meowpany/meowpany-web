# The Meowpany · sitio web

El sitio web público de The Meowpany: un sitio estático y bilingüe (español e inglés) hecho con
[Astro](https://astro.build). Cada página lleva al formulario de cotización, que envía las solicitudes
a [Core](https://github.com/the-meowpany/meowpany-core), la aplicación interna de la empresa.

## Ejecutarlo

```sh
npm ci --force       # ver abajo; también cambia al compilador WebAssembly en CPU sin AVX2
npm run dev          # http://localhost:4321
npm run build:local  # sitio estático en dist/, con los formularios apuntando a un Core local
npm run preview      # sirve dist/ en segundo plano; `npx astro preview stop` lo detiene
```

`--force` es obligatorio: el paquete del compilador WebAssembly declara `cpu: wasm32` y npm se niega a
instalarlo en x64 sin esa opción. No cambia nada más en este proyecto (0 vulnerabilidades, sin
conflictos de dependencias pares), pero también silenciaría un conflicto nuevo, así que revise
`npm ls` después de agregar una dependencia.

Una compilación de producción necesita la dirección de Core y no se ejecuta sin ella:

```sh
PUBLIC_CORE_URL=https://core.meowpany.com npm run build   # el origen debe estar permitido en public/_headers
```

Ejecute Core al mismo tiempo (`http://127.0.0.1:8000`) para probar el formulario de cotización de
punta a punta.

## Herramientas gratuitas

| Página | Qué obtiene el visitante | Respaldada por |
| --- | --- | --- |
| `/auditoria/`, `/en/audit/` | Una auditoría real de su sitio, con las correcciones ordenadas por impacto | Core `POST /public/audits/` |
| `/estimar/`, `/en/estimate/` | Una propuesta imprimible dimensionada con puntos de función IFPUG | Core `POST /public/estimates/` |
| `/retorno/`, `/en/roi/` | Cuánto le cuesta el trabajo manual y en cuánto tiempo se recupera la inversión | `src/lib/roi.ts`, en el navegador |
| `/agendar/`, `/en/book/` | Una llamada de 30 minutos en un horario libre, con invitación de calendario | Horarios y reservas de Core |

`npm test` ejecuta las pruebas unitarias de `src/lib/`.

## Dónde está cada cosa

| Ruta | Qué contiene |
| --- | --- |
| `src/i18n.ts` | Las rutas en ambos idiomas y los textos compartidos de la interfaz |
| `src/content.ts` | Servicios, pasos del proceso y preguntas frecuentes en ambos idiomas |
| `src/pricing.ts` | Precios de lista y la estimación de la cotización. Los precios se cambian solo aquí |
| `src/site.ts` | Correo, número de WhatsApp, LinkedIn y la URL de Core |
| `src/views/` | Diseños de página compartidos por las rutas en español y en inglés |
| `src/locales/es/` | Las páginas en español, con nombre en inglés según la página que reflejan; sus URL en español salen de `src/i18n.ts` |
| `src/pages/` | La página de inicio en español y las rutas en inglés bajo `/en/` |
| `public/_headers` | Encabezados de seguridad para Cloudflare Pages o Netlify |

## Antes de publicar

- Configure el número de WhatsApp en `src/site.ts`; mientras esté vacío, los botones de WhatsApp
  quedan ocultos.
- Compile con `PUBLIC_CORE_URL=https://core.meowpany.com npm run build` y agregue ese origen a
  `connect-src` en `public/_headers`.
- Inscriba la base de datos de contactos ante la URCDP antes de publicar el formulario (Ley 18.331).

## CPU antiguas

El compilador nativo de Astro usa instrucciones AVX y falla con «Illegal instruction» en CPU que no
las tienen, como el Celeron 2955U. `scripts/use-wasm-compiler.mjs` se ejecuta después de cada
instalación y elimina el binario nativo en esas máquinas, así Astro usa su compilador WebAssembly.

Vea [deploy.md](deploy.md) para publicarlo.
