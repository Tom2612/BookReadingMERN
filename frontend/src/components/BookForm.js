import React, { useState } from 'react';
import { useBookContext } from '../hooks/useBookContext';
import { useAuthContext } from '../hooks/useAuthContext';

export default function BookForm() {
    const { dispatch } = useBookContext();
    const { user } = useAuthContext();
    
    const [title, setTitle] = useState('');
    const [pages, setPages] = useState('');
    const [rating, setRating] = useState(5);
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            setError('You must be logged in to do that.')
            return
        }

        const book = { title, pages, rating };

        const response = await fetch(`${process.env.REACT_APP_FETCH_URL}api/books/`, {
            method: 'POST',
            body: JSON.stringify(book),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields);
        }
        if (response.ok) {
            setTitle('');
            setPages('');
            setRating('');
            setError(null);
            setEmptyFields([]);
            dispatch({type: 'CREATE_BOOK', payload: json});
        }
    }

  return (
    <form className='create' onSubmit={handleSubmit}>
        <h3>Add a new book</h3>

        <label>Book Title:</label>
        <input 
            type="text" 
            name="title" 
            onChange={(e) => setTitle(e.target.value)} 
            value={title}
            className={emptyFields.includes('title') ? 'error' : ''}
        />
        <label>Number of Pages:</label>
        <input 
            type="number" 
            name="pages" 
            onChange={(e) => setPages(e.target.value)} 
            value={pages}
            className={emptyFields.includes('pages') ? 'error' : ''}
        />
        <label>Your Rating: {rating}</label>
        <input 
            type="range" 
            min="0" 
            max="10" 
            name="rating" 
            onChange={(e) => setRating(e.target.value)} 
            value={rating} 
            className={emptyFields.includes('rating') ? 'error' : ''}
        />

        <button>Add book</button>
        {error && <div className='error'>{error}</div>}
    </form>
  )
}
