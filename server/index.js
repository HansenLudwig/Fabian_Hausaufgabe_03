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

function que_name2Loc_ABORT(cityname){
    const using_api = "https://geocode.xyz/"
    const c_url = using_api + cityname + '?json=1&callback=city_info'
    // 调用 `fetch()`，传入 URL。
    fetch(c_url, {method:'GET'})
    // fetch() 返回一个 promise。当我们从服务器收到响应时，
    // 会使用该响应调用 promise 的 `then()` 处理器。
    .then((response) => {
        // 如果请求没有成功，我们的处理器会抛出错误。
        if (!response.ok) {
            throw new Error(`HTTP 错误：${response.status}`);
        }
        //// 否则（如果请求成功），我们的处理器通过调用 response.text() 
        //// 以获取文本形式的响应，并立即返回 `response.text()` 返回的 promise。
        
        return response.text();
    })
    // 若成功调用 response.text()，会使用返回的文本来调用 `then()` 处理器，
    // 然后我们将其拷贝到 `poemDisplay` 框中。
    .then((text) => {
        console.log('res.txt:' + text)
    })
    // 捕获可能出现的任何错误，
    // 并在 `poemDisplay` 框中显示一条消息。
    .catch((error) => (console.log("Err:"+error)));
    /*
    fetch(c_url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Response was not OK!")
            }
            response.json()
        })
        .catch(error => console.error('Error:', error))
        .then((data)=>
        {
            console.log(data)
        })
    /*
    var xhr = new XMLHttpRequest();
    xhr.open('GET', c_url, true)
    xhr.responseType = 'json'
    xhr.onload = () =>{
        var data = this.response
        console.log(data)
    }
    xhr.send()
    /*
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText)
            // Process the response data here
        }
    }
    /*
    $.get(c_url, (data, status)=>{
        const info = data.city_info
        const longt = info["longt"]
        const latt = info["latt"]
        const city = info["standard"]["city"]
        const country = info["standard"]["countryname"]
        return {
            "longt":longt,
            "latt":latt,
            "city":city,
            "country":country
        }
    })*/
};

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
        api_res = await que_name2Loc(cityname)
        api_return = await api_res.json()
    }
    if (DummySet === 'active' || (DummySet === 'passive' && api_return.status==='403'))
    api_return = await DummySys(cityname)
    
    console.log("---\nStatus: ",api_return.status)
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
    que_f(req_city_name, 'active').then((api_return)=>{
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

