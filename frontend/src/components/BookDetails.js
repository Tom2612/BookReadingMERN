import React from 'react';
import { useBookContext } from '../hooks/useBookContext';

export default function BookDetails({ book }) {
  const { dispatch } = useBookContext();

  const handleClick = async () => {
    const response = await fetch('http://localhost:4000/api/books/' + book._id, {
      method: 'DELETE'
    })
    const json = await response.json();

    if(response.ok) {
      dispatch({type: 'DELETE_BOOK', payload: json});
    }
  }

  return (
    <div className='book-details'>
        <h4>{book.title}</h4>
        <p><strong>Pages: </strong>{book.pages}</p>
        <p><strong>Rating: </strong>{book.rating}</p>
        <p>{book.createdAt}</p>
        <span onClick={handleClick}>Delete</span>
    </div>
  )
}
