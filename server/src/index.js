import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import {ApolloClient,
  InMemoryCache, 
  ApolloProvider, 
  HttpLink, 
  from} from '@apollo/client';

import {onError} from '@apollo/client/link/error';

//Error handler for front end
const errorLink = onError(({grahqlErrors, newtowrkError})=>{
  if(grahqlErrors){

    grahqlErrors.map(({message, location, path})=>{
      // use error handler for your react app
     // toast.error(message)
    })
  }

  if(newtowrkError){
      // use error handler for your react app
       // toast.error(message)
  }
})

//listen from the backend server
const link = from([
  errorLink,
  new HttpLink({uri: "http://localhost:4000"})
])

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
})

const root = ReactDOM.createRoot(document.getElementById("root"));


root.render(
      <React.StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
</React.StrictMode>)