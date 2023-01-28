import { useAuthContext } from "./useAuthContext";
import { useBookContext } from "./useBookContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const { dispatch: booksDispatch } = useBookContext();

    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user');

        // dispatch logout action
        dispatch({type: 'LOGOUT'});
        booksDispatch({type: 'SET_BOOKS', payload: null});
    }
    return { logout }
}