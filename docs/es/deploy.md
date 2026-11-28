# Publicar el sitio web

El sitio son archivos estáticos que se publican con GitHub Pages, gratuito para repositorios públicos.
`.github/workflows/pages.yml` lo compila y lo publica en cada push a `master`.

## La primera vez

1. Hacer público el repositorio (en el plan Free, Pages solo sirve repositorios públicos). No hay
   nada secreto en él: las claves de `src/site.ts` son públicas por diseño.
2. En la configuración del repositorio, en **Pages**, elegir **GitHub Actions** como **Source**.
3. Hacer push a `master` o ejecutar a mano el workflow `pages`. El sitio queda en
   `https://meowpany.us.ci/`. La dirección de GitHub Pages
   (`https://the-meowpany.github.io/meowpany-web/`) redirige a la dirección propia.
4. Completar `src/site.ts`: la clave de acceso de Web3Forms (gratuita, ligada al correo de la empresa),
   una clave de la API de PageSpeed Insights restringida al dominio del sitio (gratuita; la auditoría
   la necesita) y, si se quiere, el enlace de reservas de Cal.com.
5. Comprobarlo: ejecutar PageSpeed Insights sobre la página de inicio (objetivo: 95 o más en celular)
   y enviar una solicitud de prueba desde el cotizador.

## Dominio propio

El sitio se publica en `https://meowpany.us.ci/`, en la raíz del dominio. El `CNAME` del DNS apunta a
`the-meowpany.github.io` y GitHub Pages sirve el sitio con esa dirección.

El workflow compila con `BASE_PATH="/"` y toma `SITE_URL` de la variable de repositorio `SITE_URL`
(o de `https://meowpany.us.ci` si no está definida). No se usa la ruta del repositorio como base: en un
dominio propio esa ruta no existe y los archivos CSS, las imágenes y los enlaces internos devuelven 404.

Para cambiar de dominio:

1. En **Pages**, poner el dominio nuevo y activar **Enforce HTTPS**.
2. En el proveedor de DNS, apuntar el dominio a GitHub Pages. Verificar el dominio para la
   organización, así nadie más puede reclamarlo.
3. Actualizar la variable `SITE_URL` del repositorio.
4. Redirigir el dominio anterior desde su registrador.
5. Activar DNSSEC y agregar los registros SPF, DKIM y DMARC del proveedor de correo.

La página `public/meowpany-web/index.html` mantiene viva la dirección anterior de GitHub Pages y
redirige a la raíz del dominio propio.

## Lo que Pages no puede hacer

- **Encabezados de respuesta.** La Content-Security-Policy y la política de referencia se fijan con
  etiquetas `<meta>` en `src/layouts/Base.astro`. HSTS lo pone GitHub. La protección contra
  incrustaciones (`frame-ancestors`) no está disponible.
- **Código de servidor.** Los formularios, la auditoría, el estimador y las reservas funcionan en el
  navegador con los servicios listados en [overview.md](overview.md). Los endpoints públicos de Core
  quedan disponibles para un futuro traslado a un alojamiento con servidor.
