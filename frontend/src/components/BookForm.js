import React, { useState } from 'react'

export default function BookForm() {
    const [title, setTitle] = useState('');
    const [pages, setPages] = useState('');
    const [rating, setRating] = useState(5);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const book = { title, pages, rating };

        const response = await fetch('http://localhost:4000/api/books', {
            method: 'POST',
            body: JSON.stringify(book),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
        }
        if (response.ok) {
            setTitle('');
            setPages('');
            setRating('');
            setError(null);
            console.log('new book added', json);
        }
    }

  return (
    <form className='create' onSubmit={handleSubmit}>
        <h3>Add a new book</h3>

        <label>Book Title:</label>
        <input type="text" name="title" onChange={(e) => setTitle(e.target.value)} value={title}/>
        <label>Number of Pages:</label>
        <input type="number" name="pages" onChange={(e) => setPages(e.target.value)} value={pages}/>
        <label>Your Rating: {rating}</label>
        <input type="range" min="0" max="10" name="rating" onChange={(e) => setRating(e.target.value)} value={rating} />

        <button>Add book</button>
        {error && <div className='error'>{error}</div>}
    </form>
  )
}
