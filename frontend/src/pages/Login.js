import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Paper, TextInput, PasswordInput, Button, Title, Stack, Container, Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { useLogin } from '../hooks/useLogin';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [error, setError] = useState('Login failed')
    const { login, isLoading, error } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await login(email, password);
    }

    return (
        <Container maw={420}>
            <Paper shadow='xs' radius='md' maw={420} p='lg'>
                <form className='login' onSubmit={handleSubmit}>
                    <Title order={3} mb='md'>Login</Title>

                    <Stack>
                        <TextInput
                            label='Email' 
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />

                        <PasswordInput 
                            label='Password'
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                        
                        <Button type='submit' disabled={isLoading}>Login</Button>
                    </Stack>
                    {error && <Alert mt='xl' mb='xs' icon={<IconAlertCircle />} className='error' title='Sorry!' color='red'>{error}</Alert>}
                </form>
                <div className='help-text'>Need an account? <Link to='/signup'>Signup here</Link></div>
            </Paper>
        </Container>
    )
}
