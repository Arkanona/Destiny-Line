import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ReputationBar from '../components/ReputationBar';
import { getResult } from '../services/gameService';

export default function Result({ game, onReplay }) {
  const result = getResult(game.score);
  return <div className="app-shell result-shell" style={{ '--page-image': `url("${result.image}")` }}><Navbar /><main className={`result-layout result-${result.key}`}><section className="result-content"><span className="eyebrow">{game.username || 'Anonyme'} · Ton destin</span><h1>{result.title}</h1><p className="lead">{result.text}</p><ReputationBar score={game.score} /><div className="result-actions"><button className="button button-primary" onClick={onReplay}>Rejouer <span>↻</span></button><Link className="button button-secondary" to="/stats">Voir les statistiques <span>→</span></Link></div></section></main></div>;
}
