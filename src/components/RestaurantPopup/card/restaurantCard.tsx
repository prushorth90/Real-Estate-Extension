import React, { useEffect, useState } from 'react'
import { Box, Button, Grid, Typography,} from '@material-ui/core'
import { RestaurantAPI, NearbySearchData } from '../../../utils/api/restaurant/restaurantIndex'
import './restaurantCard.css'
import {RestaurantCardState} from './restaurantCardState'
import {RestaurantCardContainer} from './restaurantCardContainer'
import {MessageCard} from './messageCard'
import {Type} from '../filters/type/type'
import {Result} from './result'
import {Photo} from './photo'

export const RestaurantCard: React.FC<{coord,initNearbyData,initCardState}> = ({ coord, initNearbyData,initCardState}) => {
  console.log("9")
  // STATE ONLY RENDERED ONCE, EVEN IF  RERENDER WONT UPDATE SO HAD TO MOVE SET, BUT PROPS ALL TIME,
  const [nearbySearchData, setNearbySearchData] = useState<NearbySearchData | null>(initNearbyData)
  const [cardState, setCardState] = useState<RestaurantCardState>(initCardState)
  let restaurantApi = new RestaurantAPI()

  useEffect(() => {
    console.log("10")
    if (coord !== undefined && coord.results.length !== 0) {
      console.log("10.1")
      restaurantApi.fetchData(coord, Type.Bakery, "1500", Type.Bakery, "0", "4")
        .then((data) => {
          console.log("10.5")
          setNearbySearchData(data)
          data.results.length === 0 ?setCardState(RestaurantCardState.None) : setCardState(RestaurantCardState.Ready)
        })
        .catch((err) => setCardState(RestaurantCardState.Error))
      }
  }, [coord])

  useEffect(() => {
    setNearbySearchData(initNearbyData)
    setCardState(initCardState)
  },[initNearbyData, initCardState])

  if (cardState === RestaurantCardState.Loading || cardState === RestaurantCardState.Error || cardState === RestaurantCardState.None) {
    return (
      <MessageCard cardState/>
    )
  } else {

    return (
      <Box>
      {console.log("12")}
      {nearbySearchData.results.map((result, index) => (
        <RestaurantCardContainer key={index}>
          <Grid container>
            <Grid item>
              <Result result={result}/>
              <br/>
              <br/>
              <div style={{ display: 'flex' }} >
                <Photo result={result} index={index}/>

                <Button className="restaurantCard-body"
                        key={result.photos !== undefined ? result.photos[0].photo_reference: null}
                        variant="outlined"
                        color="primary">
                        View Time
                </Button>
              </div>
            </Grid>
          </Grid>
        </RestaurantCardContainer>

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
