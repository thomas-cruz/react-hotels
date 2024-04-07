import properties from '../properties.json';

async function getHotels() {
    try {
        // return JSON.parse(properties);
        return properties;
    } catch (error) {
        console.log(error);
    }
    
}

export default getHotels;