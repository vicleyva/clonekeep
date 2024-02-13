import { useFetch } from '../hooks/useFetch';

export const useNotesService = () => {
    const { sendRequest, isLoading, reset } = useFetch();

    const fetchNotes = async () => {
        try {
            const response = await sendRequest(`${process.env.REACT_APP_BASE_URL}/notes`);
            return response;
        } catch (error) {
            console.error('Error fetching notes:', error);
            throw error;
        }
    };

    const createNoteProcess = async (note) => {
        try {
            const createNoteProcessResponse = await createNote(note)

            // CREATE FILES ATTACHED TO NOTE
            if (note.files.length) {
                await Promise.all(
                    note.files.map(async file => {
                        await createNoteFile(createNoteProcessResponse.noteID, file)
                    })
                )
            }

            //CREATE TAGS ATTACHED TO NOTE
            if (note.tags.length) {
                await Promise.all(
                    note.tags.map(async tag => {
                        await createNoteTag(createNoteProcessResponse.noteID, tag)
                    })
                )
            }
            return createNoteProcessResponse;
        } catch (error) {
            console.error('Error creating note process:', error);
            throw error;
        }
    }

    const createNote = async (note) => {
        try {
            const createNoteResponse = await sendRequest(`${process.env.REACT_APP_BASE_URL}/notes`,
                'POST',
                JSON.stringify(note),
                {
                    'Content-Type': 'application/json',
                }
            )

            return createNoteResponse;
        } catch (error) {
            console.error('Error creating note:', error);
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
            const createNoteFileResponse = await sendRequest(`${process.env.REACT_APP_BASE_URL}/notes/${noteID}/file`,
                'POST',
                formData
            )
            return createNoteFileResponse;
        } catch (error) {
            console.error('Error creating note file:', error);
            throw error;
        }
    }

    const createNoteTag = async (noteID, tag) => {
        try {
            const createNoteTagResponse = await sendRequest(`${process.env.REACT_APP_BASE_URL}/notes/${noteID}/tag`,
                'POST',
                JSON.stringify(tag),
                {
                    'Content-Type': 'application/json',
                }
            )
            return createNoteTagResponse;
        } catch (error) {
            console.error('Error creating note tag:', error);
            throw error;
        }
    }

    return { isLoading, fetchNotes, createNoteProcess, createNote, getNote, deleteNote, cloneNote, createNoteFile, createNoteTag, reset };
};
