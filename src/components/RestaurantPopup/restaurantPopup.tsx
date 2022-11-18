import React,{ useEffect, useState } from 'react'
import RestaurantCard from './restaurantCard'
import {Topic} from '../../popup/topics'
import {Address} from '../../popup/Address/address'
import { Box} from '@material-ui/core'
import {AddressData,AddressAPI} from '../../utils/api/address/addressIndex'


const RestaurantPopup: React.FC<{
  topic: Topic
  coord: AddressData
}> = ({ topic, coord}) => {

  const [dataa, setDataa] = useState<AddressData>()
  //let addressApi = new AddressAPI()
  console.log("6")

  // useEffect(() => {
  //   console.log("7")
  //   if (address.getStreet() !== undefined) {
  //     addressApi.fetchData(address)
  //       .then((data) => {
  //         console.log("PRUSHORTH 7.1")
  //         setDataa(data)
  //         console.log("PRUSHORTH 7.2")
  //         console.log(dataa)
  //         console.log(data.results[0].geometry.location.lat)
  //       })
  //       .catch((err) => console.log(err))
  //     console.log("PRUSHORTH 7.5")
  //     console.log(dataa)
  //   }
  // }, [topic])

  return (
    <div>
    {console.log("8")}
      {topic == Topic.Restaurant &&
       <RestaurantCard coord={coord}/>
      }
    </div>
  )
}

export default RestaurantPopup
