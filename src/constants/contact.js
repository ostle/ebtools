export const WHATSAPP_NUMBER = "5491159483116";

export function buildWhatsAppHref(productTitle) {
  const whatsappText = `Hola! Me interesa el producto: ${productTitle}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    whatsappText
  )}`;
}

