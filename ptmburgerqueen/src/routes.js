import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import ShowMenu from './pages/Floor';
import Kitchen from './pages/Kitchen';

function App() {
  
  return (
   <Router>
     <Navbar/>
    <div>
     <Switch>
        <Route path="/floor"> <ShowMenu /> </Route>
        <Route path="/kitchen"> <Kitchen /> </Route>
        <Route path="/"> </Route>

      </Switch>
    </div>
  </Router>
  );
}

export default App;