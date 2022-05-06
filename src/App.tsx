import { Fragment } from "react";
import Header from "./Components/Header/Header";
import {  Switch , Route } from 'react-router-dom'
import AddPatient from './Components/AddPatients/AddPatients'
import Administrator from "./Components/Admin/Admin";
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client';
import Home from "./Components/Home/Home";


const client = new ApolloClient({
  uri: "http://localhost:9090/gq",
  cache: new InMemoryCache()
})

function App() {
  return(
    <Fragment>
      <div className="container">
        <Header />
      </div>

      <div className="container">
        <Switch>
            <Route path='/home' exact>
              <Home></Home>
            </Route>
            <Route path='/addpatient'>
            <ApolloProvider client={client}>
              <AddPatient />
              </ApolloProvider>
            </Route>
            <Route path='/administrator'>
            <ApolloProvider client={client}>
              <Administrator />
            </ApolloProvider>
            </Route>
        </Switch>
      </div>
    </Fragment>
  )
}

export default App;