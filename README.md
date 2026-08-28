# 🧳 WanderLust

A full-stack property rental listing platform where users can browse, search, and post short-term rental listings — think a scaled-down Airbnb clone. Built as a hands-on project to practice the full web stack: server-rendered views, RESTful routes, authentication, cloud storage, and a real deployed database.

**Live demo:** https://wanderlust-8p54.onrender.com/
*(hosted on Render's free tier — the first request after a period of inactivity may take 30-60 seconds to wake up)*

---

## Features

- Browse and search listings by title, location, or country
- Filter listings by category (Rooms, Mountains, Castles, Camping, and more)
- Interactive map on each listing page showing its real location (Leaflet + OpenStreetMap, no paid API key)
- User accounts with secure authentication (Passport.js) — sign up, log in, log out
- Create, edit, and delete listings (only the listing's owner can edit/delete it)
- Upload listing photos, stored and served via Cloudinary
- Leave star ratings and written reviews on listings
- Dark/light mode toggle with saved preference
- Infinite scroll — listings load in batches as you scroll instead of all at once
- Responsive layout that works on desktop and mobile
- Server-side geocoding (Photon/Komoot) automatically converts a listing's location into map coordinates on creation

---

## Tech Stack

**Frontend:** EJS templating, Bootstrap, vanilla JavaScript, Leaflet.js

**Backend:** Node.js, Express.js, REST-style routing, MVC structure

**Database:** MongoDB Atlas + Mongoose

**Auth:** Passport.js (Local strategy) with `express-session` + `connect-mongo` for persistent sessions

**Image storage:** Cloudinary, with uploads handled through Multer

**Validation:** Joi (server-side schema validation on listings and reviews)

**Geocoding & maps:** Photon (Komoot) for geocoding, Leaflet + OpenStreetMap tiles for map rendering — both free and key-free, unlike Mapbox/Google Maps which require a linked payment method

---

## Getting Started

### Prerequisites

- Node.js v20 or higher
- A MongoDB Atlas account (free tier is fine)
- A Cloudinary account (free tier is fine)

### Setup

**1. Clone the repo**
```bash
git clone https://github.com/NotRealShanks/WanderLust-Project.git
cd WanderLust-Project
```

**2. Install dependencies**
```bash
npm install
```

**3. Create a `.env` file** in the project root:
```env
ATLASDB_URL=your_mongodb_atlas_connection_string
SECRET=your_session_secret_key

CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

> **Note:** In MongoDB Atlas, go to Network Access and allow access from your current IP (or `0.0.0.0/0` for local development) — Atlas blocks connections from IPs that aren't explicitly allowed, and this is the most common setup issue.

**4. (Optional) Seed some sample listings**
```bash
node init/index.js
```
This geocodes each sample listing via Photon before inserting, so it can take 30-60 seconds to finish — that's expected, not a hang.

**5. Run the app**
```bash
node app.js
```

**6.** Visit `http://localhost:8080` in your browser.

---

## Project Structure

```
├── controllers/      # Route handler logic (listings, reviews, users)
├── models/           # Mongoose schemas (Listing, Review, User)
├── routes/           # Express route definitions
├── views/            # EJS templates
├── public/           # Static assets (CSS, client-side JS, favicon)
├── init/              # Database seeding script + sample data
├── middleware.js      # Auth guards and ownership checks
├── schema.js           # Joi validation schemas
└── app.js               # App entry point
```

---

## Deployment

Deployed on **Render** as a persistent Node web service, connected to **MongoDB Atlas** for the database and **Cloudinary** for image storage. Render was chosen over serverless platforms like Vercel because this app relies on server-side sessions and a long-running Express process, which don't fit a stateless serverless model well.

---

## Known Limitations

- No actual booking/reservation flow yet (no date selection, availability calendar, or payments) — the listing side of the app is complete, but booking is not yet implemented
- Geocoding depends on a free public API (Photon), which occasionally rate-limits under heavy use

---

## Author

Built by **[@NotRealShanks](https://github.com/NotRealShanks)** as a learning project covering the full stack — responsive UI, RESTful APIs, authentication, cloud storage, and deployment.
