import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { TaskFormType, TaskType } from "../lib/definition";
import { db } from "../lib/firebase";

function useToggleDoneTask() {
  const [isLoading, setIsLoading] = useState(false);

  async function toggleDoneTask(isDone: boolean, docId: string) {
    try {
      setIsLoading(true);

      const docRef = doc(db, "tasks", docId);

      await updateDoc(docRef, { isDone: isDone });
    } catch (e) {
      console.error("Error adding document: ", e);
      throw e;
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, toggleDoneTask };
}

export default useToggleDoneTask;
