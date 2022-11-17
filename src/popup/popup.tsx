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
import {AddressData, AddressAPI} from '../utils/api/address/addressIndex'
// https://v4.mui.com/components/selects/
const App: React.FC<{}> = () => {
  const [topic, setTopic] = useState<Topic>(Topic.Topics)
  const [addr, setAddr] = useState<Address>(new Address(""))
  console.log("1")
  // Get the url from the current tab
  useEffect(() => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true}, (tabs)=> {
      let currentTab = tabs[0];
      console.log("1.1")
      console.log(currentTab.url);
      //mayve if to check in manifest settings which url
      let updatedAddress = new Address(currentTab.url)
      console.log("1.15")
      setAddr(updatedAddress)
      console.log("1.2")
      console.log(updatedAddress.getStreet())
      //setAddr(currentTab.url)
    })
    console.log("2")
  }, [])

  // case1: return if nothing card foreach api?????? 1 topic to many api and dataset
  return (
    <Box mx="8px" my="16px">
      {console.log("3")}
      <TopicMenu topic={topic} setTopic={setTopic}/>
      <WeatherPopup topic={topic} city={addr.getCity()}/>
      <RestaurantPopup topic={topic} address={addr}/>

    </Box>

  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
