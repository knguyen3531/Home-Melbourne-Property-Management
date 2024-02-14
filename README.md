# Property Management Application

Welcome to the Property Management Application, a comprehensive solution for managing properties, tenants, and maintenance requests with ease. This application provides tools for property owners and managers to streamline their management tasks and enhance the overall experience for tenants.

## Demo

You can view a live demo of the application [here](https://home-melbourne-793e701a0452.herokuapp.com/)


## Features

- **User Authentication**: Secure user authentication system to ensure only authorized users can access the application. ( Deploy 10.02.2024)

- **Dashboard**: An intuitive dashboard interface to view property details, tenant information, and pending maintenance requests. (Deploy 10.02.2024)

- **Property Management**: Tools for adding, editing, and deleting properties, including property details and rental information. ( Pending )

- **Tenant Management**: Features for managing tenant profiles, leases, rent payments, and communication. ( Pending )

- **Maintenance Requests**: Functionality for tenants to submit maintenance requests and for property managers to track and resolve them. ( Pending )

- **Reports and Analytics**: Generate reports and gain insights into property performance, occupancy rates, and financial metrics.  ( Pending )

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

## Installation

Before running the application, make sure to follow these steps:

1. If deploy local please pull from local branch:
  
  cd project_folder
  

  git pull origin local

        or else 

  Please continue to use main branch

  
2. Install dependencies for the server and client:

   ```bash
   npm install root

   npm install client

   npm install react --save root

   Install concurrently globally and as a development dependency:

   npm install -g concurrently root

   npm install concurrently --save-dev root

3. Create a .env file in the root directory and define the following environment variables:

MONGODB_URI=<your_database_URI>

JWT_SECRET=<your_JWT_secret>

PORT=5000 (if deploying locally else not need)

REACT_APP_GRAPHQL_ENDPOINT=http://localhost:5000/graphql (replace endpoint if deploying via Heroku)

4. Use this link for Heroku deployment: https://home-melbourne-793e701a0452.herokuapp

5. Seed the database (if required):

cd server

npm run seed

seed dummies password: 

*john.doe@example.com
  
*password123


*jane.smith@example.com
  
*qwerty456


*michael.johnson@example.com
*pass123

6. Run npm start in project root folder:

npm start

7. Open your browser and navigate to http://localhost:3000 to view the application.

## Usage
Upon launching the application, users will be directed to the home page.
There will be no sign up features in this application due to the business vision that it was setup, each account are manually configure and create via database creation or developer (owner version soon release).

Once logged in, users will have access to the dashboard, where manage and view their property details and payrent. Conmercialize payment set up will due to release on next update. Currently payment form are mock payment use to trigger post request and update paystatus. 

Users can navigate through different sections of the application using the sidebar navigation menu.

To log out, users can click on the logout button in the navigation menu.


Contributing


Contributions are welcome! If you find any issues or have suggestions for improvement, feel free to open an issue or create a pull request.


## License
Apache License


## Contact: https://github.com/knguyen3531/Home-Melbourne-Property-Management.git

Please refer to my github account for any updates and question answer regarding to this application
