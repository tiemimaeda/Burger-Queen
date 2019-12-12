import React from 'react';
import './App.css';
import {firestore} from './firebase.js'

firestore.collection('Breakfast').get();

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello World</h1>
      </header>
    </div>
  );
}


export default App;
