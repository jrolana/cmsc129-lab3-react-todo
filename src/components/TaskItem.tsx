import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFontAwesome,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "./TaskItem.css";
import { Task } from "../lib/definition";

interface PropsInterface {
  task: Task;
}

function TaskItem(props: PropsInterface) {
  const { task } = props;
  const { text, dueDate, dateAdded } = task;

  return (
    <div className="task">
      <input type="checkbox" />
      <div>
        <div className="row">
          <p>{text}</p>
          <FontAwesomeIcon icon={faFontAwesome} />
        </div>
        <div className="date row">
          <p className="due">Due: {dueDate}</p>
          <p className="added">Added: {dateAdded}</p>
        </div>
      </div>
      <div className="column">
        <FontAwesomeIcon icon={faPenToSquare} className="edit" />
        <FontAwesomeIcon icon={faTrash} className="delete" />
      </div>
    </div>
  );
}

export default TaskItem;
