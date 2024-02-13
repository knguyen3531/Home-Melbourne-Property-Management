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
    origin: 'https://home-melbourne-793e701a0452.herokuapp.com/graphql',
    credentials: true,
  };
  app.use(cors(corsOptions)); // Use CORS with your specified options

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  server.applyMiddleware({ app, cors: false, path: '/graphql' }); // Update to include the path

  // Serve static assets if in production
  if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static(path.join(__dirname, '../client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
    });
  }

  await connectDB();

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}${server.graphqlPath}`));
};

startServer();
