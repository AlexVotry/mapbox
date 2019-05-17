import './app.scss';
import axios from 'axios';
import {filter} from 'lodash';
import {keys} from './keys';

const MAPBOX_TOKEN = keys.MAPBOX_TOKEN;
const MAPBOX_STYLE = keys.MAPBOX_STYLE;
const datalist = document.getElementById('tickmarks');
const slider = document.getElementById('sliderInput');
const emp = document.getElementById('emp');
const displayAge = document.getElementById('displayAge');
let age = 30;
let allMarkers = [];

slider.addEventListener('change', sliderChange);
slider.value = age;

// add ticks to the slider for easier readability
for (let i = 0; i < 101; i += 10) {
  const ticks = document.createElement('option');
  ticks.value = i;
  datalist.appendChild(ticks);
}

mapboxgl.accessToken = MAPBOX_TOKEN;
const map = new mapboxgl.Map({
    container: 'map',
    style: MAPBOX_STYLE
});

function fetchPeople() {
  return axios.get('https://apps.integralgis.com/node/integralgis/people.json')
  .then(function(res) {
    return res.data;
  });
};

const allPeople = fetchPeople();
  
function sortPeople(age) {
  displayAge.textContent = age;
    const filteredPeople = filter(res.data, function(person) {
      return person.age < age;
    });
  return filteredPeople.map(function (person) {
    const name = document.createElement('p');
    
    name.classList.add('listOfPeople');
    name.textContent = person.name;
    emp.appendChild(name);
    

    const popup = new mapboxgl.Popup()
    .setHTML(`<h3 class="popup">${person.name}</h3>`);
    
    const marker = new mapboxgl.Marker()
    .setLngLat([person.longitude, person.latitude])
    .setPopup(popup)
    .addTo(map);
    allMarkers.push(marker);
  })
}


function sliderChange() {
  console.log('all:', allPeople);
  age = slider.value;
  clearMap();
  fetchPeople(age)
}

function clearMap() {
  while (emp.firstChild) {
    emp.removeChild(emp.firstChild);
  }
  allMarkers.forEach(function(marker) {
    marker.remove();
  })
}
