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

    const createNote = async (note) => {
        try {
            const response = await sendRequest(`${process.env.REACT_APP_BASE_URL}/notes`,
                'POST',
                JSON.stringify(note),
                {
                    'Content-Type': 'application/json',
                }
            )

            // CREATE FILES ATTACHED TO NOTE
            if (note.files.length) {
                await Promise.all(note.files.map(async file => {
                    const formData = new FormData()
                    formData.append('file', file)
                    await sendRequest(`${process.env.REACT_APP_BASE_URL}/notes/${response.noteID}/file`,
                        'POST',
                        formData
                    )
                }))
            }

            //CREATE TAGS ATTACHED TO NOTE
            if (note.tags.length) {
                await Promise.all(
                    note.tags.map(async tag => {
                        await sendRequest(`${process.env.REACT_APP_BASE_URL}/notes/${response.noteID}/tag`,
                            'POST',
                            JSON.stringify(tag),
                            {
                                'Content-Type': 'application/json',
                            }
                        )
                    })
                )
            }
            return response;
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

    return { isLoading, fetchNotes, createNote, getNote, deleteNote, cloneNote, reset };
};
