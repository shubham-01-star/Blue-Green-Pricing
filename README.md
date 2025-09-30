Dynamic Pricing Frontend (Vue.js)
Overview

This project is a Vue.js frontend for the Dynamic Pricing API demonstrating blue-green deployment routing.
It fetches pricing plans from a deployed backend and dynamically displays them based on routing logic.

Users can test different routing scenarios using buttons: Force Blue, Force Green, Random Route, and Clear Cookie.

Features

Fetch pricing data from remote backend API: https://dynamic-pricing-api-3epx.onrender.com/api/v1/pricing

Display pricing plans dynamically exactly as returned by backend

Test buttons for blue-green deployment routing:

Force Blue Version

Force Green Version

Random Route

Clear Cookie

Sticky routing via cookies supported

<img width="786" height="601" alt="image" src="https://github.com/user-attachments/assets/13c8adfe-11c1-49b8-90ed-8f270bc1c3b1" />

Folder Structure
<img width="704" height="648" alt="image" src="https://github.com/user-attachments/assets/1a10cc53-f3e1-452f-bd28-2119060752e7" />

Setup & Run

Navigate to the frontend folder:

cd frontend/vue-project


Install dependencies:

npm install


Start the development server:

npm run dev


Open in browser (default: http://localhost:5173)

Usage

Force Blue → Serve blue pricing version

Force Green → Serve green pricing version

Random Route → Let backend decide based on routing rules

Clear Cookie → Reset sticky cookie to test routing again

UI always reflects pricing plans exactly as returned from the backend

API Configuration

src/api.js contains the configuration for backend API:

export const API_CONFIG = {
  baseUrl: "https://dynamic-pricing-api-3epx.onrender.com/api/v1",
  cookieName: "pricing_version",
  headerName: "x-version",
  stickyDays: 30,
};


You can adjust the baseUrl if your backend URL changes.

Notes

Frontend uses axios for API requests

Cookie management ensures sticky routing for repeated visits

All routing logic resides on the backend; frontend only requests and displays pricing data

License

For educational purposes / assignment submission
