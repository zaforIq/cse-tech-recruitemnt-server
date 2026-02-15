# CSE Tech Recruitment Server

A Node.js Express server for managing technical recruitment processes with MongoDB database.

## Quick Start with Docker

### Prerequisites
- Docker and Docker Compose installed on your system

### Running the Application

1. **Clone and navigate to the project:**
   ```bash
   git clone <repository-url>
   cd cse-tech-recruitemnt-server
   ```

2. **Start the services:**
   ```bash
   docker-compose up -d
   ```

3. **Check the status:**
   ```bash
   docker-compose ps
   ```

4. **View logs:**
   ```bash
   docker-compose logs -f
   ```

5. **Stop the services:**
   ```bash
   docker-compose down
   ```

## Services

- **Application Server**: `http://localhost:13001`
- **MongoDB**: `localhost:27017`

## API Endpoints

- `GET /` - Health check
- `GET /api/candidates` - Get all candidates
- `POST /api/candidates` - Create new candidate
- `GET /api/candidates/:id` - Get candidate by ID
- `PUT /api/candidates/:id` - Update candidate
- `DELETE /api/candidates/:id` - Delete candidate

## Development without Docker

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment:**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

3. **Start MongoDB (required):**
   ```bash
   # Make sure MongoDB is running on localhost:27017
   ```

4. **Run the server:**
   ```bash
   npm start
   ```

## Environment Variables

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)
- `MONGODB_URI` - MongoDB connection string

## Docker Volumes

- `mongo_data` - Persistent MongoDB data
- `./public:/app/public` - Shared public files directory

## Health Checks

The application includes a health check that runs every 30 seconds to ensure the service is responsive.

## Database Schema

The MongoDB database includes a `candidates` collection with validation for:
- `name` (required)
- `email` (required, unique)
- `phone` (optional)
- `skills` (optional array)
- `experience` (optional number)
- `status` (optional enum)
- `createdAt`/`updatedAt` timestamps
