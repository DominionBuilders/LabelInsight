import axios from 'axios';
import { useContext } from 'react';
import { ResponseContext } from '../context/ResponseContext';

export default function api_call(EAN){

    const {SetResponse,Response} = useContext(ResponseContext)

    axios.get(`https://world.openfoodfacts.net/api/v2/product/${EAN}`)
    .then(
        (response)=>{
            SetResponse(response.data);
            console.log(Response);
        }
    )
    .catch((error)=>{
        SetResponse(error);
        console.log(Response);
    })
}