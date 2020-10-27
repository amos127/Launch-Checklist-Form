// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
window.addEventListener("load", function() {
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
      response.json().then( function(json) {
         const missionTarget = document.getElementById("missionTarget");
         let i = Math.floor(Math.random() * json.length);
         missionTarget.innerHTML = `
            <h2>Mission Destination</h2>
            <ul>
               <li>Name: ${json[i].name}</li>
               <li>Diameter: ${json[i].diameter}</li>
               <li>Star: ${json[i].star}</li>
               <li>Distance from Earth: ${json[i].distance}</li>
               <li>Number of Moons: ${json[i].moons}</li>
            </ul><br/>
            <img src="${json[i].image}">
         `;
      });
   });

   let form = document.querySelector("form");
   form.addEventListener("submit", function(event) {
      event.preventDefault();
      let pilotName = document.querySelector("input[name=pilotName]");
      let copilotName = document.querySelector("input[name=copilotName]");
      let fuelLevel = document.querySelector("input[name=fuelLevel]");
      let cargoMass = document.querySelector("input[name=cargoMass]");
      if (pilotName.value === "" || copilotName.value === "" || fuelLevel.value === "" || cargoMass.value === "") {
         window.alert("All fields are required!");
      }
      if (isNaN(fuelLevel.value)) {
         window.alert("Fuel level must be a valid number.");
      }
      if (isNaN(cargoMass.value)) {
         window.alert("Cargo mass must be a valid number.");
      }
      
      let updatePilotStatus = document.getElementById("pilotStatus");
      updatePilotStatus.innerHTML = `Pilot ${pilotName.value} is ready for launch`;
      let updatecopilotStatus = document.getElementById("copilotStatus");
      updatecopilotStatus.innerHTML = `Co-pilot ${copilotName.value} is ready for launch`;

      let updateFaultyItems = document.getElementById("faultyItems");
      let launchStatus = document.getElementById("launchStatus");
      let lowFuel = document.getElementById("fuelStatus");
      let cargoStatus = document.getElementById("cargoStatus");
      if (fuelLevel.value < 10000) {
         updateFaultyItems.style.visibility = 'visible';
         lowFuel.innerHTML = `Fuel level too low for launch`;
         launchStatus.innerHTML = `Shuttle not ready for launch`;
         launchStatus.style.color = 'red';
      }
      if (fuelLevel.value < 10000 && cargoMass.value < 10001) {
         updateFaultyItems.style.visibility = 'visible';
         lowFuel.innerHTML = `Fuel level too low for launch`;
         cargoStatus.innerHTML = `Cargo mass low enough for launch`;
         launchStatus.innerHTML = `Shuttle not ready for launch`;
         launchStatus.style.color = 'red';
      }

      if (cargoMass.value > 10000) {
         updateFaultyItems.style.visibility = 'visible';
         cargoStatus.innerHTML = `Cargo mass too high for launch`;
         launchStatus.innerHTML = `Shuttle not ready for launch`;
         launchStatus.style.color = 'red';
      }

      if (cargoMass.value > 10000 && fuelLevel.value > 9999) {
         updateFaultyItems.style.visibility = 'visible';
         lowFuel.innerHTML = `Fuel level high enough for launch`;
         cargoStatus.innerHTML = `Cargo mass too high for launch`;
         launchStatus.innerHTML = `Shuttle not ready for launch`;
         launchStatus.style.color = 'red';
      }

      if (pilotName.value !== "" && copilotName.value !== "" && fuelLevel.value > 9999 && cargoMass.value < 10001) {
         launchStatus.innerHTML = `Shuttle is ready for launch`;
         launchStatus.style.color = 'green';
         updateFaultyItems.style.visibility = 'hidden';
      }
   });
});
