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
    <div className='add_input'>
      <label htmlFor="taskTitle">Task Title:</label>
      <input
        type="text"
        id="taskTitle"
        value={newTask.title}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        placeholder="What is the task today?" 
      /><br/>
      <label htmlFor="taskBody">Task Body:</label>
      <input
        type="text"
        id="taskBody"
        value={newTask.body}
        onChange={(e) => setNewTask({ ...newTask, body: e.target.value })}
        placeholder="Body" 
      /><br/>
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default Add;
