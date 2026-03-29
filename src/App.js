import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Signup } from "./pages/Signup";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import GenderSelector from './pages/GenderSelector';
import Collections from './pages/Collections';
import Novedades from './pages/Novedades';
import Ofertas from './pages/Ofertas';
import ProductoDetalle from './pages/ProductoDetalle';
import Admin from "./pages/admin/Admin";
import ColeccionDetalle from "./pages/ColeccionDetalle";
import Cart from './pages/Cart';


function App() {

  return (
    <BrowserRouter>
      <Routes>        
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/login" element={<Signup />} />
        <Route path="/select-gender" element={<PrivateRoute><GenderSelector /></PrivateRoute> } />
        <Route path="/colecciones" element={<Collections />} />
        <Route path="/coleccion/:id" element={<ColeccionDetalle />} />
        <Route path="/novedades" element={<Novedades />} />
        <Route path="/ofertas" element={<Ofertas />} />
        <Route path="/producto/:id" element={<ProductoDetalle />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;