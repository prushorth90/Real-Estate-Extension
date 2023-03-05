import React,{ useEffect, useState, useContext,createContext } from 'react'
import { FoodAPI } from '../../../utils/api/food/foodIndex'
import {ResultState} from '../card/foodCardIndex'
import {RadiusFilter, TypeFilter, CuisineFilter, MinPriceFilter, MaxPriceFilter} from '../filters/filterIndex'
import {Type} from './filterComponents/type/type'
import {CoordContext} from '../../../popup/popup'
import {NearbySearchContext, CardStateContext} from '../foodPopup'
import {APIInput} from './apiInput'

export const APIContext = createContext([])

export const Filter: React.FC<{}> = ({}) => {
  let foodApi = new FoodAPI()
  const [apiInput, setAPIInput] = useState<APIInput>(new APIInput());
  const [coord,setCoord] = useContext(CoordContext)
  const [nearbySearchData, setNearbySearchData] = useContext(NearbySearchContext)
  const [cardState, setCardState] = useContext(CardStateContext)

  useEffect(() => {
    if (coord !== undefined && coord.results.length !== 0) {
      foodApi.fetchData(coord, apiInput)
        .then((data) => {
          setNearbySearchData(data)
          data.results.length === 0 ?setCardState(ResultState.None): setCardState(ResultState.Ready)
        })
        .catch((err) => setCardState(ResultState.Error))
    } else {
      setCardState(ResultState.None)
    }
  }, [apiInput])

  return (
     <div data-testid="food-filter">
     <APIContext.Provider value={[apiInput, setAPIInput]}>

          <RadiusFilter />
          <TypeFilter />
          {apiInput.type === Type.Restaurant ? <CuisineFilter /> : ""}
          <MinPriceFilter />
          <MaxPriceFilter />
      </APIContext.Provider>

      </div>

  )
}