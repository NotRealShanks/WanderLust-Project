// --- Mapbox map rendering (commented out — requires a paid/card-linked API token) ---
// mapboxgl.accessToken = mapToken;
//
// const map = new mapboxgl.Map({
//     container: 'map', // container ID
//     style: "mapbox://styles/mapbox/streets-v11",
//     center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
//     zoom: 10 // starting zoom
// });
//
// const marker1 = new mapboxgl.Marker({ color: 'red' })
//     .setLngLat(listing.geometry.coordinates)   // Listing.geometry.coordinates
//     .addTo(map);

// --- Leaflet + OpenStreetMap — free, no API key required ---
// Note: GeoJSON stores coordinates as [lng, lat], but Leaflet expects [lat, lng].
const [lng, lat] = listing.geometry.coordinates;

const map = L.map('map').setView([lat, lng], 10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([lat, lng])
    .addTo(map)
    .bindPopup(`<b>${listing.title}</b><br>Exact location provided after booking!`);