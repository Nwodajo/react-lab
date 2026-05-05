import './App.css';
import { useState } from 'react';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
// Lesson 02 components setup 


function App() {   
  const [todoList, setTodoList] = useState([]);

  const addTodo = (title) => {
    const newTodo = {  
      id: Date.now(),
      title: title,
      isCompleted: false,
    };
    setTodoList((prev) => [...prev, newTodo]);
  };
  // Complete Todo
  function completeTodo(id){
    const updatedList = todoList.map((todo)=>
      todo.id === id ?{...todo,isCompleted: true}:todo
    );
    setTodoList(updatedList);
  }
  return (
    <div className="app-container">
      <h1>My Todos List</h1>
<TodoForm onAddTodo={addTodo}/>
 <TodoList todoList={todoList} onCompleteTodo={completeTodo} />
    </div>
  )

};

export default App;