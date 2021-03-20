require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers')
const MONGODB  =  process.env.MONGODB;
const PORT =  process.env.PORT;

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => ({ req })
});

mongoose
	.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log("mongodb connected")
		return server.listen(PORT)
	})
	.then(res => {
		console.log(`Server running at ${res.url}`)
	})