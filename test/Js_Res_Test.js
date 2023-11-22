const express = require("express");
const cors = require('cors');
const { ok } = require("assert");

const XMLHttpRequest = require('xhr2')

const app = express();
//app.use(cors());  // ...

const port = 3000;
app.use("/", express.static("./webapp"))
console.log(__dirname);

app.get('/', (req, res) => {
    const reqInfo = req.query;
    var req_city_name

    o_res = {'status': 200, 'data':114514}

    res.send(o_res);
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
