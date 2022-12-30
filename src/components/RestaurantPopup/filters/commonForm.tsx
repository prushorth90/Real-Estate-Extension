import React,{ useEffect, useState } from 'react'
import {FormControl, InputLabel, MenuItem, Select, FormHelperText} from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {useStyles} from './style'

export const CommonForm: React.FC<{
  options, keyword, setKeyword, name, handleChange
}> = ({ options, keyword, setKeyword, name,handleChange}) => {

  const handleChangeDefault = (event: React.ChangeEvent<{ value: unknown }>) => {
    setKeyword(event.target.value as string);
  }

  return (
    <FormControl className={useStyles().formControl}>
        <InputLabel id="demo-simple-select-label" >{name}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={keyword}
          onChange={handleChange == "" ? handleChangeDefault : handleChange}
        >
        {options.map((val, index) => (
          <MenuItem key={index} value={val}>{val}</MenuItem>
        ))}
        </Select>
    </FormControl>
  )
}
