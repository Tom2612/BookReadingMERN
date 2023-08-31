import { TestBookContext } from "../contexts/TestBookContext";
import { useContext } from "react";

export const useTestBookContext = () => {
    const context = useContext(TestBookContext);

    if (!context) {
        throw Error('UseTestBookContext must be used inside TestBooksContextProvider');
    }
    return context;
}