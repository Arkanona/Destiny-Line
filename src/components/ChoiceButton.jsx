export default function ChoiceButton({ choice, onClick }) {
  return <button className={`choice choice-${choice.tone}`} onClick={onClick}><span className="choice-icon">{choice.tone === 'hero' ? '✦' : '◈'}</span><span className="choice-copy"><strong>{choice.label}</strong><small>{choice.detail}</small></span><span className="choice-arrow">→</span></button>;
}
