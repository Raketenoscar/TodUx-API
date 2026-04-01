# TodUx API

## Overview

TodUx API enables you to manage users and their todos with a focus on security and simplicity. The API uses JWT-based authentication, stores data in MongoDB, and includes built-in protection against abuse through ArcJet.

## Features

- **User Authentication**: Secure registration and login using JWT tokens
- **Todo Management**: Create, read, update, and delete todos
- **User Profiles**: Manage user information with email verification
- **Secure Passwords**: Hashed Passwords using bcryptjs before storage
- **Security**: ArcJet integration for rate limiting and abuse prevention
- **MongoDB Integration**: Reliable data persistence with Mongoose ODM
- **Timestamps**: Automatic creation and modification timestamps on all resources
- **Error Handling**: Clear error messages that help identify and resolve issues quickly

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB instance running (local or cloud)
- npm package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Raketenoscar/TodUx-backend.git
cd TodUx-backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```
NODE_ENV="development" or "production"
PORT=3000
MONGODB_URI="your_mongodb_connection_string"
JWT_SECRET="your_secret_key"
ARCJET_KEY="your_arcjet_api_key"
ARCJET_ENV="development" or "production"
DOMAIN="http://localhost:3000" for development. For Production use your real domain (https://yourdomain.com)
SEC_DOMAIN="http://127.0.0.1:3000" for development. For Production use your real secondary domain (https://www.yourdomain.com)
```

4. Start the server:

For development (with auto-reload):

```bash
npm run dev
```

For production:

```bash
npm start
```

The server will start on the port specified in your `.env` file (default: 3000).

## API Documentation

### Base URL

All API endpoints are prefixed with `/api`. For example, to access the authentication endpoints, use `/api/auth`.

### Response Format

All API responses follow a consistent JSON structure:

```json
{
  "success": true,
  "message": "Description of the response",
  "data": {}
}
```

For list endpoints, the response includes a count:

```json
{
  "success": true,
  "data": [],
  "count": 0
}
```

### Authentication

Protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

The token is obtained during login or registration and expires according to your JWT configuration.

## Endpoints

### Authentication Endpoints

#### Register User

```
POST /api/auth/sign-up
```

Register a new user account.

**Request Body:**

```json
{
  "name": "John Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "username": "johndoe",
      "email": "john@example.com",
      "role": "user",
      "createdAt": "2026-04-01T10:30:00.000Z",
      "updatedAt": "2026-04-01T10:30:00.000Z"
    }
  }
}
```

**Possible Status Codes:**

- `201 Created`: User successfully registered
- `400 Bad Request`: Invalid input or missing fields
- `409 Conflict`: Email or username already exists

#### Login User

```
POST /api/auth/sign-in
```

Authenticate a user and receive a JWT token.

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

**Possible Status Codes:**

- `200 OK`: Successfully logged in
- `400 Bad Request`: Missing email or password
- `404 Not Found`: User with provided email doesn't exist

### Todo Endpoints

All todo endpoints require authentication.

#### List All Todos

```
GET /api/todos
```

Retrieve all todos for the authenticated user.

**Headers:**

```
Authorization: Bearer <your_jwt_token>
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": [
    {
      "_id": "507f2f77bcf86cd799439012",
      "title": "Buy groceries",
      "completed": false,
      "dueDate": "2026-04-15",
      "user": "507f1f77bcf86cd799439011",
      "createdAt": "2026-04-01T10:30:00.000Z",
      "updatedAt": "2026-04-01T10:30:00.000Z"
    }
  ],
  "count": 1
}
```

#### Create Todo

```
POST /api/todos
```

Create a new todo for the authenticated user.

**Headers:**

```
Authorization: Bearer <your_jwt_token>
```

**Request Body:**

```json
{
  "title": "Buy groceries",
  "dueDate": "2026-04-15"
}
```

The `dueDate` field is optional.

**Response (201 Created):**

```json
{
  "success": true,
  "message": "Todo Created",
  "data": {
    "_id": "507f2f77bcf86cd799439012",
    "title": "Buy groceries",
    "completed": false,
    "dueDate": "2026-04-15",
    "user": "507f1f77bcf86cd799439011",
    "createdAt": "2026-04-01T10:30:00.000Z",
    "updatedAt": "2026-04-01T10:30:00.000Z"
  }
}
```

**Possible Status Codes:**

- `201 Created`: Todo successfully created
- `400 Bad Request`: Missing required fields
- `401 Unauthorized`: Missing or invalid authentication token

#### Update Todo

```
PUT /api/todos/:id
```

Update an existing todo. All fields are optional, and only provided fields will be updated.

**Headers:**

```
Authorization: Bearer <your_jwt_token>
```

**Request Body (all optional):**

```json
{
  "title": "Updated task title",
  "dueDate": "2026-05-20",
  "completed": true
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Todo Updated",
  "data": {
    "_id": "507f2f77bcf86cd799439012",
    "title": "Updated task title",
    "completed": false,
    "dueDate": "2026-05-20",
    "user": "507f1f77bcf86cd799439011",
    "createdAt": "2026-04-01T10:30:00.000Z",
    "updatedAt": "2026-04-01T12:00:00.000Z"
  }
}
```

**Possible Status Codes:**

- `200 OK`: Todo successfully updated
- `404 Not Found`: Todo with specified ID not found or doesn't belong to user
- `401 Unauthorized`: Missing or invalid authentication token

#### Delete Todo

```
DELETE /api/todos/:id
```

Delete an existing todo.

**Headers:**

```
Authorization: Bearer <your_jwt_token>
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Todo Deleted"
}
```

**Possible Status Codes:**

- `200 OK`: Todo successfully deleted
- `404 Not Found`: Todo with specified ID not found or doesn't belong to user
- `401 Unauthorized`: Missing or invalid authentication token

### User Endpoints

All user endpoints require authentication.

#### Get User Profile

```
GET /api/users
```

Retrieve the profile of the authenticated user.

**Headers:**

```
Authorization: Bearer <your_jwt_token>
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "username": "johndoe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2026-04-01T10:30:00.000Z",
    "updatedAt": "2026-04-01T10:30:00.000Z"
  }
}
```

#### Update User Profile

```
PUT /api/users
```

Update the authenticated user's profile. All fields are optional.

**Headers:**

```
Authorization: Bearer <your_jwt_token>
```

**Request Body (all optional):**

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "newpassword123"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Jane Doe",
    "username": "johndoe",
    "email": "jane@example.com",
    "role": "user",
    "updatedAt": "2026-04-01T12:00:00.000Z"
  }
}
```

**Possible Status Codes:**

- `200 OK`: Profile successfully updated
- `409 Conflict`: Email already in use by another user
- `401 Unauthorized`: Missing or invalid authentication token

#### Delete User Account

```
DELETE /api/users
```

Permanently delete the authenticated user's account and all associated data.

**Headers:**

```
Authorization: Bearer <your_jwt_token>
```

**Response (200 OK):**

```json
{
  "success": true,
  "message": "User account deleted successfully"
}
```

**Possible Status Codes:**

- `200 OK`: Account successfully deleted
- `401 Unauthorized`: Missing or invalid authentication token

## Data Models

### User Model

Users are stored with the following fields:

| Field     | Type   | Required | Notes                                        |
| --------- | ------ | -------- | -------------------------------------------- |
| name      | String | Yes      | Between 3-50 characters                      |
| username  | String | Yes      | Between 3-15 characters                      |
| email     | String | Yes      | Valid email format                           |
| password  | String | Yes      | Minimum 6 characters                         |
| role      | String | No       | Either "user" or "admin", defaults to "user" |
| createdAt | Date   | Auto     | Set when user is created                     |
| updatedAt | Date   | Auto     | Updated whenever user is modified            |

### Todo Model

Todos are stored with the following fields:

| Field     | Type     | Required | Notes                                    |
| --------- | -------- | -------- | ---------------------------------------- |
| title     | String   | Yes      | Maximum 100 characters                   |
| completed | Boolean  | No       | Defaults to false                        |
| dueDate   | Date     | No       | Optional due date for the todo           |
| user      | ObjectId | Yes      | Reference to the User who owns this todo |
| createdAt | Date     | Auto     | Set when todo is created                 |
| updatedAt | Date     | Auto     | Updated whenever todo is modified        |

## Error Handling

The API returns appropriate HTTP status codes and error messages:

```json
{
  "success": false,
  "message": "Description of what went wrong"
}
```

### Common Status Codes

- `200 OK`: Request succeeded
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid input or missing required fields
- `401 Unauthorized`: Missing or invalid authentication token
- `404 Not Found`: Resource not found
- `409 Conflict`: Resource conflict (e.g., duplicate email)
- `429 Too Many Requests`: Rate limit exceeded (ArcJet)
- `500 Internal Server Error`: Server error

## Public Pages

The API serves a small frontend and 2 error pages:

- `/` - Main landing page (index.html)
- `/cheatsheet` - Interactive API documentation
- `/404` - Custom 404 error page
- `/429` - Custom Rate Limit error page

## Development

### Project Structure

```
├── config/              # Configuration files
│   ├── env.js          # Environment variables
│   └── arcjet.js       # ArcJet configuration
├── controllers/         #  Controllers
│   ├── auth.controller.js
│   ├── todo.controller.js
│   └── user.controller.js
├── db/                  # Database configuration
│   └── mongodb.js
├── middlewares/         # Express middlewares
│   ├── auth.middleware.js
│   ├── cors.middleware.js
│   ├── arcjet.middleware.js
│   └── error.middleware.js
├── models/              # Mongoose schemas
│   ├── todo.model.js
│   └── user.model.js
├── routes/              # API routes
│   ├── auth.routes.js
│   ├── todo.routes.js
│   └── user.routes.js
├── public/              # Frontend Files
│   ├── index.html
│   ├── 404.html
│   ├── 429.html
│   ├── cheatsheet.html
│   └── static/
├── server.js            # Main application entry point
└── package.json         # Dependencies and scripts
```

### Available Scripts

- `npm start` - Run the production server
- `npm run dev` - Run the development server with auto-reload

### Code Quality

The project uses ESLint for code quality. Configuration is in `eslint.config.js`.

## Contributing

Contributions are welcome. Please ensure to follow the Projects License for any Distribution/Publishing

## License

MIT License - see LICENSE file for details

## Author

Raketenoscar
