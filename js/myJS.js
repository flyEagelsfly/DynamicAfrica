// message if hole page with all elements finished loading
window.onload = function () {
    console.log('Document loaded');
}

// VARIABLE DECLARATION
var NoTypes = "7" // the default number of types, selectable by the user
var TypeColor = ["#bf002f","#ff301f","#691b00","#bef400","#00ee5e","#02cf9e","#0091f1","#4100ac","#9f63ae","#c629e1"]



// function to read json keys with strings
// https://stackoverflow.com/questions/6393943/convert-javascript-string-in-dot-notation-into-an-object-reference
function getJsonIndex(obj,i) {
	return obj[i]
}
// the reduce function calls the function and returns last output
//'0.X2000'.split('.').reduce(getJsonIndex, json) // json not yet defined
// working example in function setHDIstyle()

				
				
$(document).ready(function() {   // wait till HTML DOM is finished loading (using JQuery)

	
	//---------- NUMBER OF TYPES SELECTION ------------------------
	// if Number of Types selection changes 
    $( "#NoTypes" ).change(function(e) {
		// get text of the selection field (1-10)
		NoTypes = e.target.options[e.target.selectedIndex].text;
		// REFRESH PLOT
		// delete old lines
		refreshGraph();
		// read specific json and add new lines
		readJSONandPlot(NoTypes);
	});
	
	
	// Function to select the JSON file with the cluster means for the specific number of clusters
	// and fill the line graph with the specific data
	function readJSONandPlot (NoTypes){
		var json = "./data/type_means/cluster_" + NoTypes+ ".json";
		$.getJSON(json, function(json) {
			var noTypes = json.length;
			
			//it's too late but you could call the first year of the first type easily as that
			//(to convert String to object keys) :
			//console.log('0.X2005'.split('.').reduce(getJsonIndex, json))
			
			// loop through all types
			for (i = 0; i < noTypes; i++) {
				// save the stored data
				var cluster = json[i].cluster;
				
				var data = [
					json[i].X2000,
					json[i].X2001,
					json[i].X2002,
					json[i].X2003,
					json[i].X2004,
					json[i].X2005,
					json[i].X2006,
					json[i].X2007,
					json[i].X2008,
					json[i].X2009,
					json[i].X2010,
					json[i].X2011,
					json[i].X2012,
					json[i].X2013,
					json[i].X2014,
					json[i].X2015,
					json[i].X2016,
				];
				// pass the data to the line graph to plot a line
				addLine(data, d3.rgb(TypeColor[cluster-1]));
			}
		   
		});
	}
	
	// fill the line graph with the default number of clusters (7)
	readJSONandPlot (NoTypes);
	

	//---------- Line Diagram Creation ------------------------
	/* https://gist.github.com/benjchristensen/2579599 */
	/* actualized to version 4 using https://bl.ocks.org/d3noob/23e42c8f67210ac6c678db2cd07a747e */
	
	// define dimensions of graph
	var margin = {top: 0, right: 15, bottom: 20, left: 35};
	var width = parseInt($("#lineChart").css("width")) - margin.left - margin.right; 
	var height = parseInt($("#lineChart").css("height")) - margin.top - margin.bottom; 
	
	// TEST DATA (create a simple data array that we'll plot with a line (this array represents only the Y values, X will just be the index location)
	//var data = [0, 0.6, 0.2, 0.7, 0.5, 0.5, 0.1, 0.3, 0.8, 0.9, 0.2, 0.5, 0.9, 0.3, 0.6, 0.3, 1];
	//var data2 = [0, 0.4, 0.6, 0.4, 0.3, 0.3, 0.1, 0.3, 0.3, 0.3, 0.2, 0.3, 0.1, 0.3, 0.1, 0.3, 1];
	
	// set the domains and ranges to scale the data
	
	// Scaling of X axis:
	// x values vary between 0 and the number of data points (16) and space to do that is in the svg between the 0 and width
	var x = d3.scaleLinear()
		.domain([0, 16])
		.range([0, width]);
	
	// Customized Labeling for X axis:
	// the labels of the x axis should not be between 0 and 16 but between 2000 and 2016
	var xLabeledBottom = d3.axisBottom(x)
		.tickFormat(function(d, i) {
		  var s = i*2 + 2000;
		  return s
		});
	// the top line schould just be a seperator
	var xLabeledTop = d3.axisBottom(x)
		.ticks(0)
	
	// Scaling of Y axis:
	// y values vary between 0 and 1 and space to do that is in the svg between the height and 0
	var y = d3.scaleLinear().
		domain([0, 1]).
		range([height, 0 + margin.bottom]);
		
	// Customized Labeling for Y axis:	
	// the labels of the y axis should not be between 0 and 1 but between 0% and 100%
	formatter = d3.format(".0%");
	var yLabeled = d3.axisLeft(y)
		.tickFormat(formatter);


	// Line Creating:	
	// define the line function (it's a function which can take data[] as an parameter and will return a d3.line()) 
	var line = d3.line()
		.x(function(d, i) { 
			//console.log('Plotting X value for data point: ' + d + ' using index: ' + i + ' to be at: ' + x(i) + ' using our xScale.');
			// return the X coordinate (defined by our range) where we want to plot this datapoint
			return x(i);
		})
		.y(function(d) { 
			//console.log('Plotting Y value for data point: ' + d + ' to be at: ' + y(d) + " using our yScale.");
			// return the Y coordinate (defined by our dataset) where we want to plot this datapoint
			return y(d); 
		});
		

	// append the svg obgect to the "lineChart" div (fills whole div)
	// appends a 'group' element to 'svg' 
	// moves the 'group' element to the top left margin (fills diagram space)
	var svg = d3.select("#lineChart").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	  .append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	function refreshGraph(){
		d3.selectAll("path.line").remove();
	}
	function addLine(data, color){
		// Add the line path created by the data specified in Number of Types selection
		var svg = d3.select("#lineChart").select("g")
		svg.append("path")
		 .attr("class", "line")
		 .attr("d", line(data))
		 .style("stroke", color);
	}
	
	// plot test data:
	//addLine(data, "blue")
    //addLine(data2, "red")
	
	// Add the Bottom x Axis (scaling defined above)
	svg.append("g")
	 .attr("transform", "translate(0," + height + ")")
	 .call(xLabeledBottom);
	 
	// Add the Top x Axis (scaling defined above)
	svg.append("g")
	 .attr("transform", "translate(0," + margin.bottom + ")")
	 .call(xLabeledTop);	  
    
	// Text Labels and Y Axis 
	
/* 	// text label for the x axis
	svg.append("text")             
	 .attr("transform",
		"translate(" + (width/2) + " ," + 
					   (height + margin.top + 20) + ")")
	 .style("text-anchor", "middle")
	 .text("Date"); */
    
	// Add the y Axis (scaling defined above)
	svg.append("g")
	 .call(yLabeled);
    
/* 	// text label for the y axis
	svg.append("text")
	 .attr("transform", "rotate(-90)")
	 .attr("y", 0 - margin.left)
	 .attr("x",0 - (height / 2))
	 .attr("dy", "1em")
	 .style("text-anchor", "middle")
	 .text("Value");   */    


	
	//---------- RESIZE POPULATION CIRCLE ------------------------
	// influenced by https://bl.ocks.org/mbostock/22994cc97fefaeede0d861e6815a847e
	
	// get width and height of the div where to store the circle in
	// as well as their global center x and y coordinates
	// (needed later for checking direction of resizing)
	var circleSvg = $("#circle"); // circle is the <div>
	var width = circleSvg.width();
	var height = circleSvg.height();
	var startRadius = height/3;
	
	// fit the svg to create into it's div
	var svg = d3.select("#resize"), // resize is the <svg>
		width = width,
		height = height,
		radius = startRadius;

	// create an object with x and y positions of the circle (in SVG coordinate system)
	// (in the center of the div (which is automaticly the SVG size))
	var circles = d3.range(1).map(function() {
	  return {
		x: width/2,
		y: height/2
	  };
	});

	var color = "#999999"

	svg.selectAll("circle")
	  .data(circles)
	  .enter().append("circle")
		.attr("cx", function(d) { return d.x; })
		.attr("cy", function(d) { return d.y; })
		.attr("r", radius)
		.style("fill", color)
		.call(d3.drag()
			.on("start", dragstarted)
			.on("drag", dragged)
			.on("end", dragended));

	function dragstarted(d) {
	  d3.select(this).raise().classed("active", true);
	}

	function dragged(d) {
	  // calculate the distance between the mouse coordinates and
	  // center coordinates -> distance moved
	  var midpointX = d.x;
	  var midpointY = d.y;
	  var a = midpointX - d3.event.x;
	  var b = midpointY - d3.event.y;
	  var distanceMoved = Math.sqrt( a*a + b*b );	
	  
	  // update circle radius and text
	  d3.select(this).attr("r", radius = startRadius - distanceMoved);
	  $("#inh").text((startRadius - distanceMoved).toString() + ' mio inhabitants');
    }

	function dragended(d) {
	  d3.select(this).classed("active", false);
	}
	
	
	//---------- DENDROGRAM OVERLAY ------------------------
	//https://www.w3schools.com/howto/howto_css_modals.asp
	// Get the modal
	var modal = document.getElementById('myModal');
	
	// Get the modal content
	var modal_content = document.getElementById('modal-content');

	// Get the button that opens the modal
	var btn = document.getElementById("open");

	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];

	// When the user clicks on the button, open the modal and set actual dendrogram
	btn.onclick = function() {
		modal.style.display = "block";
		$('#modal-content').css('background-image', 'url(./img/dendrogram/dendrogram' + NoTypes + '.svg)');
	}

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
		modal.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	} 
	

	//---------- Mapping ------------------------
	
	// First try D3 only: 
	
		/*
	var projection = d3.geoConicEqualArea() 	// Equal area projection
	.center([10, 66]) 							// - lat,lon of the approx. center of norway
	.scale(2500)      							// - scale of map

	var path = d3.geoPath()       				// create a new geographic path generator
		.projection(projection);  				// - set the geographic projection defined above

	var svg = d3.select('#map').append("svg") 	// append a new svg image into the <div> map
		.attr("width", "100%")				  	// - inherit width and height of the <div>
		.attr("height", "100%");
		
	var geom = "./data/countries.geojson"		  	
	d3.json(geom, function(error, topology) {   // load the GeoJSON (if error while loading throw error)
	  if (error) throw error;
	  
	  console.log("geojson", topology)
	  console.log("features", topology.features)
	
												// select path (https://www.w3schools.com/graphics/svg_path.asp) of
	  svg.selectAll("path")			 			// the appended svg object to manipulate it.
		  .data(topology.features)				// - with the GeoJSON features as data
		  .enter().append("path")				// -http://jonathansoma.com/tutorials/d3/using-enter-and-append/
												// - .enter() creates the initial join of data to elements
												// - .append("path") creates a new path because none is jet existing
		  .attr("d", path);						// - the d attribute is a string containing a series of path descriptions  
	});	 */
	
	
	// with LEAFLET CHOROPLETH MAP

	// CREATE MAP WITH CUSTOM ZOOM LEVELS
	
	// create custon zoom levels
	// https://gist.github.com/croxton/6248586
	L.CRS.CustomZoom = L.extend({}, L.CRS.EPSG3857, {
		scale: function (zoom) {
			return 256 * Math.pow(1.2, zoom);
		}
	});

	var map = new L.Map('map', {
		crs: L.CRS.CustomZoom
	});

	// swap back to standard zoom
	// map.options.crs = L.CRS.EPSG3857;

	
	// -------------------------------------------------------------
	// Load Human Development Index layer and fit map to it's center!
	// (geojson HDI importet as js script in index.html)
	
	var HDI_layer =  L.geoJson(HDI).addTo(map);
	var bounds = HDI_layer.getBounds();
	var center = bounds.getCenter();
	
	//map.fitBounds(bounds);
	map.setView(center, 14);
	// set max/min zoomlevels
	map.options.minZoom = 14;
	map.options.maxZoom = 20;

	
	// define Style dynamicly depending on actual year
	function getColor(hdi) {
		return hdi > 0.7 ? '#993404' :
			   hdi > 0.6  ? '#d95f0e' :
			   hdi > 0.5  ? '#fe9929' :
			   hdi > 0.4  ? '#fec44f' :
			   hdi > 0.3   ? '#fee391' :
			   hdi > 0.2   ? '#ffffd4' :
						    '#FFFFFF';
	}
	
	function setHDIstyle (year){
		HDI_layer.eachLayer(function (layer) {
		  
		  // call the HDI for the selected year for each country
		  var layerYear = "feature.properties." + year
		  // function getJsonIndex defined at very top of myJS.js
		  var HDI = layerYear.split('.').reduce(getJsonIndex, layer)
		  
		  // get color for this country/year
		  var col = getColor(HDI)
		  layer.setStyle({
			  color: '#000000',
			  weight: 0.5,
			  fillColor :col,
			  fillOpacity: 0.5
		  }) 

		});
	}
	
	// set default to 2000
	setHDIstyle(2016);
	
	//----------------------------------------------------------
	// Load Waterbodies layer!
	// (geojson water_bodies importet as js script in index.html)
	var waterStyle = {
		"stroke": false,
		"fillColor": "#3182bd",
		"fillOpacity": 1
	};

	var water_bodies_layer = L.geoJSON(water_bodies, {
		style: waterStyle
	}).addTo(map);
	

	
	
	map.attributionControl.addAttribution('Internet usage data: &copy; <a href="http://census.gov/">US Census Bureau</a>');
	
	
	//----------------------------------------------------------
	// Load capitals layer!
	// (geojson capitals importet as js script in index.html)
	
	//https://gis.stackexchange.com/questions/245621/how-to-label-geojson-points-in-leaflet
	var capitals_labels = L.geoJSON(capitals, {
		pointToLayer: function(feature,latlng){
			label = String(feature.properties.NAME) // Must convert to string, .bindTooltip can't use straight 'feature.properties.attribute'
			return new L.CircleMarker(latlng, {
				radius: 1,
				fillColor: '#000000'
			}).bindTooltip(label, {
				permanent: true, 
				offset: [0, 0],
				opacity: 1,
				className: "capital-labels"
			}).openTooltip();
		}
	});
	  
	var capitals_layer = L.geoJson(capitals, {
		style: {color: '#000000'},
		pointToLayer: function(feature, latlng) {
			return new L.CircleMarker(latlng, {radius: 1, fillOpacity: 1});
		},
	});

	// display/hide capitals
	// make the functions globaly (outside $(document).ready) available
	window.displayCapitals = function displayCapitals(){
		
	}
	window.hideCapitals = function hideCapitals(){

	}
		
}); 


// --------- HANDLE LABEL CHECKBOXES --------------------
$(document).on('click', "#names", function(){
	if($(this).is(':checked')){
		alert("label");
	}
	else{
		alert("no label");		
	}
});

$(document).on('click', "#capitals", function(){
	if($(this).is(':checked')){
		displayCapitals();
	}
	else{
		hideCapitals();		
	}
});



//                  REPONSIVE DESIGN
	
// --------MAP/LEGEND SWITCHER (display < 1024 pixels) -----------
// -------------- map ---------------> legend --------------------
$(document).on('click', "#nav-mobile", function(){
	if ($("#map").css('display') == "block"){ // if map is displayed -> display legend
		$("#map").css( "display", "none" )
		$("#legend").css( "display", "block" )	
	}
	
	else {									// if legend is displayed -> display map
		$("#map").css( "display", "block" )
		$("#legend").css( "display", "none" )	
	}
});

// resize handling
$( window ).resize(function() {
  if ($(window).width() > 1024){
	// display both legend and map when size > 1024
	$("#map").css( "display", "block" )
	$("#legend").css( "display", "block" )
  }
});
// --------------------------------------------------------