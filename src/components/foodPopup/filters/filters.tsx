import React,{ useEffect, useState, useContext,createContext } from 'react'
import { FoodAPI } from '../../../utils/api/food/foodIndex'
import {ResultState} from '../card/foodCardIndex'
import {RadiusFilter, TypeFilter, CuisineFilter, MinPriceFilter, MaxPriceFilter} from '../filters/filterIndex'
import {Type} from './filterComponents/type/type'
import {CoordContext} from '../../../popup/popup'
import {NearbySearchContext, CardStateContext} from '../foodPopup'
import {APIInput} from './apiInput'

export const APIContext = createContext([])

export const Filter: React.FC<{}> = ({}) => {
  let foodApi = new FoodAPI()
  const [apiInput, setAPIInput] = useState<APIInput>(new APIInput());
  const [coord,setCoord] = useContext(CoordContext)
  const [nearbySearchData, setNearbySearchData] = useContext(NearbySearchContext)
  const [cardState, setCardState] = useContext(CardStateContext)

  useEffect(() => {
    if (coord !== undefined && coord.results.length !== 0) {
      foodApi.fetchData(coord, apiInput)
        .then((data) => {
          setNearbySearchData(data)
          data.results.length === 0 ?setCardState(ResultState.None): setCardState(ResultState.Ready)
        })
        .catch((err) => setCardState(ResultState.Error))
    } else {
      setCardState(ResultState.None)
    }
  }, [apiInput])

  return (
     <div>
     <APIContext.Provider value={[apiInput, setAPIInput]}>

          <RadiusFilter />
          <TypeFilter />
          {apiInput.type === Type.Restaurant ? <CuisineFilter /> : ""}
          <MinPriceFilter />
          <MaxPriceFilter />
      </APIContext.Provider>

      </div>

  )
}


// import React,{ useEffect, useState, useContext } from 'react'
// import { RestaurantAPI } from '../../../utils/api/restaurant/restaurantIndex'
// import {ResultState} from '../card/restaurantCardIndex'
// import {RadiusFilter, TypeFilter, CuisineFilter, MinPriceFilter, MaxPriceFilter} from '../filters/filterIndex'
// import {Type} from './filterComponents/type/type'
// import {CoordContext} from '../../../popup/popup'
// import {NearbySearchContext, CardStateContext} from '../restaurantPopup'
//
// export const Filter: React.FC<{}> = ({}) => {
//   let restaurantApi = new RestaurantAPI()
//   const [radius, setRadius] = useState<string>("1500")
//   const [type,setType] = useState<string>(Type.Bakery)
//   const [keyword, setKeyword] = useState<string>(Type.Bakery)
//   const [minPrice,setMinPrice] = useState<string>("0")
//   const [maxPrice,setMaxPrice] = useState<string>("4")
//   const [coord,setCoord] = useContext(CoordContext)
//   const [nearbySearchData, setNearbySearchData] = useContext(NearbySearchContext)
//   const [cardState, setCardState] = useContext(CardStateContext)
//
//   useEffect(() => {
//     if (coord !== undefined && coord.results.length !== 0) {
//       restaurantApi.fetchData(coord, keyword, radius, type, minPrice, maxPrice)
//         .then((data) => {
//           setNearbySearchData(data)
//           data.results.length === 0 ?setCardState(ResultState.None): setCardState(ResultState.Ready)
//         })
//         .catch((err) => setCardState(ResultState.Error))
//     }
//   }, [radius, type, keyword, minPrice, maxPrice])
//
//   return (
//      <div>
//           <RadiusFilter radius={radius} setRadius={setRadius}  />
//           <TypeFilter type={type} setType={setType} setKeyword={setKeyword} />
//           {type === Type.Restaurant ? <CuisineFilter keyword={keyword} setKeyword={setKeyword} /> : ""}
//           <MinPriceFilter minPrice={minPrice} setMinPrice={setMinPrice}/>
//           <MaxPriceFilter maxPrice={maxPrice} setMaxPrice={setMaxPrice}/>
//       </div>
//
//   )
// }
