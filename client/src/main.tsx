import { createRoot } from "react-dom/client";
import "./index.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { Provider } from "react-redux";
import { store } from "./Redux/Store.ts";
import App from "./App.tsx";

const Client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  // uri:'https://aidevdash.onrender.com',
  cache: new InMemoryCache(),
});

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ApolloProvider client={Client}>
      <App />
    </ApolloProvider>
  </Provider>
);
