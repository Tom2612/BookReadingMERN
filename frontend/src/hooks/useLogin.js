import { useState } from "react";
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);

        // create request here
        const response = await fetch('http://localhost:4000/api/user/login', {
            method: 'POST',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email, password })
        });
        console.log(response);
        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
        }
        if (response.ok) {
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json));

            // update AuthContext global state
            dispatch({ type: 'LOGIN', payload: json });

            setIsLoading(false);
        }
    }
    return { login, isLoading, error };
}