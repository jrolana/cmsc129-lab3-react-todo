import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFontAwesome } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import TaskItem from "./components/TaskItem";
import TaskForm from "./components/TaskForm";
import { TaskFormType, TaskType } from "./lib/definition";
import { useEffect, useState } from "react";
import { sortTasks } from "./lib/utils";
import useAddTask from "./hooks/useAddTask";
import { ToastContainer, toast } from "react-toastify";
import useGetTasks from "./hooks/useGetTasks";
import UndoToast from "./components/UndoToast";
import { toastOptions } from "./lib/constants";

function App() {
  const [showAddForm, setShowAddForm] = useState(false);
  const { isLoading, addTask } = useAddTask();
  const { tasks } = useGetTasks();
  const [uiTasks, setUiTasks] = useState<TaskType[]>(tasks);
  const [sortCriteria, setSortCriteria] = useState("+dueDate");

  useEffect(() => {
    if (tasks) {
      setUiTasks(sortTasks(sortCriteria, tasks));
    }
  }, [tasks, sortCriteria]);

  async function handleAddTask(data: TaskFormType) {
    try {
      await addTask(data);
      setShowAddForm(false);
      toast.success("Successfully saved task.", toastOptions);
    } catch (e) {
      console.error("Error adding document: ", e);
      toast.error("There was a problem in saving a task.", toastOptions);
    }
  }

  function toggleAddForm() {
    setShowAddForm((prev) => !prev);
  }

  function handleSortTasks(e: any) {
    setSortCriteria(e.target.value);
  }

  function handleUiDeleteTask(taskId: string, undoCallback: () => void) {
    const taskToDelete = uiTasks.find((t) => t.id === taskId);
    if (!taskToDelete) return;

    setUiTasks((prev) => prev.filter((task) => task.id !== taskId));

    toast(({ closeToast }) => (
      <UndoToast
        onUndo={() => {
          undoCallback();
          setUiTasks((prev) =>
            sortTasks(sortCriteria, [...prev, taskToDelete])
          );
        }}
        closeToast={closeToast}
      />
    ));
  }

  return (
    <main>
      <div className="div container">
        <header>
          <h1>Should Do</h1>
          <button
            className="btn"
            onClick={toggleAddForm}
            style={{ backgroundColor: showAddForm ? "orange" : "green" }}
          >
            {showAddForm ? "Close" : "Add"}
          </button>
        </header>
        {showAddForm && (
          <TaskForm onSubmit={handleAddTask} isLoading={isLoading} />
        )}
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
        {uiTasks.length === 0 && (
          <div className="empty">
            <p>Click add to get started.</p>
          </div>
        )}
        {uiTasks.map((task) => (
          <TaskItem key={task.id} task={task} onDelete={handleUiDeleteTask} />
        ))}
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          pauseOnFocusLoss={false}
          pauseOnHover={false}
          rtl={false}
          theme="light"
        />
      </div>
    </main>
  );
}

export default App;
