require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/schemas/typeDefs');
const resolvers = require('./graphql/resolvers/resolver');
const connectDB = require('./config/database');
const cors = require('cors'); // Import CORS

console.log('MONGODB_URI:', process.env.MONGODB_URI);

const startServer = async () => {
  const app = express();

  // Configure CORS here
  const corsOptions = {
    origin: 'https://home-melbourne-793e701a0452.herokuapp.com', // Adjust this to your frontend's URL
    credentials: true, // Allows cookies to be sent alongside the request if needed
  };
  app.use(cors(corsOptions)); 

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  server.applyMiddleware({ app, cors: false });

  await connectDB();

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}${server.graphqlPath}`));
};

startServer();
