import React, { useEffect, useState } from 'react'
import { Box, Typography,} from '@material-ui/core'
import '../../foodCard.css'
import Rating from '@material-ui/lab/Rating';


export const Result: React.FC<{result}> = ({result}) => {

    return (
      <div data-testid={"result card"}>
      {result.name !== undefined && <Typography data-testid={"result name"} className="foodCard-title"> {result.name} </Typography> }
      {result.user_ratings_total !== undefined && <Typography data-testid={"result user rating total"} className="foodCard-body" component="legend">Total User Ratings: {result.user_ratings_total} </Typography>}
      {result.rating !== undefined && <Rating data-testid={"result rating"} name="read-only" className="foodCard-body" value={result.rating} readOnly /> }
      {result.price_level !== undefined && <Typography data-testid={"result price level"} className="foodCard-body">Price Level: {result.price_level}</Typography>}
      {result.vicinity !== undefined && <Typography data-testid={"result vicinity"} className="foodCard-body"> Vicinity: {result.vicinity} </Typography>}
      </div>
    )
}