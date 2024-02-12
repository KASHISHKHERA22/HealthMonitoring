// Define an array to store available symptoms
let availableSymptoms = [
    'itching', 'skin_rash', 'nodal_skin_eruptions', 'continuous_sneezing', 'shivering', 'chills', 'joint_pain', 'stomach_pain', 'acidity', 'ulcers_on_tongue',
    'muscle_wasting', 'vomiting', 'burning_micturition', 'spotting_urination', 'fatigue', 'weight_gain', 'anxiety', 'cold_hands_and_feets', 'mood_swings',
    'weight_loss', 'restlessness', 'lethargy', 'patches_in_throat', 'irregular_sugar_level', 'cough', 'high_fever', 'sunken_eyes', 'breathlessness', 'sweating',
    'dehydration', 'indigestion', 'headache', 'yellowish_skin', 'dark_urine', 'nausea', 'loss_of_appetite', 'pain_behind_the_eyes', 'back_pain', 'constipation',
    'abdominal_pain', 'diarrhoea', 'mild_fever', 'yellow_urine', 'yellowing_of_eyes', 'acute_liver_failure', 'fluid_overload', 'swelling_of_stomach',
    'swelled_lymph_nodes', 'malaise', 'blurred_and_distorted_vision', 'phlegm', 'throat_irritation', 'redness_of_eyes', 'sinus_pressure', 'runny_nose',
    'congestion', 'chest_pain', 'weakness_in_limbs', 'fast_heart_rate', 'pain_during_bowel_movements', 'pain_in_anal_region', 'bloody_stool', 'irritation_in_anus',
    'neck_pain', 'dizziness', 'cramps', 'bruising', 'obesity', 'swollen_legs', 'swollen_blood_vessels', 'puffy_face_and_eyes', 'enlarged_thyroid',
    'brittle_nails', 'swollen_extremeties', 'excessive_hunger', 'extra_marital_contacts', 'drying_and_tingling_lips', 'slurred_speech', 'knee_pain', 'hip_joint_pain',
    'muscle_weakness', 'stiff_neck', 'swelling_joints', 'movement_stiffness', 'spinning_movements', 'loss_of_balance', 'unsteadiness', 'weakness_of_one_body_side',
    'loss_of_smell', 'bladder_discomfort', 'foul_smell_of_urine', 'continuous_feel_of_urine', 'passage_of_gases', 'internal_itching', 'toxic_look_(typhos)',
    'depression', 'irritability', 'muscle_pain', 'altered_sensorium', 'red_spots_over_body', 'belly_pain', 'abnormal_menstruation', 'dischromic_patches',
    'watering_from_eyes', 'increased_appetite', 'polyuria', 'family_history', 'mucoid_sputum', 'rusty_sputum', 'lack_of_concentration', 'visual_disturbances',
    'receiving_blood_transfusion', 'receiving_unsterile_injections', 'coma', 'stomach_bleeding', 'distention_of_abdomen', 'history_of_alcohol_consumption',
    'fluid_overload.1', 'blood_in_sputum', 'prominent_veins_on_calf', 'palpitations', 'painful_walking', 'pus_filled_pimples', 'blackheads', 'scurring',
    'skin_peeling', 'silver_like_dusting', 'small_dents_in_nails', 'inflammatory_nails', 'blister', 'red_sore_around_nose', 'yellow_crust_ooze'
];

let selectedSymptomsCount = 0;

// Function to populate the dropdown menu with available symptoms
function populateDropdown() {
    const select = document.getElementById('symptomSelect');
    select.innerHTML = '<option value="">Select Symptom</option>';
    availableSymptoms.forEach(symptom => {
        select.innerHTML += `<option value="${symptom}">${symptom}</option>`;
    });
}

// Function to add symptom to the selected symptoms list
function addSymptom() {
    const select = document.getElementById('symptomSelect');
    const symptom = select.value;

    if (symptom && selectedSymptomsCount < 4) {
        const selectedSymptomsList = document.getElementById('selectedSymptomsList');
        const listItem = document.createElement('li');
        listItem.textContent = symptom;
        selectedSymptomsList.appendChild(listItem);
        listItem.classList.add('selected');
        selectedSymptomsCount++;

        // Remove selected symptom from availableSymptoms array
        const index = availableSymptoms.indexOf(symptom);
        if (index !== -1) {
            availableSymptoms.splice(index, 1);
        }

        // Remove selected symptom from dropdown menu
        select.remove(select.selectedIndex);

        // Disable dropdown menu if 4 symptoms are selected
        if (selectedSymptomsCount === 4) {
            select.disabled = true;
        }
    } else if (selectedSymptomsCount >= 4) {
        alert('You can only select up to 4 symptoms.');
    } else {
        alert('Please select a symptom.');
    }
}

// Function to delete selected symptom from the list
function deleteSymptom() {
    const selectedSymptomsList = document.getElementById('selectedSymptomsList');
    const selectedItem = selectedSymptomsList.querySelector('li.selected');

    if (selectedItem) {
        const symptom = selectedItem.textContent;
        availableSymptoms.push(symptom);
        availableSymptoms.sort(); // Sort to maintain consistency
        populateDropdown(); // Repopulate dropdown menu
        selectedItem.remove();
        selectedSymptomsCount--;

        // Enable dropdown menu if less than 4 symptoms are selected
        const select = document.getElementById('symptomSelect');
        if (selectedSymptomsCount < 4) {
            select.disabled = false;
        }
    }
}

// Function to predict disease based on selected symptoms
function predictDisease() {
    const selectedSymptomsList = document.getElementById('selectedSymptomsList');
    const selectedSymptoms = Array.from(selectedSymptomsList.querySelectorAll('li')).map(item => item.textContent);

    // Placeholder for disease prediction result
    const predictionResult = document.getElementById('predictionResult');
    predictionResult.textContent = 'Predicted Disease: [Placeholder]'; // Replace [Placeholder] with actual prediction result

    // Here you can implement your disease prediction logic
    // For demonstration purposes, let's just log the selected symptoms
    console.log('Selected Symptoms:', selectedSymptoms);
}

// Call populateDropdown() when the page loads
window.onload = populateDropdown;

