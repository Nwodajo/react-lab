import { useState } from 'react';
import TextInputWithLabel from '../../../shared/TextInputWithLabel.jsx';
import { isValidTodoTitle } from '../../../utils/todoValidation.js';
import './TodoListItem.css';

function TodoListItem({ todo, onCompleteTodo, onUpdateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [workingTitle, setWorkingTitle] = useState(todo.title);

  function handleUpdate(event) {
    event.preventDefault();

    if (!isEditing) return;

    onUpdateTodo({
      ...todo,
      title: workingTitle,
    });

    setIsEditing(false);
  }

  return (
    <li className="todo-item">
      <form className="todo-item-form" onSubmit={handleUpdate}>
        {isEditing ? (
          <>
            <TextInputWithLabel
              value={workingTitle}
              elementId={`todo-${todo.id}`}
              labelText="Edit Todo"
              onChange={(event) => setWorkingTitle(event.target.value)}
            />

            <button
              className="button cancel-button"
              type="button"
              onClick={() => {
                setWorkingTitle(todo.title);
                setIsEditing(false);
              }}
            >
              Cancel
            </button>

            <button
              className="button update-button"
              type="submit"
              disabled={!isValidTodoTitle(workingTitle)}
            >
              Update
            </button>
          </>
        ) : (
          <>
            <label className="checkbox-label" htmlFor={`checkbox-${todo.id}`}>
              <input
                type="checkbox"
                id={`checkbox-${todo.id}`}
                checked={todo.isCompleted}
                onChange={() => onCompleteTodo(todo.id)}
              />
            </label>

            <button
              className={`todo-title ${todo.isCompleted ? 'completed' : ''}`}
              type="button"
              onClick={() => setIsEditing(true)}
            >
              {todo.title}
            </button>
          </>
        )}
      </form>
    </li>
  );
}

export default TodoListItem;