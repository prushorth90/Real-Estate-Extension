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

  console.log("6")
  
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
