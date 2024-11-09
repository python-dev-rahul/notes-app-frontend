import React, { useState } from "react";
import { updateNote } from "../services/api";
import { toast } from 'react-toastify';  // Importing toast for notifications

const Update = ({ note, setTasks, onCancel }) => {
  const [updatedTask, setUpdatedTask] = useState({
    title: note.title,
    body: note.body
  });

  const handleUpdate = async () => {
    try {
      const updatedNote = await updateNote(note.id, updatedTask);  // Calling API to update the note
      setTasks(prevTasks =>
        prevTasks.map(task => (task.id === note.id ? updatedNote : task))  // Updating task in the state
      );
      toast.success("Note updated successfully!");  // Success toast notification
      onCancel();  // Closing the edit form after successful update
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update note!");  // Error toast notification
    }
  };

  return (
    <div>
      <input
        type="text"
        value={updatedTask.title}
        onChange={(e) => setUpdatedTask({ ...updatedTask, title: e.target.value })}
      />
      <textarea
        value={updatedTask.body}
        onChange={(e) => setUpdatedTask({ ...updatedTask, body: e.target.value })}
      />
      <button onClick={handleUpdate}>Update</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default Update;
