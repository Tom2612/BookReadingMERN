import React from 'react';
import { useBookContext } from '../hooks/useBookContext';
import { useAuthContext } from '../hooks/useAuthContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export default function BookDetails({ book }) {
  const { dispatch } = useBookContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return
    }
    const response = await fetch(`${process.env.REACT_APP_FETCH_URL}api/books/` + book._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
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
        <p>{formatDistanceToNow(new Date(book.createdAt), {addSuffix: true})}</p>
        <span className='material-symbols-outlined' onClick={handleClick}>delete</span>
    </div>
  )
}
