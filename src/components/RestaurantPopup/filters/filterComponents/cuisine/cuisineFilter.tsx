import React,{ useEffect, useState } from 'react'
import {FormControl, InputLabel, MenuItem, Select, FormHelperText} from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {Cuisine} from './Cuisine'
import {useStyles} from '../../style'
import {CommonForm} from '../partials/commonForm'

export const CuisineFilter: React.FC<{
  keyword: string
  setKeyword
}> = ({ keyword, setKeyword}) => {

   useEffect(() => {
     setKeyword("Pizza")
   }, [])


  return (
    <CommonForm
       options={[Cuisine.Pizza, Cuisine.English, Cuisine.Chinese, Cuisine.Indian, Cuisine.Italian, Cuisine.Fast_Food]}
       keyword={keyword}
       setKeyword={setKeyword}
       name='Cuisine'
       handleChange=""
    />
  )
}
