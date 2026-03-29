import Table from "../../components/admin/Table";
import { useEffect, useState } from "react";
import { getProductos } from "../../services/api";

const columns = [
  { key: "PrendaId", label: "ID" },
  { key: "Prenda_Prenda", label: "Nombre" },
  { key: "Genero_Genero", label: "Genero" },
  { key: "pDetalle_Precio", label: "Precio" },
];

const handleEdit = (row) => {
  console.log("Editar", row);
};

const handleDelete = (row) => {
  console.log("Eliminar", row);
};

const AdminProductos = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    getProductos().then(setProductos);
  }, []);

  return (
    <div>
      <h1>Productos</h1>

      <button>+ Nuevo Producto</button>

      <Table
            columns={columns}
            data={productos}
            onEdit={handleEdit}
            onDelete={handleDelete}
        />
    </div>
  );
};

export default AdminProductos;