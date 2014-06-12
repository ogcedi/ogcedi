'use strict';

/* App Module */


var ogcediApp = angular.module('ogcediApp', ['ngRoute', 'ngSanitize', 'ogcediControllers', 'ogcediFilters', 'ogcediServices', 'nvd3ChartDirectives']);

ogcediApp.config(['$routeProvider', function($routeProvider){
	$routeProvider.
	when('/home', {
		templateUrl: 'partials/home.html',
		controller: 'HomeCtrl'
	}).
	when('/personnes', {
		templateUrl: 'partials/personne-list.html',
		controller: 'PersonneListCtrl'
	}).
	when('/personnes/creer/', 
	{
		templateUrl: 'partials/personne-creation.html',
		controller: 'PersonneCreationCtrl'
	}).
	when('/statistiques', {
		templateUrl: 'partials/stats.html',
		controller: 'StatsController'
	}).
	when('/personnes/:personneId', 
	{
		templateUrl: 'partials/personne-detail.html',
		controller: 'PersonneDetailCtrl'
	}).
	when('/formations', {
		templateUrl: 'partials/formation-list.html',
		controller: 'FormationListCtrl'
	}).
	when('/formations/creer/', 
	{
		templateUrl: 'partials/formation-creation.html',
		controller: 'FormationCreationCtrl'
	}).
	when('/formations/:formationId', 
	{
		templateUrl: 'partials/formation-detail.html',
		controller: 'FormationDetailCtrl'
	}).
	otherwise({
		redirectTo: '/home'
	});
}]);



// ----------------------------------------------------------------------------------------------------------------------------------- 


/*var phonecatApp = angular.module('phonecatApp', ['ngRoute', 'phonecatControllers', 'phonecatFilters', 'phonecatServices']);

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

*/



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
