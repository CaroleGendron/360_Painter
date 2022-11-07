const canvasSketch = require('canvas-sketch');
const Tweakpane = require('tweakpane');
const math = require("canvas-sketch-util/math") //for mapRange

const settings = {
  dimensions: [ 1080, 1080 ], //2 times insta
  animate: true, //to allow Tweakpane to work
};

//Setting Title Name
const country_name = "Europe"

//Default values Tweakpane
const params= {
  Population: 0, //'community' //density lines
  Land: 0, //'people look the same/int'//width
  Age: 0, //greyscale color
  Happiness: 0, //neat-blur
  CO2_Impact: 0, //blue
  Color: '#ff5c00',
  // title: '?',
}

//Variable setting random starting point the canvas
const variable = Math.floor(Math.random() * 10000);

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = '#F6F3E1'; //beige background canvas
    context.fillRect(0, 0, width, height);

    const Population = params.Population;
    const Land = params.Land;
    const Age = params.Age;
    const Happiness = params.Happiness;
    const CO2_Impact = params.CO2_Impact;
    const Color = params.Color;
    const title = params.title;

    // const India= {'Pop': 1400,'Land': 3,'Age': 28.7,'Happiness': 3.8,'CO2_Impact': 1.8}
    // const Black_Africa= {'Pop': 1100,'Land': 22,'Age': 20.4,'Happiness': 4.6,'CO2_Impact': 0.9}
    // const Arab_World= {'Pop': 1100,'Land': 19,'Age': 28.3,'Happiness': 5.2,'CO2_Impact': 6.6}
    // const Asia= {'Pop': 900,'Land': 7,'Age': 31.4,'Happiness': 5.5,'CO2_Impact': 4.6}
    // const Russia= {'Pop': 150,'Land': 16,'Age': 40.3,'Happiness': 5.5,'CO2_Impact': 11.8}
    // const China= {'Pop': 1400,'Land': 9,'Age': 42,'Happiness': 5.6,'CO2_Impact': 7.6}
    // const Latin_America= {'Pop': 700,'Land': 29,'Age': 32.2,'Happiness': 6.1,'CO2_Impact': 3.3}
    // const European_Union= {'Pop': 450,'Land': 4,'Age': 43,'Happiness': 6.6,'CO2_Impact': 6.2}
    const USA= {'Pop': 350,'Land': 9,'Age': 38.5,'Happiness': 7,'CO2_Impact': 14.7}

    // creation indicator list to be able to loop
    const indicator_list = ["Happiness","Land", "Age", "Population",  "CO2_Impact"];
    const indicator =  indicator_list[Math.floor(Math.random()*indicator_list.length)];//params.indic
    console.log("indicator", indicator)

const degToRad = (degrees) => {
  return degrees / 180 * Math.PI; //f_pop 1 DEFINITION DENTELLE. 1 TO 360
};

let newIndic;

if (indicator== "Happiness"){
  console.log("indic Happy* : ", Happiness)
  newIndic = Happiness ;
}
else if  (indicator== "Land"){
  console.log("indic Land*: ", Land)
  newIndic =Land;
}
else if  (indicator== "Age"){
  console.log("indic Age*: ", Age)
  newIndic =Age;
}
else if  (indicator== "Population"){
  console.log("indic Population*: ", Population)
  newIndic =Population;
}
else if  (indicator== "CO2_Impact"){
  console.log("indic CO2_Impact*: ",  CO2_Impact)
  newIndic = CO2_Impact;
}

else if  (indicator== "Color"){
  console.log("indic color*: ",  Color)
  newIndic = Color;
}

else if  (indicator== "title"){
  console.log("indic color*: ",  title)
  newIndic = title;
}

//scaling
const scaleAge=math.mapRange(Age, 20,50, 1, 230)
const scalePop=math.mapRange(Population, 0,1400, 1, 600)
const happyInverse =math.mapRange(Happiness, 3,7, 7, 3) //3.8
const scaleHappy=math.mapRange(happyInverse, 0,7, 0.007, 0.7)
const scaleCO2_Impact=math.mapRange(CO2_Impact, 0,14.7,  0.0003, 0.005)
const scaleLand=math.mapRange(Land, 0,29,  0.1, 0.6)
const colorRGB = `rgb(${scaleAge},${scaleAge},${scaleAge})`

//positioning
const cx = width /2;
const cy = height * 0.45;
const w = width * scaleCO2_Impact//0.0003; //0.01
const h = height * scaleLand //0.5; //0.1

let x,y;

const radius = width * scaleHappy/4 // from 0.1 to 1

for (let i =0; i <scalePop; i++){

  const slice = degToRad(360/scalePop);// 27 to 360 //work really well
  const angle = slice * i;

  x =cx  + radius * Math.sin(angle * Math.PI );//+ variable
  y = cy + radius * Math.cos(angle * Math.PI) ;

  context.save();
  context.translate(x,y);
  context.rotate(-angle );//+ variable
  context.shadowOffsetX = 10;
  context.shadowOffsetY = 10;
  context.shadowBlur =  CO2_Impact*10;//
  context.shadowColor = Color;

  context.beginPath();
  context.rect(-w * 1 ,- h , w , h);
  context.fillStyle = colorRGB//bleu klein Europe"#110BA6"//;
  context.fill();
  context.restore();
}
  //Function "centerX" to find center position x, automatically
  const centerX = (text) => {
  const metrics = context.measureText(text);
  const textWidth =  metrics.width;
  return (width/2) - (textWidth/2)
  };

  //Title cosmetics and center
  const input = `${country_name}`;
  // const input = `Europe : ${title}`;
  // const input = "Europe";
  context.fillStyle =  '#313131'; //color title
  context.font = "70px futura";
  const titleCenter = centerX(input);
  context.fillText(input, titleCenter, 1000);
  context.restore()

  //Title serie name + font
  const serie = "ⓒ HumAIn_Art" //"Variations of π (pi)"
  context.font = "20px futura";
  const serieCenter = centerX(serie)
  context.fillText(serie, serieCenter, 1050)
  context.restore()
  };
};

canvasSketch(sketch, settings);

const createPane = () => {
  const pane = new Tweakpane.Pane(); //create a new slider pane
  let folder;

  folder = pane.addFolder({ title : "Portray Europe with its data"});
  folder.addInput(params, 'CO2_Impact', { min: 0, max: 15 });
  folder.addInput(params, 'Population', { min: 0, max: 1400 });
  folder.addInput(params, 'Land', { min: 0, max: 29 });
  folder.addInput(params, 'Age', { min: 0, max: 43 });
  folder.addInput(params, 'Happiness', { min: 0, max: 10 });
  folder.addInput(params, 'Color');
};

createPane();
