import * as React from "react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import ReactDOM from "react-dom";
import { StyledEngineProvider } from "@mui/material/styles";
import App from "./App";
import "./index.css";

const client = new ApolloClient({
  uri: "https://navin.works:8443/graphql",
  cache: new InMemoryCache(),
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
