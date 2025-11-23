const API_URL = "https://tu-backend.com"; // cambiar a la url de jairo

export async function fetchWithAuth(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  // Si existe token → agrega Authorization
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // Manejo global de errores
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "Error en la petición");
  }

  // Respuesta en JSON
  return response.json();
}