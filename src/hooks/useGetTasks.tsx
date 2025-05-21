import { collection, query, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { TaskType } from "../lib/definition";
import { db } from "../lib/firebase";

function useGetTasks() {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "tasks")),
      (snapshot) => {
        const tasksData: TaskType[] = snapshot.docs.map((doc) =>
          doc.data()
        ) as TaskType[];

        setTasks(tasksData);
      }
    );

    return unsubscribe;
  }, []);

  return { tasks };
}

export default useGetTasks;
