const citys = require('../server/Citys.json')

const search_keyword = "Beijing"

var search_result = citys.filter((city) => city.standard.city === search_keyword)

console.log(search_result.length)

if(search_result.length > 0)
{
    console.log(search_result[0])
}
else
{
    console.log('404 Not Found')
}
