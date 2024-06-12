import React, { useState } from 'react';
import './App.css';
import HomePage from './pages/HomePage';
import {ResponseProvider} from './context/ResponseProvider'

const App = () => {
  

  return (
    <ResponseProvider>
      <div className="App">
        <HomePage/>
      </div>
    </ResponseProvider>
  );
};

export default App;



