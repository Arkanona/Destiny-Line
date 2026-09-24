const USERS_KEY = 'destiny-line-users';
const SESSION_KEY = 'destiny-line-session';

function readUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
}

export function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY)) || null;
  } catch {
    return null;
  }
}

export function registerUser({ username, email, password }) {
  const users = readUsers();
  if (users.some((user) => user.email === email.toLowerCase())) {
    throw new Error('Cette adresse e-mail est déjà utilisée.');
  }

  // FRONT MOCK : ne jamais stocker un mot de passe en clair en production.
  // BACK-END : remplacer par POST /api/auth/register et laisser le serveur gérer le hash.
  const user = { id: crypto.randomUUID(), username: username.trim(), email: email.toLowerCase(), password };
  localStorage.setItem(USERS_KEY, JSON.stringify([...users, user]));
  const session = { id: user.id, username: user.username, email: user.email };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function loginUser({ email, password }) {
  const user = readUsers().find((candidate) => candidate.email === email.toLowerCase() && candidate.password === password);
  if (!user) throw new Error('E-mail ou mot de passe incorrect.');

  // BACK-END : remplacer par POST /api/auth/login et stocker le token retourné par l’API.
  const session = { id: user.id, username: user.username, email: user.email };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function logoutUser() {
  // BACK-END : appeler POST /api/auth/logout ou invalider le token côté serveur.
  localStorage.removeItem(SESSION_KEY);
}
