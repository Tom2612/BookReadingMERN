import React, { useEffect} from 'react';
import BookDetails from '../components/BookDetails';
import BookForm from '../components/BookForm';
import { useBookContext } from '../hooks/useBookContext';

export default function Home() {
    const { books, dispatch } = useBookContext()

    useEffect(() => {
        const fetchBooks = async() => {
            const response = await fetch('http://localhost:4000/api/books');
            const json = await response.json();
            if (response.ok) {
                dispatch({type: "SET_BOOKS", payload: json});
            }
        }

        fetchBooks();
    }, [])

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
