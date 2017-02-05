var appid = "8cd792a471f2d7d5d0c24daf2c32e471";

function onWeather(err, data) {
  if(err) {
    showError("Could not find weather info for that ZIP code :(");
    return;
  }
  // Empty the error element and hide it.
  var el = document.getElementById('error');
  el.innerHTML = "";
  el.style["display"] = "none";

  // Set temperature
  var temp = data.main.temp;
  document.getElementById("temp").innerHTML = temp + " &deg;F";

  // Set wind speed
  var windspeed = data.wind.speed;
  document.getElementById("windspeed").innerHTML = windspeed + "mph";

  var iconUrl = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
  var iconEl = document.getElementById("icon");
  
  // Create an img tag with src set to iconUrl, and set the content of the
  // icon element to that image.
  if (document.getElementById("icon-img")) {
    document.getElementById("icon-img").src = iconUrl;
  }
  else {
    var icon = document.createElement("img");
    icon.setAttribute("src", iconUrl);
    icon.setAttribute("id", "icon-img");
    iconEl.appendChild(icon);
  }

  var locationEl = document.getElementById("location");
  locationEl.innerHTML = data.name;

  // Make the response element and results elements both visible
  var response = document.getElementById("response");
  response.style["display"] = "";

  var result = document.getElementById("result");
  result.style["display"] = ""

}

function onZipCode(err, data) {
  if(err) {
    showError("That zip code does not exist.");
    return;
  }
  var firstMatch = data.places[0];
  /* Get the city name, state name and country from the place data returned by
   * the Zippopotamus API.
   */
  var url = "http://api.openweathermap.org/data/2.5/weather";
  /* Access the url above with the query string below:
   *   ?APPID=[APPID]&units=imperial&q=[CITY],[STATE],[COUNTRY]
   * Where the things in brackets were found above.
   */
   var city = firstMatch["place name"];
   var state = firstMatch["state"];
   var country = data["country abbreviation"];
   var query = "?APPID=" + appid + "&units=imperial&q=" 
    + city + "," + state + "," + country;

   AJAX.getJSON(url + query, onWeather);
}

/* Called when form submits.
 * Access the URL and convert data to JSON, then call onZipCode. */
function getWeather(e) {
  e.preventDefault(); // stop submit
  var zipCode = document.getElementById("zipCode").value;
  if(!zipCode) {
    showError("Please enter a zip code!")
    return;
  }
  /* Access the url http://api.zippopotam.us/us/ZZZZZ where ZZZZ is the given
   * zip code.
   */
   var url = "http://api.zippopotam.us/us/" + zipCode;
   AJAX.getJSON(url, onZipCode);
}

/* Toggle the results display for the response display.
 * Print an error message in the error element and change its display so
 * that it is no longer hidden.
 */
function showError(msg) {
  var result = document.getElementById("result");
  result.style["display"] = "none";

  var response = document.getElementById("response");
  response.style["display"] = "";

  var error = document.getElementById("error");
  error.innerHTML = msg;
  error.style["display"] = "";
  return;
}
