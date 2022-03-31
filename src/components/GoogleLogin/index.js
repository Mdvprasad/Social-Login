import React from 'react'
import ReactGoogleLogin from 'react-google-login';

function GoogleLogin() {
    const client_id = process.env.REACT_APP_GOOGLE_CLIENT_ID;

    const responseGoogle = (response) => {
        console.log(response);
    }
    return (
        <>
            <ReactGoogleLogin
                clientId={client_id}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
        </>
    )
}

export default GoogleLogin