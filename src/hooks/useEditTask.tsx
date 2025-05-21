import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { TaskFormType, TaskType } from "../lib/definition";
import { db } from "../lib/firebase";

function useEditTask() {
  const [isLoading, setIsLoading] = useState(false);

  async function editTask(data: TaskFormType, docId: string) {
    try {
      setIsLoading(true);

      const docRef = doc(db, "tasks", docId);

      await updateDoc(docRef, data);
    } catch (e) {
      console.error("Error adding document: ", e);
      throw e;
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, editTask };
}

export default useEditTask;
