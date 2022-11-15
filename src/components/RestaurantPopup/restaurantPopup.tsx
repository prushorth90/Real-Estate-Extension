import React from 'react'
import RestaurantCard from './restaurantCard'
import {Topic} from '../../popup/topics'
import {Address} from '../../popup/Address/address'
import { Box} from '@material-ui/core'


const RestaurantPopup: React.FC<{
  topic: Topic
  address: Address
}> = ({ topic, address}) => {

  return (
    <div>
      {topic == Topic.Restaurant &&
       <RestaurantCard address={address}  />
      }
    </div>
  )
}

export default RestaurantPopup
