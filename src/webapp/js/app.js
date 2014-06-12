'use strict';

/* App Module */


var ogcediApp = angular.module('ogcediApp', ['ngRoute', 'ngSanitize', 'ogcediControllers', 'ogcediFilters', 'ogcediServices', 'ogcediDirectives', 'nvd3ChartDirectives']);

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
	when('/promotions', {
		templateUrl: 'partials/promotion-list.html',
		controller: 'PromotionListCtrl'
	}).
	when('/promotions/creer/', 
	{
		templateUrl: 'partials/promotion-creation.html',
		controller: 'PromotionCreationCtrl'
	}).
	when('/promotions/:promotionId', 
	{
		templateUrl: 'partials/promotion-detail.html',
		controller: 'PromotionDetailCtrl'
	}).
	otherwise({
		redirectTo: '/home'
	});
}]);

