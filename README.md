# Hafawa Platform

Hafawa is a modern, user-friendly tourism platform built to connect tourists with local tour guides and destinations across Saudi Arabia. It provides a smooth experience for both admins and end users to manage, book, and explore guided tours and destinations.

---

## 🚀 Features

- 🧑‍💼 Admin dashboard for managing users, guides, and destinations
- 🌍 Tour guide dashboard for profile and tour management
- 🧭 Explore destinations with rich descriptions and images
- 🎨 Clean, modern responsive UI with Bootstrap
- 🌐 Built with React and React-Router

---

## 🛠️ Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/hafawa-platform.git
cd hafawa-platform
cd hafawa
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm start
```

---

## 👥 Team Members

- **Layal** — Figma designer + Frontend Developer
- **Najla** — Frontend Developer
- **Malath** — Figma designer + Frontend Developer
- **Jood** — Figma designer + Frontend Developer
- **Budoor Basaleh** — Frontend Developer

---

## 📁 Project Structure

```
hafawa-platform/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   ├── assets/
│   ├── App.js
│   ├── index.js
├── server/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── node_modules/
│   ├── routes/
│   ├── uploads/
│   ├── utils/
│   ├── .env
│   ├── package-lock.json
│   ├── package.json
│   ├── server.js
│   ├── README.md
├── package.json
├── package-lock.json
└── README.md

```

---

## 📸 Screenshots

Here is a Link showing the system
https://drive.google.com/drive/folders/1uQuHbkOmigS7_Xw7Ao9p34ir2TdAFk8C

---

## 💬 Usage

- Admins can log in and manage users, guides, and destinations via the dashboard.
- Tour guides can log in and update their profiles and tours.
- Visitors can browse and explore destinations and guides.
- Users can search and filter available tours.

---

## 💬 Dependinces and frameworks

Hafawa is a modern, user-friendly tourism platform built to connect tourists with local tour guides and destinations across Saudi Arabia. We developed the website using React and Bootstrap, which allows for a dynamic, component-based user interface and responsive design.

React's reusable components and virtual DOM provide efficient rendering and a smooth user experience, while Bootstrap's responsive grid system and pre-styled components enable quick, attractive designs. This combination ensures a seamless experience for both admins and end users to manage, book, and explore guided tours and destinations effortlessly.

---

## 🛠️ Setup & Installation for the backend :

1. Clone the Repository :
   git clone https://github.com/budoor99/hafawa-platform.git
2. Navigate to the server Directory :
   cd hafawa-platform/server
3. Install Dependencies:
   npm install

4. Start the Backend Server:
   npm start
   5.Verify the Server is Running:
   http://localhost:5050/api/test

---

## 📁 API Documentation – Example Requests & Responses

### 1. Login

**Endpoint:** `POST /api/auth/login`  
**Request:**

```json
{
  "email": "fahad.hosting@gmail.com",
  "password": "123"
}
```

**Response:**

```json
{
  "message": "Login successful",
  "token": "JWT_TOKEN"
}
```

---

### 2. Host Application

**Endpoint:** `POST /api/hosts/applyhost`  
**Request:**

```json
{
  "fullName": "Fahad alali",
  "username": "fahaad",
  "email": "fahaad@example.com",
  "password": "password123",
  "phoneNumber": "9876543210",
  "city": "Los Angeles"
}
```

**Response:**

```json
{
  "message": "Host application submitted successfully",
  "user": {
    "_id": "605c72ef1532071d34c4e2b2",
    "fullName": "Fahad alali",
    "username": "fahaad",
    "email": "fahaad@example.com",
    "phoneNumber": "9876543210",
    "city": "Los Angeles",
    "role": "host",
    "status": "pending"
  }
}
```

---

### 3. View Tour Guide Profile

**Endpoint:** `GET /api/tourguide/view/:id`  
**Response:**

```json
{
  "_id": "605c72ef1532071d34c4e2b2",
  "fullName": "Fatimah kareem",
  "username": "FatimahK",
  "email": "fatimah23445@example.com",
  "phoneNumber": "9876543210",
  "city": "Saudi",
  "role": "tour guide",
  "status": "approved",
  "profile": {
    "bio": "Experienced guiding with a passion for cultural exchange.",
    "languages": ["English", "Arabic"]
  }
}
```

---

### 4. Sign Out

**Endpoint:** `POST /api/auth/logout`  
**Response:**

```json
{
  "message": "Logout successful"
}
```

---

### 5. Bookmark a Destination

**Endpoint:** `POST /api/users/bookmark`  
**Request:**

```json
{
  "itemId": "605c72ef1532071d34c4e2b2"
}
```

**Response:**

```json
{
  "message": "Item bookmarked successfully",
  "bookmarkedItem": {
    "_id": "605c72ef1532071d34c4e2b2",
    "itemId": "605c72ef1532071d34c4e2b2",
    "userId": "60a732ea1b0e8d34a8c4e3b4"
  }
}
```

---

### 6. Edit Tour Guide Profile

**Endpoint:** `PUT /api/tour-guides/update/:id`  
**Response:**

```json
{
  "message": "Profile updated successfully",
  "tourGuide": {
    "_id": "605c72ef1532071d34c4e2b2",
    "fullName": "abdullah alabdullah",
    "email": "abdullah@example.com",
    "phoneNumber": "1234567890",
    "city": "Riyadh",
    "languages": ["English", "Arabic", "Spanish"],
    "bio": "Experienced tour guide with over 5 years of experience in guiding tourists across Europe.",
    "profileImage": "http://example.com/profile-image.jpg",
    "status": "active"
  }
}
```

---

### 7. Send Contact Message

**Endpoint:** `POST /api/contact/message`  
**Request:**

```json
{
  "fullName": "Abdullah ali",
  "email": "ali@example.com",
  "phoneNumber": "1234567890",
  "message": "I have a question about your services. Could you please provide more information?"
}
```

**Response:**

```json
{
  "message": "Your message has been sent successfully. We will get back to you soon."
}
```

---

## 🌐 Deployment

The frontend of the project is successfully deployed and available at:  
🔗 [https://hafawa-platform.onrender.com/](https://hafawa-platform.onrender.com/)

> ⚠️ **Note:** The correct and up-to-date version of the project is on the `main` branch.

We attempted to deploy the backend multiple times, but unfortunately, it is currently not functioning correctly. As a result, some features that rely on the API may not work as expected on the live site.

We are continuing to troubleshoot the issue and hope to have the backend running soon.

---

## 🔐 Admin Access for Testing

To try the admin functionality, you can log in with the following credentials:

- **Email:** `sara.ali@gmail.com`
- **Password:** `123`
