Overview:

Smart Elder Care is a simple, intuitive caregiver app designed for elderly users. 
It helps seniors manage medicine reminders, record daily emotional check‑ins, trigger 
emergency SOS alerts, and view a caregiver list — all without relying on a backend 
database. All user data is stored locally on the device to keep the prototype lightweight 
and hackathon‑ready.

Features:

1. Medicine Reminders
  Add medicine entries (name, dosage, time).
  Local notifications alert for scheduled medicines
  Tap “Taken” to mark as done.
  Stored in local app storage.

2. Daily Mood Check‑In
  Simple mood survey with emojis or sliders.
  Saves responses locally.
  Displays a basic summary/dashboard in the app.

3. Emergency SOS

  One‑tap SOS button on the home screen.
  Sends a predefined SMS to family/emergency contacts.
  Optionally trigger a phone call.
  Uses device SMS/phone APIs.

4. Caregiver List

  A hard‑coded list of local caregivers (name, phone, rating).
  Click to call or view caregiver details.


Mocked Family Dashboard:
  For the demo, the family dashboard is not live, but you can include a simple:
    Web page or screen that displays a mock summary of medicine adherence and mood logs.
    Can use static JSON or prefilled data.


Repository Structure:
    elder-caregiver-app/
    ├── app/               
    ├── components/        
    ├── hooks/              
    ├── lib/               
    ├── styles/             
    ├── README.md           
    ├── package.json   


Installation:
  1.Clone the repo
    git clone https://github.com/Mathesh-N/elder-caregiver-app.git
    cd elder-caregiver-app

  2.Install Dependecies
    npm install
    pnpm install  


  For Sample demo:
      https://elder-caregiver-app.vercel.app/

    

