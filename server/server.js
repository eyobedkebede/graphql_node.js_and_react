const {ApolloServer} = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone');

// DB Connection
const db_conn = require("./db/index");

//Schema
const {typeDefs} = require('./schema')

//Resolver
const {resolvers} = require('./resolvers');

const server = new ApolloServer({
    typeDefs,
    resolvers,
});
  
async function startGQ(){
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
    });
    console.log(`🚀  Server ready at: ${url}`);
}

startGQ();

// Majestic Close
process.on("SIGINT", () => {
    db_conn.close(() => {
        console.log(`DB is closing`);
    });
});