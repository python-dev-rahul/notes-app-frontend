import React, { useState, useEffect } from "react";
import { getNotes } from "../services/api";
import Add from "./Add";
import Delete from "./Delete";
import Update from "./Update";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [editingNoteId, setEditingNoteId] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const fetchedNotes = await getNotes();
        setTasks(fetchedNotes);
      } catch (error) {
        console.error("Error fetching notes:", error);
        toast.error("Error fetching notes!"); // Error toast on fetching failure
      }
    };
    fetchNotes();
  }, []);

  const handleEditClick = (noteId) => {
    setEditingNoteId(noteId);
  };

  const handleCancelEdit = () => {
    setEditingNoteId(null);
  };

  // Success and error notifications
  const handleAddSuccess = (type) => {
    if (type === "error") {
      toast.error("Please fill out all fields!");
    } else {
      toast.success("Note added successfully!");
    }
  };

  const handleDeleteSuccess = () => {
    toast.success("Note deleted successfully!");
  };

  const handleUpdateSuccess = () => {
    toast.success("Note updated successfully!");
  };

  const noteToEdit = tasks.find((task) => task.id === editingNoteId);

  return (
    <div className="App_To">
      <ToastContainer />
      <div className="main">
        <h1>Get Things Done!</h1>

        <div className="addnote_main">
          <Add setTasks={setTasks} onAdd={handleAddSuccess} />
        </div>

        <div className="task_list">
          <ul>
            {/* Show only the note being edited if in edit mode */}
            {editingNoteId
              ? noteToEdit && (
                  <li
                    key={noteToEdit.id}
                    aria-label={`Editing note with title ${noteToEdit.title}`}
                  >
                    <div className="third-span">Title: {noteToEdit.title}</div>
                    <div className="fourth-span">Body: {noteToEdit.body}</div>
                    <Update
                      note={noteToEdit}
                      setTasks={setTasks}
                      onCancel={handleCancelEdit}
                      onUpdate={handleUpdateSuccess} // Pass onUpdate for update success toast
                    />
                  </li>
                )
              : // Show all notes if not in edit mode
                tasks.map((task) => (
                  <li
                    key={task.id}
                    aria-label={`Note with title ${task.title}`}
                  >
                    <div className="first-span">Title: {task.title}</div>
                    <br />
                    <div className="second-span">Body: {task.body}</div>
                    <button
                      onClick={() => handleEditClick(task.id)}
                      aria-label={`Edit note titled ${task.title}`}
                    >
                      Edit
                    </button>
                    <span>
                    <Delete
                      noteId={task.id}
                      setTasks={setTasks}
                      onDelete={handleDeleteSuccess} // Pass onDelete for delete success toast
                      aria-label={`Delete note titled ${task.title}`}
                    /></span>
                  </li>
                ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ToDoList;
