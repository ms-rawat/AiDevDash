// server.js

import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import connectDB from './db.js';
import { typeDefs } from './schema/typeDefs.js';
import resolvers from './schema/resolvers.js';

// Initialize Express app
const app = express();

// Connect to the database
// await connectDB();

// Create Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start Apollo Server
await server.start();

// Apply middleware
app.use(
  '/graphql',
  cors(),
  express.json(),
  expressMiddleware(server)
);

// Start the Express server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
});
