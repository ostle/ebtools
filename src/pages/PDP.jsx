import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProducts } from "../api/api";
import ProductCard from "../components/ProductCard";
import { buildWhatsAppHref } from "../constants/contact";

export default function PDP() {
  const { id } = useParams();
  const productId = decodeURIComponent(id || "");
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        const found = data.find((p) => String(p.id).trim() === productId);
        setProduct(found);
        if (found) {
          setRelated(
            data.filter(
              (p) =>
                p.categoria === found.categoria && String(p.id).trim() !== productId
            )
          );
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen py-12 px-6 flex items-center justify-center">
        <p className="text-industrial-charcoal-muted">Cargando producto...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-12 px-6">
        <p className="text-red-600" role="alert">
          Error al cargar: {error}
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen py-12 px-6">
        <p className="text-industrial-charcoal-muted">Producto no encontrado.</p>
        <Link
          to="/"
          className="mt-4 inline-block text-industrial-orange font-medium hover:underline"
        >
          Volver al inicio
        </Link>
      </div>
    );
  }

  const whatsappHref = buildWhatsAppHref(product.title);

  return (
    <div className="min-h-screen py-8 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
          <div className="aspect-square bg-industrial-charcoal-muted rounded-lg overflow-hidden">
            {product.imagenUrl ? (
              <img
                src={product.imagenUrl}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-industrial-charcoal-muted">
                Sin imagen
              </div>
            )}
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider text-industrial-orange-dark font-semibold mb-2">
              {product.categoria}
            </p>
            <h1 className="font-display text-3xl md:text-4xl text-industrial-charcoal mb-4">
              {product.title}
            </h1>
            <p className="text-industrial-charcoal-muted leading-relaxed whitespace-pre-line mb-8">
              {product.descripcion}
            </p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full lg:w-auto px-8 py-4 bg-industrial-orange text-industrial-charcoal font-bold uppercase tracking-wider rounded-md hover:bg-industrial-orange-dark transition-colors shadow-industrial"
            >
              Comprar
            </a>
          </div>
        </div>

        {related.length > 0 && (
          <section className="border-t border-industrial-offwhite pt-12">
            <h2 className="font-display text-2xl text-industrial-charcoal mb-6">
              Otros productos de la misma categoría
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.slice(0, 6).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
