import React,{ useEffect, useState } from 'react'
import {FormControl, InputLabel, MenuItem, Select, FormHelperText} from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {useStyles} from '../style'

export const MinPriceFilter: React.FC<{
  minPrice: string
  setMinPrice
}> = ({ minPrice,setMinPrice}) => {

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setMinPrice(event.target.value as string);
  }

 return (
    <FormControl required className={useStyles().formControl}>
        <InputLabel id="demo-simple-select-required-label">Min Price</InputLabel>
        <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={minPrice}
          onChange={(handleChange)}
        >
          {[0,1,2].map((val, index) => (
            <MenuItem key={index} value={val}>{val}</MenuItem>
          ))}

        </Select>
        <FormHelperText>Required</FormHelperText>
    </FormControl>
 )

}
