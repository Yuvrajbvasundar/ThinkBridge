import React, { useState } from 'react';

const Login = ({onLogin}) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginData =  email ;
        console.log(email)
        try {
            const response = await fetch('http://localhost:5055/api/Employee/Login', { 
                method: 'POST',
                headers: {
                   'Content-Type': 'application/json'
                },
                body:JSON.stringify(loginData)
            });

            if (response.ok) {
                const data = await response.json();
                if (data) {
                    onLogin(data)
                   console.log("sucessfull login")
                } else {
                    setError('Invalid login credentials.');
                }
            } else {
                setError('Login failed.');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred during login.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
