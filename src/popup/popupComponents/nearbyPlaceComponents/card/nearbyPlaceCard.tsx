import React, { useContext } from 'react'
import { Box,Grid, Typography,} from '@material-ui/core'
import './nearbyPlaceCard.css'
import {ResultState} from './cardComponents/result/resultState'
import {NearbyCardPartial} from './cardComponents/partials/nearbyCardPartial'
import {Result} from './cardComponents/result/result'
import {PhotoButton} from './cardComponents/buttons/photoButton'
import {CoordContext} from '../../../popup'
import {NearbyPlaceContext, CardStateContext} from '../../nearbyPlacePopup/nearbyPlacePopup'


export const NearbyPlaceCard: React.FC<{}> = ({}) => {
  const [coord,setCoord] = useContext(CoordContext)
  const [nearbyPlaceData, setNearbyPlaceData] = useContext(NearbyPlaceContext)
  const [cardState, setCardState] = useContext(CardStateContext)

  if (cardState === ResultState.Loading || cardState === ResultState.Error || cardState === ResultState.None) {
    return (
      <NearbyCardPartial>
        <Typography data-testid="result card other" className="card-body">
          {cardState}
        </Typography>
      </NearbyCardPartial>
    )
  } else {

    return (
      <Box>
        {nearbyPlaceData.results.map((result, index) => (
          <NearbyCardPartial key={index}>
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
          </NearbyCardPartial>
        ))}
      </Box>
    )
  }
}
