import React from 'react'
import ReactDOM from 'react-dom'
import { Box, Grid, InputBase, IconButton, Paper } from '@material-ui/core'
import {Add as AddIcon, PictureInPicture as PictureInPictureIcon,} from '@material-ui/icons'
import 'fontsource-roboto'
import './popup.css'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const App: React.FC<{}> = () => {
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  const classes = useStyles();

  // case1: return if nothing
  return (
    <Box mx="8px" my="16px">
    <FormControl className={classes.formControl}>
     <InputLabel id="demo-simple-select-helper-label">Topic</InputLabel>
     <Select
       labelId="demo-simple-select-helper-label"
       id="demo-simple-select-helper"
       // value={age}
       // onChange={handleChange}
     >
       <MenuItem value="">
         <em>None</em>
       </MenuItem>
       <MenuItem value={10}>Ten</MenuItem>
       <MenuItem value={20}>Twenty</MenuItem>
       <MenuItem value={30}>Thirty</MenuItem>
     </Select>
   </FormControl>
    </Box>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
