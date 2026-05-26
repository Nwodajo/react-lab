import { useEffect, useState } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList/TodoList';
import FilterInput from '../../shared/FilterInput';
import useDebounce from '../../utils/useDebounce';

function TodosPage({ token }) {
  const [todoList, setTodoList] = useState([]);
  const [error, setError] = useState('');
  const [isTodoListLoading, setIsTodoListLoading] = useState(false);

  const [sortBy, setSortBy] = useState('creationDate');
  const [sortDirection, setSortDirection] = useState('desc');

  const [filterTerm, setFilterTerm] = useState('');
  const debouncedFilterTerm = useDebounce(filterTerm, 300);

  function handleFilterChange(newTerm) {
    setFilterTerm(newTerm);
  }

  useEffect(() => {
    async function fetchTodos() {
      try {
        setIsTodoListLoading(true);
        setError('');

        const paramsObject = {
          sortBy,
          sortDirection,
        };

        if (debouncedFilterTerm) {
          paramsObject.find = debouncedFilterTerm;
        }

        const params = new URLSearchParams(paramsObject);

        const response = await fetch(`/api/tasks?${params}`, {
          headers: {
            'X-CSRF-TOKEN': token,
          },
          credentials: 'include',
        });

        const data = await response.json();

        if (response.status === 401) {
          throw new Error('Unauthorized. Please log in again.');
        }

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
  }, [token, sortBy, sortDirection, debouncedFilterTerm]);

  async function addTodo(todoTitle) {
    const newTodo = {
      id: Date.now(),
      title: todoTitle,
      isCompleted: false,
    };

    setTodoList((prev) => [...prev, newTodo]);

    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token,
        },
        credentials: 'include',
        body: JSON.stringify({
          title: todoTitle,
          isCompleted: false,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error('Failed to add todo');
      }

      setTodoList((prev) =>
        prev.map((todo) => (todo.id === newTodo.id ? data.task : todo))
      );
    } catch (error) {
      setTodoList((prev) => prev.filter((todo) => todo.id !== newTodo.id));
      setError(error.message);
    }
  }

  async function completeTodo(id) {
    const originalTodo = todoList.find((todo) => todo.id === id);

    if (!originalTodo) {
      return;
    }

    const updatedTodo = {
      ...originalTodo,
      isCompleted: true,
    };

    setTodoList((prev) =>
      prev.map((todo) => (todo.id === id ? updatedTodo : todo))
    );

    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token,
        },
        credentials: 'include',
        body: JSON.stringify({
          isCompleted: true,
          createdAt: originalTodo.createdAt,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to complete todo');
      }
    } catch (error) {
      setTodoList((prev) =>
        prev.map((todo) => (todo.id === id ? originalTodo : todo))
      );
      setError(error.message);
    }
  }

  async function updateTodo(editedTodo) {
    const originalTodo = todoList.find(
      (todo) => todo.id === editedTodo.id
    );

    if (!originalTodo) {
      return;
    }

    setTodoList((prev) =>
      prev.map((todo) =>
        todo.id === editedTodo.id ? editedTodo : todo
      )
    );

    try {
      const response = await fetch(`/api/tasks/${editedTodo.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token,
        },
        credentials: 'include',
        body: JSON.stringify({
          title: editedTodo.title,
          isCompleted: editedTodo.isCompleted,
          priority: editedTodo.priority || 'medium',
          createdAt: editedTodo.createdAt,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update todo');
      }
    } catch (error) {
      setTodoList((prev) =>
        prev.map((todo) =>
          todo.id === editedTodo.id ? originalTodo : todo
        )
      );

      setError(error.message);
    }
  }

  return (
    <div>
      {error && (
        <div>
          <p>{error}</p>
          <button onClick={() => setError('')}>
            Clear Error
          </button>
        </div>
      )}

      {isTodoListLoading && <p>Loading...</p>}

      <FilterInput
        filterTerm={filterTerm}
        onFilterChange={handleFilterChange}
      />

      <TodoForm onAddTodo={addTodo} />

      <TodoList
        todoList={todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
      />
    </div>
  );
}

export default TodosPage;