# Campus Kart Backend

CareWell is a comprehensive Hospital Management System designed for day-to-day operations of a hospital. It enables coordination between different users – Front Desk Operators, Data Entry Operators, Doctors, and Database Administrators – ensuring efficient handling of patient information, appointments, treatments, diagnostics, and administration.

## Important Links

Explore the live version: [CareWell Live](https://carewell-future.netlify.app/)

Postman API Docs: [API Documentationt](https://documenter.getpostman.com/view/40480117/2sB2iwEETs)

Submission Repo: https://github.com/DebarghaNath/DBMS_PROJECT_HOSPITAL_MANAGMENT

ER Diagram: [ER Diagram](https://github.com/DebarghaNath/DBMS_PROJECT_HOSPITAL_MANAGMENT/blob/main/Idea_er_diagram.pdf)

<!-- Theoritical Documentation: [PRD](https://docs.google.com/document/d/1zjn1w_RHEjrcuj0rtWkFTKLyTxPXaBFwDBW5odpLO-Y/edit?usp=sharing)

Work Flow Management: [Asana](https://app.asana.com/0/1209820690287935/1209823225591449)

Demo Video: [Loom Demo Video](https://www.loom.com/share/06c0747f330e4c758975fecedde1462d?sid=d4430d4e-e382-463e-ac62-770291000fb5) -->


## Table of Contents
- [Important Links](#important-links)
- [System Assumptions](#system-assumptions)
- [Features & Screentshots](#features-screenshots)
- [REST API Endpoints](#rest-api-endpoints)
- [Technologies Used](#technologies-used)
- [Installation](#installation)

## System Assumptions

1. **User Login & Activity**  
   - Daily active users tracked via `lastLogin` timestamp.  
   - Inactive after 1 month of no login.  
   - Auto-login if dashboard URL revisited without explicit logout.  
   - Multiple roles per browser allowed; only one account per role—new login replaces old.

2. **Appointment & Admission Types**  
   - **Emergency**: Cardiac Arrest, Severe Trauma, Chest Pain, Stroke  
   - **Medium**: Ear Infection, Skin Conditions  
   - **Normal**: Fever, Aches, Pains

3. **Wards**  
   General | ICU | Emergency | Pediatrics | Maternity | Surgical

4. **Notes & History**  
   All entries (`notes`, `tests`, `treatments`) are **semicolon-separated**.

5. **Lab Scheduling**  
   - 5 labs × 30 min/test  
   - Assign to first available lab slot.

6. **Doctor Scheduling**  
   - 1 hr/appointment  
   - Book in doctor’s earliest free slot.

---

## Departments & Diseases

| Department       | Code | Diseases                                    |
|------------------|------|---------------------------------------------|
| Cardiology       | D001 | Hypertension, Arrhythmia, Heart Failure     |
| Neurology        | D002 | Epilepsy, Stroke, Migraine                  |
| Oncology         | D003 | Breast Cancer, Leukemia, Lymphoma           |
| Orthopedics      | D004 | Arthritis, Fracture, Osteoporosis           |
| Pediatrics       | D005 | Chickenpox, Asthma, Allergies               |
| Dermatology      | D006 | Eczema, Psoriasis, Acne                     |
| Psychiatry       | D007 | Depression, Anxiety, Bipolar Disorder       |
| Gastroenterology | D008 | Gastritis, IBS, Hepatitis                   |
| Urology          | D009 | Kidney Stones, UTI, Prostate Cancer         |
| ENT              | D010 | Sinusitis, Tonsillitis, Hearing Loss        |

---

## Diagnostic Tests & Parameters

| Test Type    | Parameter            | Unit           |
|--------------|----------------------|----------------|
| **Blood**    | Hemoglobin           | g/dL           |
|              | WBC Count            | cells/mcL      |
|              | RBC Count            | million/mcL    |
|              | Platelet Count       | lac/mcL        |
|              | Glucose (Fasting)    | mg/dL          |
|              | Cholesterol          | mg/dL          |
|              | Urea                 | mg/dL          |
|              | Creatinine           | mg/dL          |
| **X‑Ray**    | Impression           | —              |
|              | Radiologist Notes    | —              |
|              | Region               | —              |
|              | Findings             | —              |
| **MRI**      | Region Scanned       | —              |
|              | Findings             | —              |
|              | Radiologist Comments | —              |
|              | Sequence Used        | —              |
| **CT**       | Region Scanned       | —              |
|              | Contrast Used        | yes/no         |
|              | Findings             | —              |
|              | Radiologist Notes    | —              |
| **ECG**      | Heart Rate           | bpm            |
|              | PR Interval          | ms             |
|              | QRS Duration         | ms             |
|              | QT Interval          | ms             |
|              | Rhythm               | —              |
| **Ultrasound** | Organ Examined     | —              |
|              | Findings             | —              |
|              | Size                 | cm             |
|              | Impression           | —              |
| **Urine**    | pH                   | —              |
|              | Specific Gravity     | —              |
|              | Protein              | mg/dL          |
|              | Glucose              | mg/dL          |
|              | Ketones              | mg/dL          |
|              | Color                | —              |
|              | Appearance           | —              |

## Features Screenshots

### Admin 
  - **Patient, Doctors, Users Analytics Dashboard** 
  - **Add Users** 
  - **Delete Users** 

### Front-desk Operators 
  - **Brief Analytics**
  - **Upcoming Appointments** 
  - **Recent Admissions/Discharges** 
  - **Room Analytics**  
  - **All Appointments and Filters** 
  - **Register a patient** 
  - **Book an Appointment** 
  - **Admit a Patient** 
  - **Discharge a Patient** 
  - **Scheduling a test** 

### Data-entry Operators
  - **Query for a patient** 
  - **See patient related Test Results** 
  - **See patient related Medications Prescribed** 
  - **Add test results**
  - **Add medications prescribed**

### Doctor
  - **Patient and Appointment Analytics**
  - **All Patients** 
  - **All Appointments**
  - **Query for a patient and Filters**  
  - **View a detailed View of Patient** 

## REST API Endpoints

### Authentication, Admin, Patient Registration
1. **`POST /api/authorization/login`**  
2. **`GET /api/authorization/getdetails`**  
3. **`GET /api/authorization/checkaadhaar?aadhaar=888888888888`** 
4. **`POST /api/authorization/signup`** 
5. **`PUT /api/authorization/addusers`**
6. **`GET /api/authorization/showusers`**
7. **`DELETE /api/authorization/deleteusers`**
8. **`PUT /api/authorization/submit-password`**
9. **`PUT /api/authorization/logout`**

### Appointments
1. **`DELETE /api/appointments/:id/cancel`**  
2. **`POST /api/appointments/book`**  
3. **`GET /api/appointments/:id`** 
4. **`GET /api/appointments/getappointments`** 
5. **`GET /api/appointments/getdoctors`**

### Room (Admit/Discharge)
1. **`POST /api/rooms/admitpatients`**  
2. **`PUT /api/rooms/dischargepatient`**  
3. **`GET /api/rooms/allrooms`** 
4. **`GET /api/rooms/admissions`** 

### Doctor APIs
1. **`GET /api/doctor/2/appointments`**  
2. **`GET /api/doctor/3/patient/20`**  
3. **`GET /api/doctor/2/patient`**  

### Test APIs
1. **`GET /api/test/20/3`**  
2. **`POST /api/test/add`**  
3. **`GET /api/doctor/2/patient`**  
4. **`POST /api/test/schedule`**
5. **`POST /api/doctor/3/patient/20/prescription`**

### Other APIs
1. **`POST /upload`**  
2. **`POST /mailer`**  
3. **`GET /test`** 
4. **`GET /api/patient/showpatients`** 

## Technologies Used

- **Backend:** Node.js, Express.js
- **Frontend:** React.js, TailwindCSS
- **Database:** Supabase, PostgreSQL, PGPostgreSQL
- **Authentication:** JWT, bcrypt for password hashing
- **File Uploads:** Multer, Cloudinary
- **SMS Service:** Twilio
- **Email Service:** Nodemailer
- **Utilities:** dotenv, crypto

## Installation

### Prerequisites

- Node.js (v14+)
- npm 

### Setup Instructions

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/DebarghaNath/DBMS_PROJECT_HOSPITAL_MANAGMENT.git
    cd DBMS_PROJECT_HOSPITAL_MANAGMENT
    ```
2. **Envirnment Variables:**
    Create a .env file in the backend directory and include the following:
    ```bash
    SUPABASE_KEY=your_supabase_key
    SUPABASE_URL=your_supabase_url
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    EMAIL_USER=your_email
    EMAIL_PASS=your_email_password
    JWT_SECRET=your_jwt_secret
    TWILIO_ACCOUNT_SID=your_twilio_account_sid
    TWILIO_AUTH_TOKEN=your_twilio_auth_token
    TWILIO_PHONE_NUMBER=your_twilio_phone_number
    ```
3. **Install Dependencies:**
**Frontend**
    ```bash
    cd client
    npm install
    npm run dev
    ```
The frontend server will run on http://localhost:5173.
**Backend**
    ```bash
    cd api
    npm install
    nodemon backend.js
    ```
The backend server will run on http://localhost:8080.

## Collaborators

### Adarsh Dhakar (22CS01040)
### Avik Sarkar (22CS01060)
### Debargha Nath (22CS01070)
### Soham Chakraborty (22CS02002)
