import { Link, NavLink } from 'react-router-dom';
import Brand from './Brand';

export default function Navbar() {
  return <header className="navbar"><Brand /><nav aria-label="Navigation principale"><NavLink to="/">Accueil</NavLink><NavLink to="/game">Histoire</NavLink><NavLink to="/stats">Statistiques</NavLink></nav><Link className="nav-cta" to="/game">Jouer <span>↗</span></Link></header>;
}
