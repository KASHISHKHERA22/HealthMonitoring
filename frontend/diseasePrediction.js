var symptoms = [
    'itching', 'skin_rash', 'nodal_skin_eruptions', 'continuous_sneezing', 'shivering', 'chills'
];

// Function to populate the dropdown with symptoms
function populateDropdown() {
    var dropdown = document.getElementById("symptomsDropdown");
    for (var i = 0; i < symptoms.length; i++) {
        var option = document.createElement("option");
        option.text = symptoms[i].replace(/_/g, " ");
        option.value = symptoms[i];
        dropdown.add(option);
    }
}

// Function to add symptom to the selected list
function addSymptom() {
    var dropdown = document.getElementById("symptomsDropdown");
    var selectedSymptom = dropdown.value;
    if (selectedSymptom !== "") {
        var selectedSymptomsDiv = document.getElementById("selectedSymptoms");
        var selectedSymptoms = selectedSymptomsDiv.getElementsByClassName("selectedSymptom");
        if (selectedSymptoms.length < 1) {
            var optionText = dropdown.options[dropdown.selectedIndex].text;
            var symptomElement = document.createElement("div");
            symptomElement.classList.add("selectedSymptom");
            symptomElement.textContent = optionText;
            var deleteButton = document.createElement("span");
            symptomElement.appendChild(deleteButton);
            selectedSymptomsDiv.appendChild(symptomElement);
        } else {
            alert("You have already selected Doctor ");
        }
    } else {
        alert("You have already selected Doctor ");
    }
}

// Function to remove symptom from the selected list


// Call the function to populate the dropdown when the page loads
populateDropdown();
