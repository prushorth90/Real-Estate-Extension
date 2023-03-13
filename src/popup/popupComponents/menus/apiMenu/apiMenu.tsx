import React,{useContext} from 'react'
import {Topic} from '../topicMenu/topics'
import {APIChoices} from './apiChoices'
import {Typography, MenuItem, FormControl, Select } from '@material-ui/core'
import {APIChoiceContext} from '../../../popup'
import {useStyles} from '../style'


export const APIChoiceMenu: React.FC<{  }> = () => {
  const [apiChoice,setApiChoice] = useContext(APIChoiceContext)
  // Options found in enum class
  const options = Object.values(APIChoices);

  return (
      <FormControl color='primary' className={useStyles().formControl}>
       <Select
         data-testid="api_menu_select"
         inputProps={{ "data-testid": "api_menu_input" }}
         style={{ backgroundColor: "white" }}
         labelId="demo-simple-select-helper-label"
         id="demo-simple-select-helper"
         value={apiChoice}
         onChange={(event) => setApiChoice(event.target.value as APIChoices)}
       >
          {options.map((top,index) => (
            <MenuItem key={index} value={top}>
                <Typography align="center"> {top} </Typography>
            </MenuItem>
          ))}
       </Select>
      </FormControl>
    )
  }
