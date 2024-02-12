require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path'); // Import path module for file paths
const typeDefs = require('./graphql/schemas/typeDefs');
const resolvers = require('./graphql/resolvers/resolver');
const connectDB = require('./config/database');
const cors = require('cors');

console.log('MONGODB_URI:', process.env.MONGODB_URI);

const startServer = async () => {
  const app = express();

  // Configure CORS here
  const corsOptions = {
    origin: 'https://home-melbourne-793e701a0452.herokuapp.com', // Adjust this to your frontend's URL
    credentials: true, // Allows cookies to be sent alongside the request if needed
  };
  app.use(cors(corsOptions)); // Use CORS with your specified options

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  server.applyMiddleware({ app, cors: false, path: '/graphql' }); // Update to include the path

  // Serve the static files from the React app
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    // Route all other requests to React app's index.html
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
  }

  await connectDB();

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}${server.graphqlPath}`));
};

startServer();
