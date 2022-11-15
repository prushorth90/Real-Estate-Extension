import React, { useEffect, useState } from 'react'
import { Box, Button, Card, CardActions, CardContent, Grid, Typography,} from '@material-ui/core'
import { RestaurantAPI, NearbySearchData } from '../../utils/api/restaurant/restaurantIndex'
import './restaurantCard.css'
import {RestaurantCardState} from './restaurantCardState'
import {RestaurantCardContainer} from './restaurantCardContainer'
import {Address} from '../../popup/Address/address'


const RestaurantCard: React.FC<{
  address: Address
}> = ({ address }) => {
  const [nearbySearchData, setNearbySearchData] = useState<NearbySearchData | null>(null)
  const [cardState, setCardState] = useState<RestaurantCardState>(RestaurantCardState.Loading)
  let restaurantapi = new RestaurantAPI()

  useEffect(() => {
    restaurantapi.fetchData(address)
      .then((data) => {
        setNearbySearchData(data)
        setCardState(RestaurantCardState.Ready)
      })
      .catch((err) => setCardState(RestaurantCardState.Error))
  }, [address])

  if (cardState == RestaurantCardState.Loading || cardState == RestaurantCardState.Error) {
    return (
      <RestaurantCardContainer>
        <Typography className="restaurantCard-title">{address.getCity()}</Typography>
        <Typography className="restaurantCard-body">
          {cardState == RestaurantCardState.Loading ? 'Loading...' : 'Error: could not retrieve data for this city.'}
        </Typography>
      </RestaurantCardContainer>
    )
  }

  return (
    <div>
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
