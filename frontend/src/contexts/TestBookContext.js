import React, { createContext, useReducer } from 'react';

export const TestBookContext = createContext();

export const testBooksReducer = (state, action) => {
    switch(action.type) {
        case 'SET_BOOKS':
            return {
                books: action.payload
            }
        case 'CREATE_BOOK':
            return {
                books: [action.payload, ...state.books]
            }
        case 'DELETE_BOOK':
            return {
                books: state.books.filter((book) => book.title !== action.payload.title)
            }
        default:
            return state
    }
}

export const TestBookContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(testBooksReducer, {
        books: [
            {
                title: 'Example Book',
                pages: 500,
                rating: 8,
                createdAt: new Date()
            }
        ]
    })

    return (
        <TestBookContext.Provider value={{...state, dispatch}}>
            { children }
        </TestBookContext.Provider>
    )
}