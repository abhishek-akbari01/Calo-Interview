# Unsplash Job System

A full-stack TypeScript application that demonstrates a job processing system using React and Node.js.

## Time Report

1. Project Setup and Planning: 45 minutes
   - Project structure design
   - Dependencies selection
   - TypeScript configuration

2. Backend Development: 4.5 hours
   - Setting up Express server
   - Implementing job service
   - Creating API endpoints
   - File-based storage system
   - Error handling

3. Frontend Development: 2.45 hours
   - React application setup
   - API service implementation
   - UI components
   - Job polling system

4. Testing and Documentation: 1.5 hour
   - Manual testing
   - README documentation

Total Time: 9.5 hours

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```
PORT=3000
UNSPLASH_ACCESS_KEY=your_unsplash_access_key
```

4. Start the development server:
```bash
npm start
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory:
```
REACT_APP_API_URL=http://localhost:3000
```

4. Start the development server: