import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFontAwesome } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import TaskItem from "./components/TaskItem";
import TaskForm from "./components/TaskForm";
import { TASKS } from "./lib/mock-data";
import { TaskFormType, TaskType } from "./lib/definition";
import { useState } from "react";
import { sortTasks } from "./lib/utils";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [tasks, setTasks] = useState<TaskType[]>(TASKS);

  function addTask(data: TaskFormType) {
    console.log(data);
  }

  function toggleAddForm() {
    setShowForm((prev) => !prev);
  }

  function handleSortTasks(e: any) {
    const criteria = e.target.value;
    setTasks((prevTasks) => sortTasks(criteria, prevTasks));
  }

  return (
    <main>
      <div className="div container">
        <header>
          <h1>Should Do</h1>
          <button className="btn" onClick={toggleAddForm}>
            {showForm ? "Close" : "Add"}
          </button>
        </header>
        {showForm && <TaskForm onSubmit={addTask} />}
        <div className="label">
          <div className="label-item">
            <label htmlFor="sortBy">Sort By: </label>
            <select name="sortBy" id="sortBy" onChange={handleSortTasks}>
              <option value="-dueDate">Due Date: Furthest</option>
              <option value="+dueDate">Due Date: Closest</option>
              <option value="-priority">Priority: Highest</option>
              <option value="+priority">Priority: Lowest</option>
              <option value="-dateAdded">Date Added: Newest</option>
              <option value="+dateAdded">Date Added: Oldest</option>
            </select>
          </div>
          <div className="label-item">
            <p>Priority:</p>
            <div className="priority">
              <FontAwesomeIcon icon={faFontAwesome} color="red" />
              <p>High</p>
              <FontAwesomeIcon icon={faFontAwesome} color="orange" />
              <p>Med</p>
              <FontAwesomeIcon icon={faFontAwesome} color="green" />
              <p>Low</p>
            </div>
          </div>
        </div>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </main>
  );
}

export default App;
