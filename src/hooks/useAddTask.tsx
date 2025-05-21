import { collection, doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { TaskFormType } from "../lib/definition";
import { db } from "../lib/firebase";
import { formatDBDate } from "../lib/utils";

function useAddTask() {
  const [isLoading, setIsLoading] = useState(false);

  async function addTask(data: TaskFormType) {
    try {
      setIsLoading(true);

      const toAddRef = doc(collection(db, "tasks"));

      const toAddData = {
        id: toAddRef.id,
        text: data.text,
        priority: data.priority,
        dueDate: data.dueDate,
        dateAdded: formatDBDate(new Date()),
        isDone: false,
      };

      await setDoc(toAddRef, toAddData);
    } catch (e) {
      console.error("Error adding document: ", e);
      throw e;
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, addTask };
}

export default useAddTask;
