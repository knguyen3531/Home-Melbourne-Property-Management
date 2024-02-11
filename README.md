# Property Management Application

Welcome to the Property Management Application, a comprehensive solution for managing properties, tenants, and maintenance requests with ease. This application provides tools for property owners and managers to streamline their management tasks and enhance the overall experience for tenants.

## Features

- **User Authentication**: Secure user authentication system to ensure only authorized users can access the application.
- **Dashboard**: An intuitive dashboard interface to view property details, tenant information, and pending maintenance requests.
- **Property Management**: Tools for adding, editing, and deleting properties, including property details and rental information.
- **Tenant Management**: Features for managing tenant profiles, leases, rent payments, and communication.
- **Maintenance Requests**: Functionality for tenants to submit maintenance requests and for property managers to track and resolve them.
- **Reports and Analytics**: Generate reports and gain insights into property performance, occupancy rates, and financial metrics.

## Technologies Used

- **Frontend**:
  - React.js
  - Apollo Client (GraphQL)
  - React Router (for routing)
  - Bootstrap (for styling)
  
- **Backend**:
  - Node.js
  - Express.js
  - Apollo Server (GraphQL)
  - MongoDB (Database)
  - Mongoose (ODM)
  
- **Authentication**:
  - JSON Web Tokens (JWT) for authentication and authorization
  
- **Deployment**:
  - Deployment on Heroku for backend
  - Deployment on Netlify/Vercel for frontend (if applicable)

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/knguyen3531/Home-Melbourne-Property-Management.git
Navigate to the project directory:

bash
Copy code
cd property-management-app

2. Install dependencies for the server:

bash
Copy code
cd server
npm install

3. Install dependencies for the client:

bash
Copy code
cd ../client
npm install

4. Create a .env file in the server directory and add the necessary environment variables (e.g., MongoDB URI, JWT secret).

5. Seed the database (if required):

bash
Copy code
npm run seed
Start the server:

bash
Copy code
npm start

6. Start the client (in a separate terminal):

bash
Copy code
cd client
npm start
Open your browser and navigate to http://localhost:3000 to view the application.

## Usage
Upon launching the application, users will be directed to the login page.
New users can create an account, while existing users can log in with their credentials.
Once logged in, users will have access to the dashboard, where they can manage properties, tenants, and maintenance requests.
Users can navigate through different sections of the application using the sidebar navigation menu.
To log out, users can click on the logout button in the navigation menu.
Contributing
Contributions are welcome! If you find any issues or have suggestions for improvement, feel free to open an issue or create a pull request.

## License
MIT License
