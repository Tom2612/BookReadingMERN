import React, { useEffect} from 'react';
import { Grid, Stack, Accordion, Title } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import BookDetails from '../components/BookDetails';
import BookForm from '../components/BookForm';
import { useBookContext } from '../hooks/useBookContext';
import { useAuthContext } from '../hooks/useAuthContext';

export default function Home() {
    const { width } = useViewportSize();
    const { books, dispatch } = useBookContext();
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchBooks = async() => {
            const response = await fetch(`http://localhost:4000/api/books/`, {
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
    <Grid gutter='xl' justify='space-between' ml='xl' mr='xl'>
        <Grid.Col xs={12} sm={4} orderSm={2}>
            {width < 768 ? 
                <Accordion variant='separated' defaultValue="customization" radius='md'>
                    <Accordion.Item value='Add a New Book' bg='none'>
                        <Accordion.Control><Title order={4}>+ Book</Title></Accordion.Control>
                        <Accordion.Panel><BookForm /></Accordion.Panel>
                    </Accordion.Item>
                    
                </Accordion> 
                : 
                <BookForm /> }
        </Grid.Col>

        <Grid.Col xs={12} sm={8} orderSm={1}>
            <Stack className='books'>
                {books && books.map(book => (
                    <BookDetails key={book._id} book={book} />
                ))}
            </Stack>
        </Grid.Col>
        
    </Grid>
  )
}
