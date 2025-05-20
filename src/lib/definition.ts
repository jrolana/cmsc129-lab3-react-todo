import { z } from "zod";
import { isValidDueDate } from "./utils";

export const TaskSchema = z.object({
  id: z.string(),
  text: z.string().min(1, { message: "Please enter a task." }),
  priority: z.coerce
    .number()
    .positive({ message: "Please select a priority." }),
  isDone: z.boolean(),
  dueDate: z.string().refine((data) => isValidDueDate(data), {
    message: "Please enter a valid date.",
  }),
  dateAdded: z.string().datetime(),
});
export type TaskType = z.infer<typeof TaskSchema>;

export const TaskFormSchema = TaskSchema.omit({
  id: true,
  dateAdded: true,
  isDone: true,
});
export type TaskFormType = z.infer<typeof TaskFormSchema>;
