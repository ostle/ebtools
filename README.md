# Catálogo Industrial

Catálogo estático de productos para suministros industriales. React + Vite + React Router (HashRouter) + Tailwind CSS. Pensado para GitHub Pages.

## Requisitos

- Node.js 18+
- Cuenta de Google (para Sheets y Drive con el CSV y las imágenes)

## Instalación

```bash
npm install
```

## Configuración del CSV

1. Crea una hoja de cálculo en Google Sheets con las columnas: `id`, `title`, `descripcion`, `categoria`, `imagen url`, `destacado`.
2. Publica la hoja: **Archivo → Compartir → Publicar en la web** → elige "Valores separados por comas (.csv)" y publica.
3. Copia la URL que termina en `.../pub?output=csv`.
4. En `src/api/api.js` reemplaza la constante `CSV_URL` con esa URL.

```js
const CSV_URL = "https://docs.google.com/spreadsheets/d/e/TU_ID_REAL/pub?output=csv";
```

Las imágenes en la columna `imagen url` pueden ser enlaces de Google Drive (p. ej. `https://drive.google.com/file/d/ID/view`). La app las convierte automáticamente a URL directa para mostrarlas.

## Desarrollo

```bash
npm run dev
```

## Build y GitHub Pages

```bash
npm run build
```

Para GitHub Pages:

- En el repo: **Settings → Pages → Source**: "Deploy from a branch".
- Branch: `gh-pages` (o `main`) y carpeta `/ (root)` o `docs` con el contenido de `dist`.
- Si el sitio queda en `https://usuario.github.io/catalogo-industrial/`, en `vite.config.js` usa `base: '/catalogo-industrial/'` para que los recursos carguen bien.

Se usa **HashRouter** para que al recargar en cualquier ruta no aparezcan 404 en GitHub Pages.

## Estructura

```
src/
├── api/
│   └── api.js          # Fetch CSV (PapaParse) + helper URL Google Drive
├── components/
│   ├── Layout.jsx      # Layout con sidebar de categorías
│   └── ProductCard.jsx
├── constants/
│   └── categories.js   # Lista de categorías y slug ↔ nombre
├── pages/
│   ├── Home.jsx        # Hero + productos destacados
│   ├── PLP.jsx         # Listado por categoría
│   └── PDP.jsx         # Detalle + botón WhatsApp + cross-selling
├── App.jsx             # HashRouter y rutas
├── main.jsx
└── index.css           # Tailwind + fuentes
```

## Rutas

- `/` — Home (hero + destacados)
- `/#/categoria/:categoryName` — PLP por categoría
- `/#/producto/:id` — PDP con botón "Comprar" (WhatsApp)

En `src/pages/PDP.jsx` puedes cambiar el número de WhatsApp (`WHATSAPP_NUMBER`) por el real.
