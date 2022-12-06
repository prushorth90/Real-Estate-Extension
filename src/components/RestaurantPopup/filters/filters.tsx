import React,{ useEffect, useState } from 'react'
import { RestaurantAPI } from '../../../utils/api/restaurant/restaurantIndex'
import {RestaurantCardState} from '../card/restaurantCardIndex'
import {RadiusFilter, TypeFilter, CuisineFilter} from '../filters/filterIndex'
import {Type} from './type/type'
export const Filter: React.FC<{coord,initNearbyData,initCardState, setNearbySearchData, setCardState}> = ({ coord,initNearbyData,initCardState, setNearbySearchData, setCardState}) => {
  let restaurantApi = new RestaurantAPI()
  const [radius, setRadius] = useState<string>("1500")
  const [type,setType] = useState<string>(Type.Bakery)
  const [keyword, setKeyword] = useState<string>(Type.Bakery)


  useEffect(() => {
    console.log("RICK AND MORTY!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    if (coord !== undefined && coord.results.length !== 0) {
      restaurantApi.fetchData(coord, keyword, radius, type)
        .then((data) => {
          setNearbySearchData(data)
          data.results.length === 0 ?setCardState(RestaurantCardState.None): setCardState(RestaurantCardState.Ready)
        })
        .catch((err) => setCardState(RestaurantCardState.Error))
    }
  }, [radius, type, keyword])

  return (
     <div>
          <RadiusFilter radius={radius} setRadius={setRadius}  />
          <TypeFilter type={type} setType={setType} setKeyword={setKeyword} />
          {type === Type.Restaurant ? <CuisineFilter keyword={keyword} setKeyword={setKeyword} /> : ""}
      </div>

  )
}
