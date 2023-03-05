import React, { useEffect, useState,useContext } from 'react'
import { Box, Button, Grid, Typography,} from '@material-ui/core'
import { FoodAPI, NearbySearchData } from '../../../utils/api/food/foodIndex'
import './foodCard.css'
import {ResultState} from './cardComponents/result/resultState'
import {FoodCardContainer} from './cardComponents/partials/foodCardContainer'
import {Type} from '../filters/filterComponents/type/type'
import {Result} from './cardComponents/result/result'
import {PhotoButton} from './cardComponents/buttons/photo'
import {CoordContext} from '../../../popup/popup'
import {NearbySearchContext, CardStateContext} from '../foodPopup'


export const FoodCard: React.FC<{}> = ({}) => {
  const [coord,setCoord] = useContext(CoordContext)
  const [nearbySearchData, setNearbySearchData] = useContext(NearbySearchContext)
  const [cardState, setCardState] = useContext(CardStateContext)

  if (cardState === ResultState.Loading || cardState === ResultState.Error || cardState === ResultState.None) {
    return (
      <FoodCardContainer>
        <Typography data-testid="result card other" className="foodCard-body">
          {cardState}
        </Typography>
      </FoodCardContainer>
    )
  } else {

    return (
      <Box>
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
