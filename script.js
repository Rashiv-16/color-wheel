let colors = document.querySelectorAll('.colors')
let baseColors = document.querySelectorAll('.base-color > div')
let harmonyColorsPickers = document.querySelectorAll('.harmony-colors-value > div')
let baseColorPicker = document.querySelector('.base-color-value')
let activeBaseColor = document.querySelector('.active-base-color');
let dropDownArrow = document.querySelector('.down-key')
let dropDownMainContainer = document.querySelector('.harmony-rules')
let dropDownSlider = document.querySelector('.drop-down')
let dropDownOptions = document.querySelectorAll('.drop-down > div')
let activeHarmonyRuleElement = document.querySelectorAll('.active-harmony-rule > div')

//event listener for drop down harmony rules
dropDownMainContainer.addEventListener('click', (e) => {
    dropDownArrow.classList.toggle('drop-down-arrow-animation')
    dropDownSlider.classList.toggle('drop-down-animation')
})

//get computed style of the element with the specific property
let getComputedStyleSheet = (element, property) => {
    let styleComputed = getComputedStyle(element, property);
    return styleComputed[property]
}

//Puts value of the color from the computedStyle to the element attribute title
let colorTeller = (element) => {
    let backColor = getComputedStyleSheet(element, 'backgroundColor')
    element.setAttribute('title', backColor)
}

//Copies the colors on single click
let colorCopier = (element) => {
    let colorValue = element.innerText
    const textArea = document.createElement('textarea');
    textArea.value = colorValue;
    document.body.appendChild(textArea);
    textArea.focus()
    textArea.select()
    document.execCommand('copy');
    document.body.removeChild(textArea)
    
}

//function to convert rgb to hsl
let rgbToHsl = (rgbValue) => {
    let rgbBuffer = [];
    rgbBuffer = rgbValue.slice(4,-1).split(",");
    let r = Number(rgbBuffer[0])/255;
    let g = Number(rgbBuffer[1])/255;
    let b = Number(rgbBuffer[2])/255;
    let s = 0;
    let h = 0;
    let max = Math.max(r,g,b);
    let min = Math.min(r,g,b);

    //Luminance
    let l = (max+min)/2;
    let L = Math.round(l * 100);

    //Saturation
    if(min !== max) {
        if(l <= 0.5) s=(max-min)/(max+min);
        else s=(max-min)/(2.0-max-min);
    }
    let S = Math.round(s * 100);

    //Hue
    if( r === max) h= (g-b)/(max-min);
    else if (g === max) h = 2.0 + (b-r)/(max-min);
    else h=4.0 + (r-g)/(max-min);
    let H = Math.round(h * 60);
    if(H < 0) H = H + 360;

    return [H,S,L]
}
let hsl = rgbToHsl('rgb(24,98,118)')

//function to convert the rgb value into hex
let rgbToHex = (rgbValue) => {
    let rgbBuffer = [];
    let hex = "#";
    rgbBuffer = rgbValue.slice(4,-1).split(",");
    rgbBuffer.forEach((rgb) => {
        //Number converts the string data type rgb to Number
        //toString(16) then convert that Number into hexadecimal string
        //it also checks if the converted hex code is smaller than two digits
        //if it is smaller then it will use padStart with target string length of two length and padding it with zero
        hex = hex + (Number(rgb).toString(16).length < 2 ? Number(rgb).toString(16).padStart(2,0) : Number(rgb).toString(16))

    })
    return hex;
}

//puts the value of the background as the innerText in the element 
let backgroundColorValue = (element, rgbValue) => {
    element.innerText = rgbToHex(rgbValue);
}

//
let assignHarmonyRules = (activeColor) => {

    let rawHSL = rgbToHsl(activeColor);
    let rawRGB = activeColor.slice(4,-1).split(",");
    complimentaryColor(rawRGB);
    splitComplimentary(rawRGB)



}

//complementary color function
let complimentaryColor = (rgbColor) => {
    let complimentaryElement = document.querySelector('.complementary-one > div')

    let color = [];
    color = rgbColor.map((color) => {
        return 255 - color
    })
    complimentaryElement.style.backgroundColor = `rgb(${color[0]},${color[1]},${color[2]})`
}

//splitComplimentary colors function
let splitComplimentary = (rgbColor) => {

}

//Adds and remove the class active-base-color to highlight the color and changes the baseColorPicker background color
let classChanger = (e) => {
    baseColors.forEach((baseColor) => {
        baseColor.classList.remove('active-base-color');
    })
    e.target.classList.add('active-base-color');
    let backColor = getComputedStyleSheet(e.target, 'backgroundColor')
    baseColorPicker.style.backgroundColor = backColor
    backgroundColorValue(baseColorPicker, backColor)
    assignHarmonyRules(backColor)
}

//Event listener on all the base colors
baseColors.forEach((baseColor) => {
    baseColor.addEventListener('click', classChanger)
})

//setting title attribute on baseColors with their respective rgb color values
colors.forEach((color)=> {
    colorTeller(color)
})

//Event listener on the baseColorPicker for copying the color when clicked
baseColorPicker.addEventListener('click', (e) => {
    colorCopier(e.target);
})

dropDownOptions.forEach((dropDownOption) => {
    dropDownOption.addEventListener('click', (e) => {
        console.log(e.currentTarget.firstElementChild.children)
    })
})

//setting initial activeBaseColor background color to baseColorPicker
//setting initial activeBaseColor Background color value into hexadecimal string as innerText of the baseColorPicker
baseColorPicker.style.backgroundColor = getComputedStyleSheet(activeBaseColor, "backgroundColor");
backgroundColorValue(baseColorPicker, getComputedStyleSheet(activeBaseColor, "backgroundColor"))