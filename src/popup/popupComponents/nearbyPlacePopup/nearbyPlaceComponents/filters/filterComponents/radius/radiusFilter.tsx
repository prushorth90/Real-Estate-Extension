import React,{ useContext } from 'react'
import {FilterPartial} from '../partials/filterPartial'
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
    <FilterPartial
      options={[500,1000,1500, 50000]}
      keyword={apiInput.radius}
      name='Radius'
      handleChange={handleChange}
    />
  )

}