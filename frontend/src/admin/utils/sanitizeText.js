export function stripRTL(text) {
  return text
    .replace(/[\u202A-\u202E]/g, "")
    .replace(/[\u200E\u200F]/g, "")
    .replace(/dir="rtl"/gi, "")
    .replace(/direction:\s*rtl/gi, "");
}
