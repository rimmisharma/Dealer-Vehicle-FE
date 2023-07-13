import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
const SigninPage = () => {
    const [registrationFormVisible, setRegistrationFormVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Login button clicked');
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <div>
            <div className="panel">
                {registrationFormVisible ? (
                    <div>
                        <h2>Registration Form</h2>
                        <p>
                            Already registered? <Link to="/signin">Sign in</Link>
                        </p>
                    </div>
                ) : (
                    <div>
                        <h2>Login Form</h2>
                        <form onSubmit={handleLogin}>
                            <div>
                                <label>Email:</label>
                                <input type="email" value={email} onChange={handleEmailChange} />
                            </div>
                            <div>
                                <label>Password:</label>
                                <input type="password" value={password} onChange={handlePasswordChange} />
                            </div>
                            <button type="submit">Login</button>
                        </form>
                        <p>
                            Not registered? <Link to="/register">Sign up</Link>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SigninPage;
