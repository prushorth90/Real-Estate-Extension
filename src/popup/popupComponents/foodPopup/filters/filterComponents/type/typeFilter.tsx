import React,{useContext } from 'react'
import {Type} from './type'
import {FilterPartial} from '../partials/filterPartial'
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
    <FilterPartial
      options={[Type.Bakery, Type.Cafe, Type.Restaurant, Type.Meal_Delivery, Type.Meal_Takeaway]}
      keyword={apiInput.type}
      name='Type'
      handleChange={handleChange}
    />

 )
}