const express = require("express");
const cors = require('cors');
const { ok } = require("assert");

const XMLHttpRequest = require('xhr2')

const app = express();
//app.use(cors());  // ...

const port = 3000;
app.use("/", express.static("./webapp"))
console.log(__dirname);


function DummySys(cityname)
{
    const citysDB = require('./Citys.json')
    var search_result = citysDB.filter((city) => city.standard.city === cityname)
    if (search_result.length > 0) {
        api_return = search_result[0]
        api_return.status = '302'   //Found
    }
    else {
        api_return = {"error":{"description":"Your request produced no suggestions in Dummy-system.","code":"018"}, "status":'404'}
    }
    return api_return
}

async function que_name2Loc(cityname){
    const using_api = "https://geocode.xyz/"
    const c_url = using_api + cityname + '?json=1'

    const response = await fetch(c_url
    ).catch( (err) => {
        console.log(err)
        return {status: '500', description: 'Fetch failed, Req cannot be done.'} 
    })
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

async function que_f(cityname, DummyS){
    const DummyOptions = ['active', 'passive', 'off']
    var DOpt = DummyOptions.filter((opt)=> opt === DummyS)
    var api_return = undefined
    var api_res = undefined
    if (DOpt.length > 0)
        var DummySet = DOpt[0]
    else
        var DummySet = 'passive'

    if (DummySet === 'passive' || DummySet === 'off')
    {
        api_return = await que_name2Loc(cityname)
        //api_return = await api_res.json()
    }
    if (DummySet === 'active' || (DummySet === 'passive' && api_return.status==='403'))
    {
        api_return = await DummySys(cityname)
    }
    
    console.log("---\nStatus: ",api_return.status, '; City: ', cityname)
    console.log(api_return)
    return api_return
}

app.get('/', (req, res) => {
    const reqInfo = req.query;
    var req_city_name
    if ("locate" in reqInfo){
        req_city_name = reqInfo.locate
    }
    else if ("location" in reqInfo)
    {
        req_city_name = reqInfo.location
    }
    DummySet = reqInfo[Object.keys(obj2).find(key => key.toLowerCase() === 'dummysys')]
    if(DummySet === undefined)
        var DummyS = 'passive'
    else
        var DummyS = DummySet
    
    que_f(req_city_name, 'active').then((api_return)=>{
        const o_res = {'status': api_return.status, 'data':api_return}
        res.send(o_res);
    })
})

app.get('/map/:cityname', (req, res) => {
    const req_city_name = req.params.cityname
    que_f(req_city_name, 'passive').then((api_return)=>{
        const o_res = {'status': api_return.status, 'data':api_return}
        res.send(o_res);
    })
})

app.get('/DummySys/:cityname', (req, res) =>{
    const req_city_name = req.params.cityname
    que_f(req_city_name, 'active').then((api_return)=>{
        // api_return = await que_f()
        const o_res = {'status': api_return.status, 'data':api_return}
        res.send(o_res);
    })
})


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

