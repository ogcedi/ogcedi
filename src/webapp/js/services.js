'use strict';

/* Services */

var ogcediServices = angular.module('ogcediServices', ['ngResource']);
///rest/web/index.php/list-personne.json
//get-personne/{id}.{format}

ogcediServices.factory('ListPersonne', ['$resource',
	function($resource){
		return $resource('../rest/web/index.php/list-personne.json', {}, {
			query: {method:'GET', params:{/*personneId:'personnes'*/}, isArray:true}
		});
	}
]);

ogcediServices.factory('Personne', ['$resource',
	function($resource){
		return $resource('../rest/web/index.php/:action/:personneId.:format', {}, {
			get: {method:'GET', params:{personneId:'', action:'get-personne', format:'json'}, isArray:false},
			save: {method:'PUT', params:{personneId:'', action:'update-personne', format:'json'}}
		});
	}
]);

/*{ 'get':    {method:'GET'},
    'save':   {method:'POST'},
    'query':  {method:'GET', isArray:true},
    'remove': {method:'DELETE'},
    'delete': {method:'DELETE'} };*/

/*
 ogcediServices.factory('Personne', ['$resource',
	function($resource){
		return $resource('../rest/test/personnes/:personneId.json', {}, {
			query: {method:'GET', params:{personneId:'personnes'}, isArray:true}
		});
	}
]);
*/
 





var phonecatServices = angular.module('phonecatServices', ['ngResource']);

phonecatServices.factory('Phone', ['$resource',
	function($resource){
		return $resource('../rest/test/phones/:phoneId.json', {}, {
			query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
		});
	}
]);
