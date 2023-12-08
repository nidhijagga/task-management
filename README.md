
# Project Name
### task-management

## Project Overview

The Task Management App is a comprehensive solution for task management, featuring robust functionalities on both the frontend and backend. This well-performing application facilitates CRUD (Create, Read, Update, Delete) operations for tasks, as well as user authentication with login, signup, and logout capabilities.

### Frontend Features:

1. **Input Validation Error Handling:**
   - The frontend gracefully handles input validation errors, ensuring a smooth user experience.

2. **Animation with Framer Motion:**
   - Enhance user interactions and visual appeal through dynamic animations powered by Framer Motion.

3. **Private Routes:**
   - Utilizes private routes to restrict access to certain sections of the app, ensuring that only logged-in users can access privileged areas.

4. **Login/Signup:**
   - Provides secure and user-friendly login and signup functionalities for authentication.

5. **CRUD Operations for Tasks:**
   - Enables users to perform Create, Read, Update, and Delete operations on tasks, offering a complete task management experience.

6. **Toggle Task Status:**
   - Allows users to easily toggle the status of tasks between completed and not completed.

7. **Redux for API Calls and State Management:**
   - Implements Redux for handling API calls and efficiently managing application state.

8. **Lazy Loading Components:**
   - Optimizes performance by incorporating lazy loading for components, ensuring efficient resource utilization.

9. **App Layout:**
   - Designs a user-friendly and intuitive layout for the application.

10. **Tailwind CSS for Styling:**
    - Utilizes Tailwind CSS to streamline and enhance the styling of the application, promoting a consistent and visually appealing interface.

### Backend Features:

1. **Seperate Configuration for Database & Environment Variables:**
   - Organizes code by maintaining separate configurations for the database and environment variables.

2. **Utilities:**
   - Implements separate functionality for bcrypt to enhance security through password hashing.

3. **Middleware for JWT Authentication:**
   - Enhances security with JWT token-based authentication using middleware.

4. **CORS Usage:**
   - Implements Cross-Origin Resource Sharing (CORS) for secure communication between frontend and backend.

5. **One-to-Many Relationship:**
   - Establishes a one-to-many relationship between users and tasks for effective data organization.

This Task Management App demonstrates a high level of professionalism, efficiency, and security in both frontend and backend components, making it an ideal solution for effective task management.


## Prerequisites

Before you begin, ensure you have the following software/tools installed:

- [Node.js](https://nodejs.org/en/): The runtime environment for executing JavaScript code on the server.

- [npm](https://www.npmjs.com/): Package managers for Node.js to install project dependencies.

- [Express.js](https://expressjs.com/): A web application framework for Node.js, used for building the backend of the application.

- [React](https://reactjs.org/): A JavaScript library for building user interfaces, used for the frontend of the application.

- [Redux](https://redux.js.org/): A predictable state container for JavaScript apps, used for state management in the frontend.

- [SQL Database](#): MYSQL database for storing data. Ensure the database is installed and running on your system.


## Installation

Follow these steps to set up and run the Task Management App:

1. **Clone the repository:**

   ```bash
   git clone <repository-url>

2. **Navigate to the client folder:**

   ```bash
   cd client                                     
   npm install or #yarn install

3. Navigate to the client folder:
   ```bash
   cd client
   npm install # or yarn install

4. Create a .env file in the project (root folder) with the following environment variables
Replace <your_token_value>, <your_database_name>, <your_database_user>, <your_database_password>, and <your_preferred_port> with your actual values.
   ```bash
   touch .env
   "TOKEN=<your_token_value>" >> .env
   "DB_NAME=<your_database_name>" >> .env
   "DB_USER=<your_database_user>" >> .env
   "DB_PASSWORD=<your_database_password>" >> .env
   "PORT=<your_preferred_port>" >> .env

5. Start the client application:
   ```bash
   cd client
   npm start   # or yarn start

6. Start the server application:
   ```bash
   cd ../server  # Navigate back to the server folder
   npm start     # or yarn start

# Project File Structure

## client
- **public:**
  - Static assets (images, icons, etc.) go here.

- **src:**
  - **components:**
    - Reusable React components.
  - **pages:**
    - Components representing entire pages of the app.
  - **redux:**
    - **slices:**
      - Redux slice files for individual features.
    - **store:**
      - Redux store configuration.
  - **routes:**
    - App route definitions and configurations.
  - **App.js:**
    - Main component rendering the application.
  - **index.css:**
    - Global styles for the application.
  - **index.js:**
    - Entry point for the React application.

- **package.json:**
  - Dependencies and scripts for the client-side.

- **tailwind.config.css:**
  - Configuration file for Tailwind CSS.

## server
- **config:**
  - **db.js:**
    - Database configuration.
  - **env.js:**
    - Environment variables configuration.

- **controllers:**
  - Logic for handling route requests.

- **middleware:**
  - **auth.js:**
    - Authentication middleware.

- **models:**
  - **user.js:**
    - Model for user data.
  - **task.js:**
    - Model for task data.

- **routes:**
  - Route definitions.

- **utils:**
  - **bcryptUtils.js:**
    - Utility functions for bcrypt.

- **package.json:**
  - Dependencies and scripts for the server-side.

- **server.js:**
  - Entry point for the server.

**.env:**
- Environment variables file.

**.gitignore:**
- List of files and directories to be ignored by Git.
