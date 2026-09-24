const initialGame = { username: '', score: 0, sceneIndex: 0, crystalResult: null };

export function getSavedGame() {
  // BACK-END : remplacer localStorage par une récupération de la partie depuis l’API.
  try {
    return JSON.parse(localStorage.getItem('alter-ego-game')) || initialGame;
  } catch {
    return initialGame;
  }
}

export function startGame(username) {
  // BACK-END : le serveur pourra créer une session et retourner un identifiant de partie.
  return { ...initialGame, username: username.trim() };
}

export function saveGame(game) {
  // BACK-END : remplacer ce stockage local par un futur fetch('/api/games', ...).
  // Le payload envoyé pourra contenir : { username, score, sceneIndex, crystalResult }.
  localStorage.setItem('alter-ego-game', JSON.stringify(game));
  return game;
}

export function getStats() {
  // BACK-END : remplacer les données mockées par un futur fetch('/api/stats').
  return { hero: 12, neutral: 8, villain: 5, total: 25 };
}

export function getResult(score) {
  if (score >= 40) return { key: 'hero', title: 'HÉROS', image: '/assets/hero.webp', text: 'Tu as choisi de protéger les autres, même lorsque cela demandait des sacrifices.' };
  if (score <= -40) return { key: 'villain', title: 'VILAIN', image: '/assets/villain.webp', text: 'Le pouvoir a fini par prendre le dessus. La ville sait désormais qu’elle doit te craindre.' };
  return { key: 'neutral', title: 'ANTI-HÉROS', image: '/assets/neutral.webp', text: 'Tu avances selon tes propres règles. Ni véritable héros, ni véritable vilain.' };
}
