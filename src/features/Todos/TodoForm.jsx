import { useRef, useState } from 'react';
import DOMPurify from 'dompurify';
import TextInputWithLabel from '../../shared/TextInputWithLabel';
import { isValidTodoTitle } from '../../utils/todoValidation';
import styles from './TodoForm.module.css';

function TodoForm({ onAddTodo }) {
  const inputRef = useRef();

  const [workingTodoTitle, setWorkingTodoTitle] = useState('');
  const [error, setError] = useState('');

  const sanitizeInput = (value) => {
    return DOMPurify.sanitize(value, {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: [],
    });
  };

  const handleChange = (event) => {
    const sanitizedValue = sanitizeInput(event.target.value);

    setWorkingTodoTitle(sanitizedValue);

    if (sanitizedValue.length > 100) {
      setError('Todo must be 100 characters or less.');
    } else {
      setError('');
    }
  };

  const handleAddTodo = (event) => {
    event.preventDefault();

    const todoTitle = sanitizeInput(workingTodoTitle.trim());

    if (!todoTitle) {
      setError('Please enter a todo.');
      return;
    }

    if (!isValidTodoTitle(todoTitle)) {
      setError('Please enter a valid todo.');
      return;
    }

    onAddTodo(todoTitle);

    setWorkingTodoTitle('');
    setError('');

    inputRef.current.focus();
  };

  return (
    <form className={styles.todoForm} onSubmit={handleAddTodo}>
      <TextInputWithLabel
        elementId="todoTitle"
        labelText="Todo"
        ref={inputRef}
        value={workingTodoTitle}
        onChange={handleChange}
        maxLength={100}
      />

      {error && (
        <p className={styles.errorMessage}>
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={!isValidTodoTitle(workingTodoTitle)}
      >
        Add Todo
      </button>
    </form>
  );
}

export default TodoForm;