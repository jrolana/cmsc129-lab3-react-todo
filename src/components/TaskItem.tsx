import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFontAwesome,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "./TaskItem.css";
import { TaskFormType, TaskType } from "../lib/definition";
import { useState } from "react";
import TaskForm from "./TaskForm";

interface PropsInterface {
  task: TaskType;
}

function TaskItem(props: PropsInterface) {
  const { task } = props;
  const { text, dueDate, dateAdded, priority } = task;
  const [showForm, setShowForm] = useState(false);

  function toggleEditForm() {
    setShowForm((prev) => !prev);
  }

  function editTask(data: TaskFormType) {
    console.log("Edited Item: ");
    console.log(data);
  }

  function getColorPriority(priority: number) {
    switch (priority) {
      case 1: {
        return "red";
      }
      case 2: {
        return "orange";
      }
      case 3: {
        return "green";
      }
      default: {
        return;
      }
    }
  }

  return (
    <>
      <div className="task">
        <input type="checkbox" />
        <div>
          <div className="row">
            <p>{text}</p>

            <FontAwesomeIcon
              icon={faFontAwesome}
              color={getColorPriority(task.priority)}
            />
          </div>
          <div className="date row">
            <p className="due">Due: {dueDate}</p>
            <p className="added">Added: {dateAdded}</p>
          </div>
        </div>
        <div className="column">
          <FontAwesomeIcon
            icon={faPenToSquare}
            className="edit"
            onClick={toggleEditForm}
          />
          <FontAwesomeIcon icon={faTrash} className="delete" />
        </div>
      </div>
      {showForm && <TaskForm task={task} onSubmit={editTask} />}
    </>
  );
}

export default TaskItem;
