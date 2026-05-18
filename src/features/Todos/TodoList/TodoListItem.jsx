import { useState } from 'react';
import TextInputWithLabel from "../../../shared/TextInputWithLabel.jsx";
import { isValidTodoTitle } from "../../../utils/todoValidation.js";

function TodoListItem({
  todo,
  onCompleteTodo,
  onUpdateTodo,
}) {
  const [isEditing, setIsEditing] =
    useState(false);

  const [workingTitle, setWorkingTitle] =
    useState(todo.title);

  function handleUpdate(event) {
    if (!isEditing) return;

    event.preventDefault();

    onUpdateTodo({
      ...todo,
      title: workingTitle,
    });

    setIsEditing(false);
  }

  return (
    <li>
      <form onSubmit={handleUpdate}>
        {isEditing ? (
          <>
            <TextInputWithLabel
              value={workingTitle}
              elementId={`todo-${todo.id}`}
              labelText="Edit Todo"
              onChange={(event) =>
                setWorkingTitle(event.target.value)
              }
            />

            <button
              type="button"
              onClick={() => {
                setWorkingTitle(todo.title);
                setIsEditing(false);
              }}
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={!isValidTodoTitle(workingTitle)}
              onClick={handleUpdate}
            >
              Update
            </button>
          </>
        ) : (
          <>
            <label>
              <input
                type="checkbox"
                id={`checkbox${todo.id}`}
                checked={todo.isCompleted}
                onChange={() =>
                  onCompleteTodo(todo.id)
                }
              />
            </label>

            <span
              onClick={() =>
                setIsEditing(true)
              }
            >
              {todo.title}
            </span>
          </>
        )}
      </form>
    </li>
  );
}

export default TodoListItem;
