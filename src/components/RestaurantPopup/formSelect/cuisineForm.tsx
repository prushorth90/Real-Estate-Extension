import React,{ useEffect, useState } from 'react'
import {FormControl, InputLabel, MenuItem, Select, FormHelperText} from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export const CuisineForm: React.FC<{
  keyword: string
  setKeyword
}> = ({ keyword, setKeyword}) => {
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
    setKeyword(event.target.value as string);
  }

return (
  <FormControl required className={classes.formControl}>
      <InputLabel id="demo-simple-select-required-label">Cuisine</InputLabel>
      <Select
        labelId="demo-simple-select-required-label"
        id="demo-simple-select-required"
        value={keyword}
        onChange={(handleChange2)}
      >
      {["pizza", "english", "chinese", "italian"].map((val, index) => (
        <MenuItem key={index} value={val}>{val}</MenuItem>
      ))}
      </Select>
      <FormHelperText>Required</FormHelperText>
  </FormControl>
)
}
