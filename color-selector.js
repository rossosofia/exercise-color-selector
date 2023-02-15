"use strict"

window.addEventListener("DOMContentLoaded" , start);

function start(){
    console.log("START");
    addEventListeners();
    // THIIIIS DOESN't make SENSEEEE
    colorUpdate(input.value, input.value, rgb, hsl);
  }

function addEventListeners(){
  document.querySelector("input").addEventListener("input" , colorConvert);
}

function colorConvert(){
    // from mdn web docs: The value of an <input> element of type color is always a string which contains a 7-character string specifying an RGB color in hexadecimal format.
    // console.log("HEX: ", this.value);
    // use variables to store the rgb and hsl. Start from the HEX value to get RGB value, calling the function to convert
    let rgb = hexToRGB(this.value);
    // after you get RBG value, convert it in HSL
    let hsl = RGBtoHSL(rgb); //let hsl = RGBtoHSL(hexToRGB(this.value));
    // console.log(` RGB: , ${rgb.r}, ${rgb.g} , ${rgb.b}`);
    // console.log(`HSL: , ${hsl.h} , ${hsl.s}% , ${hsl.l}%`);
    //change element colours
    colorUpdate(this.value, this.value, rgb, hsl);
}

function colorUpdate(css, hex, rgb, hsl){
  // from exercise RandomBackgroundColor
  document.querySelector("div").style.backgroundColor = css;
  document.getElementById("hex").textContent = hex;
  document.getElementById("rgb").textContent = `RGB  | ${rgb.r} - ${rgb.g} - ${rgb.b}`;
  document.getElementById("hsl").textContent = `HSL | ${hsl.h}% - ${hsl.s}% - ${hsl.l}%`;
}



function hexToRGB(hexColor){
  // The parseInt() function parses a string argument and returns an integer of the specified radix. parseInt(string, radix). With substring we are collecting the 2 numbers at time from the HEX string and using them for the calculation
  const r = parseInt(hexColor.substring(1,3),16);
  const g = parseInt(hexColor.substring(3,5),16);
  const b = parseInt(hexColor.substring(5,7),16);
  //return (${r},${g},${b});
  return {r,g,b};
}

// function given in the assignment
function RGBtoHSL(rgb){
    let r = rgb.r;
    let g = rgb.g;
    let b = rgb.b;

    r /= 255;
    g /= 255;
    b /= 255;

let h, s, l;

const min = Math.min(r,g,b);
const max = Math.max(r,g,b);

if( max === min ) {
  h = 0;
} else
if (max === r) {
  h = 60 * (0 + (g - b) / (max - min) );
} else
if (max === g) {
  h = 60 * (2 + (b - r) / (max - min) );
} else
if (max === b) {
  h = 60 * (4 + (r - g) / (max - min) );
}

if (h < 0) {h = h + 360; }

l = (min + max) / 2;

if (max === 0 || min === 1 ) {
  s = 0;
} else {
  s = (max - l) / ( Math.min(l,1-l));
}
// multiply s and l by 100 to get the value in percent, rather than [0,1]
s *= 100;
l *= 100;
return {h: Math.floor(h) ,s: Math.floor(s),l: Math.floor(l)}
}

