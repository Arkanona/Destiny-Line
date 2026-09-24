import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import Result from './pages/Result';
import Stats from './pages/Stats';
import { getSavedGame, startGame } from './services/gameService';

export default function App() {
  const navigate = useNavigate();
  const [game, setGame] = useState(() => getSavedGame());

  useEffect(() => {
    localStorage.setItem('alter-ego-game', JSON.stringify(game));
  }, [game]);

  function beginGame(username) {
    const nextGame = startGame(username);
    setGame(nextGame);
    navigate('/game');
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
      <Route path="/" element={<Home username={game.username} onStart={beginGame} />} />
      <Route path="/game" element={<Game game={game} onUpdate={updateGame} />} />
      <Route path="/result" element={<Result game={game} onReplay={replay} />} />
      <Route path="/stats" element={<Stats />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
