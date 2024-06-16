import axios from 'axios';

export default function api_call(EAN, setResponse) {
    axios.get(`https://world.openfoodfacts.org/api/v2/product/${EAN}`)
        .then(response => {
            setResponse(response.data.product.product_name)
            console.log(response.data.product.product_name);
        })
        .catch(error => {
            setResponse(error.message);
            console.log(error)
        });
}

