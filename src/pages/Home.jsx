import { useState, useEffect } from "react";
import { fetchProducts } from "../api/api";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts()
      .then((data) => setProducts(data.filter((p) => p.destacado)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-industrial-white via-industrial-offwhite to-industrial-white">
      <section
        className="relative text-industrial-white py-10 lg:py-14 px-6 bg-center bg-cover"
        style={{ backgroundImage: "url(/img/background.jpg)" }}
      >
        <div className="absolute inset-0 bg-industrial-charcoal/70" aria-hidden />
        <div className="relative max-w-5xl mx-auto text-center">
        <h1 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-wide text-industrial-yellow mb-2 drop-shadow opacity-0">
  EBTOOLS
</h1>
<p className="text-industrial-offwhite/90 text-base md:text-lg max-w-2xl mx-auto opacity-0">
  Herramientas, equipos y soluciones para la industria. Calidad y
  confiabilidad en cada producto.
</p>
        </div>
      </section>

      <section className="py-12 px-6 max-w-6xl mx-auto">
        <h2 className="font-display text-2xl md:text-3xl text-industrial-charcoal mb-8">
          Productos destacados
        </h2>
        {loading && (
          <p className="text-industrial-charcoal-muted">Cargando productos...</p>
        )}
        {error && (
          <p className="text-red-600" role="alert">
            Error al cargar: {error}
          </p>
        )}
        {!loading && !error && products.length === 0 && (
          <p className="text-industrial-charcoal-muted">
            No hay productos destacados.
          </p>
        )}
        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
