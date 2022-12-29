import React,{ useEffect, useState } from 'react'
import {FormControl, InputLabel, MenuItem, Select, FormHelperText} from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {useStyles} from '../style'

export const MaxPriceFilter: React.FC<{
  maxPrice: string
  setMaxPrice
}> = ({ maxPrice,setMaxPrice}) => {
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setMaxPrice(event.target.value as string);
  }

 return (
    <FormControl required className={useStyles().formControl}>
        <InputLabel id="demo-simple-select-required-label">Max Price</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={maxPrice}
          onChange={(handleChange)}
        >
          {[3,4].map((val, index) => (
            <MenuItem key={index} value={val}>{val}</MenuItem>
          ))}

        </Select>
        <FormHelperText>Required</FormHelperText>
    </FormControl>
 )

}
