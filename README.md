# Band Rehearsal Scheduler

A comprehensive web application for bands and musical groups to efficiently schedule rehearsals, track attendance, and manage setlists.

## 🎵 Features

- **Member Management**: Add, edit, and remove band members with contact information and instrument/role details
- **Smart Scheduling**: Get automated scheduling suggestions based on member availability
- **Venue Management**: Manage rehearsal spaces and their details
- **Attendance Tracking**: Track RSVPs and attendance history
- **Notification System**: Automated reminders via email and SMS
- **Rehearsal Planning**: Create and share setlists with time allocations

## 🚀 Technology Stack

### Frontend
- React.js with Next.js
- Redux for state management
- Material-UI components
- FullCalendar.js for calendar interface
- PWA capabilities for mobile access

### Backend
- Node.js with Express.js
- RESTful API architecture
- JWT authentication
- PostgreSQL database
- Redis for caching

## 📋 Prerequisites

- Node.js (v18+)
- PostgreSQL (v14+)
- Redis (v6+)
- Yarn or npm

## 🔧 Installation

1. Clone the repository:
   ```
   git clone https://github.com/dxaginfo/band-rehearsal-scheduler-20250703.git
   cd band-rehearsal-scheduler-20250703
   ```

2. Install dependencies:
   ```
   # Install backend dependencies
   cd server
   npm install
   
   # Install frontend dependencies
   cd ../client
   npm install
   ```

3. Set up environment variables:
   ```
   # Copy example env files
   cp server/.env.example server/.env
   cp client/.env.example client/.env
   
   # Edit the .env files with your configuration
   ```

4. Set up the database:
   ```
   # Create the database
   createdb rehearsal_scheduler
   
   # Run migrations
   cd server
   npm run db:migrate
   
   # Seed initial data (optional)
   npm run db:seed
   ```

5. Start the development servers:
   ```
   # Start backend server
   cd server
   npm run dev
   
   # In another terminal, start frontend server
   cd client
   npm run dev
   ```

6. Access the application at `http://localhost:3000`

## 🌐 Deployment

### Using Docker (Recommended)

1. Build the Docker images:
   ```
   docker-compose build
   ```

2. Start the application:
   ```
   docker-compose up -d
   ```

### Manual Deployment

1. Build the frontend:
   ```
   cd client
   npm run build
   ```

2. Set up a process manager for the backend:
   ```
   # Using PM2
   npm install -g pm2
   cd server
   pm2 start ecosystem.config.js
   ```

3. Configure a reverse proxy (Nginx/Apache) to serve the application

## 📚 API Documentation

API documentation is available at `/api/docs` when running the server.

## 🧪 Testing

```
# Run backend tests
cd server
npm test

# Run frontend tests
cd client
npm test
```

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.