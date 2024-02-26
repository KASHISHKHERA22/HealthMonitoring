from datetime import datetime, timedelta

class DoctorAppointmentScheduler:
    def __init__(self):
        self.available_slots = {}
        self.initialize_slots()

    def initialize_slots(self):
        current_date = datetime.now().date()
        for day in range(5):
            slots = []
            current_day = current_date + timedelta(days=day)
            start_time = datetime(year=current_day.year, month=current_day.month, day=current_day.day, hour=9)
            end_time = datetime(year=current_day.year, month=current_day.month, day=current_day.day, hour=20)

            while start_time < end_time:
                if start_time.hour != 13:
                    slots.append(start_time.strftime("%Y-%m-%d %H:%M"))
                start_time += timedelta(minutes=30)

            self.available_slots[current_day.strftime("%Y-%m-%d")] = slots

    def display_available_slots(self):
        for day, slots in self.available_slots.items():
            print(f"Day {day}:")
            for slot in slots:
                print(slot)
            print()

    def book_appointment(self, day, time):
        try:
            if day not in self.available_slots:
                raise ValueError("Invalid day")

            if time not in self.available_slots[day]:
                raise ValueError("Slot not available")

            appointment_time = datetime.strptime(time, "%Y-%m-%d %H:%M")
            if appointment_time.hour >= 20:
                next_day = (appointment_time + timedelta(days=1)).strftime("%Y-%m-%d")
                if next_day not in self.available_slots:
                    raise ValueError("Doctor not available on weekends")
                day = next_day

            self.available_slots[day].remove(time)
            print(f"Appointment booked for {time} on Day {day}")
        except ValueError as e:
            print(f"Error: {e}")

# Example Usage:
scheduler = DoctorAppointmentScheduler()

print("Available Slots for the Next 5 Days:")
scheduler.display_available_slots()

print("\nBooking Appointment:")
appointment_date = input("Enter appointment date (YYYY-MM-DD): ")
appointment_time = input("Enter appointment time (HH:MM): ")
scheduler.book_appointment(day=appointment_date, time=f"{appointment_date} {appointment_time}")

print("\nAvailable Slots for the Next 5 Days after Booking:")
scheduler.display_available_slots()
