import React,{ useState,useContext, createContext} from 'react'
import {Topic} from '../TopicMenu/topics'
import {Box,} from '@material-ui/core'
import { NearbySearchData } from '../../utils/api/food/foodIndex'
import {FoodCard, ResultState} from './card/foodCardIndex'
import {Filter} from './filters/filterIndex'
import {TopicContext} from '../../popup/popup'

export const NearbySearchContext = createContext([])
export const CardStateContext = createContext([])

const FoodPopup: React.FC<{
}> = () => {
  const [topic,setTopic] = useContext(TopicContext)
  const [nearbySearchData, setNearbySearchData] = useState<NearbySearchData | null>(null)
  const [cardState, setCardState] = useState<ResultState>(ResultState.Loading)
  return (
    <div>
      {topic == Topic.Food &&
        <Box data-testid="food-popup">
         <NearbySearchContext.Provider value={[nearbySearchData,setNearbySearchData]}>
          <CardStateContext.Provider value={[cardState, setCardState]}>
            <Filter />
            <FoodCard />
          </CardStateContext.Provider>

         </NearbySearchContext.Provider>

       </Box>
      }
    </div>
  )
}

export default FoodPopup