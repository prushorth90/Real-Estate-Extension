import React from 'react'
import WeatherCard from '../WeatherPopup/WeatherCard'
import {Topic} from '../../popup/topics'
import { Box} from '@material-ui/core'


const RestaurantPopup: React.FC<{
  topic: Topic
}> = ({ topic }) => {

  return (
    <div>
      {topic == Topic.Restaurant &&
       <WeatherCard city={'London'} tempScale={'metric'} />
      }
    </div>
  )
}

export default RestaurantPopup
