import { Link, NavLink } from 'react-router-dom';
import Brand from './Brand';

export default function Navbar({ user, onLogout }) {
  return <header className="navbar"><Brand /><nav aria-label="Navigation principale"><NavLink to="/">Accueil</NavLink><NavLink to="/game">Histoire</NavLink><NavLink to="/stats">Statistiques</NavLink></nav>{user ? <div className="account-nav"><span className="account-name">{user.username}</span><button className="logout-button" onClick={onLogout}>Déconnexion</button></div> : <Link className="nav-cta" to="/login">Connexion <span>↗</span></Link>}</header>;
}
