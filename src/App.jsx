import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import Result from './pages/Result';
import Stats from './pages/Stats';
import Auth from './pages/Auth';
import { getSavedGame, startGame } from './services/gameService';
import useAuthStore from './store/authStore';

export default function App() {
  const navigate = useNavigate();
  const [game, setGame] = useState(() => getSavedGame());
  const { user, logout } = useAuthStore();

  useEffect(() => {
    // BACK-END : cette sauvegarde locale est temporaire. Synchroniser la partie avec l’API ici.
    localStorage.setItem('alter-ego-game', JSON.stringify(game));
  }, [game]);

  function beginGame(username) {
    // BACK-END : envoyer le pseudo à l’API quand la création de partie sera disponible.
    const nextGame = startGame(username);
    setGame(nextGame);
    navigate('/game');
  }

  function handleAuthenticated(session) {
    // La session est déjà persistée par authStore. On garde ce callback pour une redirection future.
    return session;
  }

  function handleLogout() {
    logout();
    navigate('/');
  }

  function updateGame(updates) {
    setGame((current) => ({ ...current, ...updates }));
  }

  function replay() {
    setGame((current) => startGame(current.username));
    navigate('/game');
  }

  return (
    <Routes>
      <Route path="/" element={<Home username={user?.username || game.username} onStart={beginGame} user={user} onLogout={handleLogout} />} />
      <Route path="/game" element={<Game game={game} onUpdate={updateGame} user={user} onLogout={handleLogout} />} />
      <Route path="/result" element={<Result game={game} onReplay={replay} user={user} onLogout={handleLogout} />} />
      <Route path="/stats" element={<Stats user={user} onLogout={handleLogout} />} />
      <Route path="/login" element={<Auth mode="login" onAuthenticated={handleAuthenticated} />} />
      <Route path="/register" element={<Auth mode="register" onAuthenticated={handleAuthenticated} />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
