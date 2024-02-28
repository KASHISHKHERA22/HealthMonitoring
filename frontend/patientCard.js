function populateTimeSlots() {
    var dropdown = document.getElementById('time');
    dropdown.innerHTML = ''; // Clear previous options
    var startTime = 9 * 60; // Start time in minutes (9:00 AM)
    var endTime = 17 * 60; // End time in minutes (5:00 PM)
    var interval = 20; // Interval in minutes

    // Loop to populate time slots
    for (var i = startTime; i < endTime; i += interval) {
        var hours = Math.floor(i / 60);
        var minutes = i % 60;
        var ampm = hours >= 12 ? 'PM' : 'AM';
        // Format hours and minutes with leading zeros if needed
        var formattedHours = ('0' + hours).slice(-2);
        var formattedMinutes = ('0' + minutes).slice(-2);
        // Construct the time string (e.g., "09:00 AM")
        var timeString = formattedHours + ':' + formattedMinutes + ' ' + ampm;
        dropdown.innerHTML += '<option value="' + timeString + '">' + timeString + '</option>';
    }
}

// Call the function to populate time slots when the page loads
populateTimeSlots();