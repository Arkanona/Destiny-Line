export default function ReputationBar({ score }) {
  const position = `${Math.max(0, Math.min(100, ((score + 100) / 200) * 100))}%`;
  return <section className="reputation" aria-label={`Réputation : ${score} sur 100`}><div className="reputation-head"><div><span className="section-kicker">Boussole morale</span><strong>RÉPUTATION</strong></div><span className="score-badge">{score > 0 ? '+' : ''}{score}</span></div><div className="reputation-track"><span className="reputation-fill" style={{ width: position }} /><span className="reputation-marker" style={{ left: position }} /></div><div className="reputation-labels"><span className="villain-text">VILAIN</span><span>NEUTRE</span><span className="hero-text">HÉROS</span></div></section>;
}
