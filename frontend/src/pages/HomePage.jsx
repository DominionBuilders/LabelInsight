import React, { useContext, useState } from 'react';
import SearchBar from '../components/SearchBar';
import Html5QrcodePlugin from '../components/Barcode';
import api_call from '../API/openfood';
import { ResponseContext } from '../context/ResponseContext';

export default function HomePage(R){
    const {Response} = useContext(ResponseContext)
    const [Result,SetResult] = useState("null");
    const onNewScanResult = (decodedText, decodedResult) => {
        SetResult(decodedText);
        api_call(Result);
    };

    return (
        <>
            <h1>Dynamic Search Bar</h1>
            <SearchBar />
            <h1>Barcode Scanner</h1> 
            <Html5QrcodePlugin
            fps={10}
            qrbox={250}
            disableFlip={false}
            qrCodeSuccessCallback={onNewScanResult}
            />
            <p>{Result}</p>
            <p>{Response}</p>
        </>
    );
}