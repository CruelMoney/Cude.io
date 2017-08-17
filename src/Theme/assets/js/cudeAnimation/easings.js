// t is the current time (or position) of the tween. 
//    This can be seconds or frames, steps, seconds, ms, whatever 
//    – as long as the unit is the same as is used for the total time [3].
// b is the beginning value of the property.
// c is the change between the beginning and destination value of the property.
// d is the total time of the tween.

const linear = (t, b, c, d) => {
  return c * t / d + b;
}
const easeInQuad = (t, b, c, d) => {
      t /= d;
      return c*t*t + b;
};
const easeOutQuad =  (t, b, c, d)=>  {
	t /= d;
	return -c * t*(t-2) + b;
};
const easeInOutQuad = (t, b, c, d) => {
  return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
};
const easeOutSine =  (t, b, c, d)=>  {
	return c * Math.sin(t/d * (Math.PI/2)) + b;
};
const easeOutQuart =  (t, b, c, d)=>  {
	t /= d;
	t--;
	return -c * (t*t*t*t - 1) + b;
};
const easeOutCirc =  (t, b, c, d)=>  {
	t /= d;
	t--;
	return c * Math.sqrt(1 - t*t) + b;
};
const easeOutExpo =  (t, b, c, d)=>  {
	return c * ( -Math.pow( 2, -10 * t/d ) + 1 ) + b;
};
const easeInOutExpo =  (t, b, c, d)=>  {
	t /= d/2;
	if (t < 1) return c/2 * Math.pow( 2, 10 * (t - 1) ) + b;
	t--;
	return c/2 * ( -Math.pow( 2, -10 * t) + 2 ) + b;
};

export {
  linear,
  easeInOutQuad,
  easeInQuad,
  easeOutQuad,
  easeOutSine,
  easeOutQuart,
  easeOutCirc,
  easeOutExpo,
  easeInOutExpo
}

