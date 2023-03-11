import React,{ useState,useContext, createContext} from 'react'
import {Topic} from '../topicMenu/topics'
import {Box,} from '@material-ui/core'
import {NearbyPlaceCard, ResultState} from '../nearbyPlaceComponents/card/nearbyPlaceCardIndex'
import {Filter} from '../nearbyPlaceComponents/filters/filterIndex'
import {TopicContext} from '../../popup'
import { HealthAPI } from '../../../api/health/healthIndex'
import {Type} from './type'
import {NearbyPlaceAPIInput} from '../../../api/nearbyPlaces/nearbyPlaceAPIInput'
const HealthPopup: React.FC<{
}> = () => {
  const [topic,setTopic] = useContext(TopicContext)
  
  return (
    <div>
      {topic == Topic.Health &&
        <Box data-testid="health-popup">
            <Filter api={new HealthAPI()}
                    options={Object.values(Type)}
                    apiIn = {new NearbyPlaceAPIInput("Hospital", "Hospital")}/>
            <NearbyPlaceCard />

       </Box>
      }
    </div>
  )
}

export default HealthPopup