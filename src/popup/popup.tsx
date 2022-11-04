import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { Box, Typography, MenuItem, FormControl, Select } from '@material-ui/core'
import 'fontsource-roboto'
import './popup.css'
import { makeStyles } from '@material-ui/core/styles';
import {Topic} from './topics'
import WeatherPopup from '../components/WeatherPopup'
import RestaurantPopup from '../components/RestaurantPopup'

// https://v4.mui.com/components/selects/
const App: React.FC<{}> = () => {
  const [topic, setTopic] = useState<Topic>(Topic.None)
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      // controls the width of select menu
      minWidth: 430,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  const classes = useStyles();

  // case1: return if nothing card foreach api?????? 1 topic to many api and dataset
  return (
    <Box mx="8px" my="16px">
      <FormControl color='primary' className={classes.formControl}>
       <Select
         style={{ backgroundColor: "white" }}
         labelId="demo-simple-select-helper-label"
         id="demo-simple-select-helper"
         value={topic}
         onChange={(event) => setTopic(event.target.value as Topic)}
       >
         <MenuItem value={Topic.None}>
              <Typography align="center"> Select a topic </Typography>
          </MenuItem>
         <MenuItem value={Topic.Weather}>
              <Typography align="center"> Weather </Typography>
          </MenuItem>
          <MenuItem value={Topic.Restaurant}>
               <Typography align="center"> Restaurant </Typography>
           </MenuItem>
       </Select>
      </FormControl>
      <WeatherPopup topic={topic}/>
      <RestaurantPopup topic={topic}/>
    </Box>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
