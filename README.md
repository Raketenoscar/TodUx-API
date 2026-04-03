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
git clone https://github.com/Raketenoscar/TodUx-API.git
cd TodUx-API
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and copy paste the `.env.example` file in there. Then change the Values.

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

API Documentation can be found [here](https://todux.online/cheatsheet)

### Available Scripts

- `npm start` - Run the production server
- `npm run dev` - Run the development server with auto-reload

### Code Quality

The project uses ESLint for code quality. Configuration is in `eslint.config.js`.

## Contributing

Contributions are welcome. For more Infos read the [contributions.md](/contributions.md)

## License

MIT License - see LICENSE file for details

## Author

Raketenoscar
