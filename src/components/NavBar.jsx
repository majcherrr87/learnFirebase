import { todos } from "../signal/todoSignal";
import { computed } from "@preact/signals-react";

export const NavBar = () => {
  console.log("Render NavBar");

  const completedCount = computed(() => {
    return todos.value.filter((todo) => todo.completed).length;
  });
  return (
    <nav className="nav">
      <div>Completed: {completedCount.value}</div>
      <a href="/">Todos</a>
      <a href="/account">Account</a>
    </nav>
  );
};
