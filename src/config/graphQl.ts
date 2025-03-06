// import { ApolloServer } from "@apollo/server";
// import { startStandaloneServer } from "@apollo/server/standalone";
// import { typeDefs } from "../schemas/schema";

// export default async function graphQlInit() {

//     // Initialize the Apollo Server with both typeDefs and resolvers
//     const server = new ApolloServer({
//         typeDefs
//     });

//     // Start the server and listen on the specified port
//     const { url } = await startStandaloneServer(server, {

//         listen: { port: 4009 }
//     }

//     );
//     // Log the URL of the server
//     console.log(`GraphQL is running on ${url}`);

//     // Optionally, return the URL if you need it
//     return { url };

// }

