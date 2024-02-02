import { useEffect, useState } from "react";

const Login = ({ setUser }) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSetUsername = (event) => {
        let name = event.target.value;
        console.log(name);
        setUsername(name);
    }

    const handleSetPassword = (event) => {
        let pass = event.target.value;
        console.log(pass);
        setPassword(pass);
    }

    const authenticate_user = async (email: string, password: string) => {
        const response = await fetch("https://nameless-thicket-51908-7757c6d88739.herokuapp.com/api/v1/sign_in", {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                //make sure the auth is for email/password
                "Authorization": `Basic ${btoa(`${email}:${password}`)}`
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        console.log(data);
        setUser(data);
    }

    return(
        <div style={{
            padding: 16,
            width: 200,
        }}>
            <h2>Taxiji</h2>
            <div>
                <input onChange={(event) => handleSetUsername(event)} type="text" placeholder="username" />
                <input onChange={(event) => handleSetPassword(event)} type="password" placeholder="password" />
                <button onClick={() => authenticate_user(username, password)}>Login</button>
            </div>
        </div>
    )
};

export default Login;
