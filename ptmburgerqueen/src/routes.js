import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Header from './components/Header';
import ShowMenu from './pages/Floor';
import Kitchen from './pages/Kitchen';

function App() {
  
  return (
   <Router>
     <Header/>
    <div>
     <Switch>
        <Route path="/floor"> <ShowMenu /> </Route>
        <Route path="/kitchen"> <Kitchen /> </Route>
      </Switch>
    </div>
  </Router>
  );
}

export default App;