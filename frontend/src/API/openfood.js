import axios from 'axios';

export default function api_call(EAN, setResponse) {
    axios.get(`https://world.openfoodfacts.net/api/v2/product/${EAN}`)
        .then(response => {
            setResponse(response.data);
        })
        .catch(error => {
            setResponse(error.message);
        });
}
