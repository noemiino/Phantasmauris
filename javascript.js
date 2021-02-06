var i = 1;
var activeGPSlatitude = 0;
var activeGPSlongitude = 0;
var saveGPSlatitude = 0;
var saveGPSlongitude = 0;
var scenes = [];
var currentScene = { id: " " };
var idLocations = [
                    "Quarantaine-terrain",
                    // "Teilingerstraat",
                    "Waalhaven",
                    "Breeplein-kerk",
                    "Mosque-west",
                    "Het-Park",
                    "Maastunnel",
                    "Kralingse-bos",
                    "Nieuwe-Binnenweg",
                    "Blaak", //laurenskerk
                    "Witte-de-Withstraat",
                    "Rotterdam-Centraal-station",
                    "Rotterdam-Noord-station",
                    "Ro",
                    "Korea",
                    "empty"];
var infoLocations = [
                      "Turbulent Stream (Quarantine beach)",
                      // "This is where the studio is",
                      "Turbulent Stream (Waalhaven)",
                      "Residual (Breeplein)",
                      "Residual (Mosque West)",
                      "Night Ride (Het Park)",
                      "Night Ride (Maastunnel)",
                      "Night Ride (Kralingse Bos)",
                      "Passage (Nieuwe Binnenweg)",
                      "Residual (Laurenskerk)",
                      "Passage (Witte de Withstraat / Westblaak)",
                      "Velocity of Traverse (Central station)",
                      "Velocity of Traverse (Noord station)",
                      "Romania, where Noemi is",
                      "Korea, this is where Hyunji is",
                      "Visit map section to see the closest available location."];


// window loader, enter, remove div when ready
window.addEventListener("load", function(){
	var load_screen = document.getElementById("load_screen");
	//document.body.removeChild(load_screen);
  var enterButton =   document.getElementById('enter-website-button');
  enterButton.classList.toggle("show");
  enterButton.classList.toggle("hide");
  enterButton.addEventListener("click", function(){
    document.body.removeChild(load_screen);
  });
});

window.onload = function() {
  clickCounter();
  getLocation();
  getScenes();
  saveGPSlatitude = activeGPSlatitude;
  saveGPSlongitude = activeGPSlongitude;

  //javascript related to ui and ux
  var menuButton = document.getElementById('menu-button');
  menuButton.addEventListener("click", clickedMenu);
  var locationsInfoButton = document.getElementById('locationsInfo');
  locationsInfoButton.addEventListener("click", clickedI);
  document.getElementById('js-nav-open').classList.toggle("show");
  document.getElementById('nav').classList.toggle("hide");
}

//js nav menu ui & ux
function clickedMenu() {
  //alert ("button clicked!");
  if(document.getElementById('locations').classList.contains("hide") == true){
    var openMenu = document.getElementById('js-nav-open');
    openMenu.classList.toggle("hide");
    document.getElementById('js-nav-close').classList.toggle("show");
    openMenu.classList.toggle("show");
    document.getElementById('js-nav-close').classList.toggle("hide");

    // document.getElementById('nav').classList.toggle("show");
    // document.getElementById('nav').classList.toggle("hide");

    // document.getElementById('nav').classList.toggle("show");
    // document.getElementById('nav').classList.toggle("hide");


    document.getElementById('content').classList.toggle("hide");
    document.getElementById('listen').classList.toggle("active");
    document.getElementById('js-nav-close').classList.toggle("active");

    // var aboutButton = document.getElementById('about_button');
    // aboutButton.addEventListener("click", clickedAbout);

    var locationsButton = document.getElementById('locations_button');
    locationsButton.addEventListener("click", clickedLocations);

    document.getElementById('about').classList.toggle("hide");
  } else {
    document.getElementById('locations').classList.toggle("hide");
    var openMenu = document.getElementById('js-nav-open');
    openMenu.classList.toggle("hide");
    document.getElementById('js-nav-close').classList.toggle("show");
    openMenu.classList.toggle("show");
    document.getElementById('js-nav-close').classList.toggle("hide");
  }
}
function clickedI() {
  //document.getElementById('infoMap').classList.toggle("hide");
  i++;
  if(i % 2 == 0){
    var mapImage = "img/" + "map-info2.jpg";
    var mapImageSource = document.getElementById('oldimg');
    mapImageSource.src = mapImage;

    var mapImageUI = "img/" + "buttons-03.png";
    var mapImageSourceUI = document.getElementById('infoSwitcherUI');
    mapImageSourceUI.src = mapImageUI;
  } else {
    var mapImage = "img/" + "map-grey.jpg";
    var mapImageSource = document.getElementById('oldimg');
    mapImageSource.src = mapImage;

    var mapImageUI = "img/" + "buttons-02.png";
    var mapImageSourceUI = document.getElementById('infoSwitcherUI');
    mapImageSourceUI.src = mapImageUI;
  }

}

function clickedMenuClose() {
  document.getElementById('about').classList.add("hide");
  document.getElementById('locations').classList.add("hide");
  document.getElementById('content').classList.toggle("hide");
  console.log("still");
}

function clickedLocations(){
  document.getElementById('locations').classList.toggle("hide");
  document.getElementById('about').classList.toggle("hide");
  // document.getElementById('js-nav-close').classList.add("hide");
  // document.getElementById('js-nav-close').classList.remove("show");
  // document.getElementById('js-nav-open').classList.add("show");
  // document.getElementById('js-nav-open').classList.remove("hide");

  document.getElementById('content').classList.toggle("hide");
  // document.getElementById('nav').classList.add("hide");
  // document.getElementById('nav').classList.remove("show");
  var menuButton = document.getElementById('menu-button');
  //menuButton.addEventListener("click", clickedMenuClose);
  //document.getElementById('about').classList.toggle("hide");

}
//js for locations map
// $(document).ready(function() {
//   $("#map-container").bind('mousemove', function(e) {
//
//     $(this).css({
//       backgroundPosition: e.pageX + 'px ' + e.pageY + 'px'
//     });
//
//   });
// });

//hiding load if already visited - store if user already visited - not show the infowindow
function clickCounter() {
  if (typeof (Storage) !== "undefined") {
    if (localStorage.clickcount) {
      localStorage.clickcount = Number(localStorage.clickcount) + 1;
    } else {
      localStorage.clickcount = 1;
    }
    //document.getElementById("result").innerHTML = "You have clicked the button " + localStorage.clickcount + " time(s).";
  } else {
    //document.getElementById("result").innerHTML = "Sorry, you will see the info multiple times";
  }
  if (localStorage.clickcount <= 1) {
    // infoWindow();
    document.getElementById("load_screen").classList.add('show');
    document.getElementById("load_screen").classList.remove('hide');
  } else {
    var load_screen = document.getElementById("load_screen");
    document.body.removeChild(load_screen);
    // document.getElementById("load_screen").classList.add('hide');
    // document.getElementById("load_screen").classList.remove('show');
  }
  console.log(localStorage.clickcount);
  if (localStorage.clickcount >= 2) {
    // document.getElementById("crop").classList.add('hide');
    // document.getElementById("crop").classList.remove('show');
  }
}

//js related to location and sound
function getLocation() {
  console.log("getting location");
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function getScenes() {

  //let fetchRes = fetch('/api/Scenes');
  let fetchRes = fetch('scenes.json');
  //console.log(fetchRes)
  fetchRes.then(res => res.json())
    .then(d => {
      scenes = d.map(
        function (item) {
          // console.log(item);
          var parts = item.split('_');
          return {
            lat: parseFloat(parts[0]),
            lng: parseFloat(parts[1]),
            id: parts[2]
          }
        }
      )
      //console.log(d) // writes the array

    })
    .then(
      function () {
        //findNearest();
        // here call the findnearest function
        setTimeout(function () {
          getScenes();

        }, 30000);
      }
    )
}

function showPosition(position) {
    activeGPSlatitude = position.coords.latitude;
    console.log(activeGPSlatitude +"activeGPSlatitude");
    activeGPSlongitude = position.coords.longitude;
    console.log(activeGPSlongitude +"activeGPSlongitude");
    findNearest();
}

//calculating distace from the current pos and the available locations in the list
function findNearest() {
  var newScene;
  var minDistance = 1; // distance of x km
  scenes.forEach(item => {
    var dist = calcDistance(item.lng, item.lat, activeGPSlongitude, activeGPSlatitude);
    //console.log(dist +"=distance");
    if (dist < minDistance) {
      minDistance = dist;
      newScene = item;
      console.log(" yes");
    } else {
      // minDistance = 3.5;
      // currentScene = { id:'empty'};
      //updateScene();
    }
  });
  if (newScene) {
    if (currentScene.id != newScene.id) {
      currentScene = newScene;
      updateScene();
    }
  } else{
    console.log(" no");
    var mapImage = "scenes/empty/1.png";
    var mapImageSource = document.getElementById('change-img');
    mapImageSource.src = mapImage;

    document.getElementById('tempInfo').innerHTML = "Visit map section to see the closest available location.";

  }
}


//calculates the distance in km from two sets of coordinates
function calcDistance(lon1, lat1, lon2, lat2) { //activepgslon, activegpslat
  var R = 6371; // Radius of the earth in km
  var dLat = (lat2 - lat1).toRad();  // Javascript functions in radians
  var dLon = (lon2 - lon1).toRad();
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}
/** Converts numeric degrees to radians */
if (typeof (Number.prototype.toRad) === "undefined") {
  Number.prototype.toRad = function () {
    return this * Math.PI / 180;
  }
}


//into the html
function updateScene() {
  console.log("you made it to the", currentScene);
  // here to play
  var audioId = currentScene.id;
  console.log(audioId + " currentscene.id");
  //  console.log(newScene.id = "newScene.id");
  var audio = document.getElementById('audio');
  var source = document.getElementById('audioSource');
  //source.src = elm.getAttribute('data-value');
  var sourceLinkAudio = "scenes/" + currentScene.id + "/" + "1.mp3";
  source.src = sourceLinkAudio;
  audio.load();
  audio.play();

  var mapImage = "scenes/" + currentScene.id + "/" + "1.png";
  var mapImageSource = document.getElementById('change-img');
  mapImageSource.src = mapImage;

  // change inner html for location
  //var i = 0;
  //for(i<6) {
    var matchyIndex;
    // var matvhyId;
    //idLocations.forEach(findText);
    // idLocations.forEach(myFunction);
    //
    // function myFunction(item, index) {
    //   document.getElementById("tempInfo").innerHTML += index + ":" + item + "<br>";
    // }

    //function findText(item, index){
    //for(var index = 0; index < idLocations.length; index++) {
    //  if(idLocations[index] = currentScene.id){
    matchyIndex = idLocations.indexOf(currentScene.id);
    console.log(matchyIndex + "matchyindex");
    //     console.log(idLocations[index] + " idLocations[index]");
    //     console.log(currentScene.id + " currentScene.id");
    //     console.log(index + " index");
    //     matchyIndex = index;
    //     console.log(matchyIndex + " matchyIndex");
    //   }else{
    //     console.log("not");
    //   }
    // }
    //if(idLocations[i] = currentScene.id)

      var locationTempInfo = infoLocations[matchyIndex];

      //i++;
//  }
  var locationInfo = document.getElementById('tempInfo').innerHTML = locationTempInfo;
}
