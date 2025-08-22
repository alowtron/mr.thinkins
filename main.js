let noiseOffset = 0

let noise = `
<svg style="display:none;">
  <filter id="noise" x="0%" y="-990%" width="100%" height="10000%" color-interpolation-filters="sRGB">
    <feTurbulence type="fractalNoise" baseFrequency="0.008" numOctaves="10" stitchTiles="stitch" result="canvas-noise-result"/>

    <feColorMatrix in="canvas-noise-result" type="matrix" values="
      0.33 0.33 0.33 0 0 
      0.33 0.33 0.33 0 0 
      0.33 0.33 0.33 0 0 
      0    0    0    1 0" 
    result="grey"/>       
  
  <feOffset in="noiseAFlat" dx="0" dy="${noiseOffset}" result="noiseShifted" />
  </filter>
</svg>

<svg style="display:none">
  <filter id="rough-edges-tb" x="-90%" y="-990%" width="200%" height="10000%">
    <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="10" stitchTiles="stitch" result="noise" />
    <feComponentTransfer in="noise" result="noiseAFlat">
      <feFuncA type="table" tableValues="0.5 0.5" />
    </feComponentTransfer>
    <feOffset in="noiseAFlat" dx="0" dy="${noiseOffset}" result="noiseShifted" />
    <feDisplacementMap in="SourceGraphic" in2="noiseShifted" scale="5" xChannelSelector="R" yChannelSelector="A" />
  </filter>
</svg>
`

document.getElementById('noiseDiv').innerHTML = noise

const feOffset = document.querySelector('#noise feOffset')
const feDisplace = document.querySelector('#rough-edges-tb feOffset')

let scrollY = 0
let lastScrollY = 0

function animateNoise() {
    requestAnimationFrame(animateNoise)
    
    noiseOffset = scrollY * 0.25
    
    if (feOffset) {
        feOffset.setAttribute('dy', noiseOffset)
        feDisplace.setAttribute('dy',  noiseOffset)
    }
}

animateNoise()

window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
})