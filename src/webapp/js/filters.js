'use strict';

/* Filters */

var ogcediFilters = angular.module('ogcediFilters', []);

ogcediFilters.filter('checkmark', function() {
	return function(input) {
		return input ? '\u2713' : '\u2718';
	};
});