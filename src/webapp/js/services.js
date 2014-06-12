'use strict';

/* Services */

var ogcediServices = angular.module('ogcediServices', ['ngResource']);

///rest/web/index.php/list-personne.json
//get-personne/{id}.{format}

/**
 * "Service" permettant de modifier le contenu JSON d'une requête sortante en contenu text (paramètres)
 */ 
ogcediServices.factory("transformRequestService", function() {
	return function (obj) {
        if (!angular.isObject(obj))
        {
            return((obj==null)? "" : obj.toString());
        } 
        else 
        {
        	var buffer = [];
	        for (var name in obj) {
	            if (obj.hasOwnProperty(name) && name[0]!="$") {
	            	var value = obj[name];
	                buffer.push(encodeURIComponent(name) + "=" + encodeURIComponent((value==null)? "" : value));
	            }
	        }
	        return buffer.join( "&" ).replace(/%20/g, "+");
        }
    }; 
});


/**
 * Service permettant de realiser un "Select" sur une liste
 */
ogcediServices.factory("SelectService", function() {
	var select = {};
	select.byId = function (ObjectsList, id) {
		for(var i = 0; i < ObjectsList.length; ++i) {
		    if(ObjectsList[i].id == id) {
		        return ObjectsList[i];
		    }
		}
    }; 
	return select;
});



/**
 * Service REST générique
 */
ogcediServices.factory('GenericRestServiceFactory', ['$resource', 'transformRequestService', 
    function($resource, transformRequestService) {
		var service = {};
		service.restService = null;	
		service.create = function(table) 
		{
			var headers = {
				'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
				'Accept': 'application/json;charset=UTF-8'
			};
			
			service.restService = $resource('../rest/web/index.php/:table/:id.:format', {table: table, format:'json'}, {
	   			get: 	{method:'GET'},
	   			getAll: {method:'GET', isArray:true},
	   			list: 	{method:'GET', 	params:{id:'' }, isArray:true},
	   			save: 	{method:'PUT', transformRequest: transformRequestService, headers: headers},
	   			create: {method:'POST',	params:{id:''}, transformRequest: transformRequestService, headers: headers},
	   			remove:	{method:'DELETE'}
	   		});
			return service;
		}	
		return service;
	}
]);


// Déclinaisons du service générique 

/**
 * Service REST Activite
 */
ogcediServices.factory('Activite', ['GenericRestServiceFactory', function(GenericRestServiceFactory){
	return GenericRestServiceFactory.create("activites").restService;
}]);

/**
 * Service REST ActiviteModule
 */
ogcediServices.factory('ActiviteModule', ['GenericRestServiceFactory', function(GenericRestServiceFactory){
	return GenericRestServiceFactory.create("activitemodules").restService;
}]);

/**
 * Service REST Departement
 */
ogcediServices.factory('Departement', ['GenericRestServiceFactory', function(GenericRestServiceFactory){
	return GenericRestServiceFactory.create("departements").restService;
}]);

/**
 * Service REST Formation
 */
ogcediServices.factory('Formation', ['GenericRestServiceFactory', function(GenericRestServiceFactory){
	return GenericRestServiceFactory.create("formations").restService;
}])

/**
 * Service REST Intervenant
 */
ogcediServices.factory('Intervenant', ['GenericRestServiceFactory', function(GenericRestServiceFactory){
	return GenericRestServiceFactory.create("intervenants").restService;
}]);

/**
 * Service REST Module
 */
ogcediServices.factory('Module', ['GenericRestServiceFactory', function(GenericRestServiceFactory){
	return GenericRestServiceFactory.create("modules").restService;
}]);

/**
 * Service REST Personne
 */
ogcediServices.factory('Personne', ['GenericRestServiceFactory', function(GenericRestServiceFactory){
	return GenericRestServiceFactory.create("personnes").restService;
}]);

/**
 * Service REST Promotion
 */
ogcediServices.factory('Promotion', ['GenericRestServiceFactory', function(GenericRestServiceFactory){
	return GenericRestServiceFactory.create("promotions").restService;
}]);

/**
 * Service REST TypeActivite
 */
ogcediServices.factory('TypeActivite', ['GenericRestServiceFactory', function(GenericRestServiceFactory){
	return GenericRestServiceFactory.create("typesactivites").restService;
}]);

/**
 * Service REST Uv
 */
ogcediServices.factory('Uv', ['GenericRestServiceFactory', function(GenericRestServiceFactory){
	return GenericRestServiceFactory.create("uvs").restService;
}]);


/*
ogcediServices.factory('GenericRestService', ['$resource', 'transformRequestService', function($resource, transformRequestService) {
	
	return $resource('../rest/web/index.php/:table/:id:format', {format:'.json'}, {
			get: 	{method:'GET'},
			create: {method:'POST',	params:{id:''}},
			list: 	{method:'GET', 	params:{id:''}, isArray:true},
			update: {method:'PUT', transformRequest: transformRequestService},
			remove: {method:'DELETE'}
		});
}]);
*/

//ogcediServices.factory('ListPersonne', ['$resource',
//	function($resource){
//		return $resource('../rest/web/index.php/list-personne.json', {}, {
//			query: {method:'GET', params:{/*personneId:'personnes'*/}, isArray:true}
//		});
//	}
//]);


/*ogcediServices.factory('Personne', ['$resource', 'transformRequestAsFormPost',
	function($resource, transformRequestAsFormPost){
		return $resource('../rest/web/index.php/personnes/:personneId:format', {}, {
			list: {method:'GET', params:{format:'.json'}, isArray:true},
			get: {method:'GET', params:{format:'.json'}},
			save: {method:'PUT', params:{format:'.json'},
			    transformRequest: transformRequestAsFormPost*//*function(obj) {        
			       var array = [];
			       for(var name in obj) {
			        	var value = encodeURIComponent(obj[name]);
			        	if(name[0]!="$") {
			        		array.push(encodeURIComponent(name) + "=" + value);
		        		}
			        }
			        return array.join("&");
			    },
			    headers: {
			        'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
			        'Accept': 'application/json;charset=UTF-8'
			    }*//*},
			create: {method:'POST', params:{format:'.json'}},
			remove: {method:'DELETE', params:{format:'.json'}}
		});
	}
]);*/





/*
 ogcediServices.factory('Personne', ['$resource',
	function($resource){
		return $resource('../rest/test/personnes/:personneId.json', {}, {
			query: {method:'GET', params:{personneId:'personnes'}, isArray:true}
		});
	}
]);
*/
 

/*var phonecatServices = angular.module('phonecatServices', ['ngResource']);

phonecatServices.factory('Phone', ['$resource',
	function($resource){
		return $resource('../rest/test/phones/:phoneId.json', {}, {
			query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
		});
	}
]);*/
