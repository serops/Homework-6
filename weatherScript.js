
$(document).ready(function() {

// *******************************************When the page loads the default city is set as Toronto (local place)*********************************

// var city = localStorage.getItem("city") ? localStorage.getItem("city") : "Toronto";
var historyList=[];
console.log(historyList)
var city;
console.log( localStorage.getItem("city") );
let recentHistory=JSON.parse(localStorage.getItem("city")).slice(1,3);
console.log(recentHistory);
JSON.parse(localStorage.getItem("city")).forEach( function (city){
 $(".list-group").prepend("<li class='list-group-item'>" +city + "<span class='delete'>Delete</span> </li>");
});

// ***********This section is for the default mode***********************************************

if(!localStorage.getItem("city")){
  historyList = ["Toronto"];
} else {
  historyList = JSON.parse(localStorage.getItem("city") );
  runQuery(historyList[0] );
};

console.log(historyList);
// ***************This section handles the queries from  search input box***************************

$("#searchBtn").on("click", function(event){
  event.preventDefault();
  city=$("#citySearch").val();
  addList( city );
  runQuery( city );
  $("#citySearch").val("");
});
// **************************************
function addList( city ){
  
  if (city != "" && !historyList.includes(city)) {
 $(".list-group").prepend("<li class='list-group-item'>" +city + "<span class='delete'>Delete</span> </li>");
  }
  if(historyList.includes(city)) {
    console.log(historyList);
  }else{ historyList.push( city );}
  

localStorage.setItem("city", JSON.stringify(historyList) );
  console.log(localStorage);

};
// ******************Search from the city history.......

$(".list-group").on("click",".list-group-item", function(event){
 city=$(this).text().slice(0,-7);
 console.log(city)
    runQuery(city);
  });

  $(".list-group").on("click",".delete", function(event){
    event.stopPropagation();
    $(this).parent().remove();
  })    

function runQuery( city ){

  const apiKey = "1c2a3377eeea4d74ddc0ffd638238cfb";
// API query******************************************
  var queryURLForcast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
  $.ajax({
    url: queryURLForcast,
    method: "GET"
  }).then(function (forecastWeather) {
    console.log(forecastWeather);


//  ********************** This section is for Ajax call for UV index ******************************************************************
  let cityLat=forecastWeather.city.coord.lat;
  console.log(cityLat);
  let cityLon=forecastWeather.city.coord.lon;
    console.log(cityLon);

  var queryURLUv = `https://api.openweathermap.org/data/2.5/uvi/forecast?lat=${cityLat}&lon=${cityLon}&appid=${apiKey}`;
  $.ajax({
    url: queryURLUv,
    method: "GET"
  }).then(function (forecastUv) {
    console.log(forecastUv);

    let uvIndex=forecastUv[0].value;

    $("#currentUV").text(uvIndex);

    let uvColor= function(){

      if( uvIndex <=2 ){
        $("#currentUV").css("background-color", "green");
      }
      else if (uvIndex >2 && uvIndex <= 5 ){
        $("#currentUV").css("background-color", "yellow");
      }
      else if (uvIndex > 5 && uvIndex < 8 ){
        $("#currentUV").css("background-color", "orange");
      }
      else if (uvIndex >= 8 && uvIndex < 10 ){
        $("#currentUV").css("background-color", "red");
      }
      else if (uvIndex >=10 ){
        $("#currentUV").css("background-color", "purple");
      }
    }
    uvColor();

    $("#currentUV").css({
      "border-radius": "10px", 
      "padding":"5px",
      "border":"solid 1px",
    });
  });
//  **********************  UV index section ends here ******************************************************************

    var cityName=forecastWeather.city.name;
    var currentDate=forecastWeather.list[0].dt_txt.slice(0,10)
    var currentIconCode=forecastWeather.list[0].weather[0].icon;
    var currentIconUrl=`https://openweathermap.org/img/wn/${currentIconCode}@2x.png`;
    var currentTemp= Math.round(forecastWeather.list[0].main.temp);
    var currentHumidity=forecastWeather.list[0].main.humidity+ "%";;
    var currentWindSpeed=forecastWeather.list[0].wind.speed +"m/s";
    $("#cityName").text(cityName)
    $("#currentDate").text(currentDate);
    $("#currentIcon").attr("src", currentIconUrl);
    $("#currentTemp").text(currentTemp);
    $("#currentHumidity").text(currentHumidity);
    $("#currentWindSpeed").text(currentWindSpeed);


    var dateDayOne=forecastWeather.list[8].dt_txt.slice(0,10);
    var iconCodeDayOne=forecastWeather.list[8].weather[0].icon;
    var iconUrlDayOne=`https://openweathermap.org/img/wn/${iconCodeDayOne}@2x.png`;
    var tempDayOne= Math.round(forecastWeather.list[8].main.temp);
    var humidityDayOne=forecastWeather.list[8].main.humidity;
    $("#dateDayOne").text(dateDayOne);
    $("#iconDayOne").attr("src", iconUrlDayOne);
    $("#tempDayOne").text(tempDayOne);
    $("#humidityDayOne").text(humidityDayOne);
    
       
    var dateDayTwo=forecastWeather.list[16].dt_txt.slice(0,10);
    var iconCodeDayTwo=forecastWeather.list[16].weather[0].icon;
    var iconUrlDayTwo=`https://openweathermap.org/img/wn/${iconCodeDayTwo}@2x.png`;
    var tempDayTwo= Math.round(forecastWeather.list[16].main.temp);
    var humidityDayTwo=forecastWeather.list[16].main.humidity;;
    $("#dateDayTwo").text(dateDayTwo);
    $("#iconDayTwo").attr("src", iconUrlDayTwo);
    $("#tempDayTwo").text(tempDayTwo);
    $("#humidityDayTwo").text(humidityDayTwo);
    
    
    var dateDayThree=forecastWeather.list[24].dt_txt.slice(0,10);
    var iconCodeDayThree=forecastWeather.list[24].weather[0].icon;
    var iconUrlDayThree=`https://openweathermap.org/img/wn/${iconCodeDayThree}@2x.png`;
    var tempDayThree= Math.round(forecastWeather.list[24].main.temp_min);
    var humidityDayThree=forecastWeather.list[24].main.humidity;;   
    $("#dateDayThree").text(dateDayThree)
    $("#iconDayThree").attr("src", iconUrlDayThree);
    $("#tempDayThree").text(tempDayThree);
    $("#humidityDayThree").text(humidityDayThree)
    
   
    var dateDayFour=forecastWeather.list[32].dt_txt.slice(0,10);
    var iconCodeDayFour=forecastWeather.list[32].weather[0].icon;
    var iconUrlDayFour=`https://openweathermap.org/img/wn/${iconCodeDayFour}@2x.png`;
    var tempDayFour= Math.round(forecastWeather.list[32].main.temp);
    var humidityDayFour=forecastWeather.list[32].main.humidity;;   
    $("#dateDayFour").text(dateDayFour)
    $("#iconDayFour").attr("src", iconUrlDayFour);
    $("#tempDayFour").text(tempDayFour);
    $("#humidityDayFour").text(humidityDayFour)
   
    
    var dateDayFive=forecastWeather.list[32].dt_txt.slice(0,10);
    var iconCodeDayFive=forecastWeather.list[32].weather[0].icon;
    var iconUrlDayFive=`https://openweathermap.org/img/wn/${iconCodeDayFive}@2x.png`;
    var tempDayFive= Math.round(forecastWeather.list[32].main.temp);
    var humidityDayFive=forecastWeather.list[32].main.humidity;;
    $("#dateDayFive").text(dateDayFive)
    $("#iconDayFive").attr("src", iconUrlDayFive);
    $("#tempDayFive").text(tempDayFive);
    $("#humidityDayFive").text(humidityDayFive)

  });


  }


});