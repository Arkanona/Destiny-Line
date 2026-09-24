const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

async function requestAuth(endpoint, payload) {
  try {
    const response = await fetch(`${API_URL}/api/v1/auth/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data.message || 'La requête d’authentification a échoué.');
    }
    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('Le serveur back-end est inaccessible. Vérifie VITE_API_URL et le serveur API.');
    }
    throw error;
  }
}

export function registerUser(userData) {
  // BACK-END : endpoint attendu : POST /api/v1/auth/register.
  return requestAuth('register', userData);
}

export function loginUser(credentials) {
  // BACK-END : endpoint attendu : POST /api/v1/auth/login.
  return requestAuth('login', credentials);
}
