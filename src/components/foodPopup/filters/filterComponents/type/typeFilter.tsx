import React,{ useEffect, useState,useContext } from 'react'
import {FormControl, InputLabel, MenuItem, Select, FormHelperText} from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {Type} from './type'
import {useStyles} from '../../style'
import {CommonForm} from '../partials/commonForm'
import {APIContext} from '../../filters'
export const TypeFilter: React.FC<{
}> = ({ }) => {
  const [apiInput, setAPIInput] = useContext(APIContext)

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAPIInput(prevState => {
      return {...prevState, type: event.target.value as string, keyword: event.target.value === "Restaurant"? "Pizza": event.target.value as string}
   })
  }

  return (
    <CommonForm
      options={[Type.Bakery, Type.Cafe, Type.Restaurant, Type.Meal_Delivery, Type.Meal_Takeaway]}
      keyword={apiInput.type}
      name='Type'
      handleChange={handleChange}
    />

 )
}


// import React,{ useEffect, useState } from 'react'
// import {FormControl, InputLabel, MenuItem, Select, FormHelperText} from '@material-ui/core'
// import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
// import {Type} from './type'
// import {useStyles} from '../../style'
// import {CommonForm} from '../partials/commonForm'
//
// export const TypeFilter: React.FC<{
//   type: string
//   setType
//   setKeyword
// }> = ({ type,setType,setKeyword}) => {
//
//   const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
//     setType(event.target.value as string);
//     event.target.value === "Restaurant"? setKeyword("Pizza"): setKeyword(event.target.value as string);
//   }
//
//   return (
//     <CommonForm
//       options={[Type.Bakery, Type.Cafe, Type.Restaurant, Type.Meal_Delivery, Type.Meal_Takeaway]}
//       keyword={type}
//       setKeyword=""
//       name='Type'
//       handleChange={handleChange}
//     />
//
//  )
// }
