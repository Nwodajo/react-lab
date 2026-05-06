function TodoListItem({todo,onCompleteTodo}){ 
    return (
    <li>
        <input 
        type="checkbox"
        checked={todo.isCompleted}
        onChange={() => onCompleteTodo(todo.id)}
        />
        <span style={{textDecoration: todo.isCompleted ? "line-through" : "none"}}>
    {todo.title}
    </span>
        </li>
    );     
} 
export default TodoListItem;