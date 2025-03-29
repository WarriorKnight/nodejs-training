# Node.js training

### 1. Hello World!
Starts a server using express, and server .html containing "Hello, World!".

### 2. Name days CLI
CLI that inputs a Czech name, and returns name day of that name.
- **Usage:**
    - Run the CLI tool by typing `svatky <name>` in your terminal.
    - Example:
        ```bash
        svatky Vojtěch
        ```
    - If the name is found, the tool will display the name day in the format `name má svátek DD.MM`.
    - If the name is not found, it will prompt you to check the entered name.
    - Use `svatky help` to display usage instructions.

### 3. Web Scraper
A script that scrapes product prices from a test e-commerce site and calculates total and average prices.

### 5. Globe Visitor Tracker
A web application that tracks and visualizes visitor locations on a 3D globe.

- **Features:**
  - Used **Express.js** to log visitor IP addresses and fetch geolocation data, storing it in a JSON file.
  - Dockerized using **Docker**.
  - Frontend built with **React** using `react-globe.gl` to display the locations.
  - **Note:** This project was primarily an experiment to try out various skills learned from previous            projects—using Docker, interacting with the filesystem, and making API calls. As such, aspects like using a JSON file as a database or handling multiple entries per IP were not the main focus.
  - **Live Demo:** [Spin the globe](https://nodejs-training-production-6599.up.railway.app/)

### 6. Quote API
An API for managing quotes, built with **Express.js** and **MongoDB**. The API allows users to retrieve and manage quotes, with support for categories.

- **Features:**
  - Retrieve random quotes or filter quotes by category.
  - Built with **Mongoose** for MongoDB integration.
  - Includes CORS support for cross-origin requests.
  - Dockerized for easy deployment.
  - **Live Demo:** [Retrieve a random quote](https://quotes-api-production-1489.up.railway.app/api/quotes/random/)