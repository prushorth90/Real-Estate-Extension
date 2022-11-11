import React from 'react'
import WeatherCard from './WeatherCard'
import {Topic} from '../../popup/topics'


const WeatherPopup: React.FC<{
  topic: Topic
}> = ({ topic }) => {
  //      {/* this is equiv to if (topic==weather)then render topic component */}
  return (
    <div>
      {topic == Topic.Weather &&
        <div>
        <WeatherCard city={'Seattle'} tempScale={'metric'} />
        <WeatherCard city={'Toronto'} tempScale={'metric'} />
        </div>
      }
    </div>
  )
}
export default WeatherPopup
