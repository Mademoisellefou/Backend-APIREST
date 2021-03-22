const apikey = "dd67d0da7ea2920c3b78704c4789d1d4";
const url = "http://api.openweathermap.org/data/2.5/find?";
///to get the input
var prepareData = function (units) {
  var cityname = $("#city-name").val();
  if (cityname && cityname != "") {
    cityname = cityname.trim();
    getData(url, cityname, apikey, units);
  } else {
    alert("Please enter the city name");
  }
};
///OPTIONS
$(document).ready(function () {
  $(".btn-metric").click(function () {
    prepareData("metric");
  });
  $(".btn-imperial").click(function () {
    prepareData("imperial");
  });
});
//GET TIME
function gettime(t) {
  var unixTimestamp = t,
    date = new Date(unixTimestamp * 1000);
  var res =
    "" +
    date.getDate() +
    "/" +
    (date.getMonth() + 1) +
    "/" +
    date.getFullYear() +
    " " +
    date.getHours() +
    " : " +
    date.getMinutes() +
    " : " +
    date.getSeconds();
  return res;
}

//get Data

function getData(url, cityName, key, units) {
  var req = $.ajax({
    url: url,
    dataType: "jsonp",
    data: {
      q: cityName,
      appid: key,
      units: units,
    },
    jsonpCallback: "fetchData",
    type: "GET",
  }).fail(function (err) {
    console.error(err);
    alert("ERROR SENDING REQUEST");
  });
}
//FETCHDATA
function fetchData(forecast) {
  console.log(forecast); //log the response
  var html = "";
  html += "Weather forecast";
  forecast.list.forEach(function (forecastentry, index, list) {
    html += `<p>${forecastentry.name} ,date :${gettime(
      forecastentry.dt
    )} ,temperatura ${forecastentry.main.temp} ,temperatura min:${
      forecastentry.main.temp_min
    }</p>`;
  });
  $("#log").html(html);
}
