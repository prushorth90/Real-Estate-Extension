import React, { useEffect, useState } from 'react'
import { Box, Button, Card, CardActions, CardContent, Grid, Typography,} from '@material-ui/core'
import { RestaurantAPI, NearbySearchData } from '../../utils/api/restaurant/restaurantIndex'
import './restaurantCard.css'
import {RestaurantCardState} from './restaurantCardState'
import {RestaurantCardContainer} from './restaurantCardContainer'
import {Address} from '../../popup/Address/address'
import {AddressData,AddressAPI} from '../../utils/api/address/addressIndex'


const RestaurantCard: React.FC<{dataa
}> = ({ dataa}) => {
  console.log("9")
  const [nearbySearchData, setNearbySearchData] = useState<NearbySearchData | null>(null)
  const [cardState, setCardState] = useState<RestaurantCardState>(RestaurantCardState.Loading)
  let restaurantapi = new RestaurantAPI()

  useEffect(() => {
    console.log("10")
    if (dataa !== undefined && dataa.results.length !== 0) {
      console.log("10.1")
      console.log(dataa)
      console.log(dataa.results.length)
      restaurantapi.fetchData(dataa)
        .then((data) => {
          console.log("10.5")
          setNearbySearchData(data)
          setCardState(RestaurantCardState.Ready)
        })
        .catch((err) => setCardState(RestaurantCardState.Error))
      }
  }, [dataa])


  if (cardState == RestaurantCardState.Loading || cardState == RestaurantCardState.Error) {
    return (
      <RestaurantCardContainer>
      {console.log("11")}
        <Typography className="restaurantCard-title">Wait</Typography>
        <Typography className="restaurantCard-body">
          {cardState == RestaurantCardState.Loading ? 'Loading...' : 'Error: could not retrieve data for this city.'}
        </Typography>
      </RestaurantCardContainer>
    )
  }

  return (
    <div>
    {console.log("12")}
        {nearbySearchData.results.map((result, index) => (
          <RestaurantCardContainer key={index}>
            <Grid container justifyContent="space-around">
              <Grid item >
                <Typography className="restaurantCard-title"> {result.name} </Typography>
                <Typography className="restaurantCard-temp"> {result.user_ratings_total} </Typography>
                <Typography className="restaurantCard-body"> {result.name} </Typography>
              </Grid>
            </Grid>
          </RestaurantCardContainer>

        ))}
      </div>
  )
}

export default RestaurantCard
