require("isomorphic-fetch");

function addDestinationInfo(
  document,
  name,
  diameter,
  star,
  distance,
  moons,
  imageUrl
) {
  // Here is the HTML formatting for our mission target div.
  let missionTarget = document.getElementById("missionTarget");
  missionTarget.innerHTML = `
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${imageUrl}">
                `;
}

function validateInput(testInput) {
  if (testInput === "") {
    return "Empty";
  }
  let number = Number(testInput);
  if (isNaN(number)) {
    return "Not a Number";
  } else {
    return "Is a Number";
  }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoMass) {
  if (
    validateInput(pilot) === "Empty" ||
    validateInput(copilot) === "Empty" ||
    validateInput(fuelLevel) === "Empty" ||
    validateInput(cargoMass) === "Empty"
  ) {
    alert("All fields are required!");
    // console.log("is this working? validate empty");
    return;
  }

  if (
    validateInput(pilot) === "Is a Number" ||
    validateInput(copilot) === "Is a Number" ||
    validateInput(fuelLevel) === "Not a Number" ||
    validateInput(cargoMass) === "Not a Number"
  ) {
    alert("Please enter valid information.");
    // console.log("is this working? validate numbers");
    return;
  }

  let launchStatus = document.getElementById("launchStatus");
  let pilotStatus = document.getElementById("pilotStatus");
  let copilotStatus = document.getElementById("copilotStatus");
  let fuelStatus = document.getElementById("fuelStatus");
  let cargoStatus = document.getElementById("cargoStatus");

  list.style.visibility = "visible";

  pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
  copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;

  if (fuelLevel < 10000) {
    launchStatus.style.color = "rgb(199, 37, 78)";
    launchStatus.innerHTML = "Shuttle Not Ready for Launch";
    fuelStatus.style.color = "rgb(199, 37, 78)";
    fuelStatus.innerHTML = "Fuel level too low for launch";
    return;
  } else {
    fuelStatus.innerHTML = "Fuel level high enough for launch";
  }

  if (cargoMass > 10000) {
    launchStatus.style.color = "rgb(199, 37, 78)";
    launchStatus.innerHTML = "Shuttle Not Ready for Launch";
    cargoStatus.style.color = "rgb(199, 37, 78)";
    cargoStatus.innerHTML = "Cargo mass too heavy for launch";
    return;
  } else {
    cargoStatus.innerHTML = "Cargo mass low enough for launch";
  }

  launchStatus.style.color = "rgb(65, 159, 106)";
  launchStatus.innerHTML = "Shuttle is Ready for Launch";
}

async function myFetch() {
  let planetsReturned;
  planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
    return response.json();
  });
  return planetsReturned;
}

function pickPlanet(planets) {
  let visitRandoPlanet = Math.floor(Math.random() * planets.length);
  return planets[visitRandoPlanet];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;
