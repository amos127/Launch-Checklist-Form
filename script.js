window.addEventListener("load", function() {
    let form = document.querySelector("form");
    form.reset();
    fetchPlanet();
    init();
 });

 function fetchPlanet() {
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
}

function init() {
    let form = document.querySelector("form");

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        let pilotName = document.querySelector("input[name=pilotName]");
        let copilotName = document.querySelector("input[name=copilotName]");
        let fuelLevel = document.querySelector("input[name=fuelLevel]");
        let cargoMass = document.querySelector("input[name=cargoMass]");
        let validString = /^[A-Za-z]+$/;

        if (pilotName.value === "" || copilotName.value === "" || fuelLevel.value === "" || cargoMass.value === "") {
            alert("All fields are required!");
        }
        if (validString.test(pilotName.value) === false) {
            alert("Please enter a valid pilot name.");
            pilotName.value = '';
        }
        if (validString.test(copilotName.value) === false) {
           alert("Please enter a valid co-pilot name.");
           copilotName.value = '';
        }
        if (isNaN(fuelLevel.value)) {
            alert("Fuel level must be a valid number.");
            fuelLevel.value = '';
        }
        if (isNaN(cargoMass.value)) {
            alert("Cargo mass must be a valid number.");
            cargoMass.value = '';
        }
        if (pilotName.value !== "" && copilotName.value !== "" && fuelLevel.value !== "" && cargoMass.value !== "") {
            updateLaunchStatus();
        } 
        
        function updateLaunchStatus() {
       
            let pilotStatus = document.getElementById("pilotStatus");
            let copilotStatus = document.getElementById("copilotStatus");
            let faultyItems = document.getElementById("faultyItems");
            let launchStatus = document.getElementById("launchStatus");
            let fuelStatus = document.getElementById("fuelStatus");
            let cargoStatus = document.getElementById("cargoStatus");
        
            if (fuelLevel.value < 10000 && cargoMass.value > 10000) {
                fuelStatus.innerHTML = `Fuel level too low for launch. Must be at least 10,000 liters.`;
                cargoStatus.innerHTML = `Cargo mass too high for launch. Must be at or under 10,000 kilograms.`;
            }
            if (fuelLevel.value < 10000 && cargoMass.value < 10000) {
                fuelStatus.innerHTML = `Fuel level too low for launch. Must be at least 10,000 liters.`;
                cargoStatus.innerHTML = `Cargo mass low enough for launch.`;
            }
            if (fuelLevel.value > 9999 && cargoMass.value > 10000) {
                cargoStatus.innerHTML = `Cargo mass too high for launch. Must be at or under 10,000 kilograms.`;
                fuelStatus.innerHTML = `Fuel level high enough for launch.`;
            }
            if (fuelLevel.value > 9999 && cargoMass.value < 10001) {
                launchStatus.innerHTML = `Shuttle is ready for launch`;
                fuelStatus.innerHTML = `Fuel level high enough for launch.`;
                cargoStatus.innerHTML = `Cargo mass low enough for launch.`;
                launchStatus.style.color = 'green';
            }
            launchStatus.innerHTML = `Shuttle not ready for launch`;
            launchStatus.style.color = 'red';
            faultyItems.style.visibility = 'visible';
            pilotStatus.innerHTML = `Pilot ${pilotName.value} is ready for launch.`;
            copilotStatus.innerHTML = `Co-pilot ${copilotName.value} is ready for launch.`;
        }
    });
}

