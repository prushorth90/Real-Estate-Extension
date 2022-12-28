import { NearbySearchData} from './restaurantIndex';
import {API} from '../mainApi';
import {Address} from '../../../popup/Address/address'
import {AddressData} from '../address/addressIndex'

export class RestaurantAPI extends API {

  private readonly NEARBY_SEARCH_API_KEY = 'AIzaSyDbq-ALkqgJHFvNBDQc-1MJjCk6schskEw';
  // public constructor(apiKey){
  //   super(apiKey);
  // }

  public async fetchData(coord, keyword, radius, type, minPrice, maxPrice): Promise<NearbySearchData> {
    let latitude = coord.results[0].geometry.location.lat
    let longitude = coord.results[0].geometry.location.lng
    console.log("adsalskjdalksjdlkajsdlkasjdlkajsdlkajslkdjaskldjlaksjdlkajsldkjaslkdjalksjdklajalksjdkljasl")
    console.log(latitude)
    //`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${tempScale}&appid=${this.NEARBY_SEARCH_API_KEY}`
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=${keyword}&location=${latitude}%2C${longitude}&radius=${radius}&type=${type}&minprice=${minPrice}&maxprice=${maxPrice}&key=${this.NEARBY_SEARCH_API_KEY}`
    )
    // for bs.ts and wc.tsx if the thing fails // &type=indian
    if (!res.ok) {
      throw new Error('not found')
    }

    const data: NearbySearchData = await res.json()
    return data
  }


}

// {
//    "html_attributions" : [],
//    "next_page_token" : "AW30NDy9cfn_IpTGDItApfS1Sn88F6qi6c802LmFe1Zxhrte6JC1xL_QqZuxjRs2VaIW4e9ZlU8FvoTTQ2gZiXw6ZL_FH8tNTvoTAzBAxFjX_4bg4yaNPD9FoOwvmpOH5N3NDzu37-UXmfh9jwQhpLUde_aOMoZqXaIkT_BMMDs0j9VRX3yBUadv5LyYpAwAxXd76RzReXPcsCTqqWwzDIqiHKwlCTZ7K3C2jF1HSKe_bgJTRvV17cy1eLVxIGz1qkf7-RDq6zLc1Z0IAn_TqoHHBgHi6pnv1Mvq02o2VYlxDRNa41iB60UT1JwJgA0TtsHZKfH06A8-8rI63BsGC185bgibCe1ZGbVwV3gQ4_ccu_VOptk8QDSndIEhUncpjKvjafxLpLySq-ghqjTcpd_Y8di513FWEe-KkHcqwxXc5EIOXdKM3c3nfDAyP84qzEXyxF5ml-SqbaJr",
//    "results" : [
//       {
//          "business_status" : "OPERATIONAL",
//          "geometry" : {
//             "location" : {
//                "lat" : 41.754411,
//                "lng" : -87.64432069999999
//             },
//             "viewport" : {
//                "northeast" : {
//                   "lat" : 41.75576237989272,
//                   "lng" : -87.64287482010728
//                },
//                "southwest" : {
//                   "lat" : 41.75306272010728,
//                   "lng" : -87.64557447989273
//                }
//             }
//          },
//          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
//          "icon_background_color" : "#FF9E67",
//          "icon_mask_base_uri" : "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
//          "name" : "Maxwell Restaurant",
//          "opening_hours" : {
//             "open_now" : false
//          },
//          "photos" : [
//             {
//                "height" : 1840,
//                "html_attributions" : [
//                   "\u003ca href=\"https://maps.google.com/maps/contrib/108249016142101779369\"\u003eJohn Watts\u003c/a\u003e"
//                ],
//                "photo_reference" : "AW30NDwmFW6rYPzrHV1ovqhPP0bmtvNuENzzKLm7KoXfScjfzesTrwi9pJYLjJOBFUB1OztrLv1RMNOetci0ThyCkLJROcLLVmsfFTJ_jdHdspRt_perzFJ74cQl_1VTX4F2cfAQvXUmS1_Ms0_Uo5BqJtrTjWzmLlyrMyVQg3Bj4gzeChxn",
//                "width" : 3264
//             }
//          ],
//          "place_id" : "ChIJjcFAjGwvDogRyCVBxJLN5QI",
//          "plus_code" : {
//             "compound_code" : "Q934+Q7 Chicago, Illinois",
//             "global_code" : "86HJQ934+Q7"
//          },
//          "rating" : 3.7,
//          "reference" : "ChIJjcFAjGwvDogRyCVBxJLN5QI",
//          "scope" : "GOOGLE",
//          "types" : [ "restaurant", "food", "point_of_interest", "establishment" ],
//          "user_ratings_total" : 10,
//          "vicinity" : "Chicago"
//       },
//       {
//          "business_status" : "OPERATIONAL",
//          "geometry" : {
//             "location" : {
//                "lat" : 41.7563305,
//                "lng" : -87.6444274
//             },
//             "viewport" : {
//                "northeast" : {
//                   "lat" : 41.75772992989273,
//                   "lng" : -87.64295652010728
//                },
//                "southwest" : {
//                   "lat" : 41.75503027010728,
//                   "lng" : -87.64565617989273
//                }
//             }
//          },
//          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
//          "icon_background_color" : "#FF9E67",
//          "icon_mask_base_uri" : "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
//          "name" : "Humble Eats",
//          "opening_hours" : {
//             "open_now" : false
//          },
//          "photos" : [
//             {
//                "height" : 1200,
//                "html_attributions" : [
//                   "\u003ca href=\"https://maps.google.com/maps/contrib/118237408595751870610\"\u003eRashawnda McCornell\u003c/a\u003e"
//                ],
//                "photo_reference" : "AW30NDyua-k7pyWCwFJmHs6Uxux6TZ9LssyvxcQWvQygPCLVj5y465kMX8PnBklNSf_5CVtGdX_5cR0Pjm0AQmAeA0C0yuz7BDkPbksMSeEOGNquQ_VdX3lD1VbiBqJnUVmzTW4DDYCd6szQ5X2uuEiOXJzCU8hyRXqW6rbjg-z16nVADuiD",
//                "width" : 1600
//             }
//          ],
//          "place_id" : "ChIJa7s2R58lDogRC3bfHysGhDs",
//          "plus_code" : {
//             "compound_code" : "Q944+G6 Chicago, Illinois",
//             "global_code" : "86HJQ944+G6"
//          },
//          "price_level" : 2,
//          "rating" : 4.3,
//          "reference" : "ChIJa7s2R58lDogRC3bfHysGhDs",
//          "scope" : "GOOGLE",
//          "types" : [ "restaurant", "food", "point_of_interest", "establishment" ],
//          "user_ratings_total" : 83,
//          "vicinity" : "7550 S Halsted St, Chicago"
//       },
//       {
//          "business_status" : "OPERATIONAL",
//          "geometry" : {
//             "location" : {
//                "lat" : 41.7633777,
//                "lng" : -87.6443518
//             },
//             "viewport" : {
//                "northeast" : {
//                   "lat" : 41.76472752989272,
//                   "lng" : -87.64300197010726
//                },
//                "southwest" : {
//                   "lat" : 41.76202787010728,
//                   "lng" : -87.64570162989271
//                }
//             }
//          },
//          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
//          "icon_background_color" : "#FF9E67",
//          "icon_mask_base_uri" : "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
//          "name" : "Lagos restaurant",
//          "place_id" : "ChIJuXdgn6IvDogRNnUcIgTFViQ",
//          "plus_code" : {
//             "compound_code" : "Q974+97 Chicago, Illinois",
//             "global_code" : "86HJQ974+97"
//          },
//          "rating" : 0,
//          "reference" : "ChIJuXdgn6IvDogRNnUcIgTFViQ",
//          "scope" : "GOOGLE",
//          "types" : [ "restaurant", "food", "point_of_interest", "establishment" ],
//          "user_ratings_total" : 0,
//          "vicinity" : "S Halsted St, Chicago"
//       },
//       {
//          "business_status" : "OPERATIONAL",
//          "geometry" : {
//             "location" : {
//                "lat" : 41.7505172,
//                "lng" : -87.63223259999999
//             },
//             "viewport" : {
//                "northeast" : {
//                   "lat" : 41.75186972989271,
//                   "lng" : -87.63070157010726
//                },
//                "southwest" : {
//                   "lat" : 41.74917007010727,
//                   "lng" : -87.63340122989271
//                }
//             }
//          },
//          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
//          "icon_background_color" : "#FF9E67",
//          "icon_mask_base_uri" : "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
//          "name" : "Legends Chicken & Fish",
//          "opening_hours" : {
//             "open_now" : false
//          },
//          "photos" : [
//             {
//                "height" : 1702,
//                "html_attributions" : [
//                   "\u003ca href=\"https://maps.google.com/maps/contrib/117482459952119625405\"\u003eA Google User\u003c/a\u003e"
//                ],
//                "photo_reference" : "AW30NDwIQ1vHKvJMkNEKfRSjaEAksr4v2dEXUtUetOVtB8V6-PWA5DqYDesJaZb8Q_fFdJCKiv8ry-Vx1qYe7hBCvttLo5Ipl1E4UdMBAB1dOxe0kmoQMRJsT2Hz4JBY0NRlZ2gtJ2ZDn_uEijhmyR1VIp_zJqKWsJzGVsNX71SHeadPnuvB",
//                "width" : 3024
//             }
//          ],
//          "place_id" : "ChIJw4-a5yUvDogRhRpqS95clt4",
//          "plus_code" : {
//             "compound_code" : "Q929+64 Chicago, Illinois",
//             "global_code" : "86HJQ929+64"
//          },
//          "rating" : 4.6,
//          "reference" : "ChIJw4-a5yUvDogRhRpqS95clt4",
//          "scope" : "GOOGLE",
//          "types" : [ "restaurant", "food", "point_of_interest", "establishment" ],
//          "user_ratings_total" : 165,
//          "vicinity" : "303 W 79th St, Chicago"
//       },
//       {
//          "business_status" : "OPERATIONAL",
//          "geometry" : {
//             "location" : {
//                "lat" : 41.7689507,
//                "lng" : -87.64467569999999
//             },
//             "viewport" : {
//                "northeast" : {
//                   "lat" : 41.77030967989271,
//                   "lng" : -87.64343052010727
//                },
//                "southwest" : {
//                   "lat" : 41.76761002010727,
//                   "lng" : -87.64613017989272
//                }
//             }
//          },
//          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
//          "icon_background_color" : "#FF9E67",
//          "icon_mask_base_uri" : "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
//          "name" : "Route 69 Palace and Soul Food",
//          "place_id" : "ChIJRbZq0MsvDogRzewje-ztbGE",
//          "plus_code" : {
//             "compound_code" : "Q993+HX Chicago, Illinois",
//             "global_code" : "86HJQ993+HX"
//          },
//          "rating" : 0,
//          "reference" : "ChIJRbZq0MsvDogRzewje-ztbGE",
//          "scope" : "GOOGLE",
//          "types" : [ "restaurant", "food", "point_of_interest", "establishment" ],
//          "user_ratings_total" : 0,
//          "vicinity" : "812 W 69th St, Chicago"
//       },
//       {
//          "business_status" : "OPERATIONAL",
//          "geometry" : {
//             "location" : {
//                "lat" : 41.7684972,
//                "lng" : -87.6537354
//             },
//             "viewport" : {
//                "northeast" : {
//                   "lat" : 41.76994207989272,
//                   "lng" : -87.65238957010727
//                },
//                "southwest" : {
//                   "lat" : 41.76724242010727,
//                   "lng" : -87.65508922989272
//                }
//             }
//          },
//          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
//          "icon_background_color" : "#FF9E67",
//          "icon_mask_base_uri" : "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
//          "name" : "Amber’s Food Cafe",
//          "opening_hours" : {
//             "open_now" : false
//          },
//          "place_id" : "ChIJpWYoZQYvDogRpgnTVGl7RzE",
//          "plus_code" : {
//             "compound_code" : "Q89W+9G Chicago, Illinois",
//             "global_code" : "86HJQ89W+9G"
//          },
//          "rating" : 3.8,
//          "reference" : "ChIJpWYoZQYvDogRpgnTVGl7RzE",
//          "scope" : "GOOGLE",
//          "types" : [ "restaurant", "store", "food", "point_of_interest", "establishment" ],
//          "user_ratings_total" : 41,
//          "vicinity" : "1149 W 69th St, Chicago"
//       },
//       {
//          "business_status" : "OPERATIONAL",
//          "geometry" : {
//             "location" : {
//                "lat" : 41.768758,
//                "lng" : -87.64395429999999
//             },
//             "viewport" : {
//                "northeast" : {
//                   "lat" : 41.77013967989271,
//                   "lng" : -87.64264187010727
//                },
//                "southwest" : {
//                   "lat" : 41.76744002010727,
//                   "lng" : -87.64534152989272
//                }
//             }
//          },
//          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
//          "icon_background_color" : "#FF9E67",
//          "icon_mask_base_uri" : "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
//          "name" : "Philly Gyro Sub & Chicken",
//          "opening_hours" : {
//             "open_now" : false
//          },
//          "photos" : [
//             {
//                "height" : 4032,
//                "html_attributions" : [
//                   "\u003ca href=\"https://maps.google.com/maps/contrib/102969503452510398886\"\u003eDanielle Stoned\u003c/a\u003e"
//                ],
//                "photo_reference" : "AW30NDwmq10pRIWhZM08Zh6cZKRL7gQY64ZUTXrAOSC8_2p7-faSU4Vh-aELLDN6QphhYOBscOApt0US9aMYc5nkh5_u_99Vr8V6-Bzpodp8P3cUlCSt-b9EQX_NhRHjQJDAfZ4K7q8-R2Z11p-bb111rdYTM_yZdlfUz6iWKdoYFkadIn-X",
//                "width" : 3024
//             }
//          ],
//          "place_id" : "ChIJD7lBKxovDogReaVX5E7Ezck",
//          "plus_code" : {
//             "compound_code" : "Q994+FC Chicago, Illinois",
//             "global_code" : "86HJQ994+FC"
//          },
//          "price_level" : 1,
//          "rating" : 4.1,
//          "reference" : "ChIJD7lBKxovDogReaVX5E7Ezck",
//          "scope" : "GOOGLE",
//          "types" : [ "restaurant", "food", "point_of_interest", "establishment" ],
//          "user_ratings_total" : 89,
//          "vicinity" : "759 W 69th St, Chicago"
//       },
//       {
//          "business_status" : "OPERATIONAL",
//          "geometry" : {
//             "location" : {
//                "lat" : 41.7596991,
//                "lng" : -87.663989
//             },
//             "viewport" : {
//                "northeast" : {
//                   "lat" : 41.76105217989272,
//                   "lng" : -87.66250507010727
//                },
//                "southwest" : {
//                   "lat" : 41.75835252010728,
//                   "lng" : -87.66520472989272
//                }
//             }
//          },
//          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
//          "icon_background_color" : "#FF9E67",
//          "icon_mask_base_uri" : "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
//          "name" : "FIFTY-ONE 50 FUSION",
//          "opening_hours" : {
//             "open_now" : false
//          },
//          "photos" : [
//             {
//                "height" : 3264,
//                "html_attributions" : [
//                   "\u003ca href=\"https://maps.google.com/maps/contrib/108349347298888024806\"\u003eA Google User\u003c/a\u003e"
//                ],
//                "photo_reference" : "AW30NDxhxIMFoDIl-I51EkijdPi6z8QH2AFVx9H9sIZFSyBXEQs71e_VkgYsGRGux6tAck6B6e3Er9nFuzq-EVdggQ2hRTO5V-qQbXEnfg-iRe9k43PLQDjpTWnAT7_ViHAXJU2BVAYTUsxnn9z3-QTy6o5fGQcGGKfbU1YN-akLvF8nVNIz",
//                "width" : 4928
//             }
//          ],
//          "place_id" : "ChIJefYt3_guDogRs_tMx_5OQLA",
//          "plus_code" : {
//             "compound_code" : "Q85P+VC Chicago, Illinois",
//             "global_code" : "86HJQ85P+VC"
//          },
//          "rating" : 4.3,
//          "reference" : "ChIJefYt3_guDogRs_tMx_5OQLA",
//          "scope" : "GOOGLE",
//          "types" : [ "restaurant", "food", "point_of_interest", "establishment" ],
//          "user_ratings_total" : 31,
//          "vicinity" : "7354 S Ashland Ave, Chicago"
//       },
//       {
//          "business_status" : "OPERATIONAL",
//          "geometry" : {
//             "location" : {
//                "lat" : 41.7688307,
//                "lng" : -87.664115
//             },
//             "viewport" : {
//                "northeast" : {
//                   "lat" : 41.77014837989272,
//                   "lng" : -87.66269742010728
//                },
//                "southwest" : {
//                   "lat" : 41.76744872010728,
//                   "lng" : -87.66539707989271
//                }
//             }
//          },
//          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
//          "icon_background_color" : "#FF9E67",
//          "icon_mask_base_uri" : "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
//          "name" : "Fat Albert",
//          "opening_hours" : {
//             "open_now" : false
//          },
//          "photos" : [
//             {
//                "height" : 3120,
//                "html_attributions" : [
//                   "\u003ca href=\"https://maps.google.com/maps/contrib/103650984896254183528\"\u003eDarren Jones\u003c/a\u003e"
//                ],
//                "photo_reference" : "AW30NDx82q0DbWBlBzb3RXiywi8yptrKdgUZPN05mz3JKq0vJnJ7uu_dL6rbiXqaiqpeFCh71Of9xinmfuOZprfzq_e0XvfTw24VdOSdXlyC9HRUwg5YTB870rstcFVpoDKtQVrEo0Whx4L65dB-3w3jW-DOQoZB63xV65_lIXXorRToPXx7",
//                "width" : 4160
//             }
//          ],
//          "place_id" : "ChIJL6mcI68vDogRkSgCA0aRDBc",
//          "plus_code" : {
//             "compound_code" : "Q89P+G9 Chicago, Illinois",
//             "global_code" : "86HJQ89P+G9"
//          },
//          "rating" : 3.9,
//          "reference" : "ChIJL6mcI68vDogRkSgCA0aRDBc",
//          "scope" : "GOOGLE",
//          "types" : [ "restaurant", "food", "point_of_interest", "establishment" ],
//          "user_ratings_total" : 617,
//          "vicinity" : "6854 S Ashland Ave, Chicago"
//       },
//       {
//          "business_status" : "OPERATIONAL",
//          "geometry" : {
//             "location" : {
//                "lat" : 41.765485,
//                "lng" : -87.6442392
//             },
//             "viewport" : {
//                "northeast" : {
//                   "lat" : 41.76671587989271,
//                   "lng" : -87.64281907010728
//                },
//                "southwest" : {
//                   "lat" : 41.76401622010727,
//                   "lng" : -87.64551872989273
//                }
//             }
//          },
//          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
//          "icon_background_color" : "#FF9E67",
//          "icon_mask_base_uri" : "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
//          "name" : "Rehmania Lupo's",
//          "photos" : [
//             {
//                "height" : 2592,
//                "html_attributions" : [
//                   "\u003ca href=\"https://maps.google.com/maps/contrib/109810937808039043932\"\u003eLorenzo Reed\u003c/a\u003e"
//                ],
//                "photo_reference" : "AW30NDw7HZUVTQFeJhEn0TTzr2RVg9aT40MrpKbiwwRlEhIk6h1MHxl4TkSEK4EG5OmO7sA11YHSspNhxTRbvy4eTS4zdCpCGMLp5oqJcM50GcSejxBSOuUOB4bZkUlYoSW3L1bIho375_5w6Zf5HZSMEOZt97lOmo0K3_RGIimm7ovXa3Cr",
//                "width" : 1944
//             }
//          ],
//          "place_id" : "ChIJ9VQHvBAvDogRm5UATCIDz8g",
//          "plus_code" : {
//             "compound_code" : "Q984+68 Chicago, Illinois",
//             "global_code" : "86HJQ984+68"
//          },
//          "rating" : 4,
//          "reference" : "ChIJ9VQHvBAvDogRm5UATCIDz8g",
//          "scope" : "GOOGLE",
//          "types" : [ "restaurant", "food", "point_of_interest", "establishment" ],
//          "user_ratings_total" : 1,
//          "vicinity" : "7055 S Halsted St, Chicago"
//       },
//       {
//          "business_status" : "OPERATIONAL",
//          "geometry" : {
//             "location" : {
//                "lat" : 41.7729972,
//                "lng" : -87.6444791
//             },
//             "viewport" : {
//                "northeast" : {
//                   "lat" : 41.77434092989272,
//                   "lng" : -87.64314302010727
//                },
//                "southwest" : {
//                   "lat" : 41.77164127010727,
//                   "lng" : -87.64584267989272
//                }
//             }
//          },
//          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
//          "icon_background_color" : "#FF9E67",
//          "icon_mask_base_uri" : "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
//          "name" : "JAD FAST FOOD",
//          "opening_hours" : {
//             "open_now" : false
//          },
//          "place_id" : "ChIJ6VcrORwvDogRNKFUkyN7hE8",
//          "plus_code" : {
//             "compound_code" : "Q9F4+57 Chicago, Illinois",
//             "global_code" : "86HJQ9F4+57"
//          },
//          "rating" : 3.6,
//          "reference" : "ChIJ6VcrORwvDogRNKFUkyN7hE8",
//          "scope" : "GOOGLE",
//          "types" : [ "restaurant", "food", "point_of_interest", "establishment" ],
//          "user_ratings_total" : 7,
//          "vicinity" : "6645 S Halsted St, Chicago"
//       },
//       {
//          "business_status" : "OPERATIONAL",
//          "geometry" : {
//             "location" : {
//                "lat" : 41.7501835,
//                "lng" : -87.6444836
//             },
//             "viewport" : {
//                "northeast" : {
//                   "lat" : 41.75159202989273,
//                   "lng" : -87.64308162010727
//                },
//                "southwest" : {
//                   "lat" : 41.74889237010728,
//                   "lng" : -87.6457812798927
//                }
//             }
//          },
//          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
//          "icon_background_color" : "#FF9E67",
//          "icon_mask_base_uri" : "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
//          "name" : "Ho Ho Restaurant",
//          "opening_hours" : {
//             "open_now" : false
//          },
//          "photos" : [
//             {
//                "height" : 1440,
//                "html_attributions" : [
//                   "\u003ca href=\"https://maps.google.com/maps/contrib/100065859645405456281\"\u003eMichael Hinds\u003c/a\u003e"
//                ],
//                "photo_reference" : "AW30NDwnvn013wxL2Fla34jQI62KQnjO8xL14inExhxFqLc2GGt_ZeU_Xv_kpkL-rrlNqGf5_OL6GNxnZqUDNLAuh4lmASUbf26Q6duHzMhEt6R0Y7Rr6SjW1nSxRtT7z3OXzDUc7ZMCeu2UzKhuIZr8cNcMHfkWaBPhPtb8cyqE8ea5AH-Z",
//                "width" : 2560
//             }
//          ],
//          "place_id" : "ChIJH8louG4vDogRk0EhcCZQgtk",
//          "plus_code" : {
//             "compound_code" : "Q924+36 Chicago, Illinois",
//             "global_code" : "86HJQ924+36"
//          },
//          "price_level" : 1,
//          "rating" : 4.2,
//          "reference" : "ChIJH8louG4vDogRk0EhcCZQgtk",
//          "scope" : "GOOGLE",
//          "types" : [ "restaurant", "food", "point_of_interest", "establishment" ],
//          "user_ratings_total" : 296,
//          "vicinity" : "7908 S Halsted St # D, Chicago"
//       },
//       {
//          "business_status" : "OPERATIONAL",
//          "geometry" : {
//             "location" : {
//                "lat" : 41.7510851,
//                "lng" : -87.66384339999999
//             },
//             "viewport" : {
//                "northeast" : {
//                   "lat" : 41.75247132989272,
//                   "lng" : -87.66246382010728
//                },
//                "southwest" : {
//                   "lat" : 41.74977167010728,
//                   "lng" : -87.66516347989271
//                }
//             }
//          },
//          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
//          "icon_background_color" : "#FF9E67",
//          "icon_mask_base_uri" : "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
//          "name" : "Fiesta Burger Heaven",
//          "opening_hours" : {
//             "open_now" : false
//          },
//          "photos" : [
//             {
//                "height" : 1080,
//                "html_attributions" : [
//                   "\u003ca href=\"https://maps.google.com/maps/contrib/108225688543681414951\"\u003eJames Redmond\u003c/a\u003e"
//                ],
//                "photo_reference" : "AW30NDzfyvdpveLz9tJ-2Rm7DMXa9KLKcXXh2cPl-diQKtM-lla-W-KYjQjRVXcE6C2Mkd99GinDjKmnL-IvWH6cGufv-6nmBKSWKebQgc0ijXlgXY8k9_tPs-wojNtrwFNXYv-BAY93jWzDpWwlbxwO_HEdtvMY0Tj44fKURpRgnvqahtne",
//                "width" : 1920
//             }
//          ],
//          "place_id" : "ChIJhwpj-5svDogRPxydWkpDz3Q",
//          "plus_code" : {
//             "compound_code" : "Q82P+CF Chicago, Illinois",
//             "global_code" : "86HJQ82P+CF"
//          },
//          "price_level" : 1,
//          "rating" : 4.2,
//          "reference" : "ChIJhwpj-5svDogRPxydWkpDz3Q",
//          "scope" : "GOOGLE",
//          "types" : [ "restaurant", "food", "point_of_interest", "establishment" ],
//          "user_ratings_total" : 427,
//          "vicinity" : "7832 S Ashland Ave, Chicago"
//       },
//       {
//          "business_status" : "OPERATIONAL",
//          "geometry" : {
//             "location" : {
//                "lat" : 41.7558931,
//                "lng" : -87.64402009999999
//             },
//             "viewport" : {
//                "northeast" : {
//                   "lat" : 41.75728527989273,
//                   "lng" : -87.64267887010726
//                },
//                "southwest" : {
//                   "lat" : 41.75458562010728,
//                   "lng" : -87.64537852989271
//                }
//             }
//          },
//          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
//          "icon_background_color" : "#FF9E67",
//          "icon_mask_base_uri" : "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
//          "name" : "Mr J Fish & Chicken",
//          "opening_hours" : {
//             "open_now" : false
//          },
//          "photos" : [
//             {
//                "height" : 2322,
//                "html_attributions" : [
//                   "\u003ca href=\"https://maps.google.com/maps/contrib/107278513672528780445\"\u003eM Downey\u003c/a\u003e"
//                ],
//                "photo_reference" : "AW30NDzWYyhKBWdUkRA9mbbCielTAPYdX1sWXo-FynX2X4wvr1awHiq0uQtHFxVPvg6qZ5IE97ps_NNP-08HhOsuMsNl_LUzbU7CvYNzYf6vBKZoHXN4Hm0PxGtasnyCgyAancHu_NmZApPqMgRXLxhuTg8kFAsVE_-iFe4Z1fgNTjtY-ECM",
//                "width" : 4128
//             }
//          ],
//          "place_id" : "ChIJlZ6Vr2wvDogRzYbg4-WjDkY",
//          "plus_code" : {
//             "compound_code" : "Q944+9F Chicago, Illinois",
//             "global_code" : "86HJQ944+9F"
//          },
//          "price_level" : 1,
//          "rating" : 4.2,
//          "reference" : "ChIJlZ6Vr2wvDogRzYbg4-WjDkY",
//          "scope" : "GOOGLE",
//          "types" : [ "restaurant", "food", "point_of_interest", "establishment" ],
//          "user_ratings_total" : 590,
//          "vicinity" : "7601 S Halsted St, Chicago"
//       },
//       {
//          "business_status" : "OPERATIONAL",
//          "geometry" : {
//             "location" : {
//                "lat" : 41.7586237,
//                "lng" : -87.6314723
//             },
//             "viewport" : {
//                "northeast" : {
//                   "lat" : 41.75994747989272,
//                   "lng" : -87.63006317010728
//                },
//                "southwest" : {
//                   "lat" : 41.75724782010727,
//                   "lng" : -87.63276282989271
//                }
//             }
//          },
//          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
//          "icon_background_color" : "#FF9E67",
//          "icon_mask_base_uri" : "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
//          "name" : "Haire's Gulf Shrimp",
//          "opening_hours" : {
//             "open_now" : false
//          },
//          "photos" : [
//             {
//                "height" : 3024,
//                "html_attributions" : [
//                   "\u003ca href=\"https://maps.google.com/maps/contrib/104197414107712900249\"\u003eKyle Eldridge\u003c/a\u003e"
//                ],
//                "photo_reference" : "AW30NDwkAMHWSpOqEqi4waLTrUsXcl7SEWU-Rnbg7MwmUKXBljOgip1Duba629YFeq5pvUGL6sE3oAG3sMNLfXsaMIp_bEjGzshdfjuOTjIzlQdWMrVoUmhX9EGDSXLqWlPpHzO-QoK3oHQ_Ho4W45Ff9D9pg7v8g-QwbDasji2jPg_UFLed",
//                "width" : 4032
//             }
//          ],
//          "place_id" : "ChIJU32jLkMvDogRBozVfskjWWs",
//          "plus_code" : {
//             "compound_code" : "Q959+FC Chicago, Illinois",
//             "global_code" : "86HJQ959+FC"
//          },
//          "price_level" : 2,
//          "rating" : 4.5,
//          "reference" : "ChIJU32jLkMvDogRBozVfskjWWs",
//          "scope" : "GOOGLE",
//          "types" : [ "restaurant", "food", "point_of_interest", "establishment" ],
//          "user_ratings_total" : 1155,
//          "vicinity" : "7448 S Vincennes Ave, Chicago"
//       },
//       {
//          "business_status" : "OPERATIONAL",
//          "geometry" : {
//             "location" : {
//                "lat" : 41.7544982,
//                "lng" : -87.64432309999999
//             },
//             "viewport" : {
//                "northeast" : {
//                   "lat" : 41.75584922989272,
//                   "lng" : -87.64289432010727
//                },
//                "southwest" : {
//                   "lat" : 41.75314957010728,
//                   "lng" : -87.64559397989271
//                }
//             }
//          },
//          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
//          "icon_background_color" : "#FF9E67",
//          "icon_mask_base_uri" : "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
//          "name" : "Tasha Fast Food",
//          "opening_hours" : {
//             "open_now" : false
//          },
//          "place_id" : "ChIJ915AjGwvDogR6qmrDKFgpRI",
//          "plus_code" : {
//             "compound_code" : "Q934+Q7 Chicago, Illinois",
//             "global_code" : "86HJQ934+Q7"
//          },
//          "rating" : 0,
//          "reference" : "ChIJ915AjGwvDogR6qmrDKFgpRI",
//          "scope" : "GOOGLE",
//          "types" : [ "restaurant", "food", "point_of_interest", "establishment" ],
//          "user_ratings_total" : 0,
//          "vicinity" : "7660 S Halsted St, Chicago"
//       },
//       {
//          "business_status" : "OPERATIONAL",
//          "geometry" : {
//             "location" : {
//                "lat" : 41.7502348,
//                "lng" : -87.6595816
//             },
//             "viewport" : {
//                "northeast" : {
//                   "lat" : 41.75166812989272,
//                   "lng" : -87.65823467010728
//                },
//                "southwest" : {
//                   "lat" : 41.74896847010728,
//                   "lng" : -87.66093432989273
//                }
//             }
//          },
//          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
//          "icon_background_color" : "#FF9E67",
//          "icon_mask_base_uri" : "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
//          "name" : "Kickstands Restaurant",
//          "photos" : [
//             {
//                "height" : 1591,
//                "html_attributions" : [
//                   "\u003ca href=\"https://maps.google.com/maps/contrib/112150835361628549227\"\u003eA Google User\u003c/a\u003e"
//                ],
//                "photo_reference" : "AW30NDzSRZqGp6H3WW1ZceVR02uZjq1A5vSGB5xlhSKFQMsa0MPPBDlumRYa9d_P18XNRFmc7og21FPd7CEnu_ZLNvY8ACE5cLKvI75KrH6wBqWx_yKSiSf5mnaO5ufI509Y13fhpL0_t61hqTTb19WKPJjFSffOmWfwjSl0GcHcQlOe9qZG",
//                "width" : 1731
//             }
//          ],
//          "place_id" : "ChIJTcx1FLAvDogR18IwMC5d8nI",
//          "plus_code" : {
//             "compound_code" : "Q82R+35 Chicago, Illinois",
//             "global_code" : "86HJQ82R+35"
//          },
//          "rating" : 0,
//          "reference" : "ChIJTcx1FLAvDogR18IwMC5d8nI",
//          "scope" : "GOOGLE",
//          "types" : [ "restaurant", "food", "point_of_interest", "establishment" ],
//          "user_ratings_total" : 0,
//          "vicinity" : "1423 W 79th St, Chicago"
//       },
//       {
//          "business_status" : "OPERATIONAL",
//          "geometry" : {
//             "location" : {
//                "lat" : 41.7505345,
//                "lng" : -87.6639874
//             },
//             "viewport" : {
//                "northeast" : {
//                   "lat" : 41.75182477989272,
//                   "lng" : -87.66240492010728
//                },
//                "southwest" : {
//                   "lat" : 41.74912512010728,
//                   "lng" : -87.66510457989273
//                }
//             }
//          },
//          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
//          "icon_background_color" : "#FF9E67",
//          "icon_mask_base_uri" : "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
//          "name" : "Nick's Gyros",
//          "opening_hours" : {
//             "open_now" : false
//          },
//          "photos" : [
//             {
//                "height" : 3984,
//                "html_attributions" : [
//                   "\u003ca href=\"https://maps.google.com/maps/contrib/104616945435339546965\"\u003eClinton Allen\u003c/a\u003e"
//                ],
//                "photo_reference" : "AW30NDxpKKk61dM4xzmORpWS52pUVnGJgYWbC1hTKOi_SLSeYk4BuW9_V6IKUKYiyb3U-D49tmRuDtg833uhvJ0l-eGpi1-47oOY_RiXWOhctR-aaEXMAZV6lpOkL2MXtxdk_VFpGm3-B-ZYJFq66StaOFOQg42GXCNXKMOLlRbmj2A6JB6r",
//                "width" : 2988
//             }
//          ],
//          "place_id" : "ChIJtdunjZsvDogRgOmAPL2i8t4",
//          "plus_code" : {
//             "compound_code" : "Q82P+6C Chicago, Illinois",
//             "global_code" : "86HJQ82P+6C"
//          },
//          "price_level" : 1,
//          "rating" : 4,
//          "reference" : "ChIJtdunjZsvDogRgOmAPL2i8t4",
//          "scope" : "GOOGLE",
//          "types" : [ "restaurant", "food", "point_of_interest", "establishment" ],
//          "user_ratings_total" : 793,
//          "vicinity" : "7858 S Ashland Ave, Chicago"
//       },
//       {
//          "business_status" : "OPERATIONAL",
//          "geometry" : {
//             "location" : {
//                "lat" : 41.7504595,
//                "lng" : -87.63472229999999
//             },
//             "viewport" : {
//                "northeast" : {
//                   "lat" : 41.75181177989272,
//                   "lng" : -87.63332767010726
//                },
//                "southwest" : {
//                   "lat" : 41.74911212010728,
//                   "lng" : -87.63602732989271
//                }
//             }
//          },
//          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
//          "icon_background_color" : "#FF9E67",
//          "icon_mask_base_uri" : "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
//          "name" : "KING GYROS",
//          "opening_hours" : {
//             "open_now" : false
//          },
//          "photos" : [
//             {
//                "height" : 1080,
//                "html_attributions" : [
//                   "\u003ca href=\"https://maps.google.com/maps/contrib/106032133991604683814\"\u003eA Google User\u003c/a\u003e"
//                ],
//                "photo_reference" : "AW30NDxvmnP-ViXCz-b8TQfD7zFHMYSblSyFMCQTkoS_Rs1m6FgdW0lV3wxIn3VAttsg45nneKsnK1orjs49wIjGVoOzAhCt2AmmQQGONncVOE-tgB7X2UfUV-QfNyvA8LL_6gkqckwyzbwmTMkbD5bBLZdKmwcGKg9yOF7_fFUc7jm_5Ohh",
//                "width" : 1080
//             }
//          ],
//          "place_id" : "ChIJ88Zs70MvDogRnnG--_nebpo",
//          "plus_code" : {
//             "compound_code" : "Q928+53 Chicago, Illinois",
//             "global_code" : "86HJQ928+53"
//          },
//          "price_level" : 1,
//          "rating" : 3.7,
//          "reference" : "ChIJ88Zs70MvDogRnnG--_nebpo",
//          "scope" : "GOOGLE",
//          "types" : [ "restaurant", "food", "point_of_interest", "establishment" ],
//          "user_ratings_total" : 334,
//          "vicinity" : "7904 S Vincennes Ave, Chicago"
//       },
//       {
//          "business_status" : "OPERATIONAL",
//          "geometry" : {
//             "location" : {
//                "lat" : 41.76877349999999,
//                "lng" : -87.6585664
//             },
//             "viewport" : {
//                "northeast" : {
//                   "lat" : 41.77012342989272,
//                   "lng" : -87.65717157010728
//                },
//                "southwest" : {
//                   "lat" : 41.76742377010728,
//                   "lng" : -87.65987122989273
//                }
//             }
//          },
//          "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
//          "icon_background_color" : "#FF9E67",
//          "icon_mask_base_uri" : "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
//          "name" : "New Hap's Grill",
//          "opening_hours" : {
//             "open_now" : false
//          },
//          "photos" : [
//             {
//                "height" : 4032,
//                "html_attributions" : [
//                   "\u003ca href=\"https://maps.google.com/maps/contrib/118192078702336659326\"\u003eA Google User\u003c/a\u003e"
//                ],
//                "photo_reference" : "AW30NDwOsmXvaPPYyrbPQgHXQGiFML0YxbKFrjfv8u8SYtc9ZZqDrxSTZwMvsdzqaoyw9ocuYsZxB_rDlfRb0uiLO113Rsx_Bc-fu1X9RfRoBSoUf0g7cs5pWnAdJcRly-q-BVWtzS4c6ZsV-My03yuj1p5LFxBThwyqXNq6EM_IC7doIAKf",
//                "width" : 3024
//             }
//          ],
//          "place_id" : "ChIJud67RoUvDogRWY8Zem-iYVs",
//          "plus_code" : {
//             "compound_code" : "Q89R+GH Chicago, Illinois",
//             "global_code" : "86HJQ89R+GH"
//          },
//          "rating" : 4,
//          "reference" : "ChIJud67RoUvDogRWY8Zem-iYVs",
//          "scope" : "GOOGLE",
//          "types" : [
//             "meal_delivery",
//             "restaurant",
//             "food",
//             "point_of_interest",
//             "establishment"
//          ],
//          "user_ratings_total" : 46,
//          "vicinity" : "6859 S Loomis Blvd, Chicago"
//       }
//    ],
//    "status" : "OK"
// }
