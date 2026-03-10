import { Link } from "react-router-dom";
import { buildWhatsAppHref } from "../constants/contact";

export default function ProductCard({ product }) {
  const { id, title, categoria, imagenUrl } = product;
  const whatsappHref = buildWhatsAppHref(title);

  return (
    <article className="bg-white rounded-lg shadow-industrial overflow-hidden border border-industrial-offwhite hover:shadow-industrial-lg transition-shadow flex flex-col">
      <Link to={`/producto/${encodeURIComponent(id)}`} className="block flex-1">
        <div className="aspect-square bg-industrial-charcoal-muted overflow-hidden">
          {imagenUrl ? (
            <img
              src={imagenUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-industrial-charcoal-muted">
              <span className="text-sm">Sin imagen</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <p className="text-xs uppercase tracking-wider text-industrial-orange-dark font-semibold mb-1">
            {categoria}
          </p>
          <h2 className="font-semibold text-industrial-charcoal line-clamp-2 mb-3">
            {title}
          </h2>
          <span className="inline-flex items-center gap-2 text-industrial-orange font-medium text-sm">
            Ver detalles
            <span aria-hidden>→</span>
          </span>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-full px-4 py-2.5 bg-industrial-orange text-industrial-charcoal font-semibold text-sm uppercase tracking-wide rounded-md hover:bg-industrial-orange-dark transition-colors"
        >
          Comprar
        </a>
      </div>
    </article>
  );
}
