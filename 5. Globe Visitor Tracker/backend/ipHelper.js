//helper file to retrieve geolocation from ip

async function getGeoLocation(ip){
    try{
        const url = `https://ipwho.is/${ip}`;
        const response = await fetch(url);
        if (!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const geoData = await response.json();
        return geoData;
    }
    catch (error){
        console.error("Failed to recieve geolocation data");
        throw error;
    }
}

module.exports = { getGeoLocation };