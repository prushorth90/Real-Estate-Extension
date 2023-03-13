import React,{ useEffect, useState, useContext,createContext } from 'react'
import {ResultState} from '../card/nearbyPlaceCardIndex'
import {RadiusFilter, TypeFilter, CuisineFilter, MinPriceFilter, MaxPriceFilter} from './filterIndex'
import {CoordContext} from '../../../../popup'
import {NearbyPlaceContext, CardStateContext} from '../../nearbyPlacePopup'
import {NearbyPlaceAPIInput} from '../../../../../api/nearbyPlaces/nearbyPlaceAPIInput'
import {FoodType} from './filterComponents/type/types/foodType'
export const APIContext = createContext([])

export const Filter: React.FC<{ api, filterTypeOptions, filtersDefaultValues }> = ({ api, filterTypeOptions, filtersDefaultValues }) => {
  
  const [apiInput, setAPIInput] = useState<NearbyPlaceAPIInput>(filtersDefaultValues);
  const [coord,setCoord] = useContext(CoordContext)
  const [nearbyPlaceData, setNearbyPlaceData] = useContext(NearbyPlaceContext)
  const [cardState, setCardState] = useContext(CardStateContext)

  useEffect(() => {
    if (coord !== undefined && coord.results.length !== 0) {
      api.fetchData(coord, apiInput)
        .then((data) => {
          setNearbyPlaceData(data)
          data.results.length === 0 ?setCardState(ResultState.None): setCardState(ResultState.Ready)
        })
        .catch((err) => setCardState(ResultState.Error))
    } else {
      setCardState(ResultState.None)
    }
  }, [apiInput])
  if (filterTypeOptions.includes(apiInput.type) === false) {
    setAPIInput(filtersDefaultValues)
  }
  
  return (
     <div data-testid="filter">
     <APIContext.Provider value={[apiInput, setAPIInput]}>

          <RadiusFilter />
          <TypeFilter options={filterTypeOptions}/>
          {apiInput.type === FoodType.Restaurant ? <CuisineFilter /> : ""}
          <MinPriceFilter />
          <MaxPriceFilter />
      </APIContext.Provider>

      </div>

  )
}