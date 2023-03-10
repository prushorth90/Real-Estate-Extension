import React,{ useState,useContext, createContext} from 'react'
import {Topic} from '../topicMenu/topics'
import {Box,} from '@material-ui/core'
import { FoodPlaceData } from '../../../api/food/foodIndex'
import {FoodCard, ResultState} from './card/foodCardIndex'
import {Filter} from './filters/filterIndex'
import {TopicContext} from '../../popup'

export const FoodPlaceContext = createContext([])
export const CardStateContext = createContext([])

const FoodPopup: React.FC<{
}> = () => {
  const [topic,setTopic] = useContext(TopicContext)
  const [foodPlaceData, setFoodPlaceData] = useState<FoodPlaceData | null>(null)
  const [cardState, setCardState] = useState<ResultState>(ResultState.Loading)
  return (
    <div>
      {topic == Topic.Food &&
        <Box data-testid="food-popup">
         <FoodPlaceContext.Provider value={[foodPlaceData,setFoodPlaceData]}>
          <CardStateContext.Provider value={[cardState, setCardState]}>
            <Filter />
            <FoodCard />
          </CardStateContext.Provider>

         </FoodPlaceContext.Provider>

       </Box>
      }
    </div>
  )
}

export default FoodPopup