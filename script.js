let colors = document.querySelectorAll('.colors')
let baseColors = document.querySelectorAll('.base-color > div')
let harmonyColorsPickers = document.querySelectorAll('.harmony-colors-value > div')
let baseColorPicker = document.querySelector('.base-color-value')
let activeBaseColor = document.querySelector('.active-base-color');


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
    let backColor = getComputedStyleSheet(element, "backgroundColor");
    const textArea = document.createElement('textarea');
    textArea.value = backColor;
    document.body.appendChild(textArea);
    textArea.focus()
    textArea.select()
    document.execCommand('copy');
    document.body.removeChild(textArea)
    
}

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

//Adds and remove the class active-base-color to highlight the color and changes the baseColorPicker background color
let classChanger = (e) => {
    baseColors.forEach((baseColor) => {
        baseColor.classList.remove('active-base-color');
    })
    e.target.classList.add('active-base-color');
    let backColor = getComputedStyleSheet(e.target, 'backgroundColor')
    baseColorPicker.style.backgroundColor = backColor
    backgroundColorValue(baseColorPicker, backColor)
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

//setting initial activeBaseColor background color to baseColorPicker
//setting initial activeBaseColor Background color value into hexadecimal string as innerText of the baseColorPicker
baseColorPicker.style.backgroundColor = getComputedStyleSheet(activeBaseColor, "backgroundColor");
backgroundColorValue(baseColorPicker, getComputedStyleSheet(activeBaseColor, "backgroundColor"))