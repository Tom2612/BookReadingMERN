import React, { useState } from 'react';
import { Title, TextInput, NumberInput, Slider, Button, Alert } from '@mantine/core';
import { useBookContext } from '../hooks/useBookContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { IconAlertCircle } from '@tabler/icons-react';

export default function BookForm() {
    const { dispatch } = useBookContext();
    const { user } = useAuthContext();

    const [title, setTitle] = useState('');
    const [pages, setPages] = useState(0);
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

        const response = await fetch(`http://localhost:4000/api/books/`, {
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
    <form className='create' onSubmit={handleSubmit} style={{ maxWidth: '26em' }}>
        <Title order={3} mb='xl'>Add a new book</Title>

        <TextInput 
            label='Book Title:'
            name="title" 
            onChange={(e) => setTitle(e.target.value)} 
            value={title}
            className={emptyFields.includes('title') ? 'error' : ''}
            withAsterisk
            mb='xl'
        />

        <NumberInput 
            label="Number of Pages:" 
            name="pages" 
            onChange={setPages} 
            value={pages}
            className={emptyFields.includes('pages') ? 'error' : ''}
            withAsterisk
            mb='xl'
        />
        <Title style={{fontSize: '0.875rem', fontWeight:'500', color:'#212529'}}>Your Rating: {rating}</Title>
        <Slider 
            marks={[
                { value: 0, label: '0'},
                { value: 5, label: '5'},
                { value: 10, label: '10'},
            ]}
            label={rating}
            defaultValue={5}
            min={0}
            max={10}
            step={1}
            mb='xl'
            onChange={setRating}
            value={rating} 
            className={emptyFields.includes('rating') ? 'error' : ''}
        />

        <Button mt='lg'>Add book</Button>
        {error && <Alert icon={<IconAlertCircle />} className='error' title='Sorry!' color='red'>{error}</Alert>}
    </form>
  )
}
