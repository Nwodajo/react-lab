function TodoForm(){
    return(
        <form>
            <label htmlFor="todoTitle">Add Todo:</label>
            <input id="todoTitle" type="text" />
            <button type="submit" disabled>Add</button>
        </form>
    )
}
export default TodoForm;