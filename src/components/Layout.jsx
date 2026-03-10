import { Outlet, Link, useLocation } from "react-router-dom";
import { CATEGORIES, categoryToSlug } from "../constants/categories";

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-industrial-white via-industrial-offwhite to-industrial-white">
      <aside className="w-full lg:w-64 lg:min-h-screen bg-gradient-to-b from-industrial-charcoal-light to-industrial-charcoal text-industrial-white flex-shrink-0 shadow-industrial">
        <Link
          to="/"
          className="block p-6 border-b border-industrial-charcoal-muted"
        >
          <div className="flex items-center gap-3">
            <div className="bg-white rounded-md px-3 py-2 shadow-sm">
              <img
                src="https://ebtools.com.ar/wp-content/uploads/2018/01/logo-ebtools-202x70.png"
                alt="EBTools"
                className="h-10 w-auto object-contain"
              />
            </div>
            
          </div>
        </Link>
        <nav className="p-4" aria-label="Categorías">
          <p className="text-industrial-offwhite text-xs uppercase tracking-wider px-3 py-2">
            Categorías
          </p>
          <ul className="space-y-1">
            {CATEGORIES.map((cat) => {
              const slug = categoryToSlug(cat);
              const path = `/categoria/${encodeURIComponent(slug)}`;
              const isActive =
                location.pathname === path ||
                location.pathname === `/categoria/${slug}`;
              return (
                <li key={cat}>
                  <Link
                    to={path}
                    className={`block px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-industrial-orange text-industrial-charcoal"
                        : "text-industrial-white/80 hover:bg-industrial-charcoal-muted hover:text-industrial-yellow"
                    }`}
                  >
                    {cat}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
