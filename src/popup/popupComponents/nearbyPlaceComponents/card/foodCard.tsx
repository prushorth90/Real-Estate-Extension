import React, { useContext } from 'react'
import { Box,Grid, Typography,} from '@material-ui/core'
import './foodCard.css'
import {ResultState} from './cardComponents/result/resultState'
import {FoodCardPartial} from './cardComponents/partials/foodCardPartial'
import {Result} from './cardComponents/result/result'
import {PhotoButton} from './cardComponents/buttons/photoButton'
import {CoordContext} from '../../../popup'
import {FoodPlaceContext, CardStateContext} from '../../foodPopup/foodPopup'


export const FoodCard: React.FC<{}> = ({}) => {
  const [coord,setCoord] = useContext(CoordContext)
  const [foodPlaceData, setFoodPlaceData] = useContext(FoodPlaceContext)
  const [cardState, setCardState] = useContext(CardStateContext)

  if (cardState === ResultState.Loading || cardState === ResultState.Error || cardState === ResultState.None) {
    return (
      <FoodCardPartial>
        <Typography data-testid="result card other" className="foodCard-body">
          {cardState}
        </Typography>
      </FoodCardPartial>
    )
  } else {

    return (
      <Box>
        {foodPlaceData.results.map((result, index) => (
          <FoodCardPartial key={index}>
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
          </FoodCardPartial>
        ))}
      </Box>
    )
  }
}
