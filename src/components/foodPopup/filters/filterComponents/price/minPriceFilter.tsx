import React,{ useEffect, useState, useContext} from 'react'
import {FormControl, InputLabel, MenuItem, Select, FormHelperText} from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {useStyles} from '../../style'
import {CommonForm} from '../partials/commonForm'
import {APIContext} from '../../filters'

export const MinPriceFilter: React.FC<{}> = ({ }) => {
  const [apiInput, setAPIInput] = useContext(APIContext)

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAPIInput(prevState => {
      return {...prevState, minprice: event.target.value as string}
    })
  }
  return (
     <CommonForm
       options={[0,1,2]}
       keyword={apiInput.minprice}
       name='Min Price Level'
       handleChange={handleChange}
     />
  )

}