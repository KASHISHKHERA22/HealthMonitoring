// Get user's current location using Geolocation API
navigator.geolocation.getCurrentPosition(function(position) {
    var userLocation = [position.coords.longitude, position.coords.latitude];
    
    // Define Mapbox access token and initialize map
    mapboxgl.accessToken = 'pk.eyJ1IjoibHNoaXZha3VtYXJsIiwiYSI6ImNsdGJjc2l1NDFodnAyanFyOTl1ejE3MHUifQ.PTBdj-rym4qo8Jp_HYLTAA';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: userLocation,
        zoom: 14
    });

    // Use Mapbox Places plugin to search for nearby hospitals
    var placesClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
    placesClient.search({
        query: 'hospital',
        proximity: userLocation,
        limit: 10 // Limit the number of results if needed
    })
    .send()
    .then(function(response) {
        // Extract coordinates of nearby hospitals from the response
        var hospitals = response.body.features;
        console.log(hospitals);
        hospitals.forEach(function(hospital) {
            // Extract coordinates
            var hospitalCoords = hospital.geometry.coordinates;
            
            // Create a marker for each hospital and add it to the map
            new mapboxgl.Marker()
                .setLngLat(hospitalCoords)
                .addTo(map);
        });
    });
});
