import { useState } from 'react';
import TextInputWithLabel from '../../shared/TextInputWithLabel';

function TodoListItem({
  todo,
  onCompleteTodo,
}) {
  const [isEditing, setIsEditing] =
    useState(false);

  const [workingTitle, setWorkingTitle] =
    useState(todo.title);

  return (
    <li>
      <form>
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