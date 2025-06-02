# Pingucrew Frontend Setup Guide

This document explains how to set up and run the Pingucrew frontend both locally and using Docker Compose.

---

## Running Locally

1. **Install Dependencies**:
   Ensure you have Node.js and npm installed. Then, install the required dependencies:

   ```bash
   npm install
   ```
2. **Start the Development Server**:

   - For testing purposes using React's Create React App (CRA):

     ```bash
     npm start
     ```

     The application will be available at `http://localhost:3000`.
   - For a semi-production environment using Webpack:

     ```bash
     npm run start-webpack
     ```

     The application will be available at `http://localhost:3000`.
3. **Build the Application**

   - For testing purposes using CRA:

     ```bash
     npm run build
     ```

     The build files will be generated in the `build/` directory.
   - For production using Webpack:

     ```bash
     npm run build-webpack
     ```

     The build files will be generated in the `dist/` directory.

---

## Running with Docker Compose

1. **Build and Start the Container**:
   Use Docker Compose to build and start the frontend container. The Webpack build will be deployed in an NGINX server:

   ```bash
   docker-compose up --build
   ```
2. **Access the Application**:
   Once the container is running, the application will be available at `http://localhost:3000`.
3. **Stop the Container**:
   To stop the container, run:

   ```bash
   docker-compose down
   ```

---

## Notes

- Ensure that the `config/frontend/config.yaml` file is correctly set up before running the application.
- For Docker Compose, make sure Docker and Docker Compose are installed on your system.
