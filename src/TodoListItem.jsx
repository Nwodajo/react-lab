function TodoListItem({todo,onCompletetodo}){ 
    return (
    <li>
        <input 
        type="checkbox"
        checked={todo.isCompleted}
        onChange={() => onCompletetodo(todo.id)}
        />
        {todo.title}
        </li>
    );     
} 
export default TodoListItem;