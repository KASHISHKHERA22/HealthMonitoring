import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

# Email configuration
sender_email = 'nishanttomar6999@gmail.com'
receiver_email = 'kashishkhera20@gmail.com'
password = 'muey rmsm qpru jxxu'
subject = 'Welcome to Smart Health Monitoring System!'
html_message = '''
    <h1>Welcome Shiva to Our Platform!</h1>
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

# Create a message container
msg = MIMEMultipart()
msg['From'] = sender_email
msg['To'] = receiver_email
msg['Subject'] = subject

# Attach the HTML message
msg.attach(MIMEText(html_message, 'html'))

# Connect to the SMTP server
server = smtplib.SMTP('smtp.gmail.com', 587)  # Specify your SMTP server and port
server.starttls()  # Start TLS encryption
server.login(sender_email, password)  # Login to your email account

# Send the email
server.sendmail(sender_email, receiver_email, msg.as_string())
print("mail sent")
# Close the connection
server.quit()