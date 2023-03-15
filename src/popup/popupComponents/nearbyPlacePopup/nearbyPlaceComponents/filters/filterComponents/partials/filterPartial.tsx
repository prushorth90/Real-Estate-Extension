import React from 'react'
import {FormControl, InputLabel, MenuItem, Select} from '@material-ui/core'
import {useStyles} from '../../style'

export const FilterPartial: React.FC<{
  options, keyword, name, handleChange
}> = ({ options, keyword, name,handleChange}) => {

  return (
    <FormControl className={useStyles().formControl}>
        <InputLabel id="demo-simple-select-label" >{name}</InputLabel>
        <Select
          data-testid={name}
          inputProps={{ "data-testid": `Input ${name}` }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={keyword}
          onChange={handleChange}
        >
        {options.map((val, index) => (
          <MenuItem key={index} value={val}>{val}</MenuItem>
        ))}
        </Select>
    </FormControl>
  )
}