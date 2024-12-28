const axios = require('axios')
const { getCatalog} = require('../utils/API_SERVICE')

async function getCatalogData(){
    try {
        const response = await axios.post(getCatalog());
        console.log("response", response.data)
        return response.data;
    } catch (error) {
        console.error("Error fetching catalog data:", error);
        return null;
    }
 
}



