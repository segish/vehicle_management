# Vehicle Management System

A full-stack web application for managing vehicle information with features like adding, editing, deleting, and viewing vehicles in a responsive data grid.

## Features

- 🚗 CRUD operations for vehicle management
- 🌓 Dark/Light mode toggle
- 📱 Responsive design (Mobile, Tablet, Desktop)
- 🔍 Advanced filtering and search capabilities
- ⬆️ Sortable columns
- 📊 Data grid with pagination
- ✨ Material-UI modern interface
- 🔒 Form validation
- ⚡ Real-time updates

## Tech Stack

### Frontend
- React.js
- Material-UI (MUI)
- @mui/x-data-grid
- Axios for API calls
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

## Prerequisites

Before running this project, make sure you have:
- Node.js (v14 or higher)
- MongoDB installed locally or a MongoDB Atlas account
- npm or yarn package manager

## Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/vehicle-management-system.git
cd vehicle-management-system
```

2. Install Backend Dependencies
```bash
cd backend
npm install
```

3. Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

4. Environment Setup

Create a `.env` file in the backend directory with the following variables:

PORT=5000
MONGO_URI=your_mongodb_connection_string

## Running the Application

1. Start the Backend Server
```bash
cd ../backend
npm start
```

2. Start the Frontend Server
```bash
cd ../frontend
npm start
```

The application will open in your default browser at http://localhost:3000

## API Endpoints

### Vehicles
- GET `/api/vehicles` - Get all vehicles
- POST `/api/vehicles` - Create a new vehicle
- PUT `/api/vehicles/:id` - Update a vehicle
- DELETE `/api/vehicles/:id` - Delete a vehicle

## Project Structure
vehicle-management/
.
├── ...
├── docs                    # Documentation files (alternatively `doc`)
│   ├── TOC.md              # Table of contents
│   ├── faq.md              # Frequently asked questions
│   ├── misc.md             # Miscellaneous information
│   ├── usage.md            # Getting started guide
│   └── ...                 # etc.
└── ...

├── backend/

│ ├── models/

│ ├── routes/

│ ├── config/

│ ├── package.json

│ └── server.js

├── frontend/

│ ├── public/

│ ├── src/

│ │ ├── components/

│ │ ├── App.js

│ │ └── index.js

│ └── package.json

└── README.md


## Features in Detail

### Vehicle Management
- Add new vehicles with validation
- Edit existing vehicle information
- Delete vehicles with confirmation
- View all vehicles in a sortable, filterable grid

### UI/UX Features
- Responsive design for all screen sizes
- Dark/Light mode toggle
- Error handling and validation
- Confirmation dialogs for destructive actions
- Search and filter capabilities
- Sortable columns
- Pagination
## Support

For support, Telegram https://t.me/tse_21_30
