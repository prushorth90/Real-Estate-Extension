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
  const [addr, setAddr] = useState<string>()
  //https://stackoverflow.com/questions/71834064/react-chrome-extension-how-to-modify-content-of-popup-on-url-change
  useEffect(() => {
    // chrome.storage.local.get("x", (res) => {
    // //   console.log(res)
    //      let m=res
    //      setAddr(m.x)
    //   })
    // });
    var query = { active: true, lastFocusedWindow: true}
    function callback(tabs) {
    var currentTab = tabs[0]; // there will be only one in this array
      console.log(currentTab.url); // also has properties like currentTab.id
      setAddr(currentTab.url)

    }
    chrome.tabs.query(query, callback)
  })
  // 1. WEIRD ONLY WORKS WHEN REFRESH???? - bidrecrional/POPUP ONLY LISTEN ONCE

  // chrome.runtime.onMessage.addListener((msg,sender,sendResponse) => {
  //   //console.log("W2SW2SW2SW2SW2SW2SW2SW2SW2SW2SW2SW2SW2SW2SW2SW2SW2SW2SW2SW2SW2SW2SW2SW2SW2SW2SW2SW2SW2SW2S")
  //   console.log(msg)
  //   let pol : string = msg
  //   setAddr(pol)
  // })

  // 2. main problem: popup needs url of curent page. this works only when clicking the popup again but wont if leave it open
  // -https://stackoverflow.com/questions/68747451/how-can-i-close-a-popup-window-when-the-url-changes
  //https://stackoverflow.com/questions/13359421/chrome-extension-get-current-tab-from-popup
  // or instead currwindow uuse lastFocusedWindow
  // potential solution: make popup close on change webpage
  // how does state change for popup

  // var query = { active: true, lastFocusedWindow: true}
  // function callback(tabs) {
  // var currentTab = tabs[0]; // there will be only one in this array
  //   console.log(currentTab.url); // also has properties like currentTab.id
  // }
  //<div> {chrome.tabs.query(query, callback)}




  // chrome.tabs.query(query, callback);
  //chrome.tabs.onActivated.addListener(callback)
  //3.
  // chrome.storage.local.get(["x"], (res) => {
  //   console.log(res)
  //   let m=res
  //   setAddr(m)
  // })
  //console.log("KSIKSIKSIKSIKSIKSIKSIKSIKSIKSIKSIKSIKSIKSIKSIKSIKSIKSIKSIKSIKSIKSIKSIKSIKSIKSIKSI")
  // 1. check if popup can extract page url directly 2. watch udemy 3. use webpage content not url
  // case1: return if nothing card foreach api?????? 1 topic to many api and dataset
  return (
    <Box mx="8px" my="16px">
      <TopicMenu topic={topic} setTopic={setTopic}/>
      <WeatherPopup topic={topic}/>
      <RestaurantPopup topic={topic}/>
      <div> {addr}</div>
    </Box>

  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)
