import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Paper, TextInput, PasswordInput, Button, Title, Stack, Container, Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { useSignup } from '../hooks/useSignup';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup, error, isLoading } = useSignup();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await signup(email, password);
    }

    return (
        <Container maw={420}>
            <Paper shadow='xs' radius='md' maw={420} p='lg'>
                <form className='signup' onSubmit={handleSubmit}>
                    <Title order={3} mb='md'>Sign up</Title>

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

                        <Button disabled={isLoading} type='submit' loading={isLoading}>Sign up</Button>
                    </Stack>
                    {error && <Alert mt='xl' mb='xs' icon={<IconAlertCircle />} className='error' title='Sorry!' color='red'>{error}</Alert>}
                </form>
                <div className='help-text'>Already have an account? <Link to='/login'>Login here</Link></div>
            </Paper>
        </Container>
    )
}
