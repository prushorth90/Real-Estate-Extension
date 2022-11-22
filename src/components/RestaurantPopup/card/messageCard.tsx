import React from 'react'
import {Typography} from '@material-ui/core'
import {RestaurantCardContainer} from './restaurantCardContainer'
import {RestaurantCardState} from './restaurantCardState'

export const MessageCard: React.FC<{
  cardState
}> = ({ cardState}) => {


  if (cardState === RestaurantCardState.Loading || cardState === RestaurantCardState.Error) {
     return (
       <RestaurantCardContainer>
       {console.log("11")}
         <Typography className="restaurantCard-body">
           {cardState === RestaurantCardState.Loading ? RestaurantCardState.Loading : RestaurantCardState.Error}
         </Typography>
       </RestaurantCardContainer>
     )
   }
   return (
     <RestaurantCardContainer>
     <Typography className="restaurantCard-body">
       {RestaurantCardState.None}
     </Typography>
   </RestaurantCardContainer>
 )

}
