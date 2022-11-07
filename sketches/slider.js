//TODO : change ''population' for 'community'
const Tweakpane = require('tweakpane');
const math = require("canvas-sketch-util/math") //for mapRange


const params= {
  Population: "in million people" , //'community' //density lines
  Land: "in million Km2", //width, spread
  Age: "in years", //greyscale color from black (younger age) to grey (older)
  Happiness: "ratio from 1 to 10", //
  CO2_Impact: "in tons per person", //orange smoke per default
  title: 'type a title', //
}
const createPane = () => {
  const pane = new Tweakpane.Pane(); //create a new slider pane
  let folder;

  folder = pane.addFolder({ title : "About the indicators >>",  expanded: false,});

  folder.addInput(params, 'CO2_Impact', { min: 0, max: 15 });
  folder.addInput(params, 'Population', { min: 150, max: 1400 });
  folder.addInput(params, 'Land', { min: 3, max: 29 });
  folder.addInput(params, 'Age', { min: 20.4, max: 43 });
  folder.addInput(params, 'Happiness', { min: 3.8, max: 7 });


};

createPane();
