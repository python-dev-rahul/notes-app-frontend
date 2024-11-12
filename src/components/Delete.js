import React from 'react';
import { deleteNote } from '../services/api';
import { toast } from 'react-toastify';

const Delete = ({ noteId, setTasks }) => {
  const handleDelete = async () => {
    try {
      await deleteNote(noteId);  // Calling API to delete note
      setTasks(prevTasks => prevTasks.filter(task => task.id !== noteId));  // Updating state after deletion
      toast.success("Note deleted successfully!");  // Success toast notification
      const liveRegion = document.getElementById("actionMessage");
      if (liveRegion) {
        liveRegion.innerText = "Note deleted successfully!";
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete note!");  // Error toast notification

      // Announce failure message 
      const liveRegion = document.getElementById("actionMessage");
      if (liveRegion) {
        liveRegion.innerText = "Failed to delete note!";
      }
    }
  };

  return (
    <span>

      <div id="actionMessage" aria-live="polite" style={{ position: 'absolute', left: '-9999px' }}></div>
      <button onClick={handleDelete} aria-label="Delete note">Delete</button>
    </span>
  );
};

export default Delete;
