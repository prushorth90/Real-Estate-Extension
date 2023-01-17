import React,{ useEffect, useState } from 'react'
import {FormControl, InputLabel, MenuItem, Select, FormHelperText} from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {useStyles} from '../../style'
import {CommonForm} from '../partials/commonForm'

export const MaxPriceFilter: React.FC<{
  maxPrice: string
  setMaxPrice
}> = ({ maxPrice,setMaxPrice}) => {

 return (
   <CommonForm
     options={[3,4]}
     keyword={maxPrice}
     setKeyword={setMaxPrice}
     name='Max Price Level'
     handleChange=""
   />
 )

}
