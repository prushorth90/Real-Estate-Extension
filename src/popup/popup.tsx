import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { Box } from '@material-ui/core'
import 'fontsource-roboto'
import './popup.css'
import {Topic} from './topics'
import TopicMenu from '../components/TopicMenu'
import WeatherPopup from '../components/WeatherPopup'
import RestaurantPopup from '../components/RestaurantPopup'
import {Address} from './Address/address'

// https://v4.mui.com/components/selects/
const App: React.FC<{}> = () => {
  const [topic, setTopic] = useState<Topic>(Topic.Topics)
  const [addr, setAddr] = useState<Address>(new Address(""))

  // Get the url from the current tab
  useEffect(() => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true}, (tabs)=> {
      let currentTab = tabs[0];
      console.log(currentTab.url);
      //mayve if to check in manifest settings which url
      let updatedAddress = new Address(currentTab.url)
      setAddr(updatedAddress)
      console.log(updatedAddress.getStreet())
      //setAddr(currentTab.url)
    })
  }, [])

  // case1: return if nothing card foreach api?????? 1 topic to many api and dataset
  return (
    <Box mx="8px" my="16px">
      <TopicMenu topic={topic} setTopic={setTopic}/>
      <WeatherPopup topic={topic} city={addr.getCity()}/>
      <RestaurantPopup topic={topic}/>
      <div>{addr.getZipCode()}</div>
    </Box>

  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
