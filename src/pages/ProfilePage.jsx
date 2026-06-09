import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

function ProfilePage() {
  const { email, token } = useAuth();

  const [todoStats, setTodoStats] = useState({
    total: 0,
    completed: 0,
    active: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchTodoStats() {
      if (!token) return;

      try {
        setLoading(true);
        setError('');

        const options = {
          method: 'GET',
          headers: {
            'X-CSRF-TOKEN': token,
          },
          credentials: 'include',
        };

        const response = await fetch('/api/tasks', options);

        if (response.status === 401) {
          throw new Error('Unauthorized');
        }

        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }

        const todos = await response.json();

        const total = todos.length;
        const completed = todos.filter(
          (todo) => todo.isCompleted
        ).length;
        const active = total - completed;

        setTodoStats({
          total,
          completed,
          active,
        });
      } catch (err) {
        setError(`Error loading statistics: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }

    fetchTodoStats();
  }, [token]);

  return (
    <div>
      <h1>Profile</h1>

      <p>
        <strong>User:</strong> {email}
      </p>

      <p>
        <strong>Status:</strong> Authenticated
      </p>

      {loading ? (
        <p>Loading statistics...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <h2>Todo Statistics</h2>
          <p>Total: {todoStats.total}</p>
          <p>Completed: {todoStats.completed}</p>
          <p>Active: {todoStats.active}</p>
          {todoStats.total > 0 && (
            <p>
              Completion Rate:{' '}
              {Math.round(
                (todoStats.completed / todoStats.total) * 100
              )}
              %
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default ProfilePage;