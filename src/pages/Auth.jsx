import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Brand from '../components/Brand';
import { loginUser, registerUser } from '../services/authService';

export default function Auth({ mode, onAuthenticated }) {
  const navigate = useNavigate();
  const isRegister = mode === 'register';
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');

  function update(field, value) { setForm((current) => ({ ...current, [field]: value })); setError(''); }

  function submit(event) {
    event.preventDefault();
    if (isRegister && form.username.trim().length < 2) return setError('Ton pseudo doit contenir au moins 2 caractères.');
    if (!form.email.includes('@')) return setError('Entre une adresse e-mail valide.');
    if (form.password.length < 6) return setError('Le mot de passe doit contenir au moins 6 caractères.');
    try {
      const session = isRegister ? registerUser(form) : loginUser(form);
      onAuthenticated(session);
      navigate('/');
    } catch (authError) {
      setError(authError.message);
    }
  }

  return <div className="app-shell auth-shell" style={{ '--page-image': 'url("/assets/neutral.webp")' }}><header className="navbar auth-navbar"><Brand /><Link className="nav-cta" to="/">Retour à l’accueil <span>↗</span></Link></header><main className="auth-page"><section className="auth-card"><span className="eyebrow">Destiny Line · Compte joueur</span><h1>{isRegister ? <>Créer ton<br /><em>destin.</em></> : <>Bon retour<br /><em>héros.</em></>}</h1><p className="auth-intro">{isRegister ? 'Crée ton profil pour sauvegarder ta progression et suivre ton évolution.' : 'Connecte-toi pour retrouver ta progression et continuer ton histoire.'}</p><form className="auth-form" onSubmit={submit}>{isRegister && <div className="field"><label htmlFor="username">Pseudo</label><input id="username" value={form.username} onChange={(event) => update('username', event.target.value)} placeholder="Ex. Nova" autoComplete="username" /></div>}<div className="field"><label htmlFor="email">Adresse e-mail</label><input id="email" type="email" value={form.email} onChange={(event) => update('email', event.target.value)} placeholder="toi@exemple.com" autoComplete="email" /></div><div className="field"><label htmlFor="password">Mot de passe</label><input id="password" type="password" value={form.password} onChange={(event) => update('password', event.target.value)} placeholder="6 caractères minimum" autoComplete={isRegister ? 'new-password' : 'current-password'} /></div>{error && <p className="form-error" role="alert">{error}</p>}<button className="button button-primary auth-submit" type="submit">{isRegister ? 'Créer mon compte' : 'Se connecter'} <span>→</span></button></form><p className="auth-switch">{isRegister ? 'Tu as déjà un compte ?' : 'Pas encore de compte ?'} <Link to={isRegister ? '/login' : '/register'}>{isRegister ? 'Se connecter' : 'S’inscrire'}</Link></p><small className="auth-note">Mode front temporaire · connexion à l’API à venir</small></section></main></div>;
}
