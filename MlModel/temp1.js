function calculateDistance(lat1, lon1, lat2, lon2) {
    // Radius of the earth in kilometers
    var R = 6371;

    // Convert latitude and longitude from degrees to radians
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLon = (lon2 - lon1) * Math.PI / 180;

    // Calculate the distance using the Haversine formula
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var distance = R * c; // Distance in kilometers

    return distance;
}

// Example usage:
var distance = calculateDistance(77.3715735,28.515615500000003, 77.335896,28.579491);
console.log(distance.toFixed(2) + " km"); // Output the distance rounded to 2 decimal places
