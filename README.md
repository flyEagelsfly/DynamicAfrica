# DynamicAfrica
Study project to implement an interactive web mapping application for the visualisation of time dependent statistical data. The development of "percentage of population using the internet", "human development index (HDI)" and "population size" between 2000 and 2016 are shown. Additionally types (classes) of similar internet usage developments have been calculated and are visualized, while the number of types can be selected by the user.   

![Alt Text](https://github.com/lukasalexanderweber/DynamicAfrica/blob/master/gif/html.gif)

## Map

Leaflet (http://leafletjs.com/) is used for the mapping functionalities.

#### Basemap

The basemap is a choropleth map based on a prepared Polygon-GeoJSON (using QGIS) with the countries as shapes and the respective HDI for the years 2000-2016 as data. Additionally the African Great Lakes are visualized on top as an own layer for orientation. For an appropriate zoom functionality the default zoom functionality of Leaflet is extended to custom zoom levels suitable for the continent of africa (https://gist.github.com/croxton/6248586). 

#### Leaflet-Semicircle

<img align="right" width="125" height="125" src="https://github.com/lukasalexanderweber/DynamicAfrica/blob/master/gif/semiC.gif">While the basemap can be implemented using core leaflet functionality, the symbols (pie charts, circle diagrams) are realized using the Leaflet-Semicircle extension (https://github.com/jieter/Leaflet-semicircle). A circle with white transparent fill and fitting stroke is overlaid with a semicircle representing the actual amount of population using the internet. The size of the circle corresponds to the actual population size. The color represents the type of internet usage development. Data and positioning coordinates are stored in a JSON file.

#### Rangeslider

<img align="right" width="125" height="125" src="https://github.com/lukasalexanderweber/DynamicAfrica/blob/master/gif/slider.gif">To enable the animations a timeslider would be needed if time data is stored in a "date" datatype. Thus in this case the dates (years) are only attributes, a Rangeslider (http://rangeslider.js.org/) from 2000-2016 is appropriate. The slider starts automatically when the website is opened and stops when the year 2016 is reached but the user can interact with the slider, too. Each time a 'tick' is reached functions are called to restyle map elements whose styles depend on the year (choropleth [HDI], symbols [internet usage, population])   

#### Labeling country names and capitals

<img align="right" width="300" height="326" src="https://github.com/lukasalexanderweber/DynamicAfrica/blob/master/gif/labels.gif">Using the label checkboxes in the legend the country names and the capital names can be displayed on the map. For both datasets Point-GeoJSONs store the position where the label should be as well as the text. For realization a CircleMarker is combined with a permanent Tooltip. The layers are generated when the page is loaded and added (addTo) respectively removed (removeLayer) from the map if the user ticks/unticks the checkbox.
</br></br></br></br></br></br></br></br>

## Legend

D3 (https://d3js.org/) is used for most interactive mapping functionalities.

#### D3 line chart for internet usage development

<img align="right" width="320" height="238" src="https://github.com/lukasalexanderweber/DynamicAfrica/blob/master/gif/linechart.gif">This realization is a combination of the examples https://gist.github.com/benjchristensen/2579599 and https://bl.ocks.org/d3noob/23e42c8f67210ac6c678db2cd07a747e. The normalised development of the percentage of population using the internet (2000 -> 0, 2016 -> 1) were classified into 2-10 diverse classes of countries with similar internet development. The mean value of each year was calculated for cohesive countries. The connection of those means are visualised in the line chart. For all selectable number of classes a JSON is prepared defining new lines ([data/type_means/cluster_7.json](data/type_means/cluster_7.json)). With this diagrams can better be understood what kind of growth of internet usage a country has (linear, exponential etc.). Additionaly, the Symbology.json describing the semicircle symbols contains information about the exact class a country underlies depending the number of classes. This information is used to color the semicircle symbols depending on the line color of the associated type of internet development.

---

### Browser characteristics for dynamicly loading local JSON files

This website was developed using Mozilla Firefox which is capable of dynamicly loading local JSON files as done in the D3 and leaflet parts. Other browsers like Google Crome prohibit such an asynchronous call of local files. To test or change the application in browsers like Chrome you need to run the content in a testserver. An example for setting up a testserver using Python is discribed in the following (adapted from https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server):

  <b>1.</b> Open your command prompt. Check if Python is installed (python -V). If not install (IMPORTANT: check the "Add Python xxx to PATH" checkbox)<br />
  <b>2.</b> Navigate to the downloaded DynamicAfrica folder (cd ./DynamicAfrica)<br />
  <b>3.</b> Enter the command to start up the server in that directory:<br />
  If Python version returned above is 3.X:<br />
  python -m http.server<br />
  If Python version returned above is 2.X:<br />
  python -m SimpleHTTPServer<br />
  <b>4.</b> By default, this will run the contents of the directory on a local web server, on port 8000. You can go to this server by going to the URL localhost:8000
