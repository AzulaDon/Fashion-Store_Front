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
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const login = async (email, password) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ email, password }),
  });

  const data = await handleResponse(res);

  if (data.token) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  }
  return data;
};

export const register = async (nombre, email, password) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ nombre, email, password }),
  });

  const data = await handleResponse(res);

  if (data.token) localStorage.setItem("token", data.token);

  return data;
};

export const logout = async () => {
  try {
    await fetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
      headers: headers(true),
    });
  } catch (_) {}

  localStorage.removeItem("token");
};

export const getProductos = async () => {
  const res = await fetch(`${BASE_URL}/productos`);
  return handleResponse(res);
};

export const getProductosPorGenero = async (genero) => {
  const res = await fetch(`${BASE_URL}/productos?genero=${genero}`);
  return handleResponse(res);
};

export const getProductosPorCategoria = async (categoriaId) => {
  const res = await fetch(`${BASE_URL}/productos?categoria=${categoriaId}`);
  return handleResponse(res);
};

export const getProductoById = async (id) => {
  const res = await fetch(`${BASE_URL}/productos/${id}`);
  return handleResponse(res);
};

export const getNovedades = async () => {
  const res = await fetch(`${BASE_URL}/productos/novedades`);
  return handleResponse(res);
};

export const getOfertas = async () => {
  const res = await fetch(`${BASE_URL}/productos/ofertas`);
  return handleResponse(res);
};

export const createProducto = async (data) => {
  const res = await fetch(`${BASE_URL}/productos`, {
    method: "POST",
    headers: headers(true),
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

export const updateProducto = async (id, data) => {
  const res = await fetch(`${BASE_URL}/productos/${id}`, {
    method: "PUT",
    headers: headers(true),
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

export const deleteProducto = async (id) => {
  const res = await fetch(`${BASE_URL}/productos/${id}`, {
    method: "DELETE",
    headers: headers(true),
  });
  return handleResponse(res);
};

//extra

export const buscarProductos = async (query) => {
  const res = await fetch(`${BASE_URL}/productos/search?q=${query}`);
  return handleResponse(res);
};

export const getProductosPorPrecio = async (min, max) => {
  const res = await fetch(`${BASE_URL}/productos?min=${min}&max=${max}`);
  return handleResponse(res);
};