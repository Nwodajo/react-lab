import { useAuth } from '../contexts/AuthContext';

function Header() {
  const { token, logout } = useAuth();

  return (
    <header>
      <h1>Todo List</h1>

      {token && (
        <button onClick={logout}>
          Log Out
        </button>
      )}
    </header>
  );
}

export default Header;