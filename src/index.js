import * as React from "react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import ReactDOM from "react-dom";
import { StyledEngineProvider } from "@mui/material/styles";
import App from "./App";
import "./index.css";
const cache = new InMemoryCache({
  typePolicies: {
    User: {
      keyFields: ["username"],
    },
    Todo: {
      keyFields: ["title", "date"],
    },
  },
});
const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  cache: cache,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <StyledEngineProvider injectFirst>
      <App />
      {/* <Land /> */}
      {/* This must be the main thing here and have a link to het started on it to take */}
    </StyledEngineProvider>
  </ApolloProvider>,
  document.querySelector("#root")
);
