const express = require("express");
const cors = require('cors');
const { ok } = require("assert");

const XMLHttpRequest = require('xhr2')

const app = express();
//app.use(cors());  // ...

const port = 3000;
app.use("/", express.static("./webapp"))
console.log(__dirname);

function que_name2Loc(cityname){
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


app.get('/', (req, res) => {
    const reqInfo = req.query;
    if ("locate" in reqInfo){
        const req_city_name = reqInfo.locate
    }
    else if ("location" in reqInfo)
    {
        const req_city_name = reqInfo.location
    }
    api_return = que_name2Loc(req_city_name);
    res.send(api_return);
})


app.get('/map/:cityname', (req, res) => {
    const req_city_name = req.params.cityname
    api_return = que_name2Loc(req_city_name);
    res.send(api_return);
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });