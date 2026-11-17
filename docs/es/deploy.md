# Publicar el sitio web

El sitio son archivos estáticos, así que sirve cualquier alojamiento estático. Estos pasos usan
Cloudflare Pages, que lee `public/_headers` y tiene un plan gratuito.

1. Comprar los dominios `meowpany.com` y `themeowpany.com` (y los `.uy` si están libres).
2. Subir este repositorio a un repositorio privado de GitHub.
3. En Cloudflare Pages, crear un proyecto a partir de ese repositorio:
   - Comando de compilación: `npm run build`
   - Directorio de salida: `dist`
   - Variables de entorno: `PUBLIC_CORE_URL=https://core.meowpany.com` y `NPM_FLAGS=--force`
     (la instalación necesita `--force`, ver [overview.md](overview.md)). La compilación falla a
     propósito si `PUBLIC_CORE_URL` falta, no es https o no está permitido en `connect-src` de
     `public/_headers`.
     El dominio `core.meowpany.com` es provisional hasta que el propietario confirme el dominio real
     de Core.
4. Agregar `meowpany.com` como dominio propio. HTTPS se emite automáticamente.
5. Redirigir `themeowpany.com` y `www.meowpany.com` a `https://meowpany.com`.
6. Activar DNSSEC y agregar los registros SPF, DKIM y DMARC del proveedor de correo.
7. Comprobarlo: ejecutar PageSpeed Insights sobre la página de inicio (objetivo: 95 o más en celular)
   y enviar una cotización de prueba.

El servidor de compilación tiene una CPU moderna, así que usa el compilador nativo de Astro. El
compilador WebAssembly solo se activa en máquinas sin AVX2.
