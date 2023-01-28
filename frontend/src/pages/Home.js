import React, { useEffect} from 'react';
import BookDetails from '../components/BookDetails';
import BookForm from '../components/BookForm';
import { useBookContext } from '../hooks/useBookContext';
import { useAuthContext } from '../hooks/useAuthContext';

export default function Home() {
    const { books, dispatch } = useBookContext();
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchBooks = async() => {
            const response = await fetch('http://localhost:4000/api/books', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            });
            const json = await response.json();
            if (response.ok) {
                dispatch({type: "SET_BOOKS", payload: json});
            }
        }

        if (user) {
            fetchBooks();
        }
        
    }, [dispatch, user])

  return (
    <div className='home'>
        <div className='books'>
            {books && books.map(book => (
                <BookDetails key={book._id} book={book} />
            ))}
        </div>
        <BookForm />
    </div>
  )
}
