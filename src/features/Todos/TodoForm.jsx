import { useRef, useState } from 'react';
import TextInputWithLabel from '../../shared/TextInputWithLabel';
import { isValidTodoTitle } from '../../utils/todoValidation';
import { sanitizeInput } from '../../utils/sanitizeInput';

function TodoForm({ onAddTodo }) {
  const inputRef = useRef();
  const [workingTodoTitle, setWorkingTodoTitle] = useState('');
  const maxTodoLength = 100;

  const handleAddTodo = (event) => {
    event.preventDefault();

    const todoTitle = sanitizeInput(workingTodoTitle);

    if (todoTitle && todoTitle.length <= maxTodoLength) {
      onAddTodo(todoTitle);
      setWorkingTodoTitle('');
      inputRef.current.focus();
    }
  };

  const isTooLong = workingTodoTitle.length > maxTodoLength;

  return (
    <form onSubmit={handleAddTodo}>
      <TextInputWithLabel
        elementId="todoTitle"
        labelText="Todo"
        ref={inputRef}
        value={workingTodoTitle}
        maxLength={100}
        onChange={(event) =>
          setWorkingTodoTitle(event.target.value)
        }
      />

      {isTooLong && (
        <p className="error-message">
          Todo must be 100 characters or less.
        </p>
      )}

      <button
        type="submit"
        disabled={
          !isValidTodoTitle(workingTodoTitle) || isTooLong
        }
      >
        Add Todo
      </button>
    </form>
  );
}

export default TodoForm;