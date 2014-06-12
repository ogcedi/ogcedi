'use strict';

/* App Module */


var ogcediApp = angular.module('ogcediApp', ['ngRoute', 'ngSanitize', 'ogcediControllers', 'ogcediFilters', 'ogcediServices', 'ogcediDirectives']);

ogcediApp.config(['$routeProvider', function($routeProvider){
	$routeProvider.
	when('/home', {
		templateUrl: 'partials/home.html'
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

