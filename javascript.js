var activeGPSlatitude = 0;
var activeGPSlongitude = 0;
var saveGPSlatitude = 0;
var saveGPSlongitude = 0;
var scenes = [];
var currentScene = { id: " " };
var idLocations = ["Teilingerstraat",
                    "Quarantaine-terrain",
                    "Waalhaven",
                    "Breeplein-kerk",
                    "Mosque-west",
                    "Het-Park",
                    "Maastunnel",
                    "Kralingse-bos",
                    "Nieuwe-Binnenweg",
                    "Blaak",
                    "Witte-de-Withstraat",
                    "Rotterdam-Centraal-station",
                    "Rotterdam-Noord-station",
                    "Ro",
                    "Korea"];
var infoLocations = ["This is where the studio is",
                      "Quarantaine is a place of waves",
                      "Waalhaven industry supplier",
                      "Breeplein, religious",
                      "Mosque in the west",
                      "Het Park with the big tower",
                      "Maastunnel, under the water, above is traffic",
                      "Kralingse-bos, with the nature and walks",
                      "Nieuwe Binnenweg, where the city thrives",
                      "Blaak is where the Market is",
                      "Witte de Withstraat, a going out place full of culture",
                      "At the Central Station everyone is busy",
                      "Rotterdam Noord, a stop away",
                      "Romania, where Noemi is",
                      "Korea, this is where Hyunji is"];


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
  getLocation();
  getScenes();
  saveGPSlatitude = activeGPSlatitude;
  saveGPSlongitude = activeGPSlongitude;

  //javascript related to ui and ux
  var menuButton = document.getElementById('menu-button');
  menuButton.addEventListener("click", clickedMenu);
  document.getElementById('js-nav-open').classList.toggle("show");
  document.getElementById('nav').classList.toggle("hide");
}

//js nav menu ui & ux
function clickedMenu() {
  //alert ("button clicked!");
  var openMenu = document.getElementById('js-nav-open');
  openMenu.classList.toggle("hide");
  document.getElementById('js-nav-close').classList.toggle("show");
  openMenu.classList.toggle("show");
  document.getElementById('js-nav-close').classList.toggle("hide");

  document.getElementById('nav').classList.toggle("show");
  document.getElementById('nav').classList.toggle("hide");

  document.getElementById('content').classList.toggle("hide");
  document.getElementById('listen').classList.toggle("active");
  document.getElementById('js-nav-close').classList.toggle("active");

  var aboutButton = document.getElementById('about_button');
  aboutButton.addEventListener("click", clickedAbout);

  var locationsButton = document.getElementById('locations_button');
  locationsButton.addEventListener("click", clickedLocations);
}

function clickedAbout() {
  document.getElementById('about').classList.toggle("hide");
  // document.getElementById('js-nav-close').classList.toggle("show");
  document.getElementById('js-nav-close').classList.add("hide");
  document.getElementById('js-nav-close').classList.remove("show");
  document.getElementById('js-nav-open').classList.add("show");
  document.getElementById('js-nav-open').classList.remove("hide");

  document.getElementById('content').classList.toggle("hide");
  // var menuButton= document.getElementById('js-nav-close');
  // menuButton.innerHTML = "About";
  document.getElementById('nav').classList.add("hide");
  document.getElementById('nav').classList.remove("show");
  var menuButton = document.getElementById('menu-button');
  menuButton.addEventListener("click", clickedMenuClose);
  // menuButton.classList.toggle("active");
}
function clickedMenuClose() {
  document.getElementById('about').classList.add("hide");
  document.getElementById('locations').classList.add("hide");
}

function clickedLocations(){
  document.getElementById('locations').classList.toggle("hide");

  document.getElementById('js-nav-close').classList.add("hide");
  document.getElementById('js-nav-close').classList.remove("show");
  document.getElementById('js-nav-open').classList.add("show");
  document.getElementById('js-nav-open').classList.remove("hide");

  document.getElementById('content').classList.toggle("hide");
  document.getElementById('nav').classList.add("hide");
  document.getElementById('nav').classList.remove("show");
  var menuButton = document.getElementById('menu-button');
  menuButton.addEventListener("click", clickedMenuClose);
}
//js for locations map
$(document).ready(function() {
  $("#map-container").bind('mousemove', function(e) {

    $(this).css({
      backgroundPosition: e.pageX + 'px ' + e.pageY + 'px'
    });

  });
});


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
  var minDistance = 5; // distance of x km
  scenes.forEach(item => {
    var dist = calcDistance(item.lng, item.lat, activeGPSlongitude, activeGPSlatitude);
    //console.log(dist +"=distance");
    if (dist < minDistance) {
      minDistance = dist;
      newScene = item;
      console.log(" yes");
    }
  });
  if (newScene) {
    if (currentScene.id != newScene.id) {
      currentScene = newScene;
      updateScene();
    }
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
  var sourceLinkAudio = "sound/" + currentScene.id + "/" + "1.mp3";
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
    console.log(matchyIndex);
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
