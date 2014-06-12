'use strict';

/* App Module */


var ogcediApp = angular.module('ogcediApp', ['ngRoute', 'ngSanitize', 'ogcediControllers', 'ogcediFilters', 'ogcediServices']);

ogcediApp.config(['$routeProvider', function($routeProvider){
	$routeProvider.
	when('/personnes', {
		templateUrl: 'partials/personne-list.html',
		controller: 'PersonneListCtrl'
	}).
	when('/personnes/creer/', 
	{
		templateUrl: 'partials/personne-creation.html',
		controller: 'PersonneCreationCtrl'
	}).
	when('/personnes/:personneId', 
	{
		templateUrl: 'partials/personne-detail.html',
		controller: 'PersonneDetailCtrl'
	}).
	otherwise({
		redirectTo: '/personnes'
	});
}]);



// ----------------------------------------------------------------------------------------------------------------------------------- 


var phonecatApp = angular.module('phonecatApp', ['ngRoute', 'phonecatControllers', 'phonecatFilters', 'phonecatServices']);

phonecatApp.config(['$routeProvider', function($routeProvider){
	$routeProvider.
	when('/phones', {
		templateUrl: 'partials/phone-list.html',
		controller: 'PhoneListCtrl'
	}).
	when('/phones/:phoneId', 
	{
		templateUrl: 'partials/phone-detail.html',
		controller: 'PhoneDetailCtrl'
	}).
	otherwise({
		redirectTo: '/phones'
	});
}]);






/*var phonecatApp = angular.module('phonecatApp', [
  'ngRoute',
  'phonecatAnimations',
  
  'phonecatControllers',
  'phonecatFilters',
  'phonecatServices'
]);

phonecatApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/phones', {
        templateUrl: 'partials/phone-list.html',
        controller: 'PhoneListCtrl'
      }).
      when('/phones/:phoneId', {
        templateUrl: 'partials/phone-detail.html',
        controller: 'PhoneDetailCtrl'
      }).
      otherwise({
        redirectTo: '/phones'
      });
  }]);*/
