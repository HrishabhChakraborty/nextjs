import React, { useState } from 'react';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginData, setLoginData] = useState(null);  // State to store and display the received email and password

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (data.email && data.password) {
                console.log("Login Success!!");
                setLoginData(data);
            } else {
                console.log(data.error || "Failed to login");
            }
        } catch (error) {
            console.error("There was an error sending the login data:", error);
        }
    }

    const handleChange = (e) => {
      const { name, value } = e.target;

      if (name === 'email') {
        setEmail(value);
      } else if (name === 'password') {
        setPassword(value);
      }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <input onChange={handleChange} type='email' name='email' placeholder='email' value={email} />
                </div>
                <div>
                    <input onChange={handleChange} type='password' name='password' placeholder='password' value={password} />
                </div>
                <div>
                    <button type='submit'>Submit</button>
                </div>
            </form>

            {/* Display the received email and password as JSON */}
            {loginData && (
                <div>
                    <h2>Received Data:</h2>
                    <pre>{JSON.stringify(loginData, null, 2)}</pre>
                </div>
            )}
        </>
    )
}

export default LoginForm;
