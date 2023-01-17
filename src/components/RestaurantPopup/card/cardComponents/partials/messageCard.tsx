import React from 'react'
import {Typography} from '@material-ui/core'
import {RestaurantCardContainer} from './restaurantCardContainer'
import {ResultState} from '../result/resultState'

export const MessageCard: React.FC<{
  cardState
}> = ({ cardState}) => {


  if (cardState === ResultState.Loading || cardState === ResultState.Error) {
     return (
       <RestaurantCardContainer>
       {console.log("11")}
         <Typography className="restaurantCard-body">
           {cardState === ResultState.Loading ? ResultState.Loading : ResultState.Error}
         </Typography>
       </RestaurantCardContainer>
     )
   }
   return (
     <RestaurantCardContainer>
     <Typography className="restaurantCard-body">
       {ResultState.None}
     </Typography>
   </RestaurantCardContainer>
 )

}
