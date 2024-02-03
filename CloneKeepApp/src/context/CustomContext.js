import React, { createContext, useContext, useReducer } from 'react';

export const MODIFY_OPTIONS = {
    THEME: 'theme',
    NOTES: 'notes',
    SEARCH: 'search',
    UPDATE_NOTE: 'updateNote',
    DELETE_NOTE: 'deleteNote',
    CLONE_NOTE: 'cloneNote'
};

const ThemeContext = createContext();
const ThemeUpdateContext = createContext();

const initialState = {
    [MODIFY_OPTIONS.THEME]: true,
    [MODIFY_OPTIONS.NOTES]: [],
    [MODIFY_OPTIONS.SEARCH]: {
        texto: null,
        listas: false,
    },
};

function customContextReducer(state, action) {
    const { value, index } = action.payload;

    switch (action.type) {
        case MODIFY_OPTIONS.NOTES:
            return {
                ...state,
                [MODIFY_OPTIONS.NOTES]: [...state[MODIFY_OPTIONS.NOTES], ...value],
            };
        case MODIFY_OPTIONS.THEME:
            return {
                ...state,
                [MODIFY_OPTIONS.THEME]: value,
            };
        case MODIFY_OPTIONS.DELETE_NOTE:
            return {
                ...state,
                [MODIFY_OPTIONS.NOTES]: [...value],
            };
        case MODIFY_OPTIONS.UPDATE_NOTE:
            const list = [...state[MODIFY_OPTIONS.NOTES]];
            list[index] = value;
            return {
                ...state,
                [MODIFY_OPTIONS.NOTES]: list,
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