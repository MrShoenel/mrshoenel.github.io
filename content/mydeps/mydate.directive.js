angular.module('blogapp').filter('mrshMydate', function() {
	var dateMethod = Date.prototype['toGMTString'] || Date.prototype.toLocaleString || Date.prototype.toString;
	return function(input) {
		return dateMethod.call(new Date(Date.parse(input)));
	};
});
