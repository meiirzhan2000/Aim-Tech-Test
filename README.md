## Installation

### Frontend

To get started with the frontend part of this project, follow the steps below:

1. **Clone the Repository**

    ```bash
    git clone https://github.com/meiirzhan2000/Aim-Tech-Test.git
    ```

2. **Navigate to the Frontend Directory**

    ```bash
    cd Aim-Tech-Test/designer-app
    ```

3. **Install Dependencies**

    Make sure you have [Node.js](https://nodejs.org/) installed. Then, run the following command to install the project dependencies:

    ```bash
    npm install
    ```

### Backend

To get started with the backend part of this project, follow the steps below:

1. **Navigate to the Backend Directory**

    ```bash
    cd Aim-Tech-Test/backend
    ```

2. **Install Dependencies**

    Make sure you have [Node.js](https://nodejs.org/) installed. Then, run the following command to install the project dependencies:

    ```bash
    npm install
    ```

## Running the Project

### Frontend

1. **Start the Development Server**

    ```bash
    npm run dev
    ```

    This will start the Vite development server. You can access the application at `http://localhost:3000`.

2. **Build the Project for Production**

    To build the project for production, run:

    ```bash
    npm run build
    ```

    The built files will be output to the `dist` directory.

3. **Preview the Production Build**

    To preview the production build locally, run:

    ```bash
    npm run preview
    ```

### Backend

1. **Start the Development Server**

    ```bash
    npm run dev
    ```

    This will start the Node.js server. You can access the backend API at `http://localhost:5000`.

2. **Build the Project for Production**

    To build the project for production, run:

    ```bash
    npm run build
    ```

3. **Start the Production Server**

    To start the production server, run:

    ```bash
    npm start
    ```

## Project Structure

### Frontend

- `src/`: Contains the source code of the application.
  - `components/`: Vue components.
  - `composables/`: Custom composables for reusable logic.
  - `pages/`: Page components for different routes.
  - `router/`: Vue Router configuration.
  - `store/`: State management using Vuex or Pinia.
  - `assets/`: Static assets like images and styles.
- `public/`: Public assets that will be copied to the root of the dist directory.
- `index.html`: Entry HTML file.
- `vite.config.ts`: Vite configuration file.

### Backend

- `src/`: Contains the source code of the backend application.
  - `controllers/`: Contains the controller logic for handling requests.
  - `models/`: Contains the database models.
  - `routes/`: Contains the route definitions.
  - `services/`: Contains the service logic.
  - `index.ts`: Entry point for the application.
- `package.json`: Contains the project configuration and dependencies.
- `tsconfig.json`: TypeScript configuration file.
- `render.yaml`: Configuration for deployment on Render.

## Contributing

Contributions are welcome! Please fork the repository and open a pull request with your changes.
