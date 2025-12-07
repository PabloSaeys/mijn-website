/* In dit script plaats je de code om de kaart te tonen in de aside van de contactpagina. De coördinaten van de parking in Gent zijn: 51.0424221 en 3.7258331.
Gebruik hiervoor de documentatie op https://leafletjs.com/ 
*/

let mapP = L.map('mapP1').setView([51.0424221, 3.7258331], 15);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mapP);

// plaats icon.png als marker op de map
let markerIconP1 = L.icon({
  iconUrl: './assets/images/icon.png',
  iconSize: [60, 60],
  iconAnchor: [0, 60],
  popupAnchor: [0, 0]
});

L.marker([51.0424221, 3.7258331], { icon: markerIconP1 }).addTo(mapP);