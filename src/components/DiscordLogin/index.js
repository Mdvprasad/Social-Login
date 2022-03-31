import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DiscordLogin = (props) => {
    const [userDetails, setUserDetails] = useState(null);
    const [token, setToken] = useState(null);

    const CLIENT_ID = process.env.REACT_APP_DISCORD_CLIENT_ID;
    const CLIENT_SECRET = process.env.REACT_APP_DISCORD_CLIENT_SECRET;
    const REDIRECT_URL = process.env.REACT_APP_DISCORD_REDIRECT_URL;
    const AUTHORIZATION_URL = `https://discord.com/api/oauth2/authorize?response_type=code&client_id=${CLIENT_ID}&scope=identify&prompt=consent`;
    const getUserInfo = async (accessToken) => {
        try {
            const response = await axios.get('https://discord.com/api/users/@me', {
                headers: {
                    authorization: `${accessToken.data.token_type} ${accessToken.data.access_token}`
                }
            });
            setUserDetails(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    const getToken = async (code) => {
        try {
            const options = new URLSearchParams({
                'client_id': CLIENT_ID,
                'client_secret': CLIENT_SECRET,
                'grant_type': 'authorization_code',
                'code': code,
                'redirect_uri': REDIRECT_URL,
                scope: 'identify guilds',
            });
            const result = await axios.post('https://discord.com/api/oauth2/token', options,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                },

            );
            setToken(result.data.access_token);
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    const getInfo = async (code) => {
        const accessToken = token == null ? await getToken(code) : token;
        const userInfo = await getUserInfo(accessToken);
    }
    useEffect(() => {

        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
        if (!params.code) return;
        getInfo(params.code);
    });
    return (
        <div className="Auth">
            <br />
            <button onClick={() => { window.location = AUTHORIZATION_URL }}>{userDetails != null ? userDetails.username : 'Login with discord'}</button>
        </div>
    )
}

export default DiscordLogin;