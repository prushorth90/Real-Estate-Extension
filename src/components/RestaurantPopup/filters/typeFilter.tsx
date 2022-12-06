import React,{ useEffect, useState } from 'react'
import {FormControl, InputLabel, MenuItem, Select, FormHelperText} from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const TypeFilter: React.FC<{
  type: string
  setType
}> = ({ type,setType}) => {

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
    }),
 );

  const classes = useStyles();

  const handleChange2 = (event: React.ChangeEvent<{ value: unknown }>) => {
    setType(event.target.value as string);
  }

  return (
    <FormControl required className={classes.formControl}>
        <InputLabel id="demo-simple-select-required-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={type}
          onChange={(handleChange2)}
        >
        {["bakery", "cafe", "restaurant", "meal_delivery", "meal_takeaway"].map((val, index) => (
          <MenuItem key={index} value={val}>{val}</MenuItem>
        ))}
        </Select>
        <FormHelperText>Required</FormHelperText>
    </FormControl>
 )
}
