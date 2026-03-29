const BASE_URL = "http://localhost:8080/api";

const getToken = () => localStorage.getItem("token");

const headers = (auth = false) => ({
  "Content-Type": "application/json",
  ...(auth && getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
});

const handleResponse = async (res) => {
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    console.error("API ERROR:", data);
    throw new Error(data?.message || `Error ${res.status}`);
  }
  return data;
};

export const getUser = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

export const login = async (email, password) => {
  const res = await fetch(`${BASE_URL}/usuarios/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ correo: email, clave: password }),
  });

  const data = await handleResponse(res);

  if (data && typeof data === "object") {
    localStorage.setItem("user", JSON.stringify(data));
    // ✅ No intentamos guardar token porque el backend no lo devuelve aún
  }

  return data;
};

export const register = async (email, password, phone) => {
  const res = await fetch(`${BASE_URL}/usuarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      correo: email,
      clave: password,
      telefono: phone,
      rolId: 5
    }),
  });

  // ✅ handleResponse ya parsea el JSON — no llames .json() de nuevo
  const data = await handleResponse(res);

  // ✅ Si el registro también devuelve token, guárdalo
  localStorage.setItem("user", JSON.stringify(data));
  if (data.token) localStorage.setItem("token", data.token);

  return data;
};

// ✅ logout limpia todo
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");    // ← faltaba esto
  localStorage.removeItem("gender");  // limpia género también
};

// --- Productos (sin cambios) ---
// 🔥 obtener todos los detalles (productos reales)
export const getProductos = async () => {
  const res = await fetch(`${BASE_URL}/prendas-detalle`);
  return handleResponse(res);
};

// 🔥 por ID
export const getProductoById = async (id) => {
  const res = await fetch(`${BASE_URL}/prendas-detalle/${id}`);
  return handleResponse(res);
};

export const getProductosPorPrenda = async (prendaId) => {
  const res = await fetch(`${BASE_URL}/prendas-detalle/prenda/${prendaId}`);
  return handleResponse(res);
};

export const getPrendas = async () => {
  const res = await fetch(`${BASE_URL}/prendas`);
  return handleResponse(res);
};

export const getPrendaById = async (id) => {
  const res = await fetch(`${BASE_URL}/prendas/${id}`);
  return handleResponse(res);
};

export const getCompras = async () => {
  const res = await fetch(`${BASE_URL}/compras`);
  return handleResponse(res);
};

export const createCompra = async (data) => {
  const res = await fetch(`${BASE_URL}/compras`, {
    method: "POST",
    headers: headers(true),
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

export const getCompraDetalle = async (compraId) => {
  const res = await fetch(`${BASE_URL}/compras-detalle/compra/${compraId}`);
  return handleResponse(res);
};

export const createCompraDetalle = async (data) => {
  const res = await fetch(`${BASE_URL}/compras-detalle`, {
    method: "POST",
    headers: headers(true),
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

