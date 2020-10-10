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
let activeHarmonyRuleElementName = document.querySelector('.harmony-rules-values__name')
let harmonyRulesContainer = document.querySelector('.harmony-rules-values')
let updatedColor = []

let complimentaryElement = document.querySelectorAll('.complementary > div')
let splitComplimentaryElement = document.querySelectorAll('.split-complementary > div')
let analogousElement = document.querySelectorAll('.analogous > div')
let monochromaticElement = document.querySelectorAll('.monochromatic > div')
let shadesElement = document.querySelectorAll('.shades > div')
let triadElement = document.querySelectorAll('.triad > div')
let tetradElement = document.querySelectorAll('.tetrad > div')
let compoundElement = document.querySelectorAll('.compound > div')
let highContrastElement = document.querySelectorAll('.high-contrast > div')
let pentagramElement = document.querySelectorAll('.pentagram > div')


//drop down harmony rules event handler
let dropDownMainContainerHandler = (e) => {
    dropDownArrow.classList.toggle('drop-down-arrow-animation')
    dropDownSlider.classList.toggle('drop-down-animation')
}
//event listener for drop down harmony rules
dropDownMainContainer.addEventListener('click', dropDownMainContainerHandler)

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

//fills the harmony rules with colors
let assignHarmonyRules = (activeColor) => {

    let rawHSL = rgbToHsl(activeColor);
    let rawRGB = activeColor.slice(4,-1).split(",");
    complementaryColor(rawRGB);
    splitComplementaryColors(rawHSL);
    analogousColors(rawHSL)
    monochromaticColors(rawHSL)
    shadesColors(rawHSL)
    triadColors(rawHSL)
    tetradColors(rawHSL)
    // compoundColors()
    // highContrastColors()
    pentagramColors(rawHSL)

    switch(harmonyRulesContainer.id) {
        case 'complementary':
            for( let i=0; i<complimentaryElement.length; i++) {
                activeHarmonyRuleElement[i].style.visibility = 'visible'
                let backColor = getComputedStyleSheet(complimentaryElement[i], 'background-color');
                activeHarmonyRuleElement[i].style.backgroundColor = backColor;

                harmonyColorsPickers[i].style.visibility = 'visible'
                harmonyColorsPickers[i].style.backgroundColor = backColor;
                harmonyColorsPickers[i].innerText = rgbToHex(backColor)
            }
        break;
        case 'splitComplementary':
            for( let i=0; i<splitComplimentaryElement.length; i++) {
                activeHarmonyRuleElement[i].style.visibility = 'visible'
                let backColor = getComputedStyleSheet(splitComplimentaryElement[i], 'background-color');
                activeHarmonyRuleElement[i].style.backgroundColor = backColor;

                harmonyColorsPickers[i].style.visibility = 'visible'
                harmonyColorsPickers[i].style.backgroundColor = backColor;
                harmonyColorsPickers[i].innerText = rgbToHex(backColor)
            }
        break;

        case 'analogous':
            for( let i=0; i<analogousElement.length; i++) {
                activeHarmonyRuleElement[i].style.visibility = 'visible'
                let backColor = getComputedStyleSheet(analogousElement[i], 'background-color');
                activeHarmonyRuleElement[i].style.backgroundColor = backColor;

                harmonyColorsPickers[i].style.visibility = 'visible'
                harmonyColorsPickers[i].style.backgroundColor = backColor;
                harmonyColorsPickers[i].innerText = rgbToHex(backColor)
            }
        break;

        case 'monochromatic':
            for( let i=0; i<monochromaticElement.length; i++) {
                activeHarmonyRuleElement[i].style.visibility = 'visible'
                let backColor = getComputedStyleSheet(monochromaticElement[i], 'background-color');
                activeHarmonyRuleElement[i].style.backgroundColor = backColor;

                harmonyColorsPickers[i].style.visibility = 'visible'
                harmonyColorsPickers[i].style.backgroundColor = backColor;
                harmonyColorsPickers[i].innerText = rgbToHex(backColor)
            }
        break;

        case 'shades':
            for( let i=0; i<shadesElement.length; i++) {
                activeHarmonyRuleElement[i].style.visibility = 'visible'
                let backColor = getComputedStyleSheet(shadesElement[i], 'background-color');
                activeHarmonyRuleElement[i].style.backgroundColor = backColor;

                harmonyColorsPickers[i].style.visibility = 'visible'
                harmonyColorsPickers[i].style.backgroundColor = backColor;
                harmonyColorsPickers[i].innerText = rgbToHex(backColor)
            }
        break;
        case 'triad':
            for( let i=0; i<triadElement.length; i++) {
                activeHarmonyRuleElement[i].style.visibility = 'visible'
                let backColor = getComputedStyleSheet(triadElement[i], 'background-color');
                activeHarmonyRuleElement[i].style.backgroundColor = backColor;

                harmonyColorsPickers[i].style.visibility = 'visible'
                harmonyColorsPickers[i].style.backgroundColor = backColor;
                harmonyColorsPickers[i].innerText = rgbToHex(backColor)
                console.log('pop')
            }
        break;
        case 'tetrad':
            for( let i=0; i<tetradElement.length; i++) {
                activeHarmonyRuleElement[i].style.visibility = 'visible'
                let backColor = getComputedStyleSheet(tetradElement[i], 'background-color');
                activeHarmonyRuleElement[i].style.backgroundColor = backColor;

                harmonyColorsPickers[i].style.visibility = 'visible'
                harmonyColorsPickers[i].style.backgroundColor = backColor;
                harmonyColorsPickers[i].innerText = rgbToHex(backColor)
            }
        break;
        case 'pentagram':
            for( let i=0; i<pentagramElement.length; i++) {
                activeHarmonyRuleElement[i].style.visibility = 'visible'
                let backColor = getComputedStyleSheet(pentagramElement[i], 'background-color');
                activeHarmonyRuleElement[i].style.backgroundColor = backColor;

                harmonyColorsPickers[i].style.visibility = 'visible'
                harmonyColorsPickers[i].style.backgroundColor = backColor;
                harmonyColorsPickers[i].innerText = rgbToHex(backColor)
            }
        break;
    }

}

//complementary color function
let complementaryColor = (rgbColor) => {

    let color = [];
    color = rgbColor.map((color) => {
        return 255 - color
    })
    complimentaryElement[0].style.backgroundColor = `rgb(${color[0]},${color[1]},${color[2]})`
    complimentaryElement[0].setAttribute('title', `rgb(${color[0]},${color[1]},${color[2]})`)
}

//splitComplimentary colors function
let splitComplementaryColors = (hslColor) => {
    let color = [];

    color.push(hslColor[0] + 150 - 360);
    color.push(hslColor[0] + 210 - 360);

    let backColor = color.map((c)=> {
        return `hsl(${c}, ${hslColor[1]}%, ${hslColor[2]}%)`
    })

    for(let i=0; i < backColor.length; i++) {
        splitComplimentaryElement[i].style.backgroundColor = backColor[i];
        splitComplimentaryElement[i].setAttribute('title', getComputedStyleSheet(splitComplimentaryElement[i], 'background-color'))
    }
}

//analogous colors function
let analogousColors = (hslColor) => {
    let color = [];

    color.push(hslColor[0] + 30 - 360);
    color.push(hslColor[0] + 60 - 360);
    color.push(hslColor[0] + 90 - 360);

    let backColor = color.map((c)=> {
        return `hsl(${c}, ${hslColor[1]}%, ${hslColor[2]}%)`
    })

    for(let i=0; i < backColor.length; i++) {
        analogousElement[i].style.backgroundColor = backColor[i];
        analogousElement[i].setAttribute('title', getComputedStyleSheet(analogousElement[i], 'background-color'))
    }
}

//monochromatic colors function
let monochromaticColors = (hslColor) => {
    let color = [];

    for(let i=90; i>0; i=i-25) {
        color.push(`hsl(${hslColor[0]}, ${i}%, ${hslColor[2]}%)`)
    }

    for(let i=0; i < color.length; i++) {
        monochromaticElement[i].style.backgroundColor = color[i];
        monochromaticElement[i].setAttribute('title', getComputedStyleSheet(monochromaticElement[i], 'background-color'))
    }
}

//shades colors function
let shadesColors = (hslColor) => {
    let color = [];

    for(let i=90; i>0; i=i-25) {
        color.push(`hsl(${hslColor[0]}, ${hslColor[1]}%, ${i}%)`)
    }

    for(let i=0; i < color.length; i++) {
        shadesElement[i].style.backgroundColor = color[i];
        shadesElement[i].setAttribute('title', getComputedStyleSheet(shadesElement[i], 'background-color'))
    }
}

//triad colors function
let triadColors = (hslColor) => {
    let color = [];

    color.push(hslColor[0] + 120 - 360);
    color.push(hslColor[0] + 240 - 360);

    let backColor = color.map((c)=> {
        return `hsl(${c}, ${hslColor[1]}%, ${hslColor[2]}%)`
    })

    for(let i=0; i < backColor.length; i++) {
        triadElement[i].style.backgroundColor = backColor[i];
        triadElement[i].setAttribute('title', getComputedStyleSheet(triadElement[i], 'background-color'))
    }
}

//tetrad colors function
let tetradColors = (hslColor) => {
    let color = [];

    color.push(hslColor[0] + 90 - 360);
    color.push(hslColor[0] + 180 - 360);
    color.push(hslColor[0] + 270 - 360);

    let backColor = color.map((c)=> {
        return `hsl(${c}, ${hslColor[1]}%, ${hslColor[2]}%)`
    })

    for(let i=0; i < backColor.length; i++) {
        tetradElement[i].style.backgroundColor = backColor[i];
        tetradElement[i].setAttribute('title', getComputedStyleSheet(tetradElement[i], 'background-color'))
    }
}

//pentagram colors function
let pentagramColors = (hslColor) => {
    let color = [];
    let h = hslColor[0];

    for (let i=0; i<5; i++) {
        color.push(h)
        h = h + 72 -360;
        console.log(h)
    }

    let backColor = color.map((c)=> {
        return `hsl(${c}, ${hslColor[1]}%, ${hslColor[2]}%)`
    })

    for(let i=0; i < backColor.length; i++) {
        pentagramElement[i].style.backgroundColor = backColor[i];
        pentagramElement[i].setAttribute('title', getComputedStyleSheet(pentagramElement[i], 'background-color'))
    }
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

//Event listener on the harmonyColorsPickers for copying the color when clicked
harmonyColorsPickers.forEach((harmonyColorsPicker) => {
    harmonyColorsPicker.addEventListener('click', (e)=> {
        colorCopier(e.target);
    })
})

//event listener on the dropDownOptions it also selects what to show on harmony color elements and updates the color value in the copied value elements
dropDownOptions.forEach((dropDownOption) => {
    dropDownOption.addEventListener('click', (e) => {
        let firstChild = e.currentTarget.firstElementChild
        let childrenFirst = firstChild.children
        let lastChild = e.currentTarget.lastElementChild

        //sets visibility to visible according to length of children of firt child
        //and also sets the color accordingly
        for(let i=0; i<childrenFirst.length; i++) {
            activeHarmonyRuleElement[i].style.visibility = 'visible'
            let backColor = getComputedStyleSheet(childrenFirst[i], 'background-color');
            // activeHarmonyRuleElement[i].setAttribute('title', backColor)
            activeHarmonyRuleElement[i].style.backgroundColor = backColor;
            activeHarmonyRuleElement[i].setAttribute('title', backColor)
            harmonyColorsPickers[i].style.visibility = 'visible'
            harmonyColorsPickers[i].style.backgroundColor = backColor;
        }

        console.log(firstChild.id)
        harmonyRulesContainer.id = firstChild.id

        //sets the visibility to hidden of the unused elements in active harmony values
        for(let i=4; i>=childrenFirst.length; i--) {
            activeHarmonyRuleElement[i].style.visibility = 'hidden'
            harmonyColorsPickers[i].style.visibility = 'hidden'
        }
        activeHarmonyRuleElementName.innerText = lastChild.innerText;
        activeBaseColor = document.querySelector('.active-base-color');
        assignHarmonyRules(getComputedStyleSheet(activeBaseColor, "backgroundColor"))
        dropDownMainContainerHandler()
    })
})

//setting initial activeBaseColor background color to baseColorPicker
//setting initial activeBaseColor Background color value into hexadecimal string as innerText of the baseColorPicker
baseColorPicker.style.backgroundColor = getComputedStyleSheet(activeBaseColor, "backgroundColor");
backgroundColorValue(baseColorPicker, getComputedStyleSheet(activeBaseColor, "backgroundColor"))
//setting initial active harmony rule to copied value and the the harmony rule element
assignHarmonyRules(getComputedStyleSheet(activeBaseColor, "backgroundColor"))
activeHarmonyRuleElement[0].setAttribute('title', getComputedStyleSheet(activeBaseColor, "backgroundColor"))