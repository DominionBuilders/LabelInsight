import axios from 'axios';

export default function api_call(EAN, setResponse) {
    axios.get(`https://world.openfoodfacts.net/api/v2/product/${EAN}`)
        .then(response => {
            setResponse(response.data.product.popularity_tags.product_name);
        })
        .catch(error => {
            setResponse(error.message);
        });
}
