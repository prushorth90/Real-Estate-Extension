import React,{ useState,useContext, createContext} from 'react'
import {Topic} from '../menu/topics'
import {Box,} from '@material-ui/core'
import {NearbyPlaceCard, ResultState} from '../nearbyPlaceComponents/card/nearbyPlaceCardIndex'
import {Filter} from '../nearbyPlaceComponents/filters/filterIndex'
import {TopicContext} from '../../popup'
import { NearbyPlaceAPI } from '../../../api/nearbyPlaces/nearbyPlaceApi'
import {NearbyPlaceAPIInput} from '../../../api/nearbyPlaces/nearbyPlaceAPIInput'
import {SelectOption} from './selectOptions/selectOption'
import {APIOption } from './APIOptions/apiOption'
import { NearbyPlaceData } from '../../../api/nearbyPlaces/nearbyPlaceIndex'

export const NearbyPlaceContext = createContext([])
export const CardStateContext = createContext([])

const NearbyPlacePopup: React.FC<{
}> = () => {
  const [topic,setTopic] = useContext(TopicContext)
  const selectOption = new SelectOption()
  const apiOption = new APIOption()
  const [nearbyPlaceData, setNearbyPlaceData] = useState<NearbyPlaceData | null>(null)
  const [cardState, setCardState] = useState<ResultState>(ResultState.Loading)

  return (
    <div>
      <NearbyPlaceContext.Provider value={[nearbyPlaceData, setNearbyPlaceData]}>
        <CardStateContext.Provider value={[cardState, setCardState]}>

              <Box data-testid="nearby-popup">
                  <Filter api={new NearbyPlaceAPI()}
                          options={selectOption.get(topic)}
                          apiIn = {apiOption.get(topic)}/>
                  <NearbyPlaceCard />

            </Box>
        </CardStateContext.Provider>
      </NearbyPlaceContext.Provider>
    </div>
  )
}

export default NearbyPlacePopup
