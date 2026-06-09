import { useAuth } from '../contexts/AuthContext';
import Navigation from './Navigation';

function Header() {
  const { token, logout } = useAuth();

  return (
    <header>
      <h1>Todo List</h1>

      <Navigation />

      {token && (
        <button onClick={logout}>
          Log Out
        </button>
      )}
    </header>
  );
}

export default Header;