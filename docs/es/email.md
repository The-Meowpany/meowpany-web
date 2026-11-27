# Correo: un buzón, un alias por canal

The Meowpany usa una sola cuenta de Gmail, `themeowpany@gmail.com`, y un **alias con `+`** para cada
canal. Gmail entrega `themeowpany+lo-que-sea@gmail.com` en la misma bandeja y conserva la dirección
completa en el campo «Para». Con un filtro por alias, cada mensaje cae en su propia etiqueta.

Dos aclaraciones:

- El formato es `usuario+etiqueta@gmail.com`, con el signo `+` y sin espacios.
- **Gmail no crea las etiquetas solo.** Hay que crear una vez un filtro por alias (pasos abajo). Los
  filtros no se aplican a los correos que ya llegaron.

## Alias que usa el sitio

Están definidos en `src/site.ts` (`inbox(...)`). Si se agrega uno, se agrega también aquí y en Gmail.

| Alias | Lo usa | Etiqueta sugerida |
| --- | --- | --- |
| `themeowpany+contacto@gmail.com` | Correo visible en el sitio (pie, Contacto) | `Web/Contacto` |
| `themeowpany+cotizaciones@gmail.com` | Cotizador | `Web/Cotizaciones` |
| `themeowpany+primeraversion@gmail.com` | Pedidos de la primera versión gratis | `Web/Primera versión` |
| `themeowpany+llamadas@gmail.com` | Pedidos de llamada | `Web/Llamadas` |
| `themeowpany+estimaciones@gmail.com` | Estimador de proyectos | `Web/Estimaciones` |
| `themeowpany+auditorias@gmail.com` | Auditoría web | `Web/Auditorías` |
| `themeowpany+privacidad@gmail.com` | Pedidos sobre datos personales (Ley 18.331) | `Legal/Privacidad` |
| `themeowpany+web@gmail.com` | Cuenta de Web3Forms (ver abajo) | `Web/Formularios` |

Alias recomendados para el resto de la operación (no los usa el sitio):

| Alias | Para |
| --- | --- |
| `themeowpany+soporte@gmail.com` | Pedidos de clientes con plan de soporte |
| `themeowpany+facturacion@gmail.com` | Facturas, comprobantes y avisos de pago |
| `themeowpany+proveedores@gmail.com` | Alojamiento, dominios y servicios contratados |
| `themeowpany+exterior@gmail.com` | Clientes de Estados Unidos y plataformas de contratación |

## Crear un filtro (una vez por alias)

1. En Gmail, en la barra de búsqueda, abrir las opciones de búsqueda (el ícono de ajustes a la derecha).
2. En **Para**, escribir el alias, por ejemplo `themeowpany+cotizaciones@gmail.com`.
3. **Crear filtro**.
4. Marcar **Aplicar la etiqueta** y elegir o crear la etiqueta (por ejemplo `Web/Cotizaciones`; la barra
   crea una etiqueta dentro de otra).
5. Opcional: **Marcar siempre como importante** para cotizaciones y primera versión.
6. **Crear filtro**. Para ordenar lo que ya llegó, marcar también «Aplicar el filtro a las conversaciones
   que coincidan».

## Web3Forms

Con la clave gratuita, Web3Forms envía todos los formularios a **un solo correo**: el de la cuenta con
la que se creó la clave. Por eso se registra con `themeowpany+web@gmail.com`. Cada formulario envía un
asunto distinto, así que dentro de `Web/Formularios` se puede separar con filtros por asunto:

| El asunto empieza con | Formulario |
| --- | --- |
| `Quote request` | Cotizador |
| `First working version request` | Primera versión gratis |
| `Call request` | Pedido de llamada |
| `Project estimate` | Estimador |
| `Website audit` | Auditoría |

Si Web3Forms no está configurado o falla, el formulario abre el correo del visitante con el mensaje
escrito y dirigido al alias del canal (tabla de arriba), así cae en la etiqueta correcta igual.

## Cuidados

- Algunos formularios de terceros no aceptan el `+`; en ese caso, usar la dirección principal.
- Quien vea un alias puede deducir la dirección principal. No es un mecanismo de seguridad, solo de
  orden.
- Cuando exista el dominio `meowpany.com`, los alias pasan a ser buzones o reenvíos
  (`cotizaciones@meowpany.com`); basta con cambiar `inbox()` en `src/site.ts`.
