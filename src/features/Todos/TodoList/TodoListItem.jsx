import { useState } from 'react';
import TextInputWithLabel from '../../../shared/TextInputWithLabel.jsx';
import { isValidTodoTitle } from '../../../utils/todoValidation.js';
import './TodoListItem.css';

function TodoListItem({
  todo,
  onCompleteTodo,
  onUpdateTodo,
}) {
  const todoTitle =
    todo.title ||
    todo.todoTitle ||
    todo.name ||
    '';

  const [isEditing, setIsEditing] =
    useState(false);

  const [workingTitle, setWorkingTitle] =
    useState(todoTitle);

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
      <form
        className="todo-item-form"
        onSubmit={handleUpdate}
      >
        {isEditing ? (
          <>
            <TextInputWithLabel
              elementId={`todo-${todo.id}`}
              labelText="Edit Todo"
              value={workingTitle}
              onChange={(event) =>
                setWorkingTitle(event.target.value)
              }
            />

            <button
              className="button cancel-button"
              type="button"
              onClick={() => {
                setWorkingTitle(todoTitle);
                setIsEditing(false);
              }}
            >
              Cancel
            </button>

            <button
              className="button update-button"
              type="submit"
              disabled={
                !isValidTodoTitle(workingTitle)
              }
            >
              Update
            </button>
          </>
        ) : (
          <>
            <label
              className="checkbox-label"
              htmlFor={`checkbox-${todo.id}`}
            >
              <input
                id={`checkbox-${todo.id}`}
                type="checkbox"
                checked={todo.isCompleted}
                onChange={() =>
                  onCompleteTodo(todo.id)
                }
              />
            </label>

            <span
              className={`todo-title ${
                todo.isCompleted
                  ? 'completed'
                  : ''
              }`}
              onClick={() =>
                setIsEditing(true)
              }
            >
              {todoTitle}
            </span>
          </>
        )}
      </form>
    </li>
  );
}

export default TodoListItem;