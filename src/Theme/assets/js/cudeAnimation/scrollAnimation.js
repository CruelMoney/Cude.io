/*
ORIGINAL CODE CREDIT: https://github.com/dhg/davegamache/
*/
import {helperFunctions} from 'cude-cms'
import * as easings from './easings'

/*  Globals
-------------------------------------------------- */
var PROPERTIES =               ['translateX', 'translateY', 'opacity', 'rotate', 'scale'],
    container =                null,
    pageOffset =               0,
    wrappers =                 [],
    currentWrapper =           null,
    scrollTimeoutID =          0,
    bodyHeight =               0,
    windowHeight =             0,
    windowWidth =              0,
    prevKeyframesDurations =   0,
    scrollTop =                0,
    relativeScrollTop =        0,
    currentKeyframe =          0,
    keyframes =                []



/*  Construction
-------------------------------------------------- */
const init = (theContainer) => {
  container = theContainer;
  const throttledFunction = helperFunctions.throttle(updatePage, 10);
  window.onscroll = throttledFunction
  setupValues();
}

const setupValues = (wrapper) => {
  // MASSIVE HACK FOR GETTING OFFSET IN DEVELOPMENT
  setTimeout(()=>{
   // pageOffset = container.getBoundingClientRect().top + window.scrollY
    pageOffset = 200
    console.log(pageOffset)
  },1000)
  scrollTop = window.scrollY - pageOffset
  windowHeight = window.innerHeight;
  windowWidth = window.innerWidth;
  convertAllPropsToPx();
  buildPage();
}

const buildPage = () => {
  var i, j, k;
  for(i=0;i<keyframes.length;i++) { // loop keyframes
      bodyHeight += keyframes[i].duration;
      if(wrappers.indexOf(keyframes[i].wrapper) == -1) {
        wrappers.push(keyframes[i].wrapper);
      }
      for(j=0;j<keyframes[i].animations.length;j++) { // loop animations
        Object.keys(keyframes[i].animations[j]).forEach((key)=> { // loop properties
          var value = keyframes[i].animations[j][key];
          if(key !== 'selector' && key !== 'easing' && value instanceof Array === false) {
            var valueSet = [];
            valueSet.push(getDefaultPropertyValue(key), value);
            value = valueSet;
          }
          keyframes[i].animations[j][key] = value;
        });
      }
  }
  container.style.height = bodyHeight + "px";
  //$window.scroll(0);
  currentWrapper = wrappers[0];
  currentWrapper.classList.add("active")
}

const convertAllPropsToPx = () => {
  var i, j, k;
  for(i=0;i<keyframes.length;i++) { // loop keyframes
    const originalDuration = convertPercentToPx(keyframes[i].duration, 'y');
    keyframes[i].duration = originalDuration
    keyframes[i].originalDuration = originalDuration
    for(j=0;j<keyframes[i].animations.length;j++) { // loop animations
      Object.keys(keyframes[i].animations[j]).forEach(function(key) { // loop properties
        var value = keyframes[i].animations[j][key];
        if(key !== 'selector' && key !== 'easing') {
          if(value instanceof Array) { // if its an array
            for(k=0;k<value.length;k++) { // if value in array is %
              if(typeof value[k] === "string") {
                if(key === 'translateY') {
                  value[k] = convertPercentToPx(value[k], 'y');
                } else {
                  value[k] = convertPercentToPx(value[k], 'x');
                }
              }
            } 
          } else {
            if(typeof value === "string") { // if single value is a %
              if(key === 'translateY') {
                value = convertPercentToPx(value, 'y');
              } else {
                value = convertPercentToPx(value, 'x');
              }
            }
          }
          keyframes[i].animations[j][key] = value;
        }
      });

           
        // Set duration to the longest possible one, when including delay
        if(keyframes[i].animations[j].delay){
          var delay = keyframes[i].animations[j].delay
          keyframes[i].duration = Math.max(keyframes[i].duration, originalDuration+delay)
        }
    }
  }
}

const getDefaultPropertyValue = (property) => {
  switch (property) {
    case 'translateX':
      return 0;
    case 'translateY':
      return 0;
    case 'scale':
      return 1;
    case 'rotate':
      return 0;
    case 'opacity':
      return 1;
    default:
      return null;
  }
}

/*  Animation/Scrolling
-------------------------------------------------- */
const updatePage = () => {
  window.requestAnimationFrame(() => {
    setScrollTops();
    if(scrollTop > 0 && scrollTop <= (bodyHeight - windowHeight)) {
      animateElements();
      setKeyframe();
    }
  });
}

const setScrollTops = () => {
  scrollTop = window.scrollY - pageOffset
  relativeScrollTop = scrollTop - prevKeyframesDurations;
}


const animateElements = () => {
  var animation, translateY, translateX, scale, rotate, opacity;
  for(var i=0;i<keyframes[currentKeyframe].animations.length;i++) {
    animation   = keyframes[currentKeyframe].animations[i];
    translateY  = calcPropValue(animation, 'translateY');
    translateX  = calcPropValue(animation, 'translateX');
    scale       = calcPropValue(animation, 'scale');
    rotate      = calcPropValue(animation, 'rotate');
    opacity     = calcPropValue(animation, 'opacity');

    const curElem = document.querySelector(animation.selector)
    if (curElem){
      curElem.style.transform = 'translate3d(' + translateX +'px, ' + translateY + 'px, 0) scale('+ scale +') rotate('+ rotate +'deg)';
      curElem.style.opacity = opacity;
    }
  }
}

const calcPropValue = (animation, property) => {
  var value = animation[property];
  var duration = keyframes[currentKeyframe].originalDuration
  duration = animation.delay ? duration + animation.delay[1] : duration
  const easingFun = animation.easing === "linear" ? easings.linear : easings.easeInOutQuad
  // Progress should not exceed duration, 
  // can happen in case of delayed animations in same keyframe
  var progress = Math.min(relativeScrollTop, duration)
  
  if(value) {
    value = easingFun(progress, value[0], (value[1]-value[0]), duration)
  } else {
    value = getDefaultPropertyValue(property);
  }
  // SCALE DOESN'T WORK WITH A AGRESSIVE ROUNDING LIKE THIS
  value = +value.toFixed(2) 
  return value;
}


const setKeyframe = () => {
  if(scrollTop > (keyframes[currentKeyframe].duration + prevKeyframesDurations)) {
      prevKeyframesDurations += keyframes[currentKeyframe].duration;
      currentKeyframe++;
      showCurrentWrappers();
  } else if(scrollTop < prevKeyframesDurations) {
      currentKeyframe--;
      prevKeyframesDurations -= keyframes[currentKeyframe].duration;
      showCurrentWrappers();
  }
}

const showCurrentWrappers = () => {
  var i;
  if(keyframes[currentKeyframe].wrapper != currentWrapper) {
    currentWrapper.classList.remove("active")
    keyframes[currentKeyframe].wrapper.classList.add("active")
    currentWrapper = keyframes[currentKeyframe].wrapper;
    if (keyframes[currentKeyframe].keyframeStarted){
      keyframes[currentKeyframe].keyframeStarted();
    } 
  }
}

/*  Helpers
-------------------------------------------------- */

const convertPercentToPx = (value, axis) => {
  if(typeof value === "string" && value.match(/%/g)) {
    if(axis === 'y') value = (parseFloat(value) / 100) * windowHeight;
    if(axis === 'x') value = (parseFloat(value) / 100) * windowWidth;
  }
  return value;
}

const throwError = () => {
  console.log("errrrrooorrr 💥")
}

const isTouchDevice = () => {
  return 'ontouchstart' in window // works on most browsers 
  || 'onmsgesturechange' in window; // works on ie10
}


/*  Exports
-------------------------------------------------- */
export {
  init,
  keyframes 
}