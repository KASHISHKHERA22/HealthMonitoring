var symptoms = [
    'itching', 'skin_rash', 'nodal_skin_eruptions', 'continuous_sneezing', 'shivering', 'chills',
    'joint_pain', 'stomach_pain', 'acidity', 'ulcers_on_tongue', 'muscle_wasting', 'vomiting',
    'burning_micturition', 'spotting_ urination', 'fatigue', 'weight_gain', 'anxiety',
    'cold_hands_and_feets', 'mood_swings', 'weight_loss', 'restlessness', 'lethargy',
    'patches_in_throat', 'irregular_sugar_level', 'cough', 'high_fever', 'sunken_eyes',
    'breathlessness', 'sweating', 'dehydration', 'indigestion', 'headache', 'yellowish_skin',
    'dark_urine', 'nausea', 'loss_of_appetite', 'pain_behind_the_eyes', 'back_pain',
    'constipation', 'abdominal_pain', 'diarrhoea', 'mild_fever', 'yellow_urine', 'yellowing_of_eyes',
    'acute_liver_failure', 'fluid_overload', 'swelling_of_stomach', 'swelled_lymph_nodes', 'malaise',
    'blurred_and_distorted_vision', 'phlegm', 'throat_irritation', 'redness_of_eyes', 'sinus_pressure',
    'runny_nose', 'congestion', 'chest_pain', 'weakness_in_limbs', 'fast_heart_rate',
    'pain_during_bowel_movements', 'pain_in_anal_region', 'bloody_stool', 'irritation_in_anus',
    'neck_pain', 'dizziness', 'cramps', 'bruising', 'obesity', 'swollen_legs', 'swollen_blood_vessels',
    'puffy_face_and_eyes', 'enlarged_thyroid', 'brittle_nails', 'swollen_extremeties', 'excessive_hunger',
    'extra_marital_contacts', 'drying_and_tingling_lips', 'slurred_speech', 'knee_pain', 'hip_joint_pain',
    'muscle_weakness', 'stiff_neck', 'swelling_joints', 'movement_stiffness', 'spinning_movements',
    'loss_of_balance', 'unsteadiness', 'weakness_of_one_body_side', 'loss_of_smell', 'bladder_discomfort',
    'foul_smell_of urine', 'continuous_feel_of_urine', 'passage_of_gases', 'internal_itching',
    'toxic_look_(typhos)', 'depression', 'irritability', 'muscle_pain', 'altered_sensorium',
    'red_spots_over_body', 'belly_pain', 'abnormal_menstruation', 'dischromic _patches',
    'watering_from_eyes', 'increased_appetite', 'polyuria', 'family_history', 'mucoid_sputum',
    'rusty_sputum', 'lack_of_concentration', 'visual_disturbances', 'receiving_blood_transfusion',
    'receiving_unsterile_injections', 'coma', 'stomach_bleeding', 'distention_of_abdomen',
    'history_of_alcohol_consumption', 'fluid_overload.1', 'blood_in_sputum', 'prominent_veins_on_calf',
    'palpitations', 'painful_walking', 'pus_filled_pimples', 'blackheads', 'scurring', 'skin_peeling',
    'silver_like_dusting', 'small_dents_in_nails', 'inflammatory_nails', 'blister', 'red_sore_around_nose',
    'yellow_crust_ooze'
];

var symptomCount = 1;

function populateDropdown() {
    var dropdown = document.getElementById("symptomsDropdown");
    for (var i = 0; i < symptoms.length; i++) {
        var option = document.createElement("option");
        option.text = symptoms[i];
        option.value = symptoms[i];
        dropdown.add(option);
    }
}

function addSymptom() {
    var dropdown = document.getElementById("symptomsDropdown");
    var selectedSymptom = dropdown.value;
    if (selectedSymptom !== "") {
        var selectedSymptomsForm = document.getElementById("selectedSymptoms");
        var selectedSymptoms = selectedSymptomsForm.getElementsByClassName("selectedSymptom");
        if (selectedSymptoms.length < 5) {
            var optionText = dropdown.options[dropdown.selectedIndex].text;
            var uniqueId = "symptom_" + symptomCount++;
            var symptomInput = document.createElement("input");
            symptomInput.type = "text";
            symptomInput.name = "selectedSymptom_" + uniqueId;
            symptomInput.id = "selectedSymptom_" + uniqueId;
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
                removeSymptom(uniqueId, dropdown);
            };
            symptomElement.appendChild(deleteButton);
            selectedSymptomsForm.insertBefore(symptomElement, selectedSymptomsForm.children[0]);
            dropdown.remove(dropdown.selectedIndex);
        } else {
            alert("You have already selected Five symptoms.");
        }
    } else {
        alert("Please select a symptom from the dropdown.");
    }
}

function removeSymptom(symptomId, dropdown) {
    var selectedSymptom = document.getElementById("selectedSymptom_" + symptomId);
    var selectedSymptomsDiv = document.getElementById("selectedSymptoms");
    var optionText = selectedSymptom.value;
    selectedSymptomsDiv.removeChild(selectedSymptom.parentNode); 
    var option = document.createElement("option");
    option.text = optionText;
    option.value = optionText;
    dropdown.add(option);
}

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Extract CSRF token from cookie
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

populateDropdown();