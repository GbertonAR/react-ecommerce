/* src/services/products.js */
import axios from "axios";

const API_URL = "https://69176c46a7a34288a280b4be.mockapi.io/api/v1/products";

// Obtener todos los productos
export async function getProducts() {
  return axios.get(API_URL);
}

// Obtener 1 producto por ID
export async function getProductById(id) {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data; // ← correcto
}

// Crear producto
export async function createProduct(data) {
  return axios.post(API_URL, data);
}

// Actualizar producto
export async function updateProduct(id, data) {
  return axios.put(`${API_URL}/${id}`, data);
}

// Eliminar producto
export async function deleteProduct(id) {
  return axios.delete(`${API_URL}/${id}`);
}
