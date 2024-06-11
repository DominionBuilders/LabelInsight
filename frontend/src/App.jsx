import React from 'react';
import SearchBar from "./components/SearchBar";
import './App.css';
import Barcode from './components/Barcode';

const App = () => {
  return (
    <div className="App">
      <h1>Dynamic Search Bar</h1>
      {/* <SearchBar /> */}
      <h1>Barcode Scanner</h1> 
      <Barcode/>
    </div>
  );
};

export default App;



