Social Login mainly GOOGLE, DISCORD using reactjs
First of all, let's get Client/App credentials
To use services from Google and Discord, we need to get the respective client id from each.
GOOGLE LOGIN
GET CLIENT CREDENTIALS
Go to https://console.developers.google.com/.
Create an app, with basic info.
After creating the app select it and go to the 'credentials' page from the sidebar.
In the OAuth 2.0 Client IDs, section. create a client ID.
Make sure to add http://localhost:3000 (or whatever you're working with) to authorised origins.
Once you're done, note down the Client ID.
Here's a link to the detailed guide from google.
 
 
Now create your react app or just modify the code as per below instructions
Step 1: The Google Login
Install the popular package react-google-login by pasting the below in the terminal.
npm i react-google-login
Now in GoogleLogin.jsx put the following content.

Make sure to import the GoogleLogin  in the App.js file.




 
Discord Login
Steps To Generate Discord Client ID
Navigate to Discord Developer Console
Click New Application buttonSpecify the name of your application. Ideally, it should be the name of your website/business at which you will integrate the Discord login
Click Create button
Save the following details
App Icon: (Optional) Upload an icon representing your website/business
Description: Description of the website where you are implementing Discord login
Interactions Endpoint URL: Leave empty
Terms of Service URL: URL stating terms of service of your website
Privacy Policy URL: URL stating privacy policy of your website
These details will be shown to the users using Discord login at your website
Navigate to Oauth2 section from the left sidebar
Click Add Redirect button in the Redirects section
If you are using Social Login plugin, add the URL https://website.com/SocialLoginAuth/Discord
If you are not using any plugin, add the URL https://website.com/Auth/Discord
where https://website.com is the URL of your website.
Save changes after adding the URL
Copy Client ID and Client Secret from Oauth2 section and paste in the corresponding options at the social login configuration page.
Now coming to React part
Create DiscordLogin file and try to call the apis as per the Discord documentation to get the token

Declare variables and pass the values of client information
   
    const CLIENT_ID = process.env.REACT_APP_DISCORD_CLIENT_ID;
    const CLIENT_SECRET = process.env.REACT_APP_DISCORD_CLIENT_SECRET;
    const REDIRECT_URL = process.env.REACT_APP_DISCORD_REDIRECT_URL;
    const AUTHORIZATION_URL = `https://discord.com/api/oauth2/authorize?response_type=code&client_id=${CLIENT_ID}&scope=identify&prompt=consent`;
 

After passing this we will get the response of code and thereafter exchanging the code we will get the access token which is must needed to get the user details
   
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
 


Follow instructions for remaining things as per Discord documentation by clicking below link
https://discord.com/developers/docs/topics/oauth2

Finally you can enable discord login either by using link or button click by redirecting user to above mentioned AUTHORIZATION URL
