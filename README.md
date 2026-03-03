# 🧳 WanderLust Project 🏕

## 📌 Project Overview

**WanderLust** is a feature-rich, full-stack web application built to help travelers discover and book unique accommodations — from cozy cabins and beachside retreats to private villas and countryside farmhouses. Property owners can list their spaces directly on the platform, creating a vibrant marketplace for short-term rentals. The app offers a smooth and secure booking experience backed by real-time map views, cloud-based image storage, and robust authentication — all wrapped in a clean, responsive interface.

---

## 🎨 Frontend 🖥

**Tech Stack:** HTML, CSS, JavaScript, Bootstrap, EJS

**Highlights:**
- 📱 **Mobile-Responsive Layout** — Adapts seamlessly across desktops, tablets, and phones
- 🧭 **Intuitive Navigation** — Clean UI for browsing, searching, and managing listings
- 🗺 **Mapbox Integration** — Pinpoints exact property locations on an interactive map
- 🎨 **Dynamic Views** — Powered by EJS templates for modular, reusable components

---

## ⚙ Backend 🛠

**Tech Stack:** Node.js, Express.js

**Highlights:**
- 🔁 **RESTful Architecture** — Well-structured API endpoints for all core operations
- 🔐 **Auth and Authorization** — Secure user access using Passport.js with session management
- 📬 **Core Endpoints** — Covering property listings, user accounts, login/signup, and reviews
- 🏷 **Booking Logic** — Streamlined reservation handling built into the listing flow

---

## 🗄 Database

**System:** MongoDB Atlas

**Highlights:**
- 🧱 **Optimized Schema Design** — Cleanly modeled collections for listings, users, and reviews
- ⚡ **Efficient Queries** — Fast retrieval and storage of property and user data
- ☁ **Cloud-Hosted** — Managed via MongoDB Atlas for reliability and scalability

---

## 🖼 Cloudinary Image Storage

All listing photos are stored and served via **Cloudinary**, ensuring fast load times, automatic optimization, and reliable delivery. Uploads are handled with Multer before being pushed to the cloud.

---

## ✨ Key Features

- 🔎 **Smart Search and Filtering** — Quickly narrow down listings by category and location
- ⭐ **Ratings and Reviews** — Guests can rate and review properties they have stayed at
- 🔒 **Data Security** — Input validation, encrypted sessions, and secure environment variables
- 🗺 **Map-Based Discovery** — Find properties visually using Mapbox-powered maps
- ✅ **Dual-Side Validation** — Both client and server validate all inputs with Joi
- 🍪 **Session and Cookie Management** — Persistent auth state with flash notifications
- 🏗 **MVC Pattern** — Organized codebase following Model-View-Controller architecture
- 📤 **File Uploads** — Smooth image handling via Multer middleware

---

## 🚀 Getting Started

### 🔧 Prerequisites

Make sure you have the following installed and set up:
- 🟢 Node.js v14 or higher
- 🍃 MongoDB Atlas account
- ☁ Cloudinary account
- 🗺 Mapbox API token

### 📋 Setup Instructions

**1. Clone the repo**
```bash
git clone https://github.com/NotRealShanks/WanderLust-Project.git
cd WanderLust-Project
```

**2. Install all dependencies**
```bash
npm install
```

**3. Configure your environment**

Create a `.env` file at the project root:
```env
ATLASDB_URL=your_mongodb_atlas_connection_string
SECRET=your_session_secret_key

CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

MAP_TOKEN=your_mapbox_api_token
```

**4. Seed sample data** *(optional)*
```bash
node init/index.js
```

**5. Run the app**
```bash
node app.js
```

**6.** 🌐 Visit `http://localhost:8080` in your browser 🎉

---

## 📦 Technologies and Packages Used

- 🍃 **MongoDB + Mongoose** — Database and object modeling
- 🚂 **Express.js** — Web framework
- 🟢 **Node.js** — Runtime environment
- 🔐 **Passport.js + Passport-Local** — User authentication
- 🧩 **Passport-Local-Mongoose** — Mongoose-based auth helpers
- 🖼 **Cloudinary** — Cloud image storage
- 📤 **Multer** — File upload middleware
- 📄 **EJS** — Server-side templating
- ✅ **Joi** — Data validation
- 💬 **Connect-Flash** — Flash alert messages
- 💾 **Connect-Mongo** — MongoDB-backed session store
- 🔑 **Express-Session** — Session management
- 🍪 **Cookie-Parser** — Cookie parsing
- 🔒 **Dotenv** — Environment variable management

---

## 🌐 Deployment

The application is deployed via **Render**, connected to **MongoDB Atlas** as the cloud database.

🔗 **Live Demo:** https://wanderlust-travel-listings.onrender.com/

---

## ✍ Author

Built with passion by **[@NotRealShanks](https://github.com/NotRealShanks)**

This project reflects hands-on experience across the full web development stack — from designing responsive UIs and RESTful APIs to managing databases, cloud storage, and secure authentication systems.
