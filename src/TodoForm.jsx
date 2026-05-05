import { useRef, useState } from "react";

// Lesson 03 update
function TodoForm({onAddTodo}){
    const [workingTodoTitle, setWorkingTodoTitle] = useState("");

    function handleChange(event){ 
        setWorkingTodoTitle(event.target.value);
    }

    function handleSubmit(event){ 
        event.preventDefault();
        onAddTodo(workingTodoTitle);
        setWorkingTodoTitle("");
    }

    

    return(
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            value={workingTodoTitle}
            onChange={handleChange}
            />
            <button disabled={!setWorkingTodoTitle.trim()}>
                Add Todo
                </button>
        </form>
    );
}
export default TodoForm; 