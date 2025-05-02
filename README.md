# URL Shortening Service

[This URL shortening project](https://roadmap.sh/projects/url-shortening-service) is a robust RESTful API for shortening long URLs with statistics tracking capabilities. This service allows you to create, retrieve, update, and delete shortened URLs while providing usage statistics for each URL.

## Table of Contents

-   [Features](#features)
-   [Tech Stack](#tech-stack)
-   [Prerequisites](#prerequisites)
-   [Installation](#installation)
-   [Environment Variables](#environment-variables)
-   [Running the Application](#running-the-application)
-   [API Documentation](#api-documentation)
-   [Database Schema](#database-schema)
-   [Contributing](#contributing)
-   [Issues](#issues)
-   [Contributors](#contributors)
-   [License](#license)

## Features

-   **URL Shortening**: Convert long URLs into short, manageable links
-   **Statistics Tracking**: Monitor how many times each shortened URL has been accessed
-   **CRUD Operations**: Create, read, update, and delete shortened URLs
-   **Validation**: Input validation for URLs and request parameters
-   **Error Handling**: Comprehensive error handling with meaningful error messages
-   **Database Persistence**: Store shortened URLs in a PostgreSQL database
-   **Docker Support**: Easy setup with Docker and docker-compose

## Tech Stack

-   **Node.js** - JavaScript runtime environment
-   **Express.js** - Web application framework
-   **PostgreSQL** - Relational database
-   **Sequelize** - ORM for PostgreSQL
-   **Docker** - Containerization
-   **Joi** - Request validation
-   **Babel** - JavaScript compiler
-   **nanoid** - Unique ID generation for short URLs

## Prerequisites

-   Node.js (v14 or higher)
-   npm or yarn
-   Docker and docker-compose (optional, for containerized setup)

*   PostgreSQL (if not using Docker)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/fabiantcc1/url-shortening-service.git
cd url-shortening-service
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

Then edit the `.env` file with your configuration.

## Environment Variables

| Variable         | Description                                | Default Value         |
| ---------------- | ------------------------------------------ | --------------------- |
| NODE_ENV         | Environment (development/production)       | development           |
| NODE_PORT        | Port the application runs on               | 3000                  |
| NODE_URL         | Base URL for the application               | http://localhost:3000 |
| DB_HOST          | PostgreSQL host                            | localhost             |
| DB_PORT          | PostgreSQL port                            | 5432                  |
| DB_USER          | PostgreSQL username                        |                       |
| DB_PASSWORD      | PostgreSQL password                        |                       |
| DB_DATABASE      | PostgreSQL database name                   |                       |
| DB_URI           | PostgreSQL connection URI (for production) |                       |
| PGADMIN_EMAIL    | PgAdmin email (for Docker setup)           |                       |
| PGADMIN_PASSWORD | PgAdmin password (for Docker setup)        |                       |
| PGADMIN_PORT     | PgAdmin port (for Docker setup)            |                       |

## Running the Application

### Using Docker

1. Make sure you have Docker and docker-compose installed
2. Set up your environment variables in the `.env` file
3. Start the application:

```bash
docker-compose up -d
```

This will start the PostgreSQL database, PgAdmin for database management, and the API.

### Using Local Node.js

1. Make sure you have PostgreSQL installed and running
2. Set up your environment variables in the `.env` file
3. Run database migrations:

```bash
npm run migrations:run
```

4. Start the development server:

```bash
npm run dev
```

The server will run at http://localhost:3000 (or the port specified in your `.env` file).

## API Documentation

### Shorten URL

-   **URL**: `/api/v1/shorten`
-   **Method**: `POST`
-   **Request Body**:
    ```json
    {
        "url": "https://example.com/very/long/url/that/needs/shortening"
    }
    ```
-   **Success Response**: `201 Created`
    ```json
    {
        "id": 1,
        "originalUrl": "https://example.com/very/long/url/that/needs/shortening",
        "shortCode": "ab12cd34",
        "createdAt": "2025-04-28T10:00:00.000Z",
        "updatedAt": "2025-04-28T10:00:00.000Z"
    }
    ```

### Get URL Information

-   **URL**: `/api/v1/shorten/:shortCode`
-   **Method**: `GET`
-   **Success Response**: `200 OK`
    ```json
    {
        "id": 1,
        "originalUrl": "https://example.com/very/long/url/that/needs/shortening",
        "shortCode": "ab12cd34",
        "createdAt": "2025-04-28T10:00:00.000Z",
        "updatedAt": "2025-04-28T10:00:00.000Z"
    }
    ```

### Get URL Statistics

-   **URL**: `/api/v1/shorten/:shortCode/stats`
-   **Method**: `GET`
-   **Success Response**: `200 OK`
    ```json
    {
        "id": 1,
        "originalUrl": "https://example.com/very/long/url/that/needs/shortening",
        "shortCode": "ab12cd34",
        "statistics": 42,
        "createdAt": "2025-04-28T10:00:00.000Z",
        "updatedAt": "2025-04-28T10:00:00.000Z"
    }
    ```

### Update URL

-   **URL**: `/api/v1/shorten/:shortCode`
-   **Method**: `PATCH`
-   **Request Body**:
    ```json
    {
        "url": "https://example.com/new/destination"
    }
    ```
-   **Success Response**: `200 OK`
    ```json
    {
        "id": 1,
        "originalUrl": "https://example.com/new/destination",
        "shortCode": "ab12cd34",
        "createdAt": "2025-04-28T10:00:00.000Z",
        "updatedAt": "2025-04-28T10:30:00.000Z"
    }
    ```

### Delete URL

-   **URL**: `/api/v1/shorten/:shortCode`
-   **Method**: `DELETE`
-   **Success Response**: `204 No Content`

### Redirect to Original URL

-   **URL**: `/:shortCode`
-   **Method**: `GET`
-   **Success Response**: `301 Moved Permanently` (Redirects to the original URL)

### Common Error Responses

The API returns consistent error responses across all endpoints with the following structure:

```json
{
    "status": "error",
    "statusCode": 400,
    "error": "Bad Request",
    "message": "Error message details"
}
```

Common error status codes:

-   `400 Bad Request` - Invalid input or validation errors
-   `404 Not Found` - Resource not found
-   `500 Internal Server Error` - Server-side error

## Database Schema

The service uses a simple database schema with a single table:

**urls**

| Column       | Type    | Description                                                        |
| ------------ | ------- | ------------------------------------------------------------------ |
| id           | INTEGER | Primary key                                                        |
| original_url | STRING  | The original long URL                                              |
| short_code   | STRING  | The generated short code (unique)                                  |
| statistics   | INTEGER | Number of times the URL has been accessed                          |
| is_active    | BOOLEAN | Whether the short URL is active (historical records for deletions) |
| created_at   | DATE    | Creation timestamp                                                 |
| updated_at   | DATE    | Last update timestamp                                              |

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Best Practices

-   Follow the established code style (Prettier and EditorConfig configurations are included)
-   Write meaningful commit messages
-   Add appropriate tests for new features
-   Update documentation as needed

## Issues

If you encounter any problems or have suggestions for improvements, please report them on our [GitHub Issues page](https://github.com/fabiantcc1/url-shortening-service/issues).

When reporting an issue, please include:

-   A clear and descriptive title
-   Steps to reproduce the issue
-   Expected and actual behavior
-   Screenshots if applicable
-   Environment details (OS, browser, etc.)

## Contributors

-   [Fabian Montaño](https://github.com/fabiantcc1) - Project Lead

Want to be listed here? Make a contribution to the project!

## License

This project is licensed under the ISC License - see the LICENSE file for details.
