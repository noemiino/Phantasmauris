var activeGPSlatitude = 0;
var activeGPSlongitude = 0;
var saveGPSlatitude = 0;
var saveGPSlongitude = 0;
var scenes = [];
var currentScene = { id: " " };


window.onload = function() {
  getLocation();
  getScenes();
  saveGPSlatitude = activeGPSlatitude;
  saveGPSlongitude = activeGPSlongitude
}

function getLocation() {
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
      console.log(d) // writes the array

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
    //console.log(activeGPSlatitude +"activeGPSlatitude");
    activeGPSlongitude = position.coords.longitude;
    //console.log(activeGPSlongitude +"activeGPSlongitude");
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
      //console.log(" yes");
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
  audio.play();
}
