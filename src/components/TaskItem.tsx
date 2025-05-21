import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFontAwesome,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "./TaskItem.css";
import { TaskFormType, TaskType } from "../lib/definition";
import { useState } from "react";
import { formatDisplayDate, getColorPriority } from "../lib/utils";
import useEditTask from "../hooks/useEditTask";
import { toast } from "react-toastify";
import useDeleteTask from "../hooks/useDeleteTask";
import TaskForm from "./TaskForm";
import { toastOptions } from "../lib/constants";
import Swal from "sweetalert2";
import useToggleDoneTask from "../hooks/useToggleDoneTask";

interface PropsInterface {
  task: TaskType;
  onDelete: (id: string, undoCallback: () => void) => void;
}

function TaskItem(props: PropsInterface) {
  const { task, onDelete } = props;
  const { text, dueDate, dateAdded, priority, id, isDone } = task;
  const [showEditForm, setShowEditForm] = useState(false);
  const { isLoading: isEditLoading, editTask } = useEditTask();
  const { deleteTask } = useDeleteTask();
  const { toggleDoneTask } = useToggleDoneTask();

  function toggleEditForm() {
    setShowEditForm((prev) => !prev);
  }

  async function handleToggleIsDone() {
    try {
      await toggleDoneTask(!isDone, id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async function handleEditTask(data: TaskFormType) {
    try {
      await editTask(data, id);
      setShowEditForm(false);
      toast.success("Successfully edited task.", toastOptions);
    } catch (e) {
      console.error("Error adding document: ", e);
      toast.error("There was a problem in editing task.", toastOptions);
    }
  }

  function handleDeleteTask() {
    function undoDelete(timeoutId: NodeJS.Timeout) {
      clearTimeout(timeoutId);
    }

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        let timeoutId: NodeJS.Timeout;

        onDelete(id, () => undoDelete(timeoutId));

        timeoutId = setTimeout(async () => {
          try {
            await deleteTask(task.id);
            toast.success("Task permanently deleted.", {
              position: "bottom-right",
              autoClose: 5000,
            });
          } catch (e) {
            console.error("Error deleting document: ", e);
            toast.error("There was a problem deleting the task.");
          }
        }, 5000);
      }
    });
  }

  return (
    <>
      <div className={`task ${isDone ? "done" : ""}`}>
        <input type="checkbox" onClick={handleToggleIsDone} />
        <div>
          <div className="row">
            <p>{text}</p>
            <FontAwesomeIcon
              icon={faFontAwesome}
              color={getColorPriority(priority)}
            />
          </div>
          <div className="date row">
            <p className="due">Due: {formatDisplayDate(dueDate)}</p>
            <p className="added">Added: {formatDisplayDate(dateAdded)}</p>
          </div>
        </div>
        {!isDone && (
          <div className="column">
            <FontAwesomeIcon
              icon={faPenToSquare}
              className="edit"
              onClick={toggleEditForm}
            />
            <FontAwesomeIcon
              icon={faTrash}
              className="delete"
              onClick={handleDeleteTask}
            />
          </div>
        )}
      </div>
      {showEditForm && (
        <TaskForm
          task={task}
          onSubmit={handleEditTask}
          isLoading={isEditLoading}
        />
      )}
    </>
  );
}

export default TaskItem;
