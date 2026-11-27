// Chapters of the online-selling guide, shared by its landing page and the guide itself.
export const chapters = [
  { id: "numeros", icon: "calculator", title: "Antes de empezar: los números", summary: "El margen real de cada venta y dónde conviene vender primero." },
  { id: "cobrar", icon: "credit-card", title: "Cobrar", summary: "Mercado Pago, plazos de acreditación, cuotas, transferencias y efectivo." },
  { id: "enviar", icon: "truck", title: "Enviar", summary: "Retiro, envío propio y paquetería nacional, con costos y plazos claros." },
  { id: "facturar", icon: "receipt", title: "Facturar", summary: "Facturación electrónica de la DGI: quién está obligado y cómo conectarla a la tienda." },
  { id: "ley", icon: "scale", title: "Lo que pide la ley", summary: "Derecho de arrepentimiento, datos personales e información al cliente." },
  { id: "vender", icon: "sparkles", title: "Que le compren", summary: "Fotos, descripciones, confianza y velocidad: lo que hace que una visita se convierta en venta." },
  { id: "lista", icon: "list-checks", title: "Lista para lanzar", summary: "Todo lo que conviene revisar antes de abrir la tienda." },
] as const;

/** When the facts in the guide were last checked against their sources. */
export const reviewed = new Date("2026-11-27");
