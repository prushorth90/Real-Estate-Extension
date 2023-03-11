export interface NearbyPlaceData {
  results: {
    icon: string
    icon_background_colour: string
    name: string
    opening_hours: {
      open_now: boolean
    }
    photos: {
      height: number
      photo_reference: string
      width: number
    }[]
    price_level: number
    rating: number
    types: string[]
    user_ratings_total: number
    vicinity: string
  }[]
}
