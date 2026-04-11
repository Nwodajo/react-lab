import './App.css'
import TodoList from './TodoList';
import TodoForm from './TodoForm';
// Lesson 02 components setup 
function App() {    
  return (
    <div className="app-container">
      <h1>My Todos List</h1>
<TodoForm />
 <TodoList />
    </div>
  );

}

export default App;