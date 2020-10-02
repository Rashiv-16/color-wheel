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

//setting initial activeBaseColor background color to baseColorPicker
baseColorPicker.style.backgroundColor = getComputedStyleSheet(activeBaseColor, "backgroundColor")

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

//Adds and remove the class active-base-color to highlight the color and changes the baseColorPicker background color
let classChanger = (e) => {
    baseColors.forEach((baseColor) => {
        baseColor.classList.remove('active-base-color');
    })
    e.target.classList.add('active-base-color');
    let backColor = getComputedStyleSheet(e.target, 'backgroundColor')
    baseColorPicker.style.backgroundColor = backColor

}

//Event listener on all the base colors
baseColors.forEach((baseColor) => {
    baseColor.addEventListener('click', classChanger)
})

//setting title attribute on baseColors with their respective rgb color values
colors.forEach((color)=> {
    colorTeller(color)

})

baseColorPicker.addEventListener('click', (e) => {
    colorCopier(e.target);
})


// colorTeller(color)