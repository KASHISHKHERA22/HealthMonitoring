from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render, redirect
from django.conf import settings
from django.contrib import messages
from authentication.models import authUser, appointments, doctorList
import numpy as np
import joblib
from sklearn.preprocessing import LabelEncoder
import os
import json
import pandas as pd
import ast
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import wikipedia


model_file_path = os.path.join(settings.STATIC_ROOT, 'mlModel/model_h.joblib')
model = joblib.load(model_file_path)
le = LabelEncoder()

Disease_list = ['Fungal infection', 'Allergy', 'GERD', 'Chronic cholestasis', 'Drug Reaction', 'Peptic ulcer diseae', 'AIDS', 'Diabetes ', 'Gastroenteritis', 'Bronchial Asthma', 'Hypertension ', 'Migraine', 'Cervical spondylosis',
                'Paralysis (brain hemorrhage)', 'Jaundice', 'Malaria', 'Chicken pox', 'Dengue', 'Typhoid', 'hepatitis A', 'Hepatitis B', 'Hepatitis C', 'Hepatitis D', 'Hepatitis E', 'Alcoholic hepatitis', 'Tuberculosis', 'Common Cold', 'Pneumonia', 'Dimorphic hemmorhoids(piles)', 'Heart attack', 'Varicose veins', 'Hypothyroidism', 'Hyperthyroidism', 'Hypoglycemia', 'Osteoarthristis', 'Arthritis', '(vertigo) Paroymsal  Positional Vertigo', 'Acne', 'Urinary tract infection', 'Psoriasis', 'Impetigo']
le.fit_transform(Disease_list)

l = ['itching', 'skin_rash', 'nodal_skin_eruptions', 'continuous_sneezing', 'shivering', 'chills', 'joint_pain', 'stomach_pain', 'acidity', 'ulcers_on_tongue', 'muscle_wasting', 'vomiting', 'burning_micturition', 'spotting_ urination', 'fatigue', 'weight_gain', 'anxiety', 'cold_hands_and_feets', 'mood_swings', 'weight_loss', 'restlessness', 'lethargy', 'patches_in_throat', 'irregular_sugar_level', 'cough', 'high_fever', 'sunken_eyes', 'breathlessness', 'sweating', 'dehydration', 'indigestion', 'headache', 'yellowish_skin', 'dark_urine', 'nausea', 'loss_of_appetite', 'pain_behind_the_eyes', 'back_pain', 'constipation', 'abdominal_pain', 'diarrhoea', 'mild_fever', 'yellow_urine', 'yellowing_of_eyes', 'acute_liver_failure', 'fluid_overload', 'swelling_of_stomach', 'swelled_lymph_nodes', 'malaise', 'blurred_and_distorted_vision', 'phlegm', 'throat_irritation', 'redness_of_eyes', 'sinus_pressure', 'runny_nose', 'congestion', 'chest_pain', 'weakness_in_limbs', 'fast_heart_rate', 'pain_during_bowel_movements', 'pain_in_anal_region', 'bloody_stool', 'irritation_in_anus', 'neck_pain', 'dizziness', 'cramps', 'bruising', 'obesity', 'swollen_legs', 'swollen_blood_vessels', 'puffy_face_and_eyes', 'enlarged_thyroid',
     'brittle_nails', 'swollen_extremeties', 'excessive_hunger', 'extra_marital_contacts', 'drying_and_tingling_lips', 'slurred_speech', 'knee_pain', 'hip_joint_pain', 'muscle_weakness', 'stiff_neck', 'swelling_joints', 'movement_stiffness', 'spinning_movements', 'loss_of_balance', 'unsteadiness', 'weakness_of_one_body_side', 'loss_of_smell', 'bladder_discomfort', 'foul_smell_of urine', 'continuous_feel_of_urine', 'passage_of_gases', 'internal_itching', 'toxic_look_(typhos)', 'depression', 'irritability', 'muscle_pain', 'altered_sensorium', 'red_spots_over_body', 'belly_pain', 'abnormal_menstruation', 'dischromic _patches', 'watering_from_eyes', 'increased_appetite', 'polyuria', 'family_history', 'mucoid_sputum', 'rusty_sputum', 'lack_of_concentration', 'visual_disturbances', 'receiving_blood_transfusion', 'receiving_unsterile_injections', 'coma', 'stomach_bleeding', 'distention_of_abdomen', 'history_of_alcohol_consumption', 'fluid_overload.1', 'blood_in_sputum', 'prominent_veins_on_calf', 'palpitations', 'painful_walking', 'pus_filled_pimples', 'blackheads', 'scurring', 'skin_peeling', 'silver_like_dusting', 'small_dents_in_nails', 'inflammatory_nails', 'blister', 'red_sore_around_nose', 'yellow_crust_ooze']
sender_email = 'nishanttomar6999@gmail.com'
password = 'muey rmsm qpru jxxu'
# Create your views here.


def home(request):
    return render(request, "authentication/homePage.html")


def signIn(request):
    if request.COOKIES.get('loggedIn'):
        return redirect('prediction')
    else:
        if request.method == 'POST':
            Email = request.POST['username']
            Password = request.POST['password']
            dbUser = authUser.objects.get(email=Email)
            if (dbUser):
                if dbUser.password == Password:
                    response = HttpResponseRedirect('prediction')
                    response.set_cookie('username', Email, max_age=86400)
                    response.set_cookie('loggedIn', True, max_age=86400)
                    return response
                else:
                    print("wrong Password")
                    return redirect('signIn')
            else:
                print("email not registered")
                return redirect('signIn')
        return render(request, "authentication/signin.html")


def signUp(request):
    if request.method == 'POST':
        try:
            dbUser = authUser.objects.get(email=request.POST.get('email'))
            if dbUser:
                messages.error(request, 'User with this email already exists.')
                return redirect('signUp')
        except authUser.DoesNotExist:
            newUser = authUser(fullName=request.POST['username'], email=request.POST['email'], password=request.POST['password'],
                               phone=request.POST['number'], age=request.POST['age'], gender=request.POST['gender'], role=request.POST['role'])
            newUser.save()
            subject = 'Welcome to Smart Health Monitoring System!'
            html_message = f'''
                <h1>Welcome {request.POST['username']} to Our Platform!</h1>
                <p>Dear User,</p>
                <p>Thank you for creating an account with us. We are thrilled to have you on board!</p>
                <p>As part of our commitment to helping you stay healthy, here are some tips:</p>
                <ul>
                    <li>Stay hydrated by drinking plenty of water throughout the day.</li>
                    <li>Eat a balanced diet rich in fruits, vegetables, and whole grains.</li>
                    <li>Get regular exercise to keep your body and mind in good shape.</li>
                    <li>Remember to take breaks and relax to reduce stress levels.</li>
                </ul>
                <p>We are constantly working to improve our system to provide you with the best experience possible.</p>
                <p>Thank you for choosing us!</p>
                <p>Best regards,<br>SHMS</p>
            '''
            messages.success(request, 'You have successfully signed up!')
            msg = MIMEMultipart()
            msg['From'] = sender_email
            msg['To'] = request.POST['email']
            msg['Subject'] = subject
            msg.attach(MIMEText(html_message, 'html'))
            server = smtplib.SMTP('smtp.gmail.com', 587)
            server.starttls()
            server.login(sender_email, password)
            server.sendmail(
                sender_email, request.POST['email'], msg.as_string())
            server.quit()
            return redirect('signIn')
    return render(request, 'authentication/signup.html')


def logOut(request):
    response = HttpResponseRedirect('signIn')
    response.delete_cookie('username')
    response.delete_cookie('loggedIn')
    return response


def prediction(request):
    if request.COOKIES.get('loggedIn'):
        if request.method == 'POST':
            column_names = []
            i = 1
            while True:
                key = f"selectedSymptom_symptom_{i}"
                if key in request.POST:
                    column_names.append(request.POST[key])
                    i += 1
                else:
                    break
            if len(column_names) == 0:
                return redirect(prediction)
            l1 = []
            for i in range(0, 133-len(column_names)):
                l1.append(0)
            l3 = [1 if name in column_names else 0 for name in l]
            l3 = np.array(l3).reshape(1, -1)
            te = model.predict(l3)
            predicted = le.inverse_transform([te[0]])[0]
            if request.session.get('predicted_disease'):
                del request.session['predicted_disease']
            request.session['predicted_disease'] = predicted
            messages.success(request, f"The predicted disease is: {predicted}")
            print(predicted)
            return redirect('predictedDisease')
        user = authUser.objects.get(email=request.COOKIES.get('username'))
        return render(request, 'authentication/prediction.html', {'user': user})
    else:
        return redirect('signIn')


def diseasePred(request):
    if request.COOKIES.get('loggedIn'):
        if request.method == 'POST':
            request.session['doctorName'] = request.POST['doctor']
            request.session['hospital'] = request.POST['hospital']
            request.session['selectedDate'] = request.POST['date']
            return redirect('appointment')
        predicted_disease = request.session.get('predicted_disease')
        if not predicted_disease:
            return redirect('prediction')
        else:
            page = wikipedia.summary(predicted_disease, sentences=4)
            del request.session['predicted_disease']
        doctors = doctorList.objects.filter(disease=predicted_disease)
        doctors = json.dumps(list(doctors.values()))
        user = authUser.objects.get(email=request.COOKIES.get('username'))
        return render(request, 'authentication/diseasePrediction.html', {'predicted': predicted_disease, 'user': user, 'doctors': doctors, 'page': page})
    else:
        return redirect('signIn')


def appointment(request):
    if request.COOKIES.get('loggedIn'):
        doctorName = request.session.get('doctorName')
        hospitalName = request.session.get('hospital')
        selectedDate = request.session.get('selectedDate')
        if request.method == 'POST':
            if not doctorName or not selectedDate:
                return redirect('predictedDisease')
            else:
                del request.session['doctorName']
                del request.session['hospital']
                del request.session['selectedDate']
            newAppointment = appointments(date=selectedDate, time=request.POST['time'], email=request.COOKIES.get(
                'username'), hospital=hospitalName , bookedFor=doctorName)
            newAppointment.save()
            return redirect('bookedAppointment')
        if not doctorName or not selectedDate or not hospitalName:
            return redirect('predictedDisease')
        timeslots = appointments.objects.filter(
            bookedFor=doctorName, date=selectedDate)
        timeslots_list = []
        for slot in timeslots:
            timeslots_list.append({
                'date': slot.date.strftime('%Y-%m-%d'),
                'time': slot.time.strftime('%H:%M'),
                'email': slot.email,
                'bookedfor': slot.bookedFor
            })
        timeslots = json.dumps(timeslots_list)
        user = authUser.objects.get(email=request.COOKIES.get('username'))
        return render(request, 'authentication/appointment.html', {'timeslots': timeslots, 'user': user})
    else:
        return redirect(signIn)


def bookedAppointment(request):
    if request.COOKIES.get('loggedIn'):
        appointed = appointments.objects.filter(
            email=request.COOKIES.get('username'))
        appointed_list = []
        for slot in appointed:
            doctor = doctorList.objects.get(doctorName=slot.bookedFor)
            appointed_list.append({
                'date': slot.date.strftime('%Y-%m-%d'),
                'time': slot.time.strftime('%H:%M'),
                'email': slot.email,
                'bookedFor': slot.bookedFor,
                'hospital': slot.hospital,
                'specialization': doctor.specialization,
                'rating': doctor.rating,
                'disease': doctor.disease
            })
        appointed = json.dumps(appointed_list)
        user = authUser.objects.get(email=request.COOKIES.get('username'))
        return render(request, 'authentication/bookedAppointment.html', {'appointments': appointed, 'user': user})
    else:
        return redirect(signIn)


def storeDoctor(request):
    df = pd.read_excel(os.path.join(
        settings.STATIC_ROOT, 'dummy_doctors_dataset.xlsx'))
    for index, row in df.iterrows():
        data = (row['Disease'], row['Doctors'],
                row['Ratings'], row['Specialization'])
        disease, doctors, ratings, specialization = data
        doctors = ast.literal_eval(doctors)
        ratings = ast.literal_eval(ratings)
        for doctor, rating in zip(doctors, ratings):
            dis = disease
            doc = doctor
            spec = specialization
            rat = rating
            doc = doc.replace(".", "")
            email = f'{doc}@gmail.com'
            doc1 = doc.split()
            doc1gmail = f"{''.join(doc1).lower()}@gmail.com"
            # newDoctor = authUser(fullName=doc, email=doc1gmail,
            #                      phone="1234567890", age=35, password="12345678", role="doctor")
            # newDoctor.save()
            newDoctor = doctorList(doctorName=doc, email=doc1gmail,
                                   disease=dis, specialization=spec, rating=rat)
            newDoctor.save()
    return HttpResponse("Done")
