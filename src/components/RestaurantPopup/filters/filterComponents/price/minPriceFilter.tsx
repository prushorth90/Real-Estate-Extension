import React,{ useEffect, useState } from 'react'
import {FormControl, InputLabel, MenuItem, Select, FormHelperText} from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {useStyles} from '../../style'
import {CommonForm} from '../partials/commonForm'

export const MinPriceFilter: React.FC<{
  minPrice: string
  setMinPrice
}> = ({ minPrice,setMinPrice}) => {

 return (
    <CommonForm
      options={[0,1,2]}
      keyword={minPrice}
      setKeyword={setMinPrice}
      name='Min Price Level'
      handleChange=""
    />
 )

}
