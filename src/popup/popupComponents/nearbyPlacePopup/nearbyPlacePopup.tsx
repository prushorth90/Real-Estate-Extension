import React,{ useState,useContext, createContext} from 'react'
import {Box,} from '@material-ui/core'
import {NearbyPlaceCard, ResultState} from './nearbyPlaceComponents/card/nearbyPlaceCardIndex'
import {Filter} from './nearbyPlaceComponents/filters/filterIndex'
import {TopicContext} from '../../popup'
import { NearbyPlaceAPI } from '../../../api/nearbyPlaces/nearbyPlaceApi'
import {FilterTypeOption} from './nearbyPlaceComponents/filters/filterComponents/type/filterTypeOptions'
import {FilterDefaultValues } from './nearbyPlaceComponents/filters/filterComponents/filterDefaultValues'
import { NearbyPlaceData } from '../../../api/nearbyPlaces/nearbyPlaceIndex'

export const NearbyPlaceContext = createContext([])
export const CardStateContext = createContext([])

const NearbyPlacePopup: React.FC<{
}> = () => {
  const [topic,setTopic] = useContext(TopicContext)
  const filterDefault = new FilterDefaultValues()
  const filterTypeOption = new FilterTypeOption()
  const [nearbyPlaceData, setNearbyPlaceData] = useState<NearbyPlaceData | null>(null)
  const [cardState, setCardState] = useState<ResultState>(ResultState.Loading)

  return (
    <div>
      <NearbyPlaceContext.Provider value={[nearbyPlaceData, setNearbyPlaceData]}>
        <CardStateContext.Provider value={[cardState, setCardState]}>
          <Box data-testid="nearby-popup">
            <Filter api={new NearbyPlaceAPI()}
                    filterTypeOptions={filterTypeOption.get(topic)}
                    filtersDefaultValues= {filterDefault.get(topic)}/>
            <NearbyPlaceCard />
          </Box>
        </CardStateContext.Provider>
      </NearbyPlaceContext.Provider>
    </div>
  )
}

export default NearbyPlacePopup
