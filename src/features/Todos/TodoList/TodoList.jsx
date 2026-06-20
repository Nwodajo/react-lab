import { useMemo } from 'react';
import TodoListItem from './TodoListItem';
import styles from './TodoList.module.css';

function TodoList({
  todoList,
  onCompleteTodo,
  onUpdateTodo,
  dataVersion,
  statusFilter = 'active',
}) {
  const filteredTodoList = useMemo(() => {
    let filteredTodos;

    switch (statusFilter) {
      case 'completed':
        filteredTodos = todoList.filter(
          (todo) => todo && todo.isCompleted
        );
        break;

      case 'active':
        filteredTodos = todoList.filter(
          (todo) => todo && !todo.isCompleted
        );
        break;

      case 'all':
      default:
        filteredTodos = todoList.filter((todo) => todo);
        break;
    }

    return {
      version: dataVersion,
      todos: filteredTodos,
    };
  }, [todoList, dataVersion, statusFilter]);

  const getEmptyMessage = () => {
    switch (statusFilter) {
      case 'completed':
        return 'No completed todos yet.';
      case 'active':
        return 'No active todos. Add a todo above to get started.';
      case 'all':
      default:
        return 'Add a todo above to get started.';
    }
  };

  if (filteredTodoList.todos.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>{getEmptyMessage()}</p>
      </div>
    );
  }

  return (
    <ul className={styles.todoList}>
      {filteredTodoList.todos.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onCompleteTodo={onCompleteTodo}
          onUpdateTodo={onUpdateTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;