import { useState } from "react";

const AdminForm = ({ onSave, onCancel }) => {
  const [form, setForm] = useState({
    nombre: "",
    generoId: "",
    temporadaId: "",
    coleccionId: "",
    
    colorId: "",
    tallaId: "",
    precio: "",
    stock: "",
    sku: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);       
  };

  return (
    <div className="admin-form-overlay">
      <div className="admin-form-card">
        <h3>Nueva Prenda + Detalle</h3>
        <form onSubmit={handleSubmit}>

          <input
            placeholder="Nombre de la prenda"
            value={form.nombre}
            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          />

          <input
            placeholder="Género ID (1=Hombre, 2=Mujer)"
            type="number"
            value={form.generoId}
            onChange={(e) => setForm({ ...form, generoId: parseInt(e.target.value) || "" })}
          />

          <input
            placeholder="Temporada ID"
            type="number"
            value={form.temporadaId}
            onChange={(e) => setForm({ ...form, temporadaId: parseInt(e.target.value) || "" })}
          />

          <input
            placeholder="Colección ID"
            type="number"
            value={form.coleccionId}
            onChange={(e) => setForm({ ...form, coleccionId: parseInt(e.target.value) || "" })}
          />

          <hr />
          <h4>Detalle inicial de la prenda</h4>

          <input
            placeholder="Color ID"
            type="number"
            value={form.colorId}
            onChange={(e) => setForm({ ...form, colorId: parseInt(e.target.value) || "" })}
          />

          <input
            placeholder="Talla ID"
            type="number"
            value={form.tallaId}
            onChange={(e) => setForm({ ...form, tallaId: parseInt(e.target.value) || "" })}
          />

          <input
            placeholder="Precio"
            type="number"
            step="0.01"
            value={form.precio}
            onChange={(e) => setForm({ ...form, precio: parseFloat(e.target.value) || "" })}
          />

          <input
            placeholder="Stock inicial"
            type="number"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: parseInt(e.target.value) || "" })}
          />

          <input
            placeholder="SKU (opcional)"
            value={form.sku}
            onChange={(e) => setForm({ ...form, sku: e.target.value })}
          />

          <div className="form-actions">
            <button type="button" onClick={onCancel}>Cancelar</button>
            <button type="submit">Guardar Prenda + Detalle</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AdminForm;