import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { Box, Grid, InputBase, IconButton, Paper, Typography } from '@material-ui/core'
import {Add as AddIcon, PictureInPicture as PictureInPictureIcon,} from '@material-ui/icons'
import 'fontsource-roboto'
import './popup.css'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {Topic} from './topics'
import WeatherCard from '../components/WeatherCard'

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

  // case1: return if nothing
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
     {/* this is equiv to if (topic==weather)then render topic component */}
     {/* for warning in prev weather go to weathercard.tsx and change justify to justifycontent */}
     {topic == Topic.Weather &&
       <div>
       <WeatherCard city={'Seattle'} tempScale={'metric'} />
       <WeatherCard city={'Toronto'} tempScale={'metric'} />
       </div>
     }
     {topic == Topic.Restaurant &&
       <WeatherCard city={'London'} tempScale={'metric'} />

     }
    </Box>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
