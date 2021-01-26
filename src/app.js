const path = require('path')
const express = require('express')
const hbs = require('hbs')
const getGeoData = require ('./utilities/GrabGeo')
const getWeather = require('./utilities/GrabWeather')
const chalk = require('chalk')

const app = express()
const port = process.env.PORT || 3000
// Define paths for Express confi
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Louis Welch'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Louis Welch'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text to help you out because you may need it.',
        title: 'Help',
        name: 'Louis Welch'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    const location = req.query.address
    getGeoData(req.query.address, (error,geoData) => {
        
        if(error){
        //return res.send({error})
        return(error)
        }
    

        getWeather(geoData, (error, weatherData) => {
            if(error){
                return res.send({error})
            }
 
            res.send({
                location:location,
                weather:weatherData
            })
        })
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Louis Welch',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Louis Welch',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port)
})