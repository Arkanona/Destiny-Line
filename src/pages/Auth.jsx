import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Brand from '../components/Brand';
import useAuthStore from '../store/authStore';

export default function Auth({ mode, onAuthenticated }) {
  const navigate = useNavigate();
  const isRegister = mode === 'register';
  const { login, register, loading } = useAuthStore();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  function update(field, value) { setForm((current) => ({ ...current, [field]: value })); setError(''); }

  async function submit(event) {
    event.preventDefault();
    if (isRegister && form.name.trim().length < 2) return setError('Ton pseudo doit contenir au moins 2 caractères.');
    if (!form.email.includes('@')) return setError('Entre une adresse e-mail valide.');
    if (form.password.length < 6) return setError('Le mot de passe doit contenir au moins 6 caractères.');
    try {
      // BACK-END : le store transmet les données aux endpoints auth configurés dans authService.js.
      const payload = isRegister ? { ...form, username: form.name.trim() } : { email: form.email, password: form.password };
      const session = isRegister ? await register(payload) : await login(payload);
      onAuthenticated(session);
      navigate(session?.user ? '/' : '/login');
    } catch (authError) {
      setError(authError.message);
    }
  }

  return <div className="app-shell auth-shell" style={{ '--page-image': 'url("/assets/neutral.webp")' }}><header className="navbar auth-navbar"><Brand /><Link className="nav-cta" to="/">Retour à l’accueil <span>↗</span></Link></header><main className="auth-page"><section className="auth-card"><span className="eyebrow">Destiny Line · Compte joueur</span><h1>{isRegister ? <>Créer ton<br /><em>destin.</em></> : <>Bon retour<br /><em>héros.</em></>}</h1><p className="auth-intro">{isRegister ? 'Crée ton profil pour sauvegarder ta progression et suivre ton évolution.' : 'Connecte-toi pour retrouver ta progression et continuer ton histoire.'}</p><form className="auth-form" onSubmit={submit}>{isRegister && <div className="field"><label htmlFor="name">Pseudo</label><input id="name" value={form.name} onChange={(event) => update('name', event.target.value)} placeholder="Ex. Nova" autoComplete="name" /></div>}<div className="field"><label htmlFor="email">Adresse e-mail</label><input id="email" type="email" value={form.email} onChange={(event) => update('email', event.target.value)} placeholder="toi@exemple.com" autoComplete="email" /></div><div className="field"><label htmlFor="password">Mot de passe</label><input id="password" type="password" value={form.password} onChange={(event) => update('password', event.target.value)} placeholder="6 caractères minimum" autoComplete={isRegister ? 'new-password' : 'current-password'} /></div>{error && <p className="form-error" role="alert">{error}</p>}<button className="button button-primary auth-submit" type="submit" disabled={loading}>{loading ? 'Connexion…' : (isRegister ? 'Créer mon compte' : 'Se connecter')} <span>→</span></button></form><p className="auth-switch">{isRegister ? 'Tu as déjà un compte ?' : 'Pas encore de compte ?'} <Link to={isRegister ? '/login' : '/register'}>{isRegister ? 'Se connecter' : 'S’inscrire'}</Link></p><small className="auth-note">API configurée via VITE_API_URL</small></section></main></div>;
}
