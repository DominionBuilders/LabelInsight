import React, { useState } from 'react';
import SearchBar from "./components/SearchBar";
import './App.css';
import Html5QrcodePlugin from './components/Barcode';

const App = () => {
  const [Result,SetResult] = useState("null");
  const onNewScanResult = (decodedText, decodedResult) => {
    SetResult(decodedText);
  };

  return (
    <div className="App">
      <h1>Dynamic Search Bar</h1>
      <SearchBar />
      <h1>Barcode Scanner</h1> 
      {/* <Barcode/> */}
      <Html5QrcodePlugin
      fps={10}
      qrbox={250}
      disableFlip={false}
      qrCodeSuccessCallback={onNewScanResult}
      />
      <p>{Result}</p>
    </div>
  );
};

export default App;



