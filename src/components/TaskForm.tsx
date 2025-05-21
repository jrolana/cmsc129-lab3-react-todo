import { useForm } from "react-hook-form";
import "./TaskForm.css";
import { TaskFormSchema, TaskFormType, TaskType } from "../lib/definition";
import { zodResolver } from "@hookform/resolvers/zod";

interface PropsInterface {
  task?: TaskType;
  onSubmit: (data: TaskFormType) => void;
  isLoading: boolean;
}

function TaskForm(props: PropsInterface) {
  const { task, onSubmit, isLoading } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormType>({
    resolver: zodResolver(TaskFormSchema),
    defaultValues: task ?? {
      text: "",
      dueDate: "",
      priority: 1,
    },
  });

  return (
    <form className="add-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control">
        <label htmlFor="text">Text </label>
        <input id="text" type="text" {...register("text")} />
        {errors.text && <span className="error">{errors.text.message}</span>}
      </div>
      <div className="form-control">
        <label htmlFor="dueDate">Date &amp; Time </label>
        <input id="dueDate" type="datetime-local" {...register("dueDate")} />
        {errors.dueDate && (
          <span className="error">{errors.dueDate.message}</span>
        )}
      </div>
      <div className="div form-control">
        <label htmlFor="priority">Priority </label>
        <select id="priority" {...register("priority")}>
          <option value={1}>High</option>
          <option value={2}>Mid</option>
          <option value={3}>Low</option>
        </select>
        {errors.priority && (
          <span className="error">{errors.priority.message}</span>
        )}
      </div>
      <button type="submit" className="btn btn-block">
        {isLoading ? "Saving..." : "Save Task"}
      </button>
    </form>
  );
}

export default TaskForm;
