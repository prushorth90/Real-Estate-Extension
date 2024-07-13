const express = require("express");
const axios = require("axios")
const path = require("path");
const cors = require("cors")

const app = express();

app.get("/api/:street/:city/:state/:zipCode", async (req, res, next) => {
    let apiKey = "AIzaSyDbq-ALkqgJHFvNBDQc-1MJjCk6schskEw"
    let street = req.params.street
    let city = req.params.city
    let state = req.params.state
    let zipCode = req.params.zipCode
    const apiResponse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${street}%2C${city}%2C${state}%2C${zipCode}&key=${apiKey}`)
    if (!apiResponse.ok) {
        throw new Error('Not found')
    }

    const data = await apiResponse.json()

    // console.log(data.count)
    return res.send(data)

});

app.get("/api/:street/:city/:state/:zipCode", async (req, res, next) => {
    let apiKey = "AIzaSyDbq-ALkqgJHFvNBDQc-1MJjCk6schskEw"
    let street = req.params.street
    let city = req.params.city
    let state = req.params.state
    let zipCode = req.params.zipCode
    const apiResponse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${street}%2C${city}%2C${state}%2C${zipCode}&key=${apiKey}`)
    if (!apiResponse.ok) {
        throw new Error('Not found')
    }

    const data = await apiResponse.json()

    // console.log(data.count)
    return res.send(data)

});

app.get("/api/:keyword/:latitude/:longitude/:radius/:typeOne/:minPrice/:maxPrice", async (req, res, next) => {
    let apiKey = "AIzaSyDbq-ALkqgJHFvNBDQc-1MJjCk6schskEw"
    let keyword = req.params.keyword
    let latitude = req.params.latitude
    let longitude = req.params.longitude
    let radius = req.params.radius
    let typeOne = req.params.typeOne
    let minprice = req.params.minPrice
    let maxprice = req.params.maxPrice

    const apiResponse = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=${keyword}&location=${latitude}%2C${longitude}&radius=${radius}&type=${typeOne}&minprice=${minprice}&maxprice=${maxprice}&key=${apiKey}`)
    if (!apiResponse.ok) {
        throw new Error('Not found')
    }

    const data = await apiResponse.json()

    // console.log(data.count)
    return res.send(data)

});



module.exports = app;
