import { TodoList } from "./components/TodoList";
import { NavBar } from "./components/NavBar";
import { Sidebar } from "./components/Sidebar";

function App() {
  console.log("Render App");

  return (
    <div className="wrapper">
      <NavBar>
        <main>
          <TodoList />
        </main>
        <Sidebar />
      </NavBar>
    </div>
  );
}

export default App;
