import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(email, password);
    }

    return (
        <>
            <form className='signup' onSubmit={handleSubmit}>
                <h3>Sign up</h3>

                <label>Email</label>
                <input 
                    type='email'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />

                <label>Password</label>
                <input 
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />

                <button>Sign up</button>
            </form>
            <div class='help-text'>Already have an account? <Link to='/login'>Login here</Link></div>
        </>
    )
}
