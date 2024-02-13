import React, { createContext, useContext, useReducer } from 'react';

export const MODIFY_OPTIONS = {
    TOGGLE_THEME: 'toggle_theme',
    ADD_NOTE: 'add_note',
    SEARCH: 'search',
    UPDATE_NOTE: 'updateNote',
    UPDATE_NOTES: 'updateNotes',
};

const STATE_KEYS = {
    NOTES: 'notes',
    THEME: 'theme',
    SEARCH: 'search'
}

const ThemeContext = createContext();
const ThemeUpdateContext = createContext();

const initialState = {
    [STATE_KEYS.THEME]: true,
    [STATE_KEYS.NOTES]: [],
    [STATE_KEYS.SEARCH]: {
        texto: null,
        listas: false,
    },
};

function customContextReducer(state, action) {
    const { value, index } = action.payload;

    switch (action.type) {
        case MODIFY_OPTIONS.ADD_NOTE:
            return {
                ...state,
                [STATE_KEYS.NOTES]: [...state[STATE_KEYS.NOTES], ...value],
            };
        case MODIFY_OPTIONS.TOGGLE_THEME:
            return {
                ...state,
                [STATE_KEYS.THEME]: value,
            };
        case MODIFY_OPTIONS.UPDATE_NOTES:
            return {
                ...state,
                [STATE_KEYS.NOTES]: [...value],
            };
        case MODIFY_OPTIONS.UPDATE_NOTE:
            const list = [...state[MODIFY_OPTIONS.NOTES]];
            list[index] = value;
            return {
                ...state,
                [STATE_KEYS.NOTES]: list,
            };
        default:
            return state;
    }
}

export function useCustomContext() {
    return useContext(ThemeContext);
}

export function useCustomContextUpdate() {
    return useContext(ThemeUpdateContext);
}

export function CustomContext({ children }) {
    const [customContext, dispatch] = useReducer(customContextReducer, initialState);

    function modifyContext(options) {
        dispatch({ type: options.target, payload: options });
    }

    return (
        <ThemeContext.Provider value={customContext}>
            <ThemeUpdateContext.Provider value={modifyContext}>
                {children}
            </ThemeUpdateContext.Provider>
        </ThemeContext.Provider>
    );
}