Using mapbox as an api, and a random data set api, I  connected the slider and filtered the data by age, and displayed the names of all currently visible employees.

I set the default filter to 30, when you move the slider you get all the employees that are less than the age indicated on the slider.

The data given is a little confusing because the map is focused on Seattle, but the employees are out in the middle of the ocean and foreign continents. Initially you will think there aren't any pins on the map, but you have to scroll waaaay out to see them.

I protected the api keys so this won't run without a mapbox account and assigning the keys. I stored them in a keys.js file locally. I import keys from './keys'.  So just add a keys.js file in the same folder as the app.js and add the two variables.

I added a service-worker to avoid making a new api call to for the same json data.

Finally, the babel is configured for es2015, so that is what I used. (In hindsight I might have changed the settings to ecma 6).

To set up environment:
- Run 'npm install'

To start development:
- run 'npm start'
- navigate to http://localhost:8081
