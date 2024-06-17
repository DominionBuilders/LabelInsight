import React from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import {ResponseProvider} from './context/ResponseProvider'
import { GoogleOAuthProvider } from '@react-oauth/google';
import {OneTap} from './pages/LoginPage';
import { ProfileProvider } from './context/ProfileProvider';

const App = () => {
  return (
    <GoogleOAuthProvider clientId="416656596465-j3ssg9865rhb0kufknqhuo8ou7srfmvt.apps.googleusercontent.com">
    <ProfileProvider>
    <ResponseProvider>
      <div className="App">
        <OneTap/>
        <HomePage/>
      </div>
    </ResponseProvider>
    </ProfileProvider>
    </GoogleOAuthProvider>
  );
};

export default App;