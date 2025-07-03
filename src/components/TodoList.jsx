import { useState } from "react";
import { todos } from "../signal/todoSignal";

export const TodoList = () => {
  console.log("Render TodoList");
  const [newTodoName, setNewTodoName] = useState("");

  function addTodo(e) {
    e.preventDefault();

    todos.value = [
      ...todos.value,
      { id: crypto.randomUUID(), name: newTodoName, completed: false },
    ];
    setNewTodoName("");
  }
  function toggleTodo(id, completed) {
    todos.value = todos.value.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed };
      }
      return todo;
    });
  }

  return (
    <>
      <form>
        <label>New Task</label>
        <input
          type="text"
          value={newTodoName}
          onChange={(e) => setNewTodoName(e.target.value)}
        />
        <button type="submit">Add</button>
        <ul>
          {todos.value.map((todo) => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={(e) => toggleTodo(todo.id, e.target.checked)}
              />
              {todo.name}
            </li>
          ))}
        </ul>
      </form>
    </>
  );
};
