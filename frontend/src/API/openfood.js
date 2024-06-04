import axios from 'axios';

function api_call(EAN){
    axios.get(`https://world.openfoodfacts.net/api/v2/product/${EAN}`)
    .then(
        (response)=>{
            console.log(response.data);
        }
    )
    .catch((error)=>{
        console.log(error);
    })
}

api_call(8906032016571);