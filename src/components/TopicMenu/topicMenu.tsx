import React,{useContext} from 'react'
import {Topic} from './topics'
import {Typography, MenuItem, FormControl, Select } from '@material-ui/core'
import {TopicContext} from '../../popup/popup'
import {useStyles} from './style'


export const TopicMenu: React.FC<{
}> = ({  }) => {
  const [topic,setTopic] = useContext(TopicContext)

  const topicArr = Object.keys(Topic);

  return (
      <FormControl color='primary' className={useStyles().formControl}>
       <Select
         data-testid="topic_menu_select"
         inputProps={{ "data-testid": "topic_menu_input" }}
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
