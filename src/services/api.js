import axios from 'axios';

const BASE_URL = "https://notes-app-epds.onrender.com/api";

// Fetch all notes
export const getNotes = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/notes/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching notes:", error);
    throw error;
  }
};

// Create a new note
export const createNote = async (task) => {
  try {
    const response = await axios.post(`${BASE_URL}/note/`, task);  
    return response.data;
  } catch (error) {
    console.error("Error adding note:", error);
    throw error;
  }
};

// Update a note by ID
export const updateNote = async (noteId, updatedTask) => {
  try {
    const response = await axios.put(`${BASE_URL}/note/update/${noteId}/`, updatedTask);  
    return response.data;
  } catch (error) {
    console.error("Error updating note:", error);
    throw error;
  }
};

// Delete a note by ID
export const deleteNote = async (noteId) => {
  try {
    await axios.delete(`${BASE_URL}/note/delete/${noteId}/`); 
  } catch (error) {
    console.error("Error deleting note:", error);
    throw error;
  }
};
