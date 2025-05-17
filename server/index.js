import { ApolloServer } from 'apollo-server-express';
import express from 'express'
import cors from 'cors'
const app = express();
app.use(cors());
import { typeDefs } from './schema/typeDefs.js';
import { resolvers } from './schema/resolvers.js';
import connectDB from './db.js';



await connectDB()
const server = new ApolloServer({
    typeDefs,
    resolvers
})


await server.start();
server.applyMiddleware({app});

const PORT = process.env.PORT || 4000;
app.listen(PORT,()=>console.log(`Server ready at localhost @port4000 ${server.graphqlPath}`))