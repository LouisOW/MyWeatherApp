const request = require('request')

const getWeather = (url,callback)=>{

    /*
        3 Wicked Wings                          
        Regular Chips                           
        Regular Potato & Gravy                  
        Regular Pepsi Max                       

    */



//     console.log(`
//                  Item                        Qty    Price
//                  ----------------------------------------
//                  Zinger Stacker Burger Box                         1     $14.95
//                    Zinger Stacker Burger                   
//                    3 Wicked Wings                          
//                    Regular Chips                          
//                    Regular Potato & Gravy                  
//                    Regular Pepsi Max 
//                  ----------------------------------------
//                  SubTotal:                         $13.59
//                  GST:                               $1.36
//                  Total:                            $14.9
// `)

    request({url:url, json: true}, (error,response)=>{

        if(error){
            callback('unable to connect to WEATHER API',undefined)
    
        
        }else if(response.body.error){

            callback('invalid location', undefined)
        }else{
            var weather = response.body.current.weather_descriptions[0].toLowerCase() +' in '+response.body.location.name+'\n'+'it is currently ' + response.body.current.temperature +'C in '+ response.body.location.name+ ' and it feels like '+ response.body.current.feelslike+'C'
            callback(undefined, weather)
        }
    })
}

module.exports = getWeather
