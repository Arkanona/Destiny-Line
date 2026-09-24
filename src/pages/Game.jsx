import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ChoiceButton from '../components/ChoiceButton';
import ReputationBar from '../components/ReputationBar';
import { scenes } from '../data/scenes';
import { saveGame } from '../services/gameService';

export default function Game({ game, onUpdate }) {
  const navigate = useNavigate();
  const scene = scenes[game.sceneIndex] || scenes[0];
  const [crystalTouched, setCrystalTouched] = useState(Boolean(game.crystalResult));
  function choose(score) { const nextIndex = game.sceneIndex + 1; const next = { ...game, score: game.score + score, sceneIndex: nextIndex, crystalResult: null }; onUpdate(next); saveGame(next); if (nextIndex >= scenes.length) navigate('/result'); }
  function touchCrystal() { if (crystalTouched) return; const positive = Math.random() >= 0.5; const result = { score: positive ? 15 : -15, message: positive ? 'La boule révèle une vision lumineuse de ton avenir.' : 'Une ombre inquiétante apparaît dans la vision.' }; setCrystalTouched(true); onUpdate({ ...game, score: game.score + result.score, crystalResult: result }); }
  function continueCrystal() { const next = { ...game, sceneIndex: game.sceneIndex + 1, crystalResult: null }; onUpdate(next); setCrystalTouched(false); }
  return <div className="app-shell game-shell" style={{ '--page-image': `url("${scene.image}")` }}><Navbar /><main className="game-layout"><section className="game-content"><div className="game-topline"><span className="eyebrow">{scene.eyebrow}</span><span className="player-chip"><i /> {game.username || 'Anonyme'}</span></div><h1>{scene.title}</h1><p className="scene-description">{scene.description}</p>{scene.crystal ? <div className="crystal-panel"><div className="crystal-symbol">✦</div>{!crystalTouched ? <><p>Le futur n’est jamais écrit. Oses-tu regarder ?</p><button className="button button-primary" onClick={touchCrystal}>Toucher la boule <span>✦</span></button></> : <><p className="crystal-result">{game.crystalResult?.message}</p><button className="button button-secondary" onClick={continueCrystal}>Continuer <span>→</span></button></>}</div> : <div className="choices">{scene.choices.map((choice) => <ChoiceButton key={choice.label} choice={choice} onClick={() => choose(choice.score)} />)}</div>}<ReputationBar score={game.score} /></section></main></div>;
}
