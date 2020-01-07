import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Floor from './pages/Floor';
import Kitchen from './pages/Kitchen';

function App() {
  
  return (
   <Router>
     <Navbar/>
    <div>
     <Switch>
        <Route exact path="/" component={Floor}/>
        <Route path="/kitchen" component={Kitchen}/>

      </Switch>
    </div>
  </Router>
  );
}

export default App;