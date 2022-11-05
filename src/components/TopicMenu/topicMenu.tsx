import React from 'react'
import {Topic} from '../../popup/topics'
import {Typography, MenuItem, FormControl, Select } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';


const TopicMenu: React.FC<{
  topic: Topic,
  setTopic
}> = ({ topic,setTopic }) => {

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

  return (
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
              <Typography align="center"> {Topic.Weather} </Typography>
          </MenuItem>
          <MenuItem value={Topic.Restaurant}>
               <Typography align="center"> {Topic.Restaurant} </Typography>
           </MenuItem>
       </Select>
      </FormControl>
    )
  }

  export default TopicMenu
