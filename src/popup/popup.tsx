import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { Box } from '@material-ui/core'
import 'fontsource-roboto'
import './popup.css'
import {Topic} from './topics'
import TopicMenu from '../components/TopicMenu'
import WeatherPopup from '../components/WeatherPopup'
import RestaurantPopup from '../components/RestaurantPopup'

// https://v4.mui.com/components/selects/
const App: React.FC<{}> = () => {
  const [topic, setTopic] = useState<Topic>(Topic.Topics)

  // case1: return if nothing card foreach api?????? 1 topic to many api and dataset
  return (
    <Box mx="8px" my="16px">
      <TopicMenu topic={topic} setTopic={setTopic}/>
      <WeatherPopup topic={topic}/>
      <RestaurantPopup topic={topic}/>
    </Box>
  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
