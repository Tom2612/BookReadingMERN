import React from 'react'

export default function BookDetails({ book }) {

  return (
    <div className='book-details'>
        <h4>{book.title}</h4>
        <p><strong>Pages: </strong>{book.pages}</p>
        <p><strong>Rating: </strong>{book.rating}</p>
        <p>{book.createdAt}</p>
    </div>
  )
}
