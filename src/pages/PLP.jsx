import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../api/api";
import { slugToCategory } from "../constants/categories";
import ProductCard from "../components/ProductCard";

export default function PLP() {
  const { categoryName } = useParams();
  const category = slugToCategory(decodeURIComponent(categoryName || ""));
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts()
      .then((data) =>
        setProducts(data.filter((p) => p.categoria.trim() === category))
      )
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [category]);

  return (
    <div className="min-h-screen py-8 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-display text-3xl md:text-4xl text-industrial-charcoal mb-2">
          {category}
        </h1>
        <p className="text-industrial-charcoal-muted mb-8">
          {products.length} producto{products.length !== 1 ? "s" : ""} en esta
          categoría
        </p>
        {loading && (
          <p className="text-industrial-charcoal-muted">
            Cargando productos...
          </p>
        )}
        {error && (
          <p className="text-red-600" role="alert">
            Error al cargar: {error}
          </p>
        )}
        {!loading && !error && products.length === 0 && (
          <p className="text-industrial-charcoal-muted">
            No hay productos en esta categoría.
          </p>
        )}
        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
