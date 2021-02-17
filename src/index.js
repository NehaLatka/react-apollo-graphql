import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import reportWebVitals from './reportWebVitals';

const client = new ApolloClient({
  uri: "http://178.128.63.115:4001/graphql",
  fetchOptions: {
    credentials: "include"
  },
  onError: ({ networkError }) => {
    if (networkError) {
      console.log("Network Error", networkError);
    }
   // if (networkError.statusCode === 401) {
     // localStorage.removeItem("token");
    //}
    if (networkError === undefined) {
      console.log("There is a problem.");
    }
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
    </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
