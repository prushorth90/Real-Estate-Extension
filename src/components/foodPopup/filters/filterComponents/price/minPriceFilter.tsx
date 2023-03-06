import React,{ useContext} from 'react'
import {FilterPartial} from '../partials/filterPartial'
import {APIContext} from '../../filters'

export const MinPriceFilter: React.FC<{}> = ({ }) => {
  const [apiInput, setAPIInput] = useContext(APIContext)

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAPIInput(prevState => {
      return {...prevState, minprice: event.target.value as string}
    })
  }
  return (
     <FilterPartial
       options={[0,1,2]}
       keyword={apiInput.minprice}
       name='Min Price Level'
       handleChange={handleChange}
     />
  )

}