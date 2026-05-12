import { useRef } from "react";

// Lesson 03 update
function TodoForm({onAddTodo}){
    const inputRef = useRef();

    const handleAddTodo = (event) => {
        event.preventDefault();

        const todoTitle = event.target.todoTitle.value.trim();
        if (todoTitle) { 
            onAddTodo(todoTitle);
            event.target.reset();
            inputRef.current.focus();
        }
    };

    return(
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle">Add Todo:</label>
            <input ref={inputRef}
            id="todoTitle"
            name="todoTitle"
            type="text"
            placeholder="Todo text"
            required
            />
            <button type="submit">Add New Todo</button>
        </form>
    )
}
export default TodoForm; 