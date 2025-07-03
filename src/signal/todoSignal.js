import { effect, signal } from "@preact/signals-react";

const LOCAL_STORAGE_KEY = "TODOS";

export const todos = signal(getTodos());
function getTodos() {
  const value = localStorage.getItem(LOCAL_STORAGE_KEY);
  return value ? JSON.parse(value) : [];
}
effect(() => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos.value));
});
