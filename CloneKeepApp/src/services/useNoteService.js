import { useFetch } from '../hooks/useFetch';

export const useNotesService = () => {
    const { sendRequest, isLoading, reset, error } = useFetch();

    const fetchNotes = async (searchParam = null) => {
        try {
            // Construct the URL with the search parameter
            const url = `${process.env.REACT_APP_BASE_URL}/notes${!!searchParam ? `?search=${encodeURIComponent(searchParam.trim().toLowerCase())}` : ''}`;

            const response = await sendRequest(url);

            return response;
        } catch (error) {
            console.error('Error fetching notes:', error);
            throw error;
        }
    };

    const createNoteProcess = async (note) => {
        try {
            const response = await createNote(note)

            // CREATE FILES ATTACHED TO NOTE
            if (note.files.length) {
                await Promise.all(
                    note.files.map(async file => {
                        await createNoteFile(response.noteID, file)
                    })
                )
            }

            //CREATE TAGS ATTACHED TO NOTE
            if (note.tags.length) {
                await Promise.all(
                    note.tags.map(async tag => {
                        await createNoteTag(response.noteID, tag)
                    })
                )
            }
            return response;
        } catch (error) {
            console.error('Error creating note process:', error);
            throw error;
        }
    }

    const createNote = async (note) => {
        try {
            const response = await sendRequest(`${process.env.REACT_APP_BASE_URL}/notes`,
                'POST',
                JSON.stringify(note),
                {
                    'Content-Type': 'application/json',
                }
            )

            return response;
        } catch (error) {
            console.error('Error creating note:', error);
            throw error;
        }
    }

    const updateNote = async (note) => {
        try {
            const response = await sendRequest(`${process.env.REACT_APP_BASE_URL}/notes/${note.noteID}`,
                'PATCH',
                JSON.stringify(note),
                {
                    'Content-Type': 'application/json',
                }
            )

            return response;
        } catch (error) {
            console.error('Error updating note:', error);
            throw error;
        }
    }

    const getNote = async (noteID) => {
        try {
            const response = await sendRequest(`${process.env.REACT_APP_BASE_URL}/notes/${noteID}`);
            return response;
        } catch (error) {
            console.error('Error fetching note:', error);
            throw error;
        }
    }

    const deleteNote = async (noteID) => {
        try {
            const response = await sendRequest(`${process.env.REACT_APP_BASE_URL}/notes/${noteID}`, 'DELETE')
            return response;
        } catch (error) {
            console.error('Error deleting note:', error);
            throw error;
        }
    }

    const cloneNote = async (noteID) => {
        try {
            const response = await sendRequest(`${process.env.REACT_APP_BASE_URL}/notes/${noteID}/clone`, 'POST')
            return response;
        } catch (error) {
            console.error('Error cloning note:', error);
            throw error;
        }
    }

    const createNoteFile = async (noteID, file) => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            const response = await sendRequest(`${process.env.REACT_APP_BASE_URL}/notes/${noteID}/file`,
                'POST',
                formData
            )
            return response;
        } catch (error) {
            console.error('Error creating note file:', error);
            throw error;
        }
    }

    const deleteNoteFile = async (noteID, noteFileID) => {
        try {
            const response = await sendRequest(`${process.env.REACT_APP_BASE_URL}/notes/${noteID}/file/${noteFileID}`,
                'DELETE',
            )
            return response;
        } catch (error) {
            console.error('Error deleting note file:', error);
            throw error;
        }
    }

    const createNoteTag = async (noteID, tag) => {
        try {
            const response = await sendRequest(`${process.env.REACT_APP_BASE_URL}/notes/${noteID}/tag`,
                'POST',
                JSON.stringify(tag),
                {
                    'Content-Type': 'application/json',
                }
            )
            return response;
        } catch (error) {
            console.error('Error creating note tag:', error);
            throw error;
        }
    }

    const deleteNoteTag = async (noteID, noteTagID) => {
        try {
            const response = await sendRequest(`${process.env.REACT_APP_BASE_URL}/notes/${noteID}/tag/${noteTagID}`,
                'DELETE',
            )
            return response;
        } catch (error) {
            console.error('Error deleting note tag:', error);
            throw error;
        }
    }

    return { isLoading, error, fetchNotes, createNoteProcess, createNote, getNote, deleteNote, cloneNote, createNoteFile, createNoteTag, deleteNoteTag, deleteNoteFile, updateNote, reset };
};
