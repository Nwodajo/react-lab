import './App.css'
import TodoList from './TodoList';
import TodoForm from './TodoForm';
// Lesson 02 components setup 
function App() {
  const todoList = [
        {id: 1, title: "review resources"},
        {id: 2, title: "take notes"},
        {id: 3, title: "code out app"}

      ]
      
  return (
    <div>
      <h1>My Todos List </h1>
<TodoForm/>
<TodoList todo={todoList}/>   
    </div>
);
}
export default App;