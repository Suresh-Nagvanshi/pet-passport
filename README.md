# Pet Passport System

A full-stack web application to manage pet health records, vaccination history, travel readiness, and generate AI-powered summaries for veterinary insights.

---

## Features

### Pet Passport

* View complete pet profile (name, breed, photo, weight)
* Vaccination records with status indicators (Valid / Expired / Expiring)
* Health timeline (checkups, surgeries, medications)
* Travel readiness indicator

### AI Summary Generation

* Generates health summaries using Gemini API
* Supports tone switching (Formal / Friendly)
* Displayed in a dedicated side panel for improved user experience

### Multi-Pet Dashboard

* View all pets in a responsive grid layout
* Navigate to individual pet passports

### Editable Records

* Add vaccinations
* Add health events

### QR Code Sharing

* Each pet passport generates a unique QR code
* Scanning the QR code opens the specific pet’s passport directly (deep-linking)
* Enables quick access during scenarios like vet visits or travel verification
* Works across devices when accessed over the same network or deployed environment

---

## Tech Stack

### Frontend

* React (Vite)
* CSS (custom styling)
* qrcode.react (QR code generation)

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* cors (cross-origin requests)
* dotenv (environment variable management)

### AI Integration

* Google Gemini API
* @google/generative-ai (official SDK)

---

## Setup Instructions

### Clone the repository

```bash
git clone <your-repo-url>
cd pet-passport
```

---

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside `/server`:

```env
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
PORT=5000
```

Start backend:

```bash
npm start
```

---

### Frontend Setup

```bash
cd client
npm install
npm run dev -- --host
```

---

### Open in Browser

```bash
http://localhost:5173
```

---

## Environment Variables

| Variable       | Description               |
| -------------- | ------------------------- |
| MONGO_URI      | MongoDB connection string |
| GEMINI_API_KEY | Google Gemini API key     |
| PORT           | Backend server port       |

---

## Model Selection & API Integration

During development, multiple Gemini models were evaluated.

Gemini 1.5 Flash:
Returned 404 Not Found errors due to endpoint versioning mismatches with the v1beta API.

Gemini 2.0 Flash:
Triggered 429 Resource Exhausted errors, as free-tier quotas for experimental 2.0 models are highly restricted.

Solution:
The implementation uses gemini-2.5-flash, which provides a stable balance between performance and free-tier quota availability. This ensures reliable summary generation without frequent rate-limiting issues.

---

## QR Code Functionality

Each pet passport includes a dynamically generated QR code that encodes a route of the form:

```
/passport/:petId
```

This allows direct navigation to a specific pet’s passport view. The QR code uses the current application origin, ensuring compatibility across:

* Localhost environment (desktop testing)
* Local network (mobile testing via shared WiFi or hotspot)
* Deployed environments (public access)

To enable cross-device access during development:

* The frontend runs with network exposure (`--host`)
* Backend is configured to accept external connections
* API URLs are dynamically resolved using the current origin

---

## Demo Walkthrough

A 3–5 minute walkthrough video demonstrates:

* Viewing pet dashboard
* Navigating to passport
* Adding vaccinations and health events
* Generating AI summary
* Scanning QR code to open a specific pet passport

---

## Future Improvements

Given more time, the following enhancements would be implemented:

* Export passport as PDF
* Global QR access via deployment
* Search and filter pets
* Authentication system
* Advanced analytics (health trends)

---

## Assumptions

* Each pet has a unique ID
* Data is manually added (no external veterinary integrations)
* Travel readiness is simplified (based on microchip and vaccination data)

---

## How to Run Locally

1. Start backend (`npm start` in `/server`)
2. Start frontend (`npm run dev -- --host` in `/client`)
3. Ensure both devices are on the same network for QR testing
4. Open `localhost:5173`
5. Click a pet → view passport → generate summary → scan QR

---

## Design Decisions

* Separated AI summary into a side panel to maintain clear content hierarchy
* Used timeline UI for better visualization of health history
* Implemented vaccination status indicators for quick insights
* Enabled dynamic routing for scalable multi-pet support
* Integrated QR-based deep linking for real-world usability
