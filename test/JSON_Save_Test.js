const CityJson = {   "standard" : {      "addresst" : {},      "statename" : {},      "city" : "New York",      "prov" : "US",      "countryname" : "United States of America",      "postal" : {},      "confidence" : "0.90"   },   "longt" : "-73.97093",   "alt" : {      "loc" : {         "longt" : "-74.004326911041",         "prov" : "NY",         "city" : "New York",         "postal" : "11385",         "score" : "335554",         "latt" : "40.6390842791842"      }   },   "elevation" : {},   "latt" : "40.67405"}
/*
{
	"distance": "Throttled! See geocode.xyz/pricing",
	"elevation": "Throttled! See geocode.xyz/pricing",
	"latt": "Throttled! See geocode.xyz/pricing",
	"city": "Throttled! See geocode.xyz/pricing",
	"prov": "Throttled! See geocode.xyz/pricing",
	"geocode": "Throttled! See geocode.xyz/pricing",
	"stnumber": "Throttled! See geocode.xyz/pricing",
	"staddress": "Throttled! See geocode.xyz/pricing",
	"geonumber": "Throttled! See geocode.xyz/pricing",
	"inlatt": "Throttled! See geocode.xyz/pricing",
	"timezone": "Throttled! See geocode.xyz/pricing",
	"region": "Throttled! See geocode.xyz/pricing",
	"postal": "Throttled! See geocode.xyz/pricing",
	"longt": "Throttled! See geocode.xyz/pricing",
	"inlongt": "Throttled! See geocode.xyz/pricing",
	"altgeocode": "Throttled! See geocode.xyz/pricing"
}

/*{
    "error": {
        "description": "Your request produced no suggestions.",
        "code": "018"
    }
}*/

const objString = JSON.stringify(CityJson);
console.log(objString);