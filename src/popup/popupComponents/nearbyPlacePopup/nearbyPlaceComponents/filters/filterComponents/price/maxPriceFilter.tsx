import React,{ useContext } from 'react'
import {FilterPartial} from '../partials/filterPartial'
import {APIContext} from '../../filters'

export const MaxPriceFilter: React.FC<{}> = ({ }) => {

  const [apiInput, setAPIInput] = useContext(APIContext)
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      setAPIInput(prevState => {
        return {...prevState, maxprice:  event.target.value as string}
     })
   }
  return (
    <FilterPartial
      options={[3,4]}
      keyword={apiInput.maxprice}
      name='Max Price Level'
      handleChange={handleChange}
    />
  )

}
