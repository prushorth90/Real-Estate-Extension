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
  const topicArr = Object.keys(Topic);

  return (
      <FormControl color='primary' className={classes.formControl}>
       <Select
         style={{ backgroundColor: "white" }}
         labelId="demo-simple-select-helper-label"
         id="demo-simple-select-helper"
         value={topic}
         onChange={(event) => setTopic(event.target.value as Topic)}
       >
          {topicArr.map((top,index) => (
            <MenuItem key={index} value={top}>
                <Typography align="center"> {top} </Typography>
            </MenuItem>
          ))}
       </Select>
      </FormControl>
    )
  }

  export default TopicMenu