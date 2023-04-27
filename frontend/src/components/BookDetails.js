import React from 'react';
import { Stack, Group, Paper, Title, Text } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { IconTrash } from '@tabler/icons-react';
import { useBookContext } from '../hooks/useBookContext';
import { useAuthContext } from '../hooks/useAuthContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export default function BookDetails({ book }) {
  const { dispatch } = useBookContext();
  const { user } = useAuthContext();
  const { hovered, ref } = useHover();

  const handleClick = async () => {
    if (!user) {
      return
    }
    const response = await fetch(`http://localhost:4000/api/books/` + book._id, {
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
      <Paper shadow='sm' p='md' radius='md'>
        <Group position='apart' spacing='xl'>
          <Stack spacing='xs'>
            <Title color='blue' order={3}>{book.title}</Title>
            <Text><Text span fw={700} inherit>Pages:</Text> {book.pages}</Text>
            <Text><Text span fw={700} inherit>Rating:</Text> {book.rating}</Text>
            <Text><Text span fw={700} inherit>Added:</Text> {formatDistanceToNow(new Date(book.createdAt), {addSuffix: true})}</Text>
          </Stack>
          <IconTrash ref={ref} style={hovered ? { cursor: 'pointer' } : null} onClick={handleClick} />
        </Group>
      </Paper>
  )
}
