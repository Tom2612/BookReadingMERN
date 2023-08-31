import React, { useState } from 'react';
import { Title, TextInput, NumberInput, Slider, Button, Alert } from '@mantine/core';
import { useTestBookContext } from '../hooks/useTestBookContext';
import { IconAlertCircle } from '@tabler/icons-react';

export default function BookForm() {
    const { dispatch } = useTestBookContext();

    const [title, setTitle] = useState('');
    const [pages, setPages] = useState(0);
    const [rating, setRating] = useState(5);
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Mirror backend validation checks:
        let empty = [];
        if (!title) {
            empty.push('title');
        }
        if (!pages) {
            empty.push('pages');
        }
        if (!rating) {
            empty.push('rating');
        }
        if (empty.length > 0) {
            setLoading(false);
            setError('Please fill in all required fields');
            return setEmptyFields(empty);
        }

        const book = { title, pages, rating, createdAt: new Date() };

        dispatch({type: 'CREATE_BOOK', payload: book});
        setLoading(false);
        setTitle('');
        setPages('');
        setRating(5);
        setError(null);
        setEmptyFields([]);
        
    }

  return (
    <form className='create' onSubmit={handleSubmit} style={{ maxWidth: '26em', margin: '0 auto' }}>
        <Title order={3} mb='xl'>Add a new book</Title>

        <TextInput 
            label='Book Title:'
            name="title" 
            onChange={(e) => setTitle(e.target.value)} 
            value={title}
            error={emptyFields.includes('title') ? 'Invalid title' : null}
            withAsterisk
            mb='xl'
        />

        <NumberInput 
            label="Number of Pages:" 
            name="pages" 
            onChange={setPages} 
            value={pages}
            error={emptyFields.includes('pages') ? 'Invalid pages' : null}
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
        />

        <Button loading={loading} mt='lg' type='submit' w='100%'>Add book</Button>
        {error && <Alert icon={<IconAlertCircle />} className='error' title='Sorry!' color='red' mt='xl'>{error}</Alert>}
    </form>
  )
}
