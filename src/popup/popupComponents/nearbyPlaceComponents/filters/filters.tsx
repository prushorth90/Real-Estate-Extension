import React,{ useEffect, useState, useContext,createContext } from 'react'
import {ResultState} from '../card/nearbyPlaceCardIndex'
import {RadiusFilter, TypeFilter, CuisineFilter, MinPriceFilter, MaxPriceFilter} from './filterIndex'
import {Type} from '../../foodPopup/type'
import {CoordContext} from '../../../popup'
import {NearbyPlaceContext, CardStateContext} from '../../../popup'
import {NearbyPlaceAPIInput} from '../../../../api/nearbyPlaces/nearbyPlaceAPIInput'

export const APIContext = createContext([])

export const Filter: React.FC<{api, options, apiIn}> = ({api, options, apiIn}) => {
  //let foodApi = new FoodAPI()
  const [apiInput, setAPIInput] = useState<NearbyPlaceAPIInput>(apiIn);
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

  return (
     <div data-testid="filter">
     <APIContext.Provider value={[apiInput, setAPIInput]}>

          <RadiusFilter />
          <TypeFilter options={options}/>
          {apiInput.type === Type.Restaurant ? <CuisineFilter /> : ""}
          <MinPriceFilter />
          <MaxPriceFilter />
      </APIContext.Provider>

      </div>

  )
}