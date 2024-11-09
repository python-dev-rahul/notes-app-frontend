import React, { useState } from 'react';
import { createNote } from '../services/api';

const Add = ({ setTasks, onAdd }) => {
  const [newTask, setNewTask] = useState({ title: '', body: '' });

  const handleAddTask = async () => {
    if (newTask.title && newTask.body) {
      try {
        const addedTask = await createNote(newTask);
        setTasks((prevTasks) => [...prevTasks, addedTask]); // Add new task to the list
        setNewTask({ title: '', body: '' }); // Reset input fields
        onAdd(); // Trigger the onAdd function to show the success toast
      } catch (error) {
        console.error("Error adding task:", error);
      }
    } else {
      onAdd('error'); // If input is empty, trigger error toast
    }
  };

  return (
    <div>
      <input
        type="text"
        value={newTask.title}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        placeholder="Title"
      />
      <textarea
        value={newTask.body}
        onChange={(e) => setNewTask({ ...newTask, body: e.target.value })}
        placeholder="Body"
      />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default Add;
