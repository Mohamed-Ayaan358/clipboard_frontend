import * as React from "react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { Auth0ProviderWithHistory } from "./auth";
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
      <Auth0ProviderWithHistory>
        <App />
      </Auth0ProviderWithHistory>
    </StyledEngineProvider>
  </ApolloProvider>,
  document.querySelector("#root")
);
