import React,{ useEffect, useState } from 'react'
import {FormControl, InputLabel, MenuItem, Select, FormHelperText} from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {useStyles} from '../../style'
import {CommonForm} from '../partials/commonForm'

export const RadiusFilter: React.FC<{
  radius: string
  setRadius
}> = ({ radius, setRadius}) => {

 return (
   <CommonForm
     options={[500,1000,1500]}
     keyword={radius}
     setKeyword={setRadius}
     name='Radius'
     handleChange=""
   />
 )

}
