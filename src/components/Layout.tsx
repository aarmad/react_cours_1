import { NavLink, Outlet, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useShoppingListCount } from '../context/ShoppingListContext';

function Header() {
  const { user, logout } = useAuth();
  const count = useShoppingListCount();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <header>
      <NavLink to="/" end>
        MIJOTÉ
      </NavLink>
      <nav aria-label="Navigation principale">
        <NavLink to="/">Catalogue</NavLink>
        <NavLink to="/proposer">Proposer une recette</NavLink>
        <NavLink to="/courses">Courses ({count})</NavLink>
        {user ? (
          <>
            <img src={user.image} alt={`Avatar de ${user.firstName}`} width={24} height={24} />
            <span>{user.firstName}</span>
            <button type="button" onClick={handleLogout}>
              Se déconnecter
            </button>
          </>
        ) : (
          <NavLink to="/connexion">Se connecter</NavLink>
        )}
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
