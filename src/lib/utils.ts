import { TaskType } from "./definition";

export function isValidDueDate(inputDate: string) {
  const parsedDate = new Date(inputDate);

  if (isNaN(parsedDate.getTime())) {
    return false;
  }

  const minDate = new Date();

  if (parsedDate.getTime() < minDate.getTime()) {
    return false;
  }

  return true;
}

export function sortTasks(criteria: string, tasks: TaskType[]): TaskType[] {
  let sortedTasks: TaskType[] = [...tasks];
  let order: any = criteria[0];
  let field = criteria.slice(1) as keyof TaskType;

  if (order === "-") {
    order = -1;
  } else {
    order = 1;
  }

  sortedTasks.sort((a: TaskType, b: TaskType) => {
    let comparison = 0;

    if (a[field]! > b[field]!) {
      comparison = 1;
    } else if (a[field]! < b[field]!) {
      comparison = -1;
    }

    if (order === -1) {
      comparison *= -1;
    }

    return comparison;
  });

  return sortedTasks;
}
