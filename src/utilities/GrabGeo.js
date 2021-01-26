const request = require('request')


const getGeoData = (location,callback)=>{


    const locationURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(location)+'.json?access_token=pk.eyJ1Ijoic3F1YXVuY2hlciIsImEiOiJja2p4amhrZDgwNTE3MnVsZnI3eGFlY3Q0In0._Y_NXBIgZMB5gyLCLZMOHA&limit=0'

    request({url:locationURL, json: true}, (error,response)=>{

        if(error){
            callback('unable to connect to MAP BOX API',undefined)
    
        }else if(response.body.features.length===0){
            callback('invallid location', undefined)
        }else{
    
            const latitude = response.body.features[0].center[1]
            const longitude = response.body.features[0].center[0]
            var url = 'http://api.weatherstack.com/current?access_key=a3f7a66d2ba1f173cbc09850b1bc4929&query='+latitude+','+longitude+''
        }

        callback(undefined, url)



    })
}

module.exports = getGeoData
