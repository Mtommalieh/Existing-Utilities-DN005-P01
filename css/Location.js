// script.js

if (navigator.geolocation) {
    navigator.geolocation.watchPosition(updateLocation, showError);
} else {
    alert("Geolocation is not supported by this browser.");
}

// Initialize the map with a default location
const map = L.map('map').setView([51.505, -0.09], 13); // Default to coordinates (51.505, -0.09) for London

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19
}).addTo(map);

const marker = L.marker([51.505, -0.09]).addTo(map); // Place a marker at the initial position

// This function is called when the geolocation position is updated
function updateLocation(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Update the map's view and the marker position
    marker.setLatLng([latitude, longitude]);
    map.setView([latitude, longitude]);

    // Update the blue toggle position
    updateToggleOnMap(latitude, longitude);
}

// This function updates the position of the blue toggle
function updateToggleOnMap(lat, lng) {
    const toggle = document.getElementById('location-toggle');
    toggle.style.top = `${map.latLngToContainerPoint([lat, lng]).y}px`;
    toggle.style.left = `${map.latLngToContainerPoint([lat, lng]).x}px`;
}

// Error handling function for geolocation
function showError(error) {
    console.error("Error retrieving location: ", error.message);
}
