App.controller('home', function (page) {
  // put stuff here
});

App.controller('FB', function (page) {
  $(page).on('appShow', function () {
    initialize();

    containner = $(page).find('#lineChart');
    console.log(containner);
    lineChart(page);
    console.log('the user can see it!!');
  });

  $(page).on('appLayout', function(page){
    console.log('Window resized: ' + $(window).width() + ' x ' + $(window).height());
    
    var chart = $("#chart"),
        aspect = chart.width() / chart.height(),
        container = chart.parent();
    
    var targetWidth = container.width();
        chart.attr("width", targetWidth);
        chart.attr("height", Math.round(targetWidth / aspect));

  });

});