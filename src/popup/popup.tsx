import React, { useEffect, useState, createContext } from 'react'
import ReactDOM from 'react-dom'
import { Box } from '@material-ui/core'
//import 'fontsource-roboto'
import './popup.css'
import {Topic, TopicMenu} from '../components/TopicMenu'
import FoodPopup from '../components/foodPopup'
import {Address, AddressData, AddressAPI} from '../utils/api/address/addressIndex'
// https://v4.mui.com/components/selects/
export const TopicContext = createContext([])
export const CoordContext = createContext([])

export const App: React.FC<{}> = () => {
  const [topic, setTopic] = useState<Topic>(Topic.Topics)
  const [addr, setAddr] = useState<Address>(new Address(""))
  const [coord, setCoord] = useState<AddressData>()

  useEffect(() => {
    findCoordinates()
   
  }, [])
  async function findCoordinates() {
    // Get the url from the current tab
    //https://developer.chrome.com/docs/extensions/reference/tabs/
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);

    let updatedAddress = getAddressFromURL(tab)
    getLatitudeAndLongitude(updatedAddress)
  }
 
  const getAddressFromURL = (tabs) => {
    let currentTab = tabs;
    let updatedAddress = new Address(currentTab.url)
    setAddr(updatedAddress)
    return updatedAddress
  }
  const getLatitudeAndLongitude = (updatedAddress) => {
    let addressApi = new AddressAPI()
    addressApi.fetchData(updatedAddress)
              .then((data) => {
                setCoord(data)
              })
              .catch((err) => console.log(err))
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
