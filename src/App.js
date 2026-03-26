import { BrowserRouter, Routes, Route, Navigate  } from 'react-router-dom';
import { Home }   from './pages/Home';
import { Signup } from './pages/Signup';
import GenderSelector from './pages/GenderSelector';
import Collections from './pages/Collections';
import Novedades from './pages/Novedades';
import Ofertas from './pages/Ofertas';
import ProductoDetalle from './pages/ProductoDetalle';
import Admin from "./pages/admin/Admin";
import { getUser } from "./services/api";


function App() {

  const user = getUser();

  return (
    <BrowserRouter>
      <Routes>

        {/* en caso de pruebas quitar la verificacion del logueo y dejar la ruta pura*/}
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Signup />} />
        <Route path="/select-gender" element={user ? <GenderSelector /> : <Navigate to="/login" />} />
        <Route path="/colecciones" element={<Collections />} />
        <Route path="/novedades" element={<Novedades />} />
        <Route path="/ofertas" element={<Ofertas />} />
        <Route path="/producto/:id" element={<ProductoDetalle />} />
        <Route path="/admin" element={ user?.rol === "ADMIN" ? <Admin /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;