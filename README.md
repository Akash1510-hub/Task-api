Task API
How to Run Locally

Clone the repository.

Navigate to the project folder:

cd task-api


Install dependencies:

npm install


Start the server:

npm start


Open the API in browser or Postman:

http://localhost:3000/api/tasks

Deployed API

deployed API URL:

https://task-api-uynh.onrender.com

API Endpoints
1. Create Task

POST /api/tasks

Body (JSON):

{
  "title": "Task Title",
  "description": "Optional description",
  "priority": "low|medium|high|urgent"
}


Returns: Newly created task object with taskId, status, and createdAt.

2. Get All Tasks

GET /api/tasks

Returns: Array of all tasks in the system.

Notes

Tasks are stored in data/tasks.json and persist across server restarts.

Minimal dependencies: only express.

Manual CORS headers allow frontend integration.

Ensure data/tasks.json exists with content [] before starting the server.