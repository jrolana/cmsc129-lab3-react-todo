import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFontAwesome,
  faPenToSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "./TaskForm.css";

function TaskForm() {
  return (
    <form className="add-form">
      <div className="form-control">
        <label htmlFor="text">Text </label>
        <input id="text" type="text" />
      </div>
      <div className="form-control">
        <label htmlFor="dueDate">Date &amp; Time </label>
        <input id="dueDate" type="datetime-local" />
      </div>
      <div className="div form-control">
        <label htmlFor="priority">Priority </label>
        <select name="priority" id="priority">
          <option value={1}>High</option>
          <option value={2}>Mid</option>
          <option value={3}>Low</option>
        </select>
      </div>
      <button type="submit" className="btn btn-block">
        Save Task
      </button>
    </form>
  );
}

export default TaskForm;
