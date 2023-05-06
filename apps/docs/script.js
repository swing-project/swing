// import tinycolor from "https://esm.sh/tinycolor2"

const urlSearchParams = new URLSearchParams(window.location.search)
const params = Object.fromEntries(urlSearchParams.entries())

// function lightenDarkenColor(hexString, amount)
// {
//     let num = parseInt(hexString, 16)
//     let r = (num >> 16) + amount
//     let b = ((num >> 8) & 0x00FF) + amount
//     let g = (num & 0x0000FF) + amount
//     let newColor = g | (b << 8) | (r << 16)
//     return newColor.toString(16)
// }

// const accentColorTC = tinycolor(params.accent)
// const accentColorLighterTC = accentColorTC.lighten(60)

const accentColor = params.accent
// const accentColor = accentColorTC.toHexString()
// const accentColorWithoutOctothorpe = accentColor.slice(1)
// const accentColorLighter = '#' + lightenDarkenColor(accentColorWithoutOctothorpe, 60)
// const accentColorLighter = accentColorLighterTC.toHexString()
const accentColorLighter = params.highlight

const fontFamily = params.fontFamily
const fontMono = params.fontMono

document.body.style.setProperty('--accent-color', accentColor)
document.body.style.setProperty('--accent-light', accentColorLighter)
document.body.style.setProperty('--font-family', fontFamily)
document.body.style.setProperty('--font-mono', fontMono)
