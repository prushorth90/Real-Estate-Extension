import React, { useEffect, useState,useContext } from 'react'
import { Box, Button, Grid, Typography,} from '@material-ui/core'
import { FoodAPI, NearbySearchData } from '../../../utils/api/food/foodIndex'
import './foodCard.css'
import {ResultState} from './cardComponents/result/resultState'
import {FoodCardContainer} from './cardComponents/partials/foodCardContainer'
import {MessageCard} from './cardComponents/partials/messageCard'
import {Type} from '../filters/filterComponents/type/type'
import {Result} from './cardComponents/result/result'
import {PhotoButton} from './cardComponents/buttons/photo'
import {CoordContext} from '../../../popup/popup'
import {NearbySearchContext, CardStateContext} from '../foodPopup'


export const FoodCard: React.FC<{}> = ({}) => {
  console.log("9")
  // STATE ONLY RENDERED ONCE, EVEN IF  RERENDER WONT UPDATE SO HAD TO MOVE SET, BUT PROPS ALL TIME,
  const [coord,setCoord] = useContext(CoordContext)
  const [nearbySearchData, setNearbySearchData] = useContext(NearbySearchContext)
  const [cardState, setCardState] = useContext(CardStateContext)

  if (cardState === ResultState.Loading || cardState === ResultState.Error || cardState === ResultState.None) {
    return (
      <MessageCard cardState={cardState}/>
    )
  } else {

    return (
      <Box>
      {console.log("12")}
      {nearbySearchData.results.map((result, index) => (
        <FoodCardContainer key={index}>
          <Grid container>
            <Grid item>
              <Result result={result}/>
              <br/>
              <br/>
              <div style={{ display: 'flex' }} >
                <PhotoButton result={result} index={index}/>

              </div>
            </Grid>
          </Grid>
        </FoodCardContainer>

          ))}
        </Box>
    )
  }
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
