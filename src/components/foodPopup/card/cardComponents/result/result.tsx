import React, { useEffect, useState } from 'react'
import { Box, Typography,} from '@material-ui/core'
import '../../foodCard.css'
import Rating from '@material-ui/lab/Rating';


export const Result: React.FC<{result}> = ({result}) => {

    return (
      <div>
      {result.name !== undefined ? <Typography data-testid={"result name"} className="foodCard-title"> {result.name} </Typography> : ""}
      {result.user_ratings_total !== undefined ? <Typography data-testid={"result user rating total"} className="foodCard-body" component="legend">Total User Ratings: {result.user_ratings_total} </Typography>:""}
      {result.rating !== undefined ? <Rating data-testid={"result rating"} name="read-only" className="foodCard-body" value={result.rating} readOnly /> : ""}
      {result.price_level !== undefined ? <Typography data-testid={"result price level"} className="foodCard-body">Price Level: {result.price_level}</Typography>:""}
      {result.vicinity !== undefined? <Typography data-testid={"result vicinity"} className="foodCard-body"> Vicinity: {result.vicinity} </Typography> : ""}
      </div>
    )
}


// some results no photos field


// import React, { useEffect, useState } from 'react'
// import { Box, Button, Card, CardActions, CardContent, Grid, Typography,} from '@material-ui/core'
// import { RestaurantAPI, NearbySearchData } from '../../utils/api/restaurant/restaurantIndex'
// import './restaurantCard.css'
// import {RestaurantCardState} from './restaurantCardState'
// import {RestaurantCardContainer} from './restaurantCardContainer'
// import {Address} from '../../popup/Address/address'
// import {AddressData,AddressAPI} from '../../utils/api/address/addressIndex'
// import {PhotoDialog} from './dialog/photoDialog'
// import Rating from '@material-ui/lab/Rating';
//
// const RestaurantCard: React.FC<{coord
// }> = ({ coord}) => {
//   console.log("9")
//   const [nearbySearchData, setNearbySearchData] = useState<NearbySearchData | null>(null)
//   const [cardState, setCardState] = useState<RestaurantCardState>(RestaurantCardState.Loading)
//   const [openPhoto, setOpenPhoto] = useState<boolean>(false);
//   const [photoReference, setPhotoReference] = useState<string>("");
//   const [currIndex, setCurrIndex ] = useState<number>(-1);
//
//   let restaurantApi = new RestaurantAPI()
//
//   return (
//     <div>
//     {console.log("12")}
//         {[9,8,7].map((result, index) => (
//           <RestaurantCardContainer key={index}>
//             <Grid container justifyContent="space-around">
//               <Grid item>
//                 <div>{index}</div>
//                 <Typography className="restaurantCard-title"> ibvnv </Typography>
//                 <Typography className="restaurantCard-body"> 8 </Typography>
//                 <Rating name="read-only" className="restaurantCard-body" value={90} readOnly />
//                 <Typography className="restaurantCard-body"> 900 </Typography>
//                 <Typography className="restaurantCard-body"> Vicinity: "popopopopo" </Typography>
//               </Grid>
//               <Grid item>
//                 <Button variant="outlined" color="primary"> View Photo </Button>
//                 <br></br>
//                 <br></br>
//                 <Button variant="outlined" color="primary"> View Photo </Button>
//               </Grid>
//             </Grid>
//           </RestaurantCardContainer>
//
//         ))}
//       </div>
//   )
// }
//
// export default RestaurantCard
