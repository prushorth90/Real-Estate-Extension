import React, { useEffect, useState, createContext } from 'react'
import ReactDOM from 'react-dom'
import { Box } from '@material-ui/core'
import './popup.css'
import {Topic, TopicMenu} from './popupComponents/topicMenu'
import FoodPopup from './popupComponents/foodPopup'
import {Address, Coordinate, AddressAPI} from '../api/address/addressIndex'
export const TopicContext = createContext([])
export const CoordContext = createContext([])

export const App: React.FC<{}> = () => {
  const [topic, setTopic] = useState<Topic>(Topic.Topics)
  const [coord, setCoord] = useState<Coordinate>()

  useEffect(() => {
    findHouseCoordinates()
   
  }, [])
  async function findHouseCoordinates() {
    // Get the url from the current tab
    //https://developer.chrome.com/docs/extensions/reference/tabs/
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);

    let updatedAddress = getAddressFromURL(tab)
    fetchCoordinates(updatedAddress)
  }
 
  const getAddressFromURL = (tab) => {
    let currentTab = tab;
    let updatedAddress = new Address(currentTab.url)
    return updatedAddress
  }
  const fetchCoordinates = (updatedAddress) => {
    let addressApi = new AddressAPI()
    addressApi.fetchData(updatedAddress)
              .then((data) => {
                setCoord(data)
              })
              .catch((err) => setCoord(undefined))
  }

  return (
    <Box data-testid="popup" mx="8px" my="16px">
      <TopicContext.Provider value={[topic,setTopic]}>
        <TopicMenu />
        <CoordContext.Provider value={[coord, setCoord]}>
          <FoodPopup/>
        </CoordContext.Provider>
      </TopicContext.Provider>

    </Box>

  )
}

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(<App />, root)

export default App
