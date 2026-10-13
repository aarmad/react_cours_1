// Fait avec Claude.ai
import { NavLink, Outlet } from 'react-router';

// Compteur de courses et bouton de connexion branchés en partie 3.
function Header() {
  return (
    <header>
      <NavLink to="/" end>
        MIJOTÉ
      </NavLink>
      <nav aria-label="Navigation principale">
        <NavLink to="/">Catalogue</NavLink>
        <NavLink to="/courses">Courses</NavLink>
        <NavLink to="/connexion">Se connecter</NavLink>
      </nav>
    </header>
  );
}

export function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}
