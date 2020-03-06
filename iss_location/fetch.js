let url = 'https://api.wheretheiss.at/v1/satellites/25544'

let issLat = document.querySelector('#iss-lat')
let issLong = document.querySelector('#iss-long')

var issMarker
var update = 30000

let map = L.map('iss-map').setView([0, 0], 1) // Center at 0, 0 and max zoom out
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 7,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoiam9yZGFuZ2VyZGluIiwiYSI6ImNrNnZneWtpZjAxcmUza21oMnFwa3Z3cHcifQ.CYn0s22P2gLmy8Ysioibxg'}
    ).addTo(map)

iss()
setInterval(iss, update)

function iss() {
    fetch(url)
    .then( res => res.json() )
    .then( issData => {
        console.log(issData)
        let lat = issData.latitude
        let long = issData.longitude
        issLat.innerHTML = lat
        issLong.innerHTML = long

        if (!issMarker) {
            issMarker = L.marker([lat, long]).addTo(map) // Create the marker
        } else {
            issMarker.setLatLng([lat, long]) // Already exists - move to new location
        }
    })
    .catch( err => {
        console.log(err)
    })
}
