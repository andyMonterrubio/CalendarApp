import React from 'react';
import './App.css';
import Calendar from './components/Calendar'

import EventIcon from '@material-ui/icons/Event';
import {Grid } from '@material-ui/core'


function App() {
  return (
    <div className="App">
        <header>
          <Grid container className="title">
            <Grid item xs={12}>
              <EventIcon  style={{ fontSize: 45, verticalAlign: 'text-top', paddingRight: 10}}/>Calendar App
            </Grid>
          </Grid>
        </header>
        
        <Calendar />
    </div>
  );
}

export default App;
