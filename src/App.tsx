import Tasks from "./components/Tasks";
import Header from "./components/Header";
import "./App.css";
import TaskItem from "./components/TaskItem";
import TaskForm from "./components/TaskForm";
import { TASKS } from "./lib/mock-data";

function App() {
  return (
    <main>
      <div className="div container">
        <Header />
        <Tasks />
        {TASKS.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
        <TaskForm />
      </div>
    </main>
  );
}

export default App;
