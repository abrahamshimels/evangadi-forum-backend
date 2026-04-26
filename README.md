# Evangadi Forum Backend

Evangadi Forum Backend is a Node.js and Express REST API for a forum-style Q&A platform. It provides JWT-based authentication, user registration and login, question management, answer management, and MySQL persistence.

## Features

- User registration and login with hashed passwords
- JWT authentication for protected routes
- Create, read, update, and delete questions
- Create, read, update, and delete answers
- MySQL database integration via `mysql2`
- Automatic table/bootstrap check at startup

## Tech Stack

- Node.js
- Express
- MySQL
- JSON Web Token
- bcrypt
- dotenv

## Project Structure

```text
server/
  app.js
  controller/
  db/
  middleware/
  migrate/
  routes/
```

## Setup

### 1. Install dependencies

```bash
cd server
npm install
```

### 2. Configure environment variables

Create a `.env` file inside `server/` with the following variables:

```dotenv
PORT=5500
DB_HOST=your-mysql-host
DB_PORT=3306
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
JWT_SECRET=your_jwt_secret
```

### 3. Start the server

```bash
npm run dev
```

The server runs on `http://localhost:5500` by default.

## API Endpoints

### Public routes

- `POST /api/users/register` - register a new user
- `POST /api/users/login` - login and receive a JWT token
- `GET /api/users/check` - verify the current user token

### Protected question routes

These routes require an `Authorization: Bearer <token>` header.

- `GET /api/questions` - get all questions
- `GET /api/questions/:id` - get a single question
- `POST /api/questions` - create a question
- `PUT /api/questions/:id` - update a question
- `DELETE /api/questions/:id` - delete a question

### Protected answer routes

These routes require an `Authorization: Bearer <token>` header.

- `GET /api/answers/:id` - get answers for a question
- `GET /api/answers/single/:id` - get a single answer
- `POST /api/answers/:id` - create an answer for a question
- `PUT /api/answers/:id` - update an answer
- `DELETE /api/answers/:id` - delete an answer

## Notes

- The server validates the MySQL connection before starting.
- Protected routes rely on the same `JWT_SECRET` for signing and verifying tokens.
- Make sure your database tables exist before using the API.
