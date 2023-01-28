import React,{ useEffect, useState, useContext } from 'react'
import {FormControl, InputLabel, MenuItem, Select, FormHelperText} from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {useStyles} from '../../style'
import {CommonForm} from '../partials/commonForm'
import {APIContext} from '../../filters'

export const RadiusFilter: React.FC<{
}> = ({ }) => {
  const [apiInput, setAPIInput] = useContext(APIContext)

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAPIInput(prevState => {
      return {...prevState, radius: event.target.value as string}
   })
 }
 return (
   <CommonForm
     options={[500,1000,1500]}
     keyword={apiInput.radius}
     name='Radius'
     handleChange={handleChange}
   />
 )

}



// import React,{ useEffect, useState } from 'react'
// import {FormControl, InputLabel, MenuItem, Select, FormHelperText} from '@material-ui/core'
// import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
// import {useStyles} from '../../style'
// import {CommonForm} from '../partials/commonForm'
//
// export const RadiusFilter: React.FC<{
//   radius: string
//   setRadius
// }> = ({ radius, setRadius}) => {
//
//  return (
//    <CommonForm
//      options={[500,1000,1500]}
//      keyword={radius}
//      setKeyword={setRadius}
//      name='Radius'
//      handleChange=""
//    />
//  )
//
// }
