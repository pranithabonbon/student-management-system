# 🎓 Student Management System

A full-stack web application designed to simplify and automate student information management in educational institutions.

The system provides a centralized platform for managing students, faculty, courses, attendance, marks, assignments, announcements, study materials, fees, and QR-based attendance.

## 🚀 Features

- 🔐 User authentication and role-based access
- 👨‍🎓 Student management
- 👨‍🏫 Faculty management
- 📚 Course and department management
- 📝 Marks management
- 📅 Attendance management
- 📱 QR-based attendance
- 📢 Announcements and notifications
- 📖 Study material management
- 💰 Fee management
- 📊 Analytics dashboard
- 📈 Student performance tracking
- ✏️ Add, edit, search and delete student records
- 🔒 Protected routes and authentication

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- JavaScript
- CSS
- Chart.js

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Tools
- Git
- GitHub
- Postman
- MongoDB

## 📁 Project Structure

```text
student-management-system/
│
├── client/                 # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── context/
│       ├── pages/
│       ├── services/
│       └── styles/
│
├── server/                 # Node.js/Express backend
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── seed/
│   └── server.js
│
├── package.json
├── package-lock.json
└── .gitignore
# 🎓 Student Management System

A full-stack web application designed to simplify and automate student information management in educational institutions.

The system provides a centralized platform for managing students, faculty, courses, attendance, marks, assignments, announcements, study materials, fees, and QR-based attendance.

## 🚀 Features

- 🔐 User authentication and role-based access
- 👨‍🎓 Student management
- 👨‍🏫 Faculty management
- 📚 Course and department management
- 📝 Marks management
- 📅 Attendance management
- 📱 QR-based attendance
- 📢 Announcements and notifications
- 📖 Study material management
- 💰 Fee management
- 📊 Analytics dashboard
- 📈 Student performance tracking
- ✏️ Add, edit, search and delete student records
- 🔒 Protected routes and authentication

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- JavaScript
- CSS
- Chart.js

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Tools
- Git
- GitHub
- Postman
- MongoDB

## 📁 Project Structure

```text
student-management-system/
│
├── client/                 # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── context/
│       ├── pages/
│       ├── services/
│       └── styles/
│
├── server/                 # Node.js/Express backend
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── seed/
│   └── server.js
│
├── package.json
├── package-lock.json
└── .gitignore
```

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/pranithabonbon/student-management-system.git
cd student-management-system
```

### 2. Install Frontend Dependencies

```bash
cd client
npm install
```

### 3. Install Backend Dependencies

Open another terminal and run:

```bash
cd server
npm install
```

## 🔐 Environment Variables

Create a `.env` file inside the `server` folder.

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_secret_key
```

⚠️ **Do not upload your actual `.env` file or database credentials to GitHub.**

## ▶️ Running the Application

### Start the Backend

```bash
cd server
npm start
```

### Start the Frontend

Open another terminal:

```bash
cd client
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

## 📊 Main Modules

| Module | Description |
|---|---|
| Authentication | Login and role-based access |
| Student Management | Add, edit, delete and view students |
| Faculty Management | Manage faculty information |
| Courses | Manage courses and departments |
| Attendance | Record and track attendance |
| QR Attendance | QR-based attendance |
| Marks | Manage student marks |
| Analytics | Visualize student performance |
| Assignments | Manage assignments |
| Study Materials | Manage educational resources |
| Fees | Track fee information |
| Notifications | Display announcements and updates |

## 🎯 Purpose

The project provides a centralized platform for educational institutions to digitally manage student-related information and reduce manual record keeping.

## 🔮 Future Improvements

- ☁️ Cloud deployment
- 📧 Email notifications
- 📊 Advanced analytics
- 📱 Mobile application
- 💳 Online fee payment
- 🔒 Improved QR attendance security
- 📄 Automated report generation

## 👩‍💻 Developer

**Pranitha Bonbon**

GitHub: https://github.com/pranithabonbon

---

⭐ If you find this project useful, consider giving it a star!
