'use strict'
const fs = require('fs')
const path = require('path')
const axios = require('axios')
const { create } = require('express-handlebars')
const { createServer } = require('http-proxy')

async function downloadFile()
{
const url = "https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22"
const filepath =path.resolve(__dirname, 'files','output.json')
const writer = fs.createWriteStream(filepath)
const response = await axios({
url: url,
method: 'GET',
responseType: 'stream'

})
response.data.pipe(writer)
return new Promise((resolve, reject)=> {

    writer.on('finish', resolve)
    writer.on('error', reject)
})
}
downloadFile()
console.log("The file downloaded!-- Path: Files/Output.json");