
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
        var selectedSymptomsForm = document.getElementById("selectedSymptoms");
        var selectedSymptoms = selectedSymptomsForm.getElementsByClassName("selectedSymptom");
        if (selectedSymptoms.length < 1) {
            var optionText = dropdown.options[dropdown.selectedIndex].text;
            var uniqueId = "symptom_" + symptomCount++; // Incrementing unique ID for the symptom
            var symptomInput = document.createElement("input");
            symptomInput.type = "text";
            symptomInput.name = "selectedSymptom_" + uniqueId; // Unique name for the symptom
            symptomInput.value = selectedSymptom;
            symptomInput.readOnly = true;
            symptomInput.classList.add("plain-text");
            var symptomElement = document.createElement("div");
            symptomElement.classList.add("selectedSymptom");
            symptomElement.appendChild(symptomInput);
            var deleteButton = document.createElement("span");
            deleteButton.textContent = "x";
            deleteButton.classList.add("deleteButton");
            deleteButton.onclick = function () {
                removeSymptom(symptomElement, dropdown);
            };
            symptomElement.appendChild(deleteButton);
            // selectedSymptomsForm.appendChild(symptomElement);
            selectedSymptomsForm.insertBefore(symptomElement, selectedSymptomsForm.children[0]);
            // Remove the selected option from the dropdown
            dropdown.remove(dropdown.selectedIndex);
        } else {
            alert("You have already selected Five symptoms.");
        }
    } else {
        alert("Please select a symptom from the dropdown.");
    }
}

// Function to remove symptom from the selected list


// Call the function to populate the dropdown when the page loads
populateDropdown();

var today = new Date();

for (var i = 0; i < 5; i++) {
    var date = new Date(today);
    date.setDate(today.getDate() + i);

    var option = document.createElement('option');
    option.value = formatDate(date);
    option.text = formatDate(date);
    document.getElementById('dateDropdown').appendChild(option);
}

function formatDate(date) {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    return year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;
}
