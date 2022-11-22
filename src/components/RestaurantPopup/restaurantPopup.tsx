import React,{ useEffect, useState } from 'react'
import {Topic} from '../../popup/topics'
import {Button, Box,} from '@material-ui/core'
import {AddressData} from '../../utils/api/address/addressIndex'
import { RestaurantAPI, NearbySearchData } from '../../utils/api/restaurant/restaurantIndex'
import {RestaurantCard, RestaurantCardState} from './card/restaurantCardIndex'
import {RadiusForm, TypeForm} from './formSelect/formIndex'

const RestaurantPopup: React.FC<{
  topic: Topic
  coord: AddressData
}> = ({ topic, coord}) => {
  const [radius, setRadius] = useState<string>("1500")
  const [type,setType] = useState<string>("bakery")
  let restaurantApi = new RestaurantAPI()
  const [nearbySearchData, setNearbySearchData] = useState<NearbySearchData | null>(null)
  const [cardState, setCardState] = useState<RestaurantCardState>(RestaurantCardState.Loading)

  const getData = () => {
    if (coord !== undefined && coord.results.length !== 0) {
      restaurantApi.fetchData(coord, radius, type)
        .then((data) => {
          setNearbySearchData(data)
          setCardState(RestaurantCardState.Ready)
        })
        .catch((err) => setCardState(RestaurantCardState.Error))
      }
  }

  console.log("6")

  return (
    <div>
    {console.log("8")}
      {topic == Topic.Restaurant &&
        <Box>
          <RadiusForm radius={radius} setRadius={setRadius}  />
          <TypeForm type={type} setType={setType} />
          {radius === "" || type === ""? <Button variant="contained" disabled>Disabled </Button>:<Button variant="contained" color="primary" onClick={(getData)}>Apply</Button> }
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
