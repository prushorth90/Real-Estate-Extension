import React,{ useState,useContext, createContext} from 'react'
import {Topic} from '../topicMenu/topics'
import {Box,} from '@material-ui/core'
import {NearbyPlaceCard, ResultState} from '../nearbyPlaceComponents/card/nearbyPlaceCardIndex'
import {Filter} from '../nearbyPlaceComponents/filters/filterIndex'
import {TopicContext} from '../../popup'
import { NearbyPlaceAPI } from '../../../api/nearbyPlaces/nearbyPlaceApi'
import {Type} from './type'
import {NearbyPlaceAPIInput} from '../../../api/nearbyPlaces/nearbyPlaceAPIInput'
const RecreationPopup: React.FC<{
}> = () => {
  const [topic,setTopic] = useContext(TopicContext)
  
  return (
    <div>
      {topic == Topic.Recreation &&
        <Box data-testid="recreation-popup">
            <Filter api={new NearbyPlaceAPI()}
                    options={Object.values(Type)}
                    apiIn = {new NearbyPlaceAPIInput("Gym", "Gym")}/>
            <NearbyPlaceCard />

       </Box>
      }
    </div>
  )
}

export default RecreationPopup