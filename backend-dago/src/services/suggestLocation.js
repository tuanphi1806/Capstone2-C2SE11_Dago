const axios = require('axios');

async function searchPlaces(keyword) {
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
            q: `${keyword}, Da Nang, Viet Nam`,
            format: 'jsonv2',
            addressdetails: 1,
            limit: 8,
            countrycodes: 'vn'
        },
        headers: {
            'User-Agent': 'bus-app-node/1.0'
        },
        timeout: 10000
    });

    return (response.data || []).map((item) => ({
        display_name: item.display_name,
        lat: Number(item.lat),
        lng: Number(item.lon)
    }));
}

module.exports = {
    searchPlaces
};