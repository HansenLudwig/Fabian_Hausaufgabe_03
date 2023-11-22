// const express = require("express");
// const cors = require('cors');
// const { ok } = require("assert");

// const XMLHttpRequest = require('xhr2')

// const app = express();
/*
async function logMovies() {
    const response = await fetch("http://example.com/movies.json");
    const movies = await response.json();
    console.log(movies);
}
*/

async function getCity(cityname) {
    const using_api = "https://geocode.xyz/"
    const c_url = using_api + cityname + '?json=1'//'?json=1&callback=city_info'


    const response = await fetch(c_url)
    const rJS = await response.json()

    console.log(rJS)
    console.log(rJS.standard)
    
    return rJS
}


CITY = getCity('Shanghai').then((result)=>
{
    return result
})
