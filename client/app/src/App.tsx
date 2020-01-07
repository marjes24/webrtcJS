import React from 'react';
import './App.css';
import { Conductor } from './components/Conductor';

const App: React.FC = () => {
    return (
        <div className="App">
            <h1>Simple WebRTC peer connection example</h1>
            <hr></hr>
            <Conductor />
        </div>
    );
};

export default App;
