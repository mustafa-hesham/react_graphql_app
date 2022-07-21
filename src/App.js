import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from '@apollo/client';
import {onError} from '@apollo/client/link/error'
import './App.css';
import GetCountries from './Component/GetCountries';

const errorLink = onError(({graphqlErrors, networkError}) => {
    if (graphqlErrors) {
      graphqlErrors.map(({message, location, path}) => {
        return (`Graphql error ${message}`);
      })
    }
});

const link = from([
  errorLink,
  new HttpLink({uri: "https://countries.trevorblades.com/"}),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
});

function App() {
  return (
    <div className="App">
        <ApolloProvider client={client}>{" "}<GetCountries /></ApolloProvider>
    </div>
  );
}

export default App;
