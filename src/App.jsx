import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import PLP from "./pages/PLP";
import PDP from "./pages/PDP";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="categoria/:categoryName" element={<PLP />} />
          <Route path="producto/:id" element={<PDP />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
