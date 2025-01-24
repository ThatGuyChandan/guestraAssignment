## Prerequisites
Before you begin, ensure you have met the following requirements:
- Node.js (>= 14.0.0)
- npm (>= 6.0.0)
- MongoDB (local or use MongoDB Atlas)

## Installation
1. Clone the repository to your local machine:
   ```bash
   git clone git@github.com:ThatGuyChandan/guestraAssignment.git
2. Navigate to the project directory:
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables:
   - Create a .env file in the root of your project.
   - Add the following configuration to .env:
     ```bash
     MONGO_URL=your-mongodb-connection-string
     PORT=3000
     ```
   Replace your-mongodb-connection-string with your actual MongoDB connection string

## Running the Application Locally
Start the application:
  ```bash
  npm start
  ```
This will run the server on http://localhost:3000.

## Testing the Application
1. Make sure the application is running locally.
2. You can test the API using Postman .
