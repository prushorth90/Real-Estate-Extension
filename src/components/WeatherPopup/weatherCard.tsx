import React, { useEffect, useState } from 'react'
import { Box, Button, Card, CardActions, CardContent, Grid, Typography,} from '@material-ui/core'
import { WeatherAPI, OpenWeatherData, OpenWeatherTempScale } from '../../utils/api/weather/weatherIndex'
import './WeatherCard.css'
import {WeatherCardState} from './weatherCardState'
import {WeatherCardContainer} from './weatherCardContainer'

const WeatherCard: React.FC<{
  city: string
  tempScale: OpenWeatherTempScale
  onDelete?: () => void
}> = ({ city, tempScale, onDelete }) => {
  const [weatherData, setWeatherData] = useState<OpenWeatherData | null>(null)
  const [cardState, setCardState] = useState<WeatherCardState>(WeatherCardState.Loading)
  let weatherapi = new WeatherAPI()

  useEffect(() => {
    weatherapi.fetchData(city, tempScale)
      .then((data) => {
        setWeatherData(data)
        setCardState(WeatherCardState.Ready)
      })
      .catch((err) => setCardState(WeatherCardState.Error))
  }, [city, tempScale])

  if (cardState == WeatherCardState.Loading || cardState == WeatherCardState.Error) {
    return (
      <WeatherCardContainer onDelete={onDelete}>
        <Typography className="weatherCard-title">{city}</Typography>
        <Typography className="weatherCard-body">
          {cardState == WeatherCardState.Loading ? 'Loading...' : 'Error: could not retrieve weather data for this city.'}
        </Typography>
      </WeatherCardContainer>
    )
  }

  return (
    <WeatherCardContainer onDelete={onDelete}>
      <Grid container justifyContent="space-around">
        <Grid item>
          <Typography className="weatherCard-title"> {weatherData.name} </Typography>
          <Typography className="weatherCard-temp"> {Math.round(weatherData.main.temp)} </Typography>
          <Typography className="weatherCard-body"> Feels like {Math.round(weatherData.main.feels_like)} </Typography>
        </Grid>
        <Grid item>
          {weatherData.weather.length > 0 && (
            <>
              <img src={weatherapi.getWeatherIconSrc(weatherData.weather[0].icon)} />
              <Typography className="weatherCard-body"> {weatherData.weather[0].main} </Typography>
            </>
          )}
        </Grid>
      </Grid>
    </WeatherCardContainer>
  )
}

export default WeatherCard
