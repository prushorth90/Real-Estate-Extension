import React,{ useEffect, useState } from 'react'
import {FormControl, InputLabel, MenuItem, Select, FormHelperText} from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {useStyles} from '../style'

export const RadiusFilter: React.FC<{
  radius: string
  setRadius
}> = ({ radius, setRadius}) => {

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRadius(event.target.value as string);
  }

 return (
    <FormControl required className={useStyles().formControl}>
        <InputLabel id="demo-simple-select-required-label">Radius</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={radius}
          onChange={(handleChange)}
        >
          {[500,1000,1500].map((val, index) => (
            <MenuItem key={index} value={val}>{val}</MenuItem>
          ))}

        </Select>
        <FormHelperText>Required</FormHelperText>
    </FormControl>
 )

}
