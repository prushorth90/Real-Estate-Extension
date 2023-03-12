import React,{useContext } from 'react'
import {FilterPartial} from '../partials/filterPartial'
import {APIContext} from '../../filters'
export const TypeFilter: React.FC<{options, apiIn}> = ({options, apiIn}) => {
  const [apiInput, setAPIInput] = useContext(APIContext)

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAPIInput(prevState => {
      return {...prevState, type: event.target.value as string, keyword: event.target.value === "Restaurant"? "Pizza": event.target.value as string}
   })
  }
 
  return (
    <FilterPartial
      options={options}
      keyword={apiInput.type}
      name='Type'
      handleChange={handleChange}
    />
 )
}