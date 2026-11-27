# Email: one inbox, one alias per channel

The Meowpany uses one Gmail account, `themeowpany@gmail.com`, and a **`+` alias** per channel. Gmail
delivers `themeowpany+anything@gmail.com` to the same inbox and keeps the full address in "To". One
filter per alias puts each message under its own label.

- The format is `user+tag@gmail.com`, with the `+` sign and no spaces.
- **Gmail does not create labels by itself.** Create one filter per alias once (steps below).
  Filters do not apply to mail that already arrived unless you ask them to.

## Aliases the site uses

Defined in `src/site.ts` (`inbox(...)`). Adding one means adding it here and in Gmail too.

| Alias | Used by | Suggested label |
| --- | --- | --- |
| `themeowpany+contacto@gmail.com` | The address shown on the site | `Web/Contacto` |
| `themeowpany+cotizaciones@gmail.com` | Quote form | `Web/Cotizaciones` |
| `themeowpany+primeraversion@gmail.com` | Free first version requests | `Web/Primera versión` |
| `themeowpany+llamadas@gmail.com` | Call requests | `Web/Llamadas` |
| `themeowpany+estimaciones@gmail.com` | Project estimator | `Web/Estimaciones` |
| `themeowpany+auditorias@gmail.com` | Website audit | `Web/Auditorías` |
| `themeowpany+privacidad@gmail.com` | Personal data requests | `Legal/Privacidad` |
| `themeowpany+socios@gmail.com` | Partner program applications (accountants, closers, chambers) | `Web/Socios` |
| `themeowpany+guias@gmail.com` | Online-selling guide downloads | `Web/Guías` |
| `themeowpany+diagnosticos@gmail.com` | Diagnosis results the visitor chooses to send | `Web/Diagnósticos` |
| `themeowpany+web@gmail.com` | The Web3Forms account | `Web/Formularios` |

## Creating a filter

1. In Gmail, open the search options (the settings icon in the search bar).
2. In **To**, type the alias.
3. **Create filter** → **Apply the label** → choose or create it (a slash nests labels).
4. Optionally **Also apply filter to matching conversations** to file what already arrived.

## Web3Forms

The free key sends every form to **one address**: the account it was created with. Register it with
`themeowpany+web@gmail.com`; each form sends a different subject (`Quote request`, `First working
version request`, `Call request`, `Project estimate`, `Website audit`), so subject filters can split
`Web/Formularios` further. When Web3Forms is missing or fails, the form opens the visitor's email app
addressed to the channel's alias, so the message is filed correctly anyway.
