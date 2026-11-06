import api from "./api";

// Get all notes
export const getAllNotes = async () => {
    const response = await api.get("/note/");
    return response.data;
};

// Create a note
export const createNote = async (noteData) => {
    const response = await api.post("/note/create", noteData);
    return response.data;
};

// Update a note
export const updateNote = async (id, noteData) => {
    const response = await api.patch(`/note/update/${id}`, noteData);
    return response.data;
};

// Delete a note
export const deleteNote = async (id) => {
    const response = await api.delete(`/note/delete/${id}`);
    return response.data;
};