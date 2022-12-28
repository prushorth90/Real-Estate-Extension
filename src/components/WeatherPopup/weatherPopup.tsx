import React from 'react'
import WeatherCard from './WeatherCard'
import {Topic} from '../TopicMenu/topics'


const WeatherPopup: React.FC<{
  topic: Topic,
  city: string
}> = ({ topic, city}) => {
  //      {/* this is equiv to if (topic==weather)then render topic component */}
  return (
    <div>
      {topic == Topic.Weather &&
        <div>
        <WeatherCard city={city} tempScale={'metric'} />
        </div>
      }
    </div>
  )
}
export default WeatherPopup
