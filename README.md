# DataSyncWithSheets

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Structure](#structure)
- [Schema](#schema)
- [Endpoints](#endpoints)
- [Deployment](#deployment)

## Introduction

This project is a Node.js server designed to synchronize data with a Google Sheet. The choice of technologies and architecture was driven by several considerations:

- **Express.js Framework:** Chosen for its simplicity, flexibility, and widely-adopted nature, Express.js is well-suited for building RESTful APIs. It allows us to define routes, middleware, and controllers with ease.

- **Google-spreadsheet Library:** Instead of using the Google Sheets API directly, we opted for the `google-spreadsheet` library. This library simplifies interactions with Google Sheets, making it more convenient for our use case.

- **TypeORM with PostgreSQL:** TypeORM provides a robust Object-Relational Mapping (ORM) solution for TypeScript and JavaScript. PostgreSQL, a powerful open-source database, was chosen for its reliability and support for complex queries.

- **TypeScript:** The decision to use TypeScript brings static typing to our codebase, enhancing code quality and providing better developer tooling.

## Installation

1. **Clone the repo**

```bash
github.com/andrey-lawyer/test-google-sheets
```

2. **Install dependencies** It's recommended to use npm:

```
npm install
```

3. **Create a .env file** in the root directory with the following content:

- POSTGRES_HOST=your_postgres_host
- POSTGRES_PORT_DB=your_postgres_port
- POSTGRES_USER=your_postgres_user
- POSTGRES_PASSWORD=your_postgres_password
- POSTGRES_DB=your_postgres_db
- GOOGLE_API_KEY = your_google_api_key
- DOC_ID = google_table_id

## Usage

This project is built using the following technologies:

- **Express.js:** A lightweight and flexible Node.js web application framework that simplifies the creation of robust APIs.

- **Google-spreadsheet:** A Node.js library that streamlines communication with Google Sheets, enabling seamless data synchronization.

- **Joi:** Chosen for its simplicity and effectiveness, Joi is used for schema validation, ensuring that the incoming data meets our defined criteria.

- **PostgreSQL:** The choice of PostgreSQL as the database system is motivated by its advanced features, scalability, and strong support for relational data.

- **TypeORM:** An ORM that simplifies database interactions, providing a convenient way to work with databases using TypeScript.

- **TypeScript:** TypeScript enhances code quality by introducing static typing, catching potential errors during development and improving overall maintainability.

## Structure

The project is structured as follows:

- src/config: Configuration files, including the database configuration.
- src/controllers: Express.js route controllers.
- src/entities: TypeORM entities representing database tables.
- src/middleware: Custom middleware functions.
- src/routes: Express.js route definitions.
- src/services: Business logic and external service interactions.

## Schema

The database schema includes tables for Product, Size, Model. The relationships between these tables allow for organizing products based on various criteria.

## Endpoints

- `GET /products`: Retrieve all products.
- `GET /products/:productId`: Retrieve a specific product by ID.
- `PATCH /products/:productId`: Update the name of a specific product and optionally the category

## Deployment

The project is currently deployed on [Render](https://node-google-sheets2.onrender.com). The database is hosted using the capabilities of [Supabase](https://supabase.com).

Feel free to check the live deployment and interact with the application.
