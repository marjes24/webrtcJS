import React from 'react';
import './App.css';
import { Conductor } from './components/Conductor';
import { Typography } from '@material-ui/core';

const App: React.FC = () => {
    return (
        <div className="App">
            <Typography component="h4" variant="h4">
                WebRTC Peer Connection Sample
            </Typography>
            <hr></hr>
            <Conductor />
        </div>
    );
};

export default App;
