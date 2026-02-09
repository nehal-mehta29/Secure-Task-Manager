# Secure Task Manager 

A **Secure Task Manager Backend API** built using **Node.js, Express.js, and MongoDB (Mongoose)**.
This project extends a basic Task Manager by adding **authentication and authorization**, while still supporting **full CRUD operations**, **filtering**, **pagination**, and **sorting**. It is suitable for a MERN backend assignment or as a base for a production-ready API.

---

## Features

* Secure MongoDB connection using **dotenv**
* User authentication with **JWT (JSON Web Tokens)**
* Password hashing using **bcrypt**
* Protected routes (only authenticated users can manage tasks)
* Mongoose schemas with validation
* Full **CRUD operations** for tasks
* Advanced query features:

  * Filtering (by completion status)
  * Pagination
  * Sorting (by title or creation date)
* Centralized and consistent error handling

---

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* dotenv
* bcryptjs
* jsonwebtoken (JWT)

---

## Project Structure

```
Secure-Task-Manager/
│
├── server.js
├── .env
├── config/
│   └── db.js
├── models/
│   ├── User.js
│   └── Task.js
├── middleware/
│   └── authMiddleware.js
├── routes/
│   ├── authRoutes.js
│   ├── createTask.js
│   ├── readTask.js
│   ├── updateTask.js
│   └── deleteTask.js
├── package.json
└── README.md
```

---

## Environment Variables

Create a `.env` file in the root directory and add:

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

---

## How to Run the Project

### Step 1: Open Terminal / Command Prompt

* Open VS Code
* Open the project folder
* Open the terminal (`Ctrl + ``)

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Start the Server

```bash
npm start
```

or (if using nodemon):

```bash
npm run dev
```

---

## Check if Project is Running

Terminal output should show:

```
Server running on port 3000
MongoDB connected
```

Open browser or Postman:

```
http://localhost:3000
```

---

## Authentication APIs

### Register User

```
POST /api/auth/register
```

### Login User

```
POST /api/auth/login
```

> On successful login, a **JWT token** is returned.
> This token must be sent in the `Authorization` header to access protected routes:

```
Authorization: Bearer <token>
```

---

## Task API Endpoints (Protected)

### Create Task

```
POST /api/tasks
```

### Get All Tasks

```
GET /api/tasks
```

### Get Task by ID

```
GET /api/tasks/:id
```

### Update Task

```
PUT /api/tasks/:id
```

### Delete Task

```
DELETE /api/tasks/:id
```

---

## Advanced Query Features

### Filtering

```
GET /api/tasks?completed=true
```

### Pagination

```
GET /api/tasks?page=1&limit=10
```

### Sorting

* By newest first:

```
GET /api/tasks?sortBy=createdAt
```

* By title:

```
GET /api/tasks?sortBy=title
```

---

## Validation Rules

* `title` is required
* `title` must be at least **3 characters long**
* Passwords are hashed before storage

---

## Error Handling

* **400** – Bad Request
* **401** – Unauthorized
* **404** – Resource Not Found
* **500** – Internal Server 