import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Group, Button, Anchor, Title, Text, Flex } from '@mantine/core';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

export default function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  }
 
  return (
    <Header mb='xl' p='sm'>
        <Group position='apart'>
            <Anchor underline={false} to='/'><Title order={1} mx='xl'>Book Tracker</Title></Anchor>
            <nav>
              {user && (
                <Flex justify='center' align='center' direction='row' gap='xl' mr='xl'>
                  <Text inline={false}>{user.email}</Text>
                  <Button onClick={handleClick} variant='outline'>Logout</Button>
                </Flex>
              )}
              {!user && (
                <Group mr='xl'>
                  <Button><Link to='/login' style={{color: 'inherit', textDecoration: 'none'}}>Login</Link></Button>
                  <Button variant='outline'><Link to='/signup' style={{color: 'inherit', textDecoration: 'none'}}>Signup</Link></Button>
                </Group>
              )}
            </nav>
        </Group>
    </Header>
  )
}
