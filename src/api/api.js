import Papa from "papaparse";

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRztrNxBPCqSQte_9flrB7ZK5SQ4XUB5i8gBcLaCNRci0Zosyxj-hUfkDaSRftabGt7ARVJmViu2m9T/pub?output=csv";

/**
 * Extrae el ID de una URL de Google Drive y devuelve la URL directa para visualización.
 * Acepta formatos: .../file/d/ID/view o ...?id=ID
 * @param {string} url - URL original (ej: https://drive.google.com/file/d/ID/view)
 * @returns {string} URL directa para imagen o la URL original si no hay match
 */
export function getDirectImageUrl(url) {
  if (!url || typeof url !== "string") return "";
  const match = url.match(/(?:file\/d\/|id=)([\w-]+)/);
  if (match && match[1]) {
    return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  }
  return url;
}

/**
 * Normaliza las claves del objeto (trim y lowercase para comparación).
 * El CSV puede tener "imagen url" con espacio.
 */
function normalizeRow(row) {
  const normalized = {};
  for (const key in row) {
    const cleanKey = key.trim().toLowerCase().replace(/\s+/g, " ");
    normalized[cleanKey] = row[key] != null ? String(row[key]).trim() : "";
  }
  return normalized;
}

/**
 * Mapea una fila normalizada al formato de producto.
 */
function mapRowToProduct(row) {
  const rawImageUrl = row["imagen url"] || "";
  return {
    id: row.id || "",
    title: row.title || "",
    descripcion: row.descripcion || "",
    categoria: row.categoria || "",
    imagenUrl: getDirectImageUrl(rawImageUrl),
    destacado: (row.destacado || "").toUpperCase() === "SI",
  };
}

/**
 * Obtiene todos los productos desde el CSV público de Google Sheets.
 * @returns {Promise<Array<{ id: string, title: string, descripcion: string, categoria: string, imagenUrl: string, destacado: boolean }>>}
 */
export function fetchProducts() {
  return new Promise((resolve, reject) => {
    Papa.parse(CSV_URL, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          reject(new Error(results.errors.map((e) => e.message).join("; ")));
          return;
        }
        const products = results.data
          .map((row) => normalizeRow(row))
          .map(mapRowToProduct)
          .filter((p) => p.id);
        resolve(products);
      },
      error: (error) => reject(error),
    });
  });
}
