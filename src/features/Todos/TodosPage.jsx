import { useEffect, useState } from 'react';

function TodosPage({ token }) {
  const [todoList, setTodoList] = useState([]);
  const [error, setError] = useState('');
  const [isTodoListLoading, setIsTodoListLoading] = useState(false);

  useEffect(() => {
    async function fetchTodos() {
      try {
        setIsTodoListLoading(true);

        const response = await fetch('/api/tasks', {
          headers: {
            'X-CSRF-TOKEN': token,
          },
          credentials: 'include',
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }

        setTodoList(data.tasks);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsTodoListLoading(false);
      }
    }

    if (token) {
      fetchTodos();
    }
  }, [token]);

  return (
    <div>
      {error && <p>{error}</p>}

      {isTodoListLoading && <p>Loading...</p>}

      <h2>Todos Page</h2>
    </div>
  );
}

export default TodosPage;