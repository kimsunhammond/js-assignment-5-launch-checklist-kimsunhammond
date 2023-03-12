// Write your helper functions here!
require('isomorphic-fetch');

let pilot = document.getElementById("pilotName");
let copilot = document.getElementById("copilotName");
let fuel = document.getElementById(Number("fuelLevel"));
let cargoMass = document.getElementById(Number("cargoMass"));
let form = document.getElementById("launchForm");
let status = document.getElementById("launchStatus");
let faultyItems = document.getElementById("faultyItems");
let missionTarget = document.getElementById("missionTarget");

function addDestinationInfo(document, name, diameter, star, distance, moons, image) { 
    // Here is the HTML formatting for our mission target div.

 missionTarget.innerHTML = `<h2>Mission Destination</h2>
                <ol>
                    <li>Name: </li>
                    <li>Diameter: </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: </li>
                    <li>Number of Moons: </li>
                </ol>
                <img src="">`

}

function validateInput(testInput) {
    const inputNum = Number(testInput);
    if (testInput === "") {
        return "Empty";
    }
    else if (isNaN(inputNum)) {
        return "Not a number";
    }
    else if (!isNaN(inputNum)) {
        return "Is a number"
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");
    let launchStatus = document.getElementById("launchStatus");
    if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel) === "Empty") {
        alert("All fields are required!"); 
    }   else if (validateInput(pilot) === "Is a number" || validateInput(copilot) === "Is a number" || validateInput(fuelLevel) === "Not a number" || validateInput(cargoLevel) === "Not a number") {
        alert("Make sure to enter valid information for each field!");
    }   else {
            pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
            copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
            list.style.visibility = "visible";
        if (fuelLevel < 10000 && cargoLevel < 10000) {
            fuelStatus.innerHTML = "Fuel level too low for launch";
            cargoStatus.innerHTML = "Cargo mass low enough for launch";
            launchStatus.innerHTML = "Shuttle Not Ready for Launch";
            launchStatus.style.color = "red";
            
        } else if (fuelLevel > 10000 && cargoLevel > 10000) {
            fuelStatus.innerHTML = "Fuel level high enough for launch";
            cargoStatus.innerHTML = "Cargo mass too heavy for launch";
            launchStatus.innerHTML = "Shuttle Not Ready for Launch";
            launchStatus.style.color = "red";
        } else if (fuelLevel < 10000 && cargoLevel > 10000) {
            fuelStatus.innerHTML = "Fuel level too low for launch";
            cargoStatus.innerHTML = "Cargo mass too heavy for launch";
            launchStatus.innerHTML = "Shuttle Not Ready for Launch";
            launchStatus.style.color = "red";

        } else {
            fuelStatus.innerHTML = "Fuel level high enough for launch";
            cargoStatus.innerHTML = "Cargo mass low enough for launch";
            launchStatus.innerHTML = "Shuttle is Ready for Launch";
            launchStatus.style.color = "green";
        }
    }
}


async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
      return response.json()
        });

    return planetsReturned;
}

function pickPlanet(planets) {
        let index = Math.floor(Math.random()*planets.length);
        return planets[index];
}




module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
