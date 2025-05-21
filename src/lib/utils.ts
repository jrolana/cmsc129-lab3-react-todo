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

export function formatDBDate(date: Date) {
  const pad = (n: number) => n.toString().padStart(2, "0");

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function formatDisplayDate(dueDate: string) {
  const due = new Date(dueDate);
  const today = new Date();

  const isDueToday = due.getDate() === today.getDate();

  if (isDueToday) {
    return `Today, ${due.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })}`;
  } else {
    return due.toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }
}

export function getColorPriority(priority: number) {
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
