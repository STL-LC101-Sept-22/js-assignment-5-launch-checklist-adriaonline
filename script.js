// const {addDestinationInfo} = require("./scriptHelper");

window.addEventListener("load", function () {
    // console.log("is this working? script1");
    
    let listedPlanets;
    // Set listedPlanetsResponse equal to the value returned by calling myFetch()
    let listedPlanetsResponse = myFetch();
    
    listedPlanetsResponse.then(function (result) {
      listedPlanets = result;
      // console.log(listedPlanets);
        }).then(function () {
      
      // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
  
    let planet = pickPlanet(listedPlanets);
        addDestinationInfo(document, planet.name, planet.diameter, planet.star, planet.distance, planet.moons, planet.image); 
    }) 
  
    let list = document.getElementById("faultyItems");
    list.style.visibility = "hidden";
  
    let formSubmit = document.querySelector("form");
    formSubmit.addEventListener("submit", function(event) {
      event.preventDefault();
    
        let pilotInput = document.getElementById("pilotName").value;    
        let copilotInput = document.querySelector("input[name=copilotName]").value;    
        let fuelLevelInput = document.querySelector("input[name=fuelLevel]").value;    
        let cargoMassInput = document.querySelector("input[name=cargoMass]").value;
      
    formSubmission(document, list, pilotInput, copilotInput, fuelLevelInput, cargoMassInput);
  
    });
  
  });