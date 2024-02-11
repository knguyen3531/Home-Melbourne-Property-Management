// server/server.js

require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/schemas/typeDefs');
const resolvers = require('./graphql/resolvers/resolver');
const connectDB = require('./config/database');
const seedDatabase = require('./seed');

console.log('MONGODB_URI:', process.env.MONGODB_URI);

const startServer = async () => {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  server.applyMiddleware({ app });

  await connectDB();

  // Seed the database
  await seedDatabase();

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}${server.graphqlPath}`));
};

startServer();
