export const CATEGORIES = [
  "Productos para la Construcción",
  "Clipeadoras",
  "Productos para el Agro",
  "Herramientas Neumáticas",
  "Sopletes",
  "Filtros y Acople",
  "Presostatos",
];

/**
 * Convierte nombre de categoría a slug para la URL (sin acentos, minúsculas, espacios a guiones).
 */
export function categoryToSlug(name) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/\u0300-\u036f/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

/**
 * Obtiene el nombre de categoría desde el slug (busca en CATEGORIES por coincidencia).
 */
export function slugToCategory(slug) {
  const normalizedSlug = slug.toLowerCase().replace(/\s+/g, "-");
  return (
    CATEGORIES.find(
      (c) =>
        categoryToSlug(c) === normalizedSlug ||
        c.toLowerCase().replace(/\s+/g, "-") === normalizedSlug
    ) || slug
  );
}
