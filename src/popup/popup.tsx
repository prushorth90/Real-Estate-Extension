import React, { useEffect, useState, createContext } from 'react'
import ReactDOM from 'react-dom'
import { Box } from '@material-ui/core'
import './popup.css'
import {Topic, TopicMenu} from './popupComponents/topicMenu'
import FoodPopup from './popupComponents/foodPopup'
import HealthPopup from './popupComponents/healthPopup'
import {Address, Coordinate, AddressAPI} from '../api/address/addressIndex'
import { NearbyPlaceData } from '../api/nearbyPlaces/nearbyPlaceIndex'
import {ResultState } from './popupComponents/nearbyPlaceComponents/card/nearbyPlaceCardIndex'

export const TopicContext = createContext([])
export const CoordContext = createContext([])
export const NearbyPlaceContext = createContext([])
export const CardStateContext = createContext([])

export const App: React.FC<{}> = () => {
  const [topic, setTopic] = useState<Topic>(Topic.Topics)
  const [coord, setCoord] = useState<Coordinate>()
  const [nearbyPlaceData, setNearbyPlaceData] = useState<NearbyPlaceData | null>(null)
  const [cardState, setCardState] = useState<ResultState>(ResultState.Loading)

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
          <NearbyPlaceContext.Provider value={[nearbyPlaceData, setNearbyPlaceData]}>
            <CardStateContext.Provider value={[cardState, setCardState]}>
               <FoodPopup/>
               <HealthPopup />

            </CardStateContext.Provider>
            </NearbyPlaceContext.Provider>
        </CoordContext.Provider>
      </TopicContext.Provider>

    </Box>

  )
}

// const root = document.createElement('div')
// document.body.appendChild(root)
// ReactDOM.render(<App />, root)

export default App
