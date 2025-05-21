import { doc, deleteDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../lib/firebase";

function useDeleteTask() {
  const [isLoading, setIsLoading] = useState(false);

  async function deleteTask(docId: string) {
    try {
      setIsLoading(true);

      await deleteDoc(doc(db, "tasks", docId));
    } catch (e) {
      console.error("Error adding document: ", e);
      throw e;
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, deleteTask };
}

export default useDeleteTask;
