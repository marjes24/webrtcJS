import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Conductor } from "./components/Conductor";

const App: React.FC = () => {
  return (
    <div className="App">
      <Conductor />
    </div>
  );
}

export default App;
