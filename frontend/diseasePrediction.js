function hidePrediction() {
    document.getElementById("predictionContainer").style.display = "none";
    document.getElementById("appointmentDetails").style.display = "block";
}

document.addEventListener("DOMContentLoaded", function () {
    var dateInput = document.getElementById('date');
    var today = new Date();
    var dayOfWeek = today.getDay();
    var minDate = formatDate(today);
    var maxDate = new Date(today);
    maxDate.setDate(maxDate.getDate() + 4);
    while (today <= maxDate) {
            var option = document.createElement('option');
            option.value = formatDate(today);
            option.textContent = formatDate(today);
            dateInput.appendChild(option);
        today.setDate(today.getDate() + 1); 
    }

    function formatDate(date) {
        var yyyy = date.getFullYear();
        var mm = String(date.getMonth() + 1).padStart(2, '0');
        var dd = String(date.getDate()).padStart(2, '0');
        return yyyy + '-' + mm + '-' + dd;
    }

    dateInput.setAttribute('min', minDate);
    dateInput.setAttribute('max', formatDate(maxDate));
});