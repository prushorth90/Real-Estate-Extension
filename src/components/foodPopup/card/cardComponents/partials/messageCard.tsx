import React from 'react'
import {Typography} from '@material-ui/core'
import {FoodCardContainer} from './foodCardContainer'
import {ResultState} from '../result/resultState'

export const MessageCard: React.FC<{
  cardState
}> = ({ cardState}) => {


  if (cardState === ResultState.Loading || cardState === ResultState.Error) {
     return (
       <FoodCardContainer>
       {console.log("11")}
         <Typography className="foodCard-body">
           {cardState === ResultState.Loading ? ResultState.Loading : ResultState.Error}
         </Typography>
       </FoodCardContainer>
     )
   }
   return (
     <FoodCardContainer>
     <Typography className="foodCard-body">
       {ResultState.None}
     </Typography>
   </FoodCardContainer>
 )

}
