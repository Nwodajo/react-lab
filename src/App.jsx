import './App.css';
import { useState } from 'react';
import TodoForm from './features/TodoForm';
import TodoList from './features/TodoList/TodoList';


function App() {
  const [todoList, setTodoList] = useState([]);

  const addTodo = (todoTitle) => {
    const newTodo = {
      id: Date.now(),
      title: todoTitle,
      isCompleted: false,
    };

    setTodoList((prev) => [...prev, newTodo]);
  };

  function completeTodo(id) {
    const updatedTodoList = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: true };
      }

      return todo;
    });

    setTodoList(updatedTodoList);
  }

  return (
    <div className="app-container">
      <h1>My Todos List</h1>

      <TodoForm onAddTodo={addTodo} />

      <TodoList
        todoList={todoList}
        onCompleteTodo={completeTodo}
      />
    </div>
  );
}

export default App;
// Lesson 02 components setup 


