import React from 'react';
import { deleteNote } from '../services/api';
import { toast } from 'react-toastify';  // Importing toast for notifications

const Delete = ({ noteId, setTasks }) => {
  const handleDelete = async () => {
    try {
      await deleteNote(noteId);  // Calling API to delete note
      setTasks(prevTasks => prevTasks.filter(task => task.id !== noteId));  // Updating state after deletion
      toast.success("Note deleted successfully!");  // Success toast notification
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete note!");  // Error toast notification
    }
  };

  return (
    <button onClick={handleDelete}>Delete</button>
  );
};

export default Delete;
