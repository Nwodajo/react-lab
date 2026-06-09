import Header from './shared/Header';
import TodosPage from './features/Todos/TodosPage';
import Logon from './features/Logon';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { token } = useAuth();

  return (
    <>
      <Header />

      {token ? (
        <TodosPage />
      ) : (
        <Logon />
      )}
    </>
  );
}

export default App;