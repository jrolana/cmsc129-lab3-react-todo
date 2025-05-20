import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFontAwesome } from "@fortawesome/free-solid-svg-icons";
import "./Tasks.css";

function Tasks() {
  return (
    <div className="label">
      <div className="label-item">
        <label htmlFor="sortBy">Sort By: </label>
        <select name="sortBy" id="sortBy">
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
          <FontAwesomeIcon icon={faFontAwesome} />
          <p>High</p>
          <FontAwesomeIcon icon={faFontAwesome} />
          <p>Med</p>
          <FontAwesomeIcon icon={faFontAwesome} />
          <p>Low</p>
        </div>
      </div>
    </div>
  );
}

export default Tasks;
