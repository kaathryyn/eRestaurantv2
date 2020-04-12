import React, {useState} from 'react';

function Login() {

    const [count, setcount] = useState(0);

    return (
        <div>
            <h2>Log in to your account</h2>
            <button class="loginButton" onClick={() => setcount(count+1)}>
                Login
            </button>
        </div>
    );
}

export default Login;