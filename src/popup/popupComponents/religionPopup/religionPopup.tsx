import React,{ useState,useContext, createContext} from 'react'
import {Topic} from '../topicMenu/topics'
import {Box,} from '@material-ui/core'
import {NearbyPlaceCard, ResultState} from '../nearbyPlaceComponents/card/nearbyPlaceCardIndex'
import {Filter} from '../nearbyPlaceComponents/filters/filterIndex'
import {TopicContext} from '../../popup'
import { ReligionAPI } from '../../../api/religion/religionIndex'
import {Type} from './type'
import {NearbyPlaceAPIInput} from '../../../api/nearbyPlaces/nearbyPlaceAPIInput'
const ReligionPopup: React.FC<{
}> = () => {
  const [topic,setTopic] = useContext(TopicContext)
  
  return (
    <div>
      {topic == Topic.Religion &&
        <Box data-testid="religion-popup">
            <Filter api={new ReligionAPI()}
                    options={Object.values(Type)}
                    apiIn = {new NearbyPlaceAPIInput("Church", "Church")}/>
            <NearbyPlaceCard />

       </Box>
      }
    </div>
  )
}

export default ReligionPopup