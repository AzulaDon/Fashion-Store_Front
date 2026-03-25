// src/services/api.js
// Cambia BASE_URL al puerto de tu Spring Boot (por defecto 8080)
const BASE_URL = "http://localhost:8080/api";

// ── Helpers ─────────────────────────────────────────────────────────────────

const getToken = () => localStorage.getItem("token");

const headers = (auth = false) => ({
    "Content-Type": "application/json",
    ...(auth && getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
});

const handleResponse = async (res) => {
    const data = await res.json().catch(() => null);
    if (!res.ok) throw new Error(data?.message || `Error ${res.status}`);
    return data;
};

// ── Auth ─────────────────────────────────────────────────────────────────────

/**
 * Inicia sesión. Guarda el token JWT en localStorage.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{ token: string, user: object }>}
 */
export const login = async (email, password) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify({ email, password }),
    });
    const data = await handleResponse(res);
    if (data.token) localStorage.setItem("token", data.token);
    return data;
};

/**
 * Registra un nuevo usuario.
 * @param {string} nombre
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{ token: string, user: object }>}
 */
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

/**
 * Cierra sesión. Elimina el token local.
 * Si tu backend tiene endpoint de logout, lo llama también.
 */
export const logout = async () => {
    try {
        await fetch(`${BASE_URL}/auth/logout`, {
            method: "POST",
            headers: headers(true),
        });
    } catch (_) {
        // Si falla el endpoint, igual limpiamos localmente
    } finally {
        localStorage.removeItem("token");
    }
};

// ── Catálogo ─────────────────────────────────────────────────────────────────

/**
 * Obtiene todos los productos.
 * @returns {Promise<Array>}
 */
export const getProductos = async () => {
    const res = await fetch(`${BASE_URL}/productos`, {
        headers: headers(true),
    });
    return handleResponse(res);
};

/**
 * Obtiene productos filtrados por categoría.
 * @param {"dama"|"caballero"|"ninos"} categoria
 * @returns {Promise<Array>}
 */
export const getProductosPorCategoria = async (categoria) => {
    const res = await fetch(`${BASE_URL}/productos?categoria=${categoria}`, {
        headers: headers(true),
    });
    return handleResponse(res);
};

/**
 * Obtiene el detalle de un producto por ID.
 * @param {number|string} id
 * @returns {Promise<object>}
 */
export const getProductoById = async (id) => {
    const res = await fetch(`${BASE_URL}/productos/${id}`, {
        headers: headers(true),
    });
    return handleResponse(res);
};