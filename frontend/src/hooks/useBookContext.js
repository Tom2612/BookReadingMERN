import { BookContext } from "../contexts/BookContext";
import { useContext } from "react";

export const useBookContext = () => {
    const context = useContext(BookContext);

    if (!context) {
        throw Error('UseBookContext must be used inside BooksContextProvider');
    }
    return context;
}