# 📊 MLSC Attendance System

A modern, real-time barcode-based attendance management system built for MLSC (Microsoft Learn Student Chapter) with domain-specific tracking capabilities.

![React](https://img.shields.io/badge/React-18-blue)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-blue)

## 🚀 Features

- **🔐 Secure Authentication**: Domain-specific login system for different departments
- **📱 Real-time Barcode Scanning**: Mobile-optimized barcode scanner using device camera
- **🎯 Multi-domain Support**: Separate tracking for Web Dev, Competitive Programming, and AI/DS domains
- **☁️ Google Sheets Integration**: Automatic data synchronization with Google Sheets
- **📊 PostgreSQL Database**: Robust data storage and user management
- **🎨 Modern UI/UX**: Responsive design with glassmorphism effects and smooth animations

![Home_Page](https://res.cloudinary.com/djgg2f0jh/image/upload/v1757142666/Screenshot_2025-09-06_124040_opxv4a.png)
![Scanner_Page](https://res.cloudinary.com/djgg2f0jh/image/upload/v1757142777/Screenshot_2025-09-06_124242_z2hzqd.png)

## 🏗️ System Architecture

```
┌─────────────────┐    HTTP/HTTPS    ┌─────────────────┐
│   React Frontend│ ◄──────────────► │  Express Backend│
│   (Port 5173)   │                  │   (Port 3000)   │
└─────────────────┘                  └─────────────────┘
         │                                      │
         │                                      ├── PostgreSQL Database
         │                                      │
         └── Camera API                         └── Google Sheets API
             (Barcode Scanner)                      (Data Export)
```

## 📁 Project Structure

```
Attendance_System/
├── backend/
│   ├── index.js              # Express server & API routes
│   ├── package.json          # Backend dependencies
│   └── .env                  # Environment variables
│
├── frontend/my-app/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx      # Login page
│   │   │   ├── Scanner.jsx   # Barcode scanner
│   │   │   └── PrivateRoute.jsx # Route protection
│   │   ├── App.jsx           # Main app component
│   │   ├── App.css          # Styling
│   │   └── main.jsx         # React entry point
│   └── package.json         # Frontend dependencies
│
└── README.md
```

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI library
- **React Router DOM** - Client-side routing
- **@ericblade/quagga2** - Barcode scanning library
- **Axios** - HTTP client for API calls
- **Vite** - Fast build tool and dev server

### Backend
- **Node.js & Express** - Server framework
- **PostgreSQL** - Primary database with `postgres` driver
- **Google Sheets API** - Data export integration
- **Axios** - HTTP client for external API calls
- **CORS** - Cross-origin resource sharing

## ⚡ Quick Start

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- Google Sheets API credentials
- Modern web browser with camera support

### 1. Clone the Repository
```bash
git clone https://github.com/nandkishor-vasi/Attendance_System.git
cd Attendance_System
```

### 2. Backend Setup
```bash
cd backend
npm install

# Create .env file with the following variables:
# PORT=3000
# DATABASE_URL=postgresql://username:password@localhost:5432/attendance_db
# FRONTEND_URL=http://localhost:5173
# GOOGLE_SCRIPT=your_google_apps_script_url

node index.js  # Using nodemon for development
```

### 3. Database Setup
Create a PostgreSQL database and users table:
```sql
CREATE DATABASE attendance_db;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

```

### 4. Frontend Setup
```bash
cd frontend/my-app
npm install

# Create .env file with:
# VITE_BACKEND_URL=http://localhost:3000

npm run dev
```
### Environment Variables

#### Backend (.env)
```bash
PORT=3000
DATABASE_URL=postgresql://username:password@localhost:5432/attendance_db
FRONTEND_URL=http://localhost:5173
GOOGLE_SCRIPT=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

#### Frontend (.env)
```bash
VITE_BACKEND_URL=http://localhost:3000
```

## 🎨 Features in Detail

### Authentication System
- login (Web Dev, CP, AI/DS)
- Secure credential verification via PostgreSQL
- Session management with localStorage
- Protected routes with redirect functionality

### Barcode Scanner
- Real-time camera access
- Code_128 barcode format support
- Mobile-responsive design
- Automatic scan result processing

### Data Integration
- PostgreSQL for user management
- Google Sheets API for data export and reporting
- RESTful API design for scalability

## 📊 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/login` | User authentication |
| POST | `/api/form` | Submit attendance data |

## 🔒 Security Features

- Environment-based configuration
- CORS protection
- Input validation
- Secure database connections
- Private route protection
  
## 👨‍💻 Author

**Nandkishor Vasi**
- GitHub: [@nandkishor-vasi](https://github.com/nandkishor-vasi)
- Project: [Attendance_System](https://github.com/nandkishor-vasi/Attendance_System)

## 🙏 Acknowledgments
- Microsoft Learn Student Chapter (MLSC)

---

**Made with ❤️ by Nandkishor for MLSC Community**
