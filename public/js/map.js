mapboxgl.accessToken = mapToken;
    
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: "mapbox://styles/mapbox/streets-v11",
    center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 10 // starting zoom
});

const marker1 = new mapboxgl.Marker({ color: 'red' })
    .setLngLat(listing.geometry.coordinates)   // Listing.geometry.coordinates
    // .setPopup(new mapboxgl.Popup({ offset: 25 }))
    // .setHTML(
    //     `<h4>${listing.title}</h4><p>Exact Location provided after booking!</p>`
    // )
    .addTo(map);


// // This function name matches the 'callback=initMap' parameter in the script tag
// function initMap() {
//     // 1. Define the coordinates. You should replace these with your actual listing coordinates.
//     const listingLocation = { 
//         lat: 28.6139, 
//         lng: 77.2088 
//     }; 
    
//     // 2. Create the map object.
//     const map = new google.maps.Map(document.getElementById("map"), {
//         center: listingLocation, // Center the map on the listing
//         zoom: 8,
//     });
    
//     // NOTE: If you need to geocode the location string (listing.location, listing.country) 
//     // to get the lat/lng, you will need to use the Geocoding Service, which is a more advanced topic.
//     // For simplicity, this assumes 'listingLocation' is already available as lat/lng.
// }

// // Make the function globally accessible for the Google Maps API to call.
// window.initMap = initMap;