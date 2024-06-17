import React, { useEffect, useContext } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { ProfileContext } from "../context/ProfileContext";
import GoogleOneTapLogin from 'react-google-one-tap-login';
import axios from 'axios';

export function LoginPage() {
    
    const {setProfile,profile,user,setUser} = useContext(ProfileContext);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);
                    })
                    .catch((err) => console.log(err));
            }
        },
        [ user ]
    );

    const logOut = () => {
        googleLogout();
        setProfile(null);
    };

    return (
        <div>
            <h2>React Google Login</h2>
            <br />
            <br />
            {profile ? (
                <div>
                    <img src={profile.picture} alt="user image" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <button onClick={logOut}>Log out</button>
                </div>
            ) : (
                <button onClick={login}>Sign in with Google 🚀 </button>
            )}
        </div>
    );
}


export function OneTap(){

    const {setProfile,profile} = useContext(ProfileContext);

    const logOut = () => {
        googleLogout();
        setProfile(null);
    };

    return(
        <>
        {!profile&&
        <GoogleOneTapLogin 
            onError={(error) => console.log(error)}
            onSuccess={(response) => setProfile(response)}
            googleAccountConfigs={{ client_id: "416656596465-j3ssg9865rhb0kufknqhuo8ou7srfmvt.apps.googleusercontent.com"}}
        />}
        {profile && (
            <>
            <p> name: {profile.name}</p>
            <button onClick={logOut}>Logout</button>
            </>
            )}
        </>
    );

}
