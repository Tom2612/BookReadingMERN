import React, { useState } from 'react';
import { Stack, Group, Paper, Title, Text, Alert } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { IconTrash, IconAlertCircle } from '@tabler/icons-react';
import { useTestBookContext } from '../hooks/useTestBookContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export default function BookDetails({ book }) {
  const { dispatch } = useTestBookContext();
  const { hovered, ref } = useHover();
  const [error, setError] = useState(null);

  const handleClick = async () => {
    setError(null);
    dispatch({type: 'DELETE_BOOK', payload: book});
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
