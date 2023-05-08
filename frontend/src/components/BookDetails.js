import React, { useState } from 'react';
import { Stack, Group, Paper, Title, Text, Alert } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { IconTrash, IconAlertCircle } from '@tabler/icons-react';
import { useBookContext } from '../hooks/useBookContext';
import { useAuthContext } from '../hooks/useAuthContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export default function BookDetails({ book }) {
  const { dispatch } = useBookContext();
  const { user } = useAuthContext();
  const { hovered, ref } = useHover();
  const [error, setError] = useState(null);

  const handleClick = async () => {
    if (!user) {
      return
    }
    try {
      const response = await fetch(`http://localhost:4000/api/books/` + book._id, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json();

      if(response.ok) {
        setError(null);
        dispatch({type: 'DELETE_BOOK', payload: json});
      }
    } catch(e) {
      setError('Looks like we can\'t do that at the minute, please try again later.');
    }
    
  }

  return (
      <Paper shadow='sm' p='md' radius='md' maw={1000}>
        <Group position='apart' spacing='xl'>
          <Stack spacing='xs'>
            <Title color='green' order={3}>{book.title}</Title>
            <Text><Text span fw={700} inherit>Pages:</Text> {book.pages}</Text>
            <Text><Text span fw={700} inherit>Rating:</Text> {book.rating}</Text>
            <Text><Text span fw={700} inherit>Added:</Text> {formatDistanceToNow(new Date(book.createdAt), {addSuffix: true})}</Text>
          </Stack>
          <IconTrash ref={ref} style={hovered ? { cursor: 'pointer' } : null} onClick={handleClick} />
        </Group>
        {error && <Alert onClose={() => setError(null)} withCloseButton closeButtonLabel="Close alert" icon={<IconAlertCircle />} className='error' title='Sorry!' color='red' mt='xl'>{error}</Alert>}
      </Paper>
  )
}
