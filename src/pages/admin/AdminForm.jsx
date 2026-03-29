import { useState } from "react";

const AdminForm = ({ onSave }) => {
  const [form, setForm] = useState({
    nombre: "",
    genero: "",
    precio: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Nombre"
        onChange={(e) =>
          setForm({ ...form, nombre: e.target.value })
        }
      />

      <input
        placeholder="Genero"
        onChange={(e) =>
          setForm({ ...form, genero: e.target.value })
        }
      />

      <input
        placeholder="Precio"
        onChange={(e) =>
          setForm({ ...form, precio: e.target.value })
        }
      />

      <button type="submit">Guardar</button>
    </form>
  );
};

export default AdminForm;