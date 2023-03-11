import React,{ useState,useContext, createContext} from 'react'
import {Topic} from '../topicMenu/topics'
import {Box,} from '@material-ui/core'
import {NearbyPlaceCard, ResultState} from '../nearbyPlaceComponents/card/nearbyPlaceCardIndex'
import {Filter} from '../nearbyPlaceComponents/filters/filterIndex'
import {TopicContext} from '../../popup'
import { TransportAPI } from '../../../api/transport/transportIndex'
import {Type} from './type'
import {NearbyPlaceAPIInput} from '../../../api/nearbyPlaces/nearbyPlaceAPIInput'
const TransportPopup: React.FC<{
}> = () => {
  const [topic,setTopic] = useContext(TopicContext)
  
  return (
    <div>
      {topic == Topic.Transport &&
        <Box data-testid="transport-popup">
            <Filter api={new TransportAPI()}
                    options={Object.values(Type)}
                    apiIn = {new NearbyPlaceAPIInput("Train Station", "Train Station")}/>
            <NearbyPlaceCard />

       </Box>
      }
    </div>
  )
}

export default TransportPopup