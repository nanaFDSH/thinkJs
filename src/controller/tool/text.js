var x = 5;
var area = function(radius) {
  return Math.PI * radius * radius;
};
var circumference = function(radius) {
  return 2 * Math.PI * radius;
};
module.exports.x = x;
module.exports.area = area;
module.exports.circumference = circumference;
