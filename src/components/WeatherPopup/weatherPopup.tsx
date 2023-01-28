import React, {useContext} from 'react'
import WeatherCard from './WeatherCard'
import {Topic} from '../TopicMenu/topics'
import {TopicContext} from '../../popup/popup'

const WeatherPopup: React.FC<{
  city: string
}> = ({ city}) => {
  const [topic,setTopic] = useContext(TopicContext)
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
