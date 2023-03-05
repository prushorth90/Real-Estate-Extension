import React,{ useContext } from 'react'
import {CommonForm} from '../partials/commonForm'
import {APIContext} from '../../filters'

export const MaxPriceFilter: React.FC<{}> = ({ }) => {

  const [apiInput, setAPIInput] = useContext(APIContext)
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      setAPIInput(prevState => {
        return {...prevState, maxprice:  event.target.value as string}
     })
   }
  return (
    <CommonForm
      options={[3,4]}
      keyword={apiInput.maxprice}
      name='Max Price Level'
      handleChange={handleChange}
    />
  )

}
