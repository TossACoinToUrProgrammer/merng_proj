import React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';

import App from './App';

const httplLink = createHttpLink({
    uri: 'http://localhost:5000'
});

const client = new ApolloClient({
    link: httplLink,
    cache: new InMemoryCache()
});

export default (
    <ApolloProvider client = {client}>
        <App/>
    </ApolloProvider>
)