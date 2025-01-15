# BMW_Aptitude_Test_Backend
Backend service for the BMW IT Internship aptitude test. Built using Express.js and MongoDB, it provides RESTful APIs for a Generic DataGrid component with CRUD operations, dynamic filtering, and search functionality. Developed with TypeScript for scalability and reliability.

# BMW IT Internship Backend Service

This repository hosts the backend service for the **Generic DataGrid Component** as part of the BMW IT Internship aptitude test.

## Features

- **RESTful APIs** to provide dynamic data for the DataGrid component.
- **CRUD Operations**: Add, view, update, and delete dataset entries.
- **Search and Filtering**:
  - Supports filtering with operators like `contains`, `equals`, `starts with`, `ends with`, and `is empty`.
  - Dynamic header-based search to enable flexible queries.
- **MongoDB Integration**: A NoSQL database used to store and manage the dataset.

## Tech Stack

- **Node.js** with **Express.js**: For server-side logic and API development.
- **MongoDB**: As the database for efficient NoSQL data management.
- **Mongoose**: To interact with MongoDB using an ORM.
- **TypeScript**: For a strongly-typed and scalable development approach.

## Installation and Setup

1. Clone this repository:
   ```bash
   git clone https://github.com/<your-username>/<repo-name>.git
   cd <repo-name>

2. Install dependencies:
   ```bash
   npm install

3. Configure the environment variables:
   Create a .env file in the root directory and add the following:
   PORT=7000
   DB_URL =mongodb+srv://<username>:<password>@cluster0.8alfj.mongodb.net/DataGridDb

4. Start the server:
   ```bash
    npm run dev
