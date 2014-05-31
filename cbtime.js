var gauges = [];

function createGauge(name, label, min, max)
{
	var config = 
	{
		size: 120,
		label: label,
		min: undefined != min ? min : 0,
		max: undefined != max ? max : 100,
		minorTicks: 5
	}
	
	var range = config.max - config.min;
	config.yellowZones = [{ from: config.min + range*0.75, to: config.min + range*0.9 }];
	config.redZones = [{ from: config.min + range*0.9, to: config.max }];
	
	gauges[name] = new Gauge(name + "GaugeContainer", config);
	gauges[name].render();
}

function createGauges()
{
	createGauge("memory", "Memory");
	createGauge("cpu", "CPU");
	createGauge("network", "Network");
	//createGauge("test", "Test", -50, 50 );
}

function updateGauges()
{
	for (var key in gauges)
	{
		var value = getRandomValue(gauges[key])
		gauges[key].redraw(value);
	}
}

function getRandomValue(gauge)
{
	var overflow = 0; //10;
	return gauge.config.min - overflow + (gauge.config.max - gauge.config.min + overflow*2) *  Math.random();
}

function initialize()
{
	createGauges();
	setInterval(updateGauges, 5000);
}

/* line chart */

function lineChart(page) {
	var margin = {top: 20, right: 0, bottom: 30, left: 50},
	    width = $(window).width() - margin.left - margin.right,
	    height = 300 - margin.top - margin.bottom;

	var parseDate = d3.time.format("%d-%b-%y").parse;

	var x = d3.time.scale()
	    .range([0, width]);

	var y = d3.scale.linear()
	    .range([height, 0]);

	var xAxis = d3.svg.axis()
	    .scale(x)
	    .orient("bottom");

	var yAxis = d3.svg.axis()
	    .scale(y)
	    .orient("left");

	var line = d3.svg.line()
	    .x(function(d) { return x(d.date); })
	    .y(function(d) { return y(d.close); });

    /* http://stackoverflow.com/questions/9400615/whats-the-best-way-to-make-a-d3-js-visualisation-layout-responsive */ 
	var svg = d3.select('#lineChart').append("svg")
		.attr("id", "chart")
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	    .attr("viewBox", "0 0 960 300")
	    .attr("preserveAspectRatio", "xMidYMid")
	    .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	d3.tsv("data.tsv", function(data) {
	  data.forEach(function(d) {
	    d.date = parseDate(d.date);
	    d.close = +d.close;
	  });

	  x.domain(d3.extent(data, function(d) { return d.date; }));
	  y.domain(d3.extent(data, function(d) { return d.close; }));

	  svg.append("g")
	      .attr("class", "x axis")
	      .attr("transform", "translate(0," + height + ")")
	      .call(xAxis);

	  svg.append("g")
	      .attr("class", "y axis")
	      .call(yAxis)
	    .append("text")
	      .attr("transform", "rotate(-90)")
	      .attr("y", 6)
	      .attr("dy", ".71em")
	      .style("text-anchor", "end")
	      .text("Price ($)");

	  svg.append("path")
	      .datum(data)
	      .attr("class", "line")
	      .attr("d", line);
	});
} //line chart end 
