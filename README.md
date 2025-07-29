# Chirp-ts

## Table of Contents
* [About The Project](#about-the-project)
* [Key Features](#key-features)
* [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [How to Use](#how-to-use)
* [Roadmap](#roadmap)
* [Acknowledgments](#acknowledgments)

---

### About The Project

This project is a custom-built HTTP server written in **TypeScript** that demonstrates the fundamental components of a web service like X (formerly Twitter). It handles API requests, interacts with a PostgreSQL database, and manages user authentication. This project was developed to showcase an understanding of backend development concepts and practices.

---

### Key Features

* **API Development**: Implements various API endpoints for creating, reading, updating, and deleting "chirps" (the equivalent of tweets) and managing users.
* **User Authentication**: Includes a complete authentication system with password hashing and JSON Web Tokens (JWT) for secure user login and access control.
* **Database Integration**: Utilizes a PostgreSQL database with schema management and migrations to store user and chirp data.
* **Asynchronous Operations**: Employs asynchronous programming with `async/await` to handle non-blocking I/O operations efficiently.
* **Custom Error Handling**: Implements a middleware-based error handling system to manage different types of application errors gracefully.
* **Refresh Tokens**: Supports refresh tokens for persistent login sessions.
* **Webhooks**: Includes a webhook handler for external services to interact with the application.

---

### Built With

* [TypeScript](https://www.typescriptlang.org/)
* [Node.js](https://nodejs.org/)
* [Express.js](https://expressjs.com/)
* [PostgreSQL](https://www.postgresql.org/)
* [Drizzle ORM](https://orm.drizzle.team/)
* [Vitest](https://vitest.dev/)

---

### Getting Started

To get a local copy up and running, follow these simple steps.

#### Prerequisites

* Node.js and npm installed on your system.
* A running PostgreSQL instance.

#### Installation

1.  Clone this repository:
    ```sh
    git clone [https://github.com/Sanghun1Adam1Park/chirp-ts](https://github.com/Sanghun1Adam1Park/chirp-ts)
    ```
2.  Navigate to the project directory:
    ```sh
    cd chirp-ts
    ```
3.  Install NPM packages:
    ```sh
    npm install
    ```
4.  Create a `.env` file in the root of the project and add the following environment variables:
    ```
    PORT=8080
    PLATFORM=dev
    SECRET=a_very_secret_key
    POLKA_KEY=a_very_secret_polka_key
    DB_URL=your_postgresql_database_url
    ```

---

### How to Use

The server can be run using the following npm scripts:

* **Build the project**:
    ```sh
    npm run build
    ```
* **Start the server**:
    ```sh
    npm run start
    ```
* **Run in development mode (build and start)**:
    ```sh
    npm run dev
    ```
* **Run tests**:
    ```sh
    npm run test
    ```

---

### Acknowledgments

* Boot.dev - Backend dev Tutorial