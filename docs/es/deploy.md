# Publicar el sitio web

El sitio son archivos estáticos que se publican con GitHub Pages, gratuito para repositorios públicos.
`.github/workflows/pages.yml` lo compila y lo publica en cada push a `master`.

## La primera vez

1. Hacer público el repositorio (en el plan Free, Pages solo sirve repositorios públicos). No hay
   nada secreto en él: las claves de `src/site.ts` son públicas por diseño.
2. En la configuración del repositorio, en **Pages**, elegir **GitHub Actions** como **Source**.
3. Hacer push a `master` o ejecutar a mano el workflow `pages`. El sitio queda en
   `https://the-meowpany.github.io/meowpany-web/`.
4. Completar `src/site.ts`: la clave de acceso de Web3Forms (gratuita, ligada al correo de la empresa),
   una clave de la API de PageSpeed Insights restringida al dominio del sitio (gratuita; la auditoría
   la necesita) y, si se quiere, el enlace de reservas de Cal.com.
5. Comprobarlo: ejecutar PageSpeed Insights sobre la página de inicio (objetivo: 95 o más en celular)
   y enviar una solicitud de prueba desde el cotizador.

## Dominio propio

Cuando se compre `meowpany.com`:

1. En **Pages**, poner `meowpany.com` como dominio propio y activar **Enforce HTTPS**.
2. En el proveedor de DNS, agregar los registros `A` y `AAAA` que GitHub indica para dominios raíz y
   un `CNAME` de `www` a `the-meowpany.github.io`. Verificar el dominio para la organización, así nadie
   más puede reclamarlo.
3. Redirigir `themeowpany.com` a `https://meowpany.com` desde su registrador.
4. Activar DNSSEC y agregar los registros SPF, DKIM y DMARC del proveedor de correo.

El workflow toma la dirección de la configuración de Pages, así que los enlaces, las URL canónicas y el
mapa del sitio pasan al dominio nuevo en la siguiente publicación, sin cambiar código.

## Lo que Pages no puede hacer

- **Encabezados de respuesta.** La Content-Security-Policy y la política de referencia se fijan con
  etiquetas `<meta>` en `src/layouts/Base.astro`. HSTS lo pone GitHub. La protección contra
  incrustaciones (`frame-ancestors`) no está disponible.
- **Código de servidor.** Los formularios, la auditoría, el estimador y las reservas funcionan en el
  navegador con los servicios listados en [overview.md](overview.md). Los endpoints públicos de Core
  quedan disponibles para un futuro traslado a un alojamiento con servidor.
