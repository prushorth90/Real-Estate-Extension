import React,{ useEffect, useState, useContext } from 'react'
import {FormControl, InputLabel, MenuItem, Select, FormHelperText} from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {useStyles} from '../../style'
import {APIContext} from '../../filters'
import {APIInput} from '../../apiInput'
export const CommonForm: React.FC<{
  options, keyword, name, handleChange
}> = ({ options, keyword, name,handleChange}) => {
  const [apiInput, setAPIInput] = useContext(APIContext)

  //delete later - never used
  const handleChangeDefault = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAPIInput(prevState => {
      return {...prevState, keyword: event.target.value as string}
   })
  }

  return (
    <FormControl className={useStyles().formControl}>
        <InputLabel id="demo-simple-select-label" >{name}</InputLabel>
        <Select
          data-testid={name}
          inputProps={{ "data-testid": `Input ${name}` }}
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



// import React,{ useEffect, useState } from 'react'
// import {FormControl, InputLabel, MenuItem, Select, FormHelperText} from '@material-ui/core'
// import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
// import {useStyles} from '../../style'
//
// export const CommonForm: React.FC<{
//   options, keyword, setKeyword, name, handleChange
// }> = ({ options, keyword, setKeyword, name,handleChange}) => {
//
//   const handleChangeDefault = (event: React.ChangeEvent<{ value: unknown }>) => {
//     setKeyword(event.target.value as string);
//   }
//
//   return (
//     <FormControl className={useStyles().formControl}>
//         <InputLabel id="demo-simple-select-label" >{name}</InputLabel>
//         <Select
//           labelId="demo-simple-select-label"
//           id="demo-simple-select"
//           value={keyword}
//           onChange={handleChange == "" ? handleChangeDefault : handleChange}
//         >
//         {options.map((val, index) => (
//           <MenuItem key={index} value={val}>{val}</MenuItem>
//         ))}
//         </Select>
//     </FormControl>
//   )
// }
