# DynamicAfrica
Study project to implement a web mapping application for the visualisation of time dependent statistical data. The development of "percentage of population using the internet", "human development index (HDI)" and "population size" between 2000 and 2016 are shown. Additionally types (classes) of similar internet usage developments have been calculated and are visualized, while the number of types can be selected by the user.   

![Alt Text](https://github.com/lukasalexanderweber/DynamicAfrica/blob/master/gif/html.gif)

## Map

Leaflet (http://leafletjs.com/) is used for the mapping functionalities.

#### Basemap

The basemap is a choropleth map based on a prepared Polygon-GeoJSON (using QGIS) with the countries as shapes and the respective HDI for the years 2000-2016 as data. Additionally the African Great Lakes are visualized on top as an own layer for orientation. For an appropriate zoom functionality the default zoom functionality of Leaflet is extended to custom zoom levels suitable for the continent of africa (https://gist.github.com/croxton/6248586). 

#### Leaflet-Semicircle

<img align="left" width="110" height="110" src="https://github.com/lukasalexanderweber/DynamicAfrica/blob/master/gif/semiC.gif">While the basemap can be implemented using core leaflet functionality the symbols (pie charts, circle diagrams) are realized using the Leaflet-Semicircle extension (https://github.com/jieter/Leaflet-semicircle). A circle with white transparent fill and fitting stroke is overlaid with a semicircle representing the actual amount of population using the internet. The size the circle corresponds to the actual population size. The color represents the type of internet usage development. Data and positioning coordinates are stored in a JSON file.

#### Rangeslider

To enable the animations a timeslider would be needed if time data is stored in a "date" datatype. Thus in this case the dates (years) are only attributes a Rangeslider (http://rangeslider.js.org/) from 2000-2016 is appropriate. The slider starts automatically when the website is opened and stops when the year 2016 is reached but the user can interact with the slider, too. Each time a 'tick' is reached functions are called to restyle map elements whose styles depend on the year (choropleth [HDI], symbols [internet usage, population])   

---

#### Browser characteristics for dynamicly loading local JSON files

This website was developed using Mozilla Firefox which is capable of dynamicly loading local JSON files as done in the D3 and leaflet parts. Other browsers like Google Crome prohibit such an asynchronous call of local files. To test or change the application in browsers like Chrome you need to run the content in a testserver. An example for setting up a testserver using Python is discribed in the following (adapted from https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server):

  <b>1.</b> Open your command prompt. Check if Python is installed (python -V). If not install (IMPORTANT: check the "Add Python xxx to PATH" checkbox)<br />
  <b>2.</b> Navigate to the downloaded DynamicAfrica folder (cd ./DynamicAfrica)<br />
  <b>3.</b> Enter the command to start up the server in that directory:<br />
  If Python version returned above is 3.X:<br />
  python -m http.server<br />
  If Python version returned above is 2.X:<br />
  python -m SimpleHTTPServer<br />
  <b>4.</b> By default, this will run the contents of the directory on a local web server, on port 8000. You can go to this server by going to the URL localhost:8000
