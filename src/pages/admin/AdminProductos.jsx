import { useEffect, useState } from "react";
import Table from "../../components/admin/Table";
import AdminForm from "./AdminForm";
import { getPrendas, deleteProducto } from "../../services/api";

const AdminProductos = () => {
  const [productos, setProductos] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getPrendas()
      .then(data => {
        console.log("CAMPOS:", Object.keys(data[0]));
        setProductos(data);
      })
      .catch(console.error);
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar producto?")) return;
    try {
      await deleteProducto(id);
      setProductos(prev => prev.filter(p => p.prendaId !== id));
    } catch (err) {
      console.error(err);
    }
  };

 const handleSave = async (formData) => {
  try {
    const res = await fetch("http://localhost:8080/api/prendas-detalle/con-detalle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || "Error al guardar");
    }

    setShowForm(false);

    const data = await getPrendas();
    setProductos(data);

    alert("Prenda y detalle guardados correctamente");

  } catch (err) {
    console.error(err);
    alert("Error al guardar: " + err.message);
  }
};

  const columns = [
    { key: "prendaId",  label: "ID" },
    { key: "nombre",    label: "Nombre" },
    { key: "genero",    label: "Género" },
    { key: "coleccion", label: "Colección" },
    { key: "color",     label: "Color" },
    { key: "talla",     label: "Talla" },
    { key: "temporada", label: "Temporada" },
    { key: "precio",    label: "Precio",
      render: (row) => `$${row.precio?.toFixed(2) ?? "-"}` },
    { key: "stock",     label: "Stock" },
    {
      key: "acciones",
      label: "Acciones",
      render: (row) => (
        <div className="admin-actions">
          <button className="btn-edit">Editar</button>
          <button className="btn-delete" onClick={() => handleDelete(row.prendaId)}>
            Eliminar
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="admin-productos">
      <div className="admin-header">
        <h1 className="admin-title">Productos</h1>
        {/* ✅ Abre el form en lugar de insertar directo */}
        <button className="admin-btn-primary" onClick={() => setShowForm(true)}>
          + Nuevo Producto
        </button>
      </div>

      {/* ✅ Muestra el form si showForm es true */}
      {showForm && (
        <AdminForm
          onSave={handleSave}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="admin-table-wrapper">
        <Table columns={columns} data={productos} className="admin-table" />
      </div>
    </div>
  );
};

export default AdminProductos;