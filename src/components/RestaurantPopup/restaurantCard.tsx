import React, { useEffect, useState } from 'react'
import { Box, Button, Card, CardActions, CardContent, Grid, Typography,} from '@material-ui/core'
import { RestaurantAPI, NearbySearchData } from '../../utils/api/restaurant/restaurantIndex'
import './restaurantCard.css'
import {RestaurantCardState} from './restaurantCardState'
import {RestaurantCardContainer} from './restaurantCardContainer'
import {Address} from '../../popup/Address/address'
import {AddressData,AddressAPI} from '../../utils/api/address/addressIndex'
import {PhotoDialog} from './dialog/photoDialog'

const RestaurantCard: React.FC<{coord
}> = ({ coord}) => {
  console.log("9")
  const [nearbySearchData, setNearbySearchData] = useState<NearbySearchData | null>(null)
  const [cardState, setCardState] = useState<RestaurantCardState>(RestaurantCardState.Loading)
  const [openPhoto, setOpenPhoto] = useState<boolean>(false);
  const [photoReference, setPhotoReference] = useState<string>("");
  const [currIndex, setCurrIndex ] = useState<number>(-1);

  let restaurantApi = new RestaurantAPI()

  useEffect(() => {
    console.log("10")
    if (coord !== undefined && coord.results.length !== 0) {
      console.log("10.1")
      console.log(coord)
      console.log(coord.results.length)
      restaurantApi.fetchData(coord)
        .then((data) => {
          console.log("10.5")
          setNearbySearchData(data)
          setCardState(RestaurantCardState.Ready)
        })
        .catch((err) => setCardState(RestaurantCardState.Error))
      }
  }, [coord])


  if (cardState === RestaurantCardState.Loading || cardState === RestaurantCardState.Error) {
    return (
      <RestaurantCardContainer>
      {console.log("11")}
        <Typography className="restaurantCard-title">Wait</Typography>
        <Typography className="restaurantCard-body">
          {cardState === RestaurantCardState.Loading ? RestaurantCardState.Loading : RestaurantCardState.Error}
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
              <Grid item>
                <div>{index}</div>
                <Typography className="restaurantCard-title"> {result.name} </Typography>
                <Typography className="restaurantCard-temp"> Ratings: {result.user_ratings_total} </Typography>
                <Typography className="restaurantCard-body"> PriceLevel: {result.price_level} </Typography>
                <Typography className="restaurantCard-body"> URT: {result.user_ratings_total} </Typography>
                <Typography className="restaurantCard-body"> Vicinity: {result.vicinity} </Typography>
                <Button key={result.photos !== undefined ? result.photos[0].photo_reference: null} variant="outlined" color="primary" onClick={() => {
                  if (result.photos !== undefined) {
                    setPhotoReference(result.photos[0].photo_reference)
                    console.log("ao")
                  }
                  console.log("bo")
                  setOpenPhoto(true)
                  setCurrIndex(index)
                  console.log("co")
                }}> View Photo </Button>
                {index == currIndex ? <PhotoDialog open={openPhoto} onClose={() => setOpenPhoto(false)} photo_reference={photoReference}/> : null}
              </Grid>
            </Grid>
          </RestaurantCardContainer>

        ))}
      </div>
  )
}

export default RestaurantCard
// some results no photos field
