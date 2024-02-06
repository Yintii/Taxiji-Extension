import { useState } from "react";

const Login = () => {


    const url = "https://nameless-thicket-51908-7757c6d88739.herokuapp.com/";


    return(
        <div style={{
            padding: 16,
            width: 200,
        }}>
            <h2>Taxiji</h2>
            <a href={url + "users/sign_in"} target="_blank">Log in</a>

        </div>
    )
};

export default Login;
