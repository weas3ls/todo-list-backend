# To-Do List Backend

This is a backend-only implementation for a To-Do List application. It provides
APIs to create, update, retrieve, and delete tasks. The backend is built with
**Node.js**, **Express**, and **Prisma** as the ORM for database interactions.
This serves as the foundational backend for the To-Do List application.

---

## Features

- **Create Tasks**: Add new tasks with a title, color, and optional completion
  status.
- **Update Tasks**: Modify existing tasks by updating their title, color, or
  status.
- **Retrieve Tasks**: Fetch all tasks from the database.
- **Delete Tasks**: Remove tasks by ID.

---

## Requirements

Make sure you have the following installed on your system:

- **Node.js** (v16 or above)
- **npm** (v8 or above)
- **PostgreSQL**, **MySQL**, or any database supported by Prisma

---

## Setup Instructions

1. **Clone the Repository**:

    ```bash
    git clone <repository-url>
    cd to-do-list-backend

    ```

2. **Install Dependencies: Install all required dependencies using npm:**

    ```bash
    npm install

    ```

3. **Setup the Database:**

- Create a database using MySQL
- Update the DATABASE_URL in your .env file with your database connection
  string:
    ```bash
    DATABASE_URL=mysql://<user>:<password>@<host>:<port>/<database>
    ```

4. **Run Prisma Migrations: Generate and apply the database schema with
   Prisma:**

    ```bash
    npx prisma migrate dev --name init

    ```

5. **Start the Server: Launch the development server:**
    ```bash
    npm run dev
    ```

## API Endpoints

### Base URL

http://localhost:3000

### Endpoints

---

### **GET /tasks**

Fetch all tasks.

- **Response Example**:
    ```
    [
        {
            "id": 1,
            "title": "Sample Task",
            "color": "blue",
            "completed": false,
            "createdAt": "2025-01-17T12:00:00.000Z",
            "updatedAt": "2025-01-17T12:00:00.000Z"
        },
        {
            "id": 2,
            "title": "Another Task",
            "color": "red",
            "completed": true,
            "createdAt": "2025-01-17T12:30:00.000Z",
            "updatedAt": "2025-01-17T12:45:00.000Z"
        }
    ]
    ```

### **POST /tasks**

Create a new task.

**Request Body:**
`     {         "title": "Task Title",         "color": "blue",         "completed": true     }     `

**Response Example:**
`     {         "id": 1,         "title": "Task Title",         "color": "blue",         "completed": true,         "createdAt": "2025-01-17T12:00:00.000Z",         "updatedAt": "2025-01-17T12:00:00.000Z"     }     `

**Validation Errors:**
`     If title or color is missing:     {         "err": "Title and color are required"     }     `

### **PUT /tasks/:id**

Update an existing task by its ID.

URL Parameter: `     :id: The ID of the task to update.     `

**Request Body:**
`     {         "title": "Updated Title",         "color": "red",         "completed": false     }     `

**Response Example:**
`     {         "id": 1,         "title": "Updated Title",         "color": "red",         "completed": false,         "createdAt": "2025-01-17T12:00:00.000Z",         "updatedAt": "2025-01-17T12:45:00.000Z"     }     `

**Errors:** ``` If the task with the given ID doesn't exist:

    {
        "err": "Task not found"
    }
    ```

### **DELETE /tasks/:id**

Delete a task by its ID.

URL Parameter: `     :id: The ID of the task to delete.     `

**Response:**

204 No Content

**Errors:**
`     If the task with the given ID doesn't exist:     {         "err": "Task not found"     }     `
