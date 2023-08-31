import React from 'react';
import { Grid, Stack, Accordion, Title } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import TestBookDetails from '../components/TestBookDetails';
import TestBookForm from '../components/TestBookForm';
import { useTestBookContext } from '../hooks/useTestBookContext';


export default function TestHome() {
    const { width } = useViewportSize();
    const { books } = useTestBookContext();

  return (
    <Grid gutter='xl' justify='space-between' ml='xl' mr='xl'>
        <Grid.Col xs={12} sm={4} orderSm={2}>
            {width < 768 ? 
                <Accordion variant='separated' defaultValue="customization" radius='md'>
                    <Accordion.Item value='Add a New Book' bg='none'>
                        <Accordion.Control><Title order={4}>+ Book</Title></Accordion.Control>
                        <Accordion.Panel><TestBookForm /></Accordion.Panel>
                    </Accordion.Item>
                    
                </Accordion> 
                : 
                <TestBookForm /> }
        </Grid.Col>

        <Grid.Col xs={12} sm={8} orderSm={1}>
            <Stack className='books'>
                {books && books.map(book => (
                    <TestBookDetails key={book.title + book.rating} book={book} />
                ))}
            </Stack>
        </Grid.Col>
        
    </Grid>
  )
}
