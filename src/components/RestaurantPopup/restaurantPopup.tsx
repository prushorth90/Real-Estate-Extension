import React,{ useEffect, useState } from 'react'
import {Topic} from '../../popup/topics'
import {Button, Box,} from '@material-ui/core'
import {AddressData} from '../../utils/api/address/addressIndex'
import { RestaurantAPI, NearbySearchData } from '../../utils/api/restaurant/restaurantIndex'
import {RestaurantCard, RestaurantCardState} from './card/restaurantCardIndex'
import {RadiusForm, TypeForm, CuisineForm} from './formSelect/formIndex'

const RestaurantPopup: React.FC<{
  topic: Topic
  coord: AddressData
}> = ({ topic, coord}) => {
  const [radius, setRadius] = useState<string>("1500")
  const [type,setType] = useState<string>("bakery")
  const [keyword, setKeyword] = useState<string>("")
  let restaurantApi = new RestaurantAPI()
  const [nearbySearchData, setNearbySearchData] = useState<NearbySearchData | null>(null)
  const [cardState, setCardState] = useState<RestaurantCardState>(RestaurantCardState.Loading)

  // DELETED APPPLY BUTTON
  //const getData = () => {
  //   if (coord !== undefined && coord.results.length !== 0) {
  //     restaurantApi.fetchData(coord, keyword, radius, type)
  //       .then((data) => {
  //         setNearbySearchData(data)
  //         data.results.length === 0 ?setCardState(RestaurantCardState.None): setCardState(RestaurantCardState.Ready)
  //       })
  //       .catch((err) => setCardState(RestaurantCardState.Error))
  //     }
  // }

  useEffect(() => {
    console.log("10")
    if (coord !== undefined && coord.results.length !== 0) {
      restaurantApi.fetchData(coord, keyword, radius, type)
        .then((data) => {
          setNearbySearchData(data)
          data.results.length === 0 ?setCardState(RestaurantCardState.None): setCardState(RestaurantCardState.Ready)
        })
        .catch((err) => setCardState(RestaurantCardState.Error))
    }
  }, [radius, type, keyword])

  console.log("6")

  return (
    <div>
    {console.log("8")}
      {topic == Topic.Restaurant &&
        <Box>
          <RadiusForm radius={radius} setRadius={setRadius}  />
          <TypeForm type={type} setType={setType} />
          {type === "restaurant" ? <CuisineForm keyword={keyword} setKeyword={setKeyword} /> : ""}
         <RestaurantCard coord={coord} initNearbyData={nearbySearchData} initCardState={cardState} />
       </Box>
      }
    </div>
  )
}

export default RestaurantPopup
// FILTER: LANGUAGE
// FILTER: MIN PRICE
// FILTER: MAX PRICE
// FILTER: OPEN NOW
// FILTER: RADIUS
// FILTER: RANK BY
// FILTER: TYPE
