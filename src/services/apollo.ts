import { ApolloClient, InMemoryCache } from "@apollo/client";

const serverUrl =
  import.meta.env.VITE_GRAPHQL_SERVER || "http://localhost:4000";

const client = new ApolloClient({
  uri: serverUrl,
  cache: new InMemoryCache(),
});

export default client;
