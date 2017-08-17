import * as easings from './easings'

/**
 * @param  {(value:number, end:boolean)=>void} manipulator
 *  Is called each time the value is changed to a new number.
 *  End is true if it is the last frame of the aniamtion 
 * @param  {number} start
 *  The value to start the animation from 
 * @param  {number} end
 *  The value to end the animation at
 * @param  {number} dur=2000
 *  The duration of the animation in ms. 
 *  The animation will probably exceed this number by a few ms, 
 *  or even a lot if the CPU is under pressure
 * @param  {boolean} reverse=false
 *  If true animates from end to start value 
 * @return {Promise} 
 *  a Promise that is resolved when the animation is finished
 *  There's no ejects
 * @example
 *    const pie = document.querySelector(".pie")
 *    const man = function(val, end){
 *      pie.style.strokeDasharray = val;    
 *    }
 *    animate(man, 0, 100)
 */
export const animate = (manipulator, start, end, dur = 2000, reverse = false) => {

  let startValue       = start,
      endValue         = end,
      change           = endValue - startValue,
      duration         = dur,
      time             = reverse ? dur : 0,
      easing           = easings.easeInOutExpo

  return new Promise(function(resolve, reject) {
    
    const theAnimation = setInterval(function(){
      window.requestAnimationFrame(function(){
        const val = easing(time, startValue, change, duration);
        manipulator(val)
        time = reverse ? time-10 : time+10;
        if(time >= duration || (reverse && time <= 0)){ 
          clearInterval(theAnimation);
          manipulator(endValue, true)
          resolve()
        }
      })
    },10)

  });
}
