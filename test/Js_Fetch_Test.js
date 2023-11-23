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

async function que_name2Loc(cityname) {
    const using_api = "https://geocode.xyz/"
    const c_url = using_api + cityname + '?json=1'//'?json=1&callback=city_info'


    const response = await fetch(c_url)
    const rJS = await response.json()

    if ("error" in rJS) {
        // No such a city found
        rJS.status = '404'
    }
    else if (rJS.elevation.length > 0)
    {
        // "Throttled! See geocode.xyz/pricing"
        rJS.status = '403'
    }
    else
    {
        rJS.status = '200'
    }
    return rJS
}

async function que_f(cityname)
{
    var api_return = undefined
    var api_res = undefined

    api_return = await que_name2Loc(cityname)
    //api_return = await api_res.json()

    return api_return
}

que_f("Shanghai").then((CITY) => {
    console.log("---\nStatus: ",CITY.status)
    console.log(CITY)
})

