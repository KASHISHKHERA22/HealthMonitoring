from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render, redirect
from django.templatetags.static import static
from django.conf import settings
from authentication.models import authUser
import pandas as pd
import numpy as np
import joblib
from sklearn.preprocessing import LabelEncoder
import os
import json

model_file_path = os.path.join(settings.STATIC_ROOT, 'mlModel/model_h.joblib')
model = joblib.load(model_file_path)
# model = joblib.load(static("mlModel/model_h.joblib"))
le = LabelEncoder()

Disease_list=['Fungal infection', 'Allergy', 'GERD', 'Chronic cholestasis', 'Drug Reaction', 'Peptic ulcer diseae', 'AIDS', 'Diabetes ', 'Gastroenteritis', 'Bronchial Asthma', 'Hypertension ', 'Migraine', 'Cervical spondylosis', 'Paralysis (brain hemorrhage)', 'Jaundice', 'Malaria', 'Chicken pox', 'Dengue', 'Typhoid', 'hepatitis A', 'Hepatitis B', 'Hepatitis C', 'Hepatitis D', 'Hepatitis E', 'Alcoholic hepatitis', 'Tuberculosis', 'Common Cold', 'Pneumonia', 'Dimorphic hemmorhoids(piles)', 'Heart attack', 'Varicose veins', 'Hypothyroidism', 'Hyperthyroidism', 'Hypoglycemia', 'Osteoarthristis', 'Arthritis', '(vertigo) Paroymsal  Positional Vertigo', 'Acne', 'Urinary tract infection', 'Psoriasis', 'Impetigo']
le.fit_transform(Disease_list)

l = ['itching', 'skin_rash', 'nodal_skin_eruptions', 'continuous_sneezing', 'shivering', 'chills','joint_pain', 'stomach_pain', 'acidity', 'ulcers_on_tongue', 'muscle_wasting', 'vomiting','burning_micturition', 'spotting_ urination', 'fatigue', 'weight_gain', 'anxiety','cold_hands_and_feets', 'mood_swings', 'weight_loss', 'restlessness', 'lethargy','patches_in_throat', 'irregular_sugar_level', 'cough', 'high_fever', 'sunken_eyes','breathlessness', 'sweating', 'dehydration', 'indigestion', 'headache', 'yellowish_skin','dark_urine', 'nausea', 'loss_of_appetite', 'pain_behind_the_eyes', 'back_pain','constipation', 'abdominal_pain', 'diarrhoea', 'mild_fever', 'yellow_urine', 'yellowing_of_eyes','acute_liver_failure', 'fluid_overload', 'swelling_of_stomach', 'swelled_lymph_nodes', 'malaise','blurred_and_distorted_vision', 'phlegm', 'throat_irritation', 'redness_of_eyes', 'sinus_pressure','runny_nose', 'congestion', 'chest_pain', 'weakness_in_limbs', 'fast_heart_rate','pain_during_bowel_movements', 'pain_in_anal_region', 'bloody_stool', 'irritation_in_anus','neck_pain', 'dizziness', 'cramps', 'bruising', 'obesity', 'swollen_legs', 'swollen_blood_vessels','puffy_face_and_eyes', 'enlarged_thyroid', 'brittle_nails', 'swollen_extremeties', 'excessive_hunger','extra_marital_contacts', 'drying_and_tingling_lips', 'slurred_speech', 'knee_pain', 'hip_joint_pain','muscle_weakness', 'stiff_neck', 'swelling_joints', 'movement_stiffness', 'spinning_movements','loss_of_balance', 'unsteadiness', 'weakness_of_one_body_side', 'loss_of_smell', 'bladder_discomfort','foul_smell_of urine', 'continuous_feel_of_urine', 'passage_of_gases', 'internal_itching','toxic_look_(typhos)', 'depression', 'irritability', 'muscle_pain', 'altered_sensorium','red_spots_over_body', 'belly_pain', 'abnormal_menstruation', 'dischromic _patches','watering_from_eyes', 'increased_appetite', 'polyuria', 'family_history', 'mucoid_sputum','rusty_sputum', 'lack_of_concentration', 'visual_disturbances', 'receiving_blood_transfusion','receiving_unsterile_injections', 'coma', 'stomach_bleeding', 'distention_of_abdomen','history_of_alcohol_consumption', 'fluid_overload.1', 'blood_in_sputum', 'prominent_veins_on_calf','palpitations', 'painful_walking', 'pus_filled_pimples', 'blackheads', 'scurring', 'skin_peeling','silver_like_dusting', 'small_dents_in_nails', 'inflammatory_nails', 'blister', 'red_sore_around_nose','yellow_crust_ooze']

# Create your views here.

def signIn(request):
    if request.method == 'POST':
        Email = request.POST['username']
        Password = request.POST['password']
        dbUser = authUser.objects.get(email=Email)
        if (dbUser):
            if dbUser.password == Password:
                print("success")
                return redirect('signUp')
            else:
                print("wrong Password")
                return redirect('signIn')
        else:
            print("email not registered")
            return redirect('signIn')
    # if request.method == 'GET':

    #     return HttpResponse(authUser.objects.all())

    return render(request, "authentication/signin.html")


def signUp(request):
    if request.method == 'POST':
        newUser = authUser(fullName=request.POST['username'], email=request.POST['email'],
                           password=request.POST['password'], phone=request.POST['number'], age=request.POST['age'])
        newUser.save()
        return redirect('signIn')
    return render(request, 'authentication/signup.html')


def prediction(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        column_names = data['symptoms']
        l1 = []
        for i in range(0,133-len(column_names)):
            l1.append(0)
        l3 = [1 if name in column_names else 0 for name in l]
        l3=np.array(l3).reshape(1, -1)
        te=model.predict(l3)
        predicted = le.inverse_transform([te[0]])[0]
        print(predicted)
        # return redirect('predictedDisease')
        # return HttpResponseRedirect('predictedDisease')
    return render(request, 'authentication/prediction.html')

def diseasePred(request):
    # disease = request.GET.get('data', None)
    print("hey")
    return render(request, 'authentication/diseasePrediction.html')