import React from 'react';
import './App.css';
import { Conductor } from './components/Conductor';
import { Typography, ThemeProvider } from '@material-ui/core';
import { theme } from './components/styleComponents/theme';

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <Typography component="h4" variant="h4">
                    WebRTC Peer Connection Sample
                </Typography>
                <hr></hr>
                <Conductor />
            </div>
        </ThemeProvider>
    );
};

export default App;
