import { useState } from 'react';
import Navbar from '../components/Navbar';

export default function Home({ username, onStart, user, onLogout }) {
  const [name, setName] = useState(username || '');
  const [error, setError] = useState('');
  function submit(event) { event.preventDefault(); if (!name.trim()) return setError('Choisis un pseudo pour commencer.'); onStart(name); }
  return <div className="app-shell home-shell" style={{ '--page-image': 'url("/assets/neutral.webp")' }}><Navbar user={user} onLogout={onLogout} /><main className="home page-grid"><section className="hero-copy"><span className="eyebrow">Un visual novel · Saison 01</span><h1>Tu n’es pas<br /><em>né héros.</em></h1><p className="lead">Chaque décision laisse une trace. Trace la tienne et découvre ce que tu es prêt à devenir.</p><div className="hero-meta"><span><b>10</b> situations</span><span><b>03</b> fins possibles</span><span><b>∞</b> destins</span></div><form className="start-form" onSubmit={submit}><label htmlFor="username">Ton pseudo</label><div className="input-row"><input id="username" value={name} onChange={(event) => { setName(event.target.value); setError(''); }} placeholder="Ex. Nova" maxLength="24" /><button className="button button-primary" type="submit">Commencer <span>→</span></button></div>{error && <p className="form-error" role="alert">{error}</p>}</form></section></main><footer className="home-footer"><span>UNE HISTOIRE INTERACTIVE</span><span className="footer-line" /><span>HÉROS · NEUTRE · VILAIN</span></footer></div>;
}
