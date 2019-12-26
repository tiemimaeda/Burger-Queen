import React from 'react';
import ShowMenu from './pages/Floor';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Nav from './components/Nav';

function App() {
  
  return (
   <Router>
     <Nav/>
    <div>
     <Switch>
        <Route path="/floor">
        <ShowMenu />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  </Router>
);
}

function Home() {
return <h2>Home</h2>;
}

export default App;