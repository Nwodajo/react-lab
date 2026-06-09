import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import Navigation from './Navigation';

function Header() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate('/login');
  }

  return (
    <header>
      <h1>Todo List</h1>

      <Navigation />

      {token && (
        <button onClick={handleLogout}>
          Log Out
        </button>
      )}
    </header>
  );
}

export default Header;
