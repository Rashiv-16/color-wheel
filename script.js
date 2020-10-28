let colors = document.querySelectorAll('.colors')
let baseColorContainer = document.querySelector('.base-color')
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

let colorSystemButton = document.querySelector('.color-system-button')
let colorSystem = document.querySelector('.color-system')

let firstSliderR = document.getElementById('first-slider-r')
let secondSliderG = document.getElementById('second-slider-g')
let thirdSliderB = document.getElementById('third-slider-b')

let firstValueR = document.getElementById('first-value-r')
let secondValueG = document.getElementById('second-value-g')
let thirdValueB = document.getElementById('third-value-b')

let firstSliderH = document.getElementById('first-slider-h')
let secondSliderS = document.getElementById('second-slider-s')
let thirdSliderL = document.getElementById('third-slider-l')

let firstValueH = document.getElementById('first-value-h')
let secondValueS = document.getElementById('second-value-s')
let thirdValueL = document.getElementById('third-value-l')

let hexValue = document.getElementById('hex-value')

let selectedValue = document.querySelector('.selected-color > div')


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
    textArea.style.position = "fixed"
    textArea.style.top = "50%"
    textArea.focus()
    textArea.select()
    document.execCommand('copy');
    document.body.removeChild(textArea)
    copied()
}

//function to convert rgb to hsl
let rgbToHsl = (rgbValue) => {
    let rgbBuffer = [];
    rgbBuffer = rgbValue.slice(4,-1).split(",");
    let r = Number(rgbBuffer[0])/255;
    let g = Number(rgbBuffer[1].slice(1))/255;
    let b = Number(rgbBuffer[2].slice(1))/255;
    let s = 0;
    let h = 0;
    let l = 0
    let H = 0
    let S = 0
    let L = 0
    let max = Math.max(r,g,b);
    let min = Math.min(r,g,b);

    if (r === g && g === b && b === r) {
        l = (max+min)/2;
        L = Math.round(l * 100);
    } else {
        //Luminance
        l = (max+min)/2;
        L = Math.round(l * 100);

        //Saturation
        if(min !== max) {
            if(l <= 0.5) s=(max-min)/(max+min);
            else s=(max-min)/(2.0-max-min);
        }
        S = Math.round(s * 100);

        //Hue
        if( r === max) h= (g-b)/(max-min);
        else if (g === max) h = 2.0 + (b-r)/(max-min);
        else h=4.0 + (r-g)/(max-min);
        H = Math.round(h * 60);
        if(H < 0) H = H + 360;
    }

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
    pentagramColors(rawHSL)

    switch(harmonyRulesContainer.id) {
        case 'complementary':
            for( let i=0; i<complimentaryElement.length; i++) {
                activeHarmonyRuleElement[i].style.visibility = 'visible'
                let backColor = getComputedStyleSheet(complimentaryElement[i], 'background-color');
                activeHarmonyRuleElement[i].style.backgroundColor = backColor;
                activeHarmonyRuleElement[i].setAttribute('title', backColor);

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
                activeHarmonyRuleElement[i].setAttribute('title', backColor);

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
                activeHarmonyRuleElement[i].setAttribute('title', backColor);

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
                activeHarmonyRuleElement[i].setAttribute('title', backColor);

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
                activeHarmonyRuleElement[i].setAttribute('title', backColor);

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
                activeHarmonyRuleElement[i].setAttribute('title', backColor);

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
                activeHarmonyRuleElement[i].setAttribute('title', backColor);

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
                activeHarmonyRuleElement[i].setAttribute('title', backColor);

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

let system = "RGB"
let rgbElements = document.querySelectorAll('.RGB')
let hslElements = document.querySelectorAll('.HSL')

//Color System Button Eventt Listeners
colorSystemButton.addEventListener('click', (e) => {
    e.stopPropagation()

    colorSystem.classList.add('color-system-open');
})

colorSystem.addEventListener('click', (e) => {
    e.stopPropagation()
    if (e.target.id === 'RGB') {
        system = 'RGB'
        rgbElements.forEach((rgbElement) => {
            rgbElement.style.display = 'flex'
        })
        hslElements.forEach((hslElement) => {
            hslElement.style.display = 'none'
        })
    } else {
        system = 'HSL'
        rgbElements.forEach((rgbElement) => {
            rgbElement.style.display = 'none'
        })
        hslElements.forEach((hslElement) => {
            hslElement.style.display = 'flex'
        })
    }
    colorSystem.classList.remove('color-system-open');
}, false)

////////////////////////////////RGB SYSTEM

firstSliderR.addEventListener('input', () => {
    firstValueR.value = firstSliderR.value
    selectedValue.style.backgroundColor = `rgb(${firstSliderR.value},${secondSliderG.value},${thirdSliderB.value})`
    hexCodeFunction()
})
secondSliderG.addEventListener('input', () => {
    secondValueG.value = secondSliderG.value
    selectedValue.style.backgroundColor = `rgb(${firstSliderR.value},${secondSliderG.value},${thirdSliderB.value})`
    hexCodeFunction()
})
thirdSliderB.addEventListener('input', () => {
    thirdValueB.value = thirdSliderB.value
    selectedValue.style.backgroundColor = `rgb(${firstSliderR.value},${secondSliderG.value},${thirdSliderB.value})`
    hexCodeFunction()
})

firstValueR.addEventListener('input', () => {
    if(firstValueR.value > 255) {
        firstValueR.setCustomValidity('Value should be between 0 and 255');
        firstValueR.reportValidity()
    } else {
        firstValueR.setCustomValidity('');
        firstSliderR.value = firstValueR.value
        selectedValue.style.backgroundColor = `rgb(${firstValueR.value},${secondValueG.value},${thirdValueB.value})`
        hexCodeFunction()
    }
})
secondValueG.addEventListener('input', () => {
    if(secondValueG.value > 255) {
        secondValueG.setCustomValidity('Value should be between 0 and 255');
        secondValueG.reportValidity()
    } else {
        secondValueG.setCustomValidity('');
        secondSliderG.value =secondValueG.value
        selectedValue.style.backgroundColor = `rgb(${firstValueR.value},${secondValueG.value},${thirdValueB.value})`
        hexCodeFunction()
    }
})
thirdValueB.addEventListener('input', () => {
    if(thirdValueB.value > 255) {
        thirdValueB.setCustomValidity('Value should be between 0 and 255');
        thirdValueB.reportValidity()
    } else {
        thirdValueB.setCustomValidity('');
        thirdSliderB.value =thirdValueB.value
        selectedValue.style.backgroundColor = `rgb(${firstValueR.value},${secondValueG.value},${thirdValueB.value})`
        hexCodeFunction()
    }
})

///////////////////////////////////////HSL SYSTEM

firstSliderH.addEventListener('input', () => {
    firstValueH.value = firstSliderH.value
    selectedValue.style.backgroundColor = `hsl(${firstSliderH.value},${secondSliderS.value}%,${thirdSliderL.value}%)`
    hexCodeFunction()
})
secondSliderS.addEventListener('input', () => {
    secondValueS.value = secondSliderS.value
    selectedValue.style.backgroundColor = `hsl(${firstSliderH.value},${secondSliderS.value}%,${thirdSliderL.value}%)`
    hexCodeFunction()
})
thirdSliderL.addEventListener('input', () => {
    thirdValueL.value = thirdSliderL.value
    selectedValue.style.backgroundColor = `hsl(${firstSliderH.value},${secondSliderS.value}%,${thirdSliderL.value}%)`
    hexCodeFunction()
})

firstValueH.addEventListener('input', () => {
    if(firstValueH.value > 360) {
        firstValueH.setCustomValidity('Value should be between 0 and 360');
        firstValueH.reportValidity()
    } else {
        firstValueH.setCustomValidity('');
        firstSliderH.value = firstValueH.value
        selectedValue.style.backgroundColor = `hsl(${firstValueH.value},${secondValueS.value}%,${thirdValueL.value}%)`
        hexCodeFunction()
    }
})
secondValueS.addEventListener('input', () => {
    if(secondValueS.value > 100) {
        secondValueS.setCustomValidity('Value should be between 0 and 100');
        secondValueS.reportValidity()
    } else {
        secondValueS.setCustomValidity('');
        secondSliderS.value =secondValueS.value
        selectedValue.style.backgroundColor = `hsl(${firstValueH.value},${secondValueS.value}%,${thirdValueL.value}%)`
        hexCodeFunction()
    }
})
thirdValueL.addEventListener('input', () => {
    if(thirdValueL.value > 100) {
        thirdValueL.setCustomValidity('Value should be between 0 and 100');
        thirdValueL.reportValidity()
    } else {
        thirdValueL.setCustomValidity('');
        thirdSliderL.value =thirdValueL.value
        selectedValue.style.backgroundColor = `hsl(${firstValueH.value},${secondValueS.value}%,${thirdValueL.value}%)`
        hexCodeFunction()
    }
})


//Hex Code Event Listener
hexValue.addEventListener('input', () => {
    if(hexValue.value.length === 7 || hexValue.value.length === 4) {
        let validation = /^#(?:[0-9a-f]{3}){1,2}$/i
        if(validation.test(hexValue.value)) {
            hexValue.setCustomValidity("")
            if(hexValue.value.length === 7 && system === 'RGB') {
                selectedValue.style.backgroundColor = `${hexValue.value}`
                backColor = getComputedStyleSheet(selectedValue, 'backgroundColor')
                rgbBuffer = backColor.slice(4,-1).split(",");
                firstSliderR.value = firstValueR.value = `${rgbBuffer[0]}`
                secondSliderG.value = secondValueG.value = `${rgbBuffer[1].slice(1)}`
                thirdSliderB.value = thirdValueB.value = `${rgbBuffer[2].slice(1)}`
            }

            if(hexValue.value.length === 7 && system === 'HSL') {
                selectedValue.style.backgroundColor = `${hexValue.value}`
                backColor = getComputedStyleSheet(selectedValue, 'backgroundColor')
                rgbBuffer = rgbToHsl(backColor)
                firstSliderH.value = firstValueH.value = `${rgbBuffer[0]}`
                secondSliderS.value = secondValueS.value = `${rgbBuffer[1]}`
                thirdSliderL.value = thirdValueL.value = `${rgbBuffer[2]}`
            }
        } else {
            hexValue.setCustomValidity("Invalid Hex Code")
            hexValue.reportValidity()
        }
    }
})



let hexCodeFunction = () => {
    if(system === 'RGB') hexValue.value = rgbToHex(`rgb(${firstValueR.value},${secondValueG.value},${thirdValueB.value})`);
    else hexValue.value = rgbToHex(getComputedStyleSheet(selectedValue, 'background-color'))    
}






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

let copiedElement = document.querySelector('.copied') 

let copied = (e) => {
    copiedElement.style.opacity = 1
    copiedElement.style.zIndex = 1
    copiedElement.style.bottom = `${10}px`
    console.log(window.innerHeight)
    setTimeout(() => {
        copiedElement.style.opacity = 0
        copiedElement.style.zIndex = -2
    }, 1200)
}

let add = document.querySelector('.add')
let remove = document.querySelector('.remove')

let eventHandlerAdd = (event)=>{
    let divEl = document.createElement('div')
    divEl.setAttribute('class', 'colors')
    backColor = getComputedStyleSheet(selectedValue, 'backgroundColor')
    divEl.setAttribute('title', backColor)
    rgbBuffer = backColor.slice(4,-1).split(",");
    divEl.style.backgroundColor = `rgb(${rgbBuffer[0]}, ${rgbBuffer[1].slice(1)}, ${rgbBuffer[2].slice(1)})`
    baseColorContainer.appendChild(divEl)
    baseColors = document.querySelectorAll('.base-color > div')
    for(let i=baseColors.length - 1; i>baseColors.length-2; i--) {
        baseColors[i].addEventListener('click', classChanger)
    }
    if(baseColors.length > 1) {
        remove.removeAttribute('disabled', 'false')
        remove.style.cursor = 'pointer'
    }
}

add.addEventListener('click', eventHandlerAdd)

let eventHandlerRemove = (event) => {
    activeBaseColor = document.querySelector('.active-base-color');
    activeBaseColor.remove()
    baseColors = document.querySelectorAll('.base-color > div')
    baseColors[0].classList.add('active-base-color')
    activeBaseColor = document.querySelector('.active-base-color');
    backColor = getComputedStyleSheet(activeBaseColor, 'backgroundColor')
    assignHarmonyRules(backColor)
    if(baseColors.length < 2) {
        remove.setAttribute('disabled', 'true')
        remove.style.cursor = 'initial'
    }
}

remove.addEventListener('click', eventHandlerRemove)


//////////////////////INITIAL
//setting initial activeBaseColor background color to baseColorPicker
//setting initial activeBaseColor Background color value into hexadecimal string as innerText of the baseColorPicker
baseColorPicker.style.backgroundColor = getComputedStyleSheet(activeBaseColor, "backgroundColor");
backgroundColorValue(baseColorPicker, getComputedStyleSheet(activeBaseColor, "backgroundColor"))
//setting initial active harmony rule to copied value and the the harmony rule element
assignHarmonyRules(getComputedStyleSheet(activeBaseColor, "backgroundColor"))
activeHarmonyRuleElement[0].setAttribute('title', 'rgb(0, 0, 255)')


/////////////////////////////////////////canvas
/////////FEATURE UPDATE

// let colorWheelContainer = document.querySelector('.color-wheel')
// let canvas = document.querySelector('canvas')
// let c = canvas.getContext('2d')

// let width = canvas.width = colorWheelContainer.clientHeight
// let height = canvas.height = colorWheelContainer.clientHeight

// let img = new Image();
// img.src = "color-wheel.png"
// img.onload = function () {
    // c.drawImage(img, -2, -2, height + 3, height + 3)
    // img.style.display = 'none'
// }

// canvas.addEventListener('click', (event) => {
//     let pix = c.getImageData(event.layerX, event.layerY, 1, 1);
//     console.log(pix)
// })

// let add = document.querySelector('.add')
// let remove = document.querySelector('.remove')
// let linked = document.querySelector('.linked')

// let mouse = {
//     x: undefined,
//     y: undefined
// }
// canvas.addEventListener('mousemove', (e)=>{
//     mouse.x = e.layerX;
//     mouse.y = e.layerY
// })

// let addStatus = {
//     status: false
// }

// let removeStatus = {
//     status: false
// }
// let linkedStatus = {
//     status: true
// }
// let body = document.querySelector('body')

// let getDistance = (x1,y1,x2,y2) => {
//     let disX = x2 - x1
//     let disY = y2 - y1

//     return dis = Math.sqrt(Math.pow(disX, 2) + Math.pow(disY, 2))
// }

// let Circle = function (x, y) {
//     this.x = x;
//     this.y = y;

//     this.draw = () => {
//         c.beginPath()
//         c.arc(this.x, this.y, 10, 0, Math.PI*2, false)
//         c.strokeStyle = "gray"
//         c.stroke()
//     }

//     this.update = () => {
//         if(getDistance(this.x, this.y, mouse.x, mouse.y) < 10) {
//             console.log('cyka')
//         }
//         this.draw()
//     }

    
// }




// let x = 180
// let dx = 0.1

// let circles = [];
// let animate = () => {
//     requestAnimationFrame(animate)
//     c.clearRect(0,0,width,height)


//     let posX = x + (Math.abs(Math.sin(dx) * 10));
//     let posY = 180;
//     c.beginPath()
//     c.arc(posX, posY, 10, 0, Math.PI * 2, true)
//     c.strokeStyle = 'black'
//     c.stroke()
//     dx = dx + 0.05
    // c.drawImage(img, -2, -2, height + 3, height + 3)
    // circles.forEach((circle) => {
    //     circle.update()
    // })
    // console.log(mouse)
// }

// animate()

// let canvasContainer = document.querySelector('.color-wheel > div')

// let getPosition = (event, outerEvent) => {
//     console.log(event.layerX, event.layerY)
//     console.log(outerEvent.layerX, outerEvent.layerY)
//         outerEvent.target.style.top = `${event.layerY}px`
//         outerEvent.target.style.left = `${event.layerX}px`
// }


// let div =  (x,y, eve) => {
    
    
//     let divEle = document.createElement('div')
//     divEle.style.width = '15px'
//     divEle.style.height = '15px'
//     divEle.style.top = `${y}px`
//     divEle.style.left = `${x}px`
//     divEle.style.transform = `translate(-50%, -50%)`
//     divEle.style.borderRadius = `50%`
//     divEle.style.position = 'absolute'
//     divEle.style.border = '1px solid black'
//     console.log(x, y)
//     canvasContainer.appendChild(divEle)

    // divEle.addEventListener('click', (e)=>{
    //     let eve = e
    //     console.log(e.target)
    //     canvasContainer.addEventListener('mousemove', (event) => {
    //         getPosition(event, eve)
    //     })
        // canvasContainer.addEventListener('mousemove', (e)=> {
        //     if(e.target === divEle) {
        //         console.log('goooo')
        //         e.target.style.top = `${event.layerY - 7.5}px`
        //         e.target.style.left = `${event.layerX - 7.5}px`
        //         console.log(e.layerY)
        //     }
        // })
    // })

// }

// let eventHandler = (event)=>{
//     pix = c.getImageData(event.layerX, event.layerY, 1, 1);
//     let divEl = document.createElement('div')
//     divEl.setAttribute('class', 'colors')
//     divEl.style.backgroundColor = `rgb(${pix.data[0]}, ${pix.data[1]}, ${pix.data[2]})`
//     baseColorContainer.appendChild(divEl)

//     div(event.layerX, event.layerY, event)


    // circles.push(new Circle(event.layerX, event.layerY))
    // animate()





    //sets back to initial setup
//     canvas.style.cursor = 'initial'
//     add.style.border = `none`
//     addStatus.status = !addStatus.status
//     canvas.removeEventListener('click', eventHandler)
//     baseColors = document.querySelectorAll('.base-color > div')
//     for(let i=baseColors.length - 1; i>baseColors.length-2; i--) {
//         baseColors[i].addEventListener('click', classChanger)
//     }
// }

// add.addEventListener('click', () => {
//     addStatus.status = !addStatus.status
//     if (addStatus.status === true){
//         let pix = []
//         add.style.border = `3px double black`
//         canvas.style.cursor = 'pointer'
//         canvas.addEventListener('click', eventHandler)
//     } else {
//         add.style.border = `none`
//         canvas.style.cursor = 'initial'
//         canvas.removeEventListener('click', eventHandler)
//     }
// })

////////////////////////////////////////////////////