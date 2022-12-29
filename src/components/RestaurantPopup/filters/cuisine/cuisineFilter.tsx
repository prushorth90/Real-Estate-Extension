import React,{ useEffect, useState } from 'react'
import {FormControl, InputLabel, MenuItem, Select, FormHelperText} from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {Cuisine} from './Cuisine'
import {useStyles} from '../style'

export const CuisineFilter: React.FC<{
  keyword: string
  setKeyword
}> = ({ keyword, setKeyword}) => {

 useEffect(() => {
   setKeyword("Pizza")
 }, [])

  const handleChange2 = (event: React.ChangeEvent<{ value: unknown }>) => {
    setKeyword(event.target.value as string);
  }

  return (
    <FormControl required className={useStyles().formControl}>
        <InputLabel id="demo-simple-select-required-label">Cuisine</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={keyword}
          onChange={(handleChange2)}
        >
        {[Cuisine.Pizza, Cuisine.English, Cuisine.Chinese, Cuisine.Indian, Cuisine.Italian, Cuisine.Fast_Food].map((val, index) => (
          <MenuItem key={index} value={val}>{val}</MenuItem>
        ))}
        </Select>
        <FormHelperText>Required</FormHelperText>
    </FormControl>
  )
}
