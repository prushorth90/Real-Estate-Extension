import React from 'react'
import {Typography} from '@material-ui/core'
import './restaurantCard.css'
import Rating from '@material-ui/lab/Rating';

export const ResultCard: React.FC<{
  result
}> = ({ result }) => {


  return (
    <div>
    <Typography className="restaurantCard-title"> {result.name} </Typography>
    <Typography className="restaurantCard-body" component="legend">Total User Ratings: {result.user_ratings_total} </Typography>
    <Rating name="read-only" className="restaurantCard-body" value={result.rating} readOnly />
    <Typography className="restaurantCard-body"> Price Level: {result.price_level} </Typography>
    <Typography className="restaurantCard-body"> Vicinity: {result.vicinity} </Typography>
    </div>
  )

}
