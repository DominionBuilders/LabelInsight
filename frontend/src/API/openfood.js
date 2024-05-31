import axios from 'axios';

export default function api_call(EAN){
    axios.get(`https://world.openfoodfacts.net/api/v2/product/${EAN}`)
    .then(
        (data)=>{
            console.log(data);
        }
    )
    .catch((error)=>{
        console.log(error);
    })
}