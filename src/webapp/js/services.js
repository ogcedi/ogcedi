'use strict';

/* Services */

var ogcediServices = angular.module('ogcediServices', ['ngResource']);


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
 * Service offrant des options de mise en page et de chargement et modification des données
 */ 
ogcediServices.factory("PageService", ['$location', '$routeParams', function($location, $routeParams) {
	
	var pageService = {};
	
	/**
	 * Methode 'setGoFunction' : permet de rendre visible la méthode '$location.path(path)' dans le $scope via la methode 'go', ex : $scope.go('/home');
	 */
	pageService.setGoFunction = function($scope) {
		
		$scope.go = function(path) {
			$location.path(path);
		}
	}
	
	/**
	 * Méthode 'applyListViewService($scope, primaryRestService)' : Permet de rendre visible un ensemble de methode / services dans le "$scope" actuel
	 * ainsi que d'initialiser des valeurs nécessaire à la mise en page de type "Liste"
	 */
	pageService.applyListViewService = function($scope, primaryRestService) {
				
		$scope.cacheData=null;
		$scope.data=null;
		
		pageService.setGoFunction($scope);
		
		
		/**
		 * Méthode 'loadData' : charge les données du type "principal" en cache et appel la methode 'setData' pour n'afficher que le nombre voulu
		 */
		pageService.loadData = function ()
		{
			$scope.cacheData = primaryRestService.list($scope.setData)
		}
				

		/**
		 * Méthode 'setData' : permet de créer une sous liste de données (affichée sur la page en cours)
		 */
		$scope.setData = function() {
			if($scope.cacheData) {
				var dataCopy =  $scope.cacheData.slice();
				$scope.dataCount = dataCopy.length;
				$scope.data = dataCopy.splice($scope.start, $scope.limit);
			}
		}
		
		/**
		 * Méthode 'precedents' : permet de reculer dans la liste affichée
		 */
		$scope.precedents = function(){
			$scope.start = Math.max(0, parseInt($scope.start) - parseInt($scope.limit));
			$scope.setData();
		}
		
		/**
		 * Méthode 'suivant' : permet de reculer dans la liste affichée
		 */
		$scope.suivants = function(){
			$scope.start = parseInt($scope.start) + parseInt($scope.limit);
			$scope.setData();
		}
		
		/**
		 * Méthode 'reset' : permet d'initialiser l'état des paramètres
		 */
		$scope.reset = function() {
			$scope.start = 0;
			$scope.limit = 10;
			$scope.dataCount = 0;			
		}

		$scope.reset();		
		
	};
	
	/**
	 * Méthode 'applyEditViewService($scope, primaryRestService)' : Permet de rendre visible un ensemble de methode / services dans le "$scope" actuel
	 * ainsi que d'initialiser des valeurs nécessaire à la mise en page de type "Visualisation/Edition"
	 */
	pageService.applyEditViewService = function($scope, primaryRestService, mainPage) {
				
		pageService.setGoFunction($scope);
		
		var id =  $routeParams.id; // Récupère l'identifiant de l'élément (en paramètre dans l'url)
		$scope.Id = id;
		$scope.data = null;
		$scope.editing = false;
		$scope.restServiceParams = {id: id};
		
		/**
		 * Méthode 'loadData' : charge l'élément désiré
		 */
		$scope.loadData = function() {
			$scope.data = primaryRestService.get($scope.restServiceParams);
		}
		
		/**
		 * Méthode 'setEditing' : permet de passer en mode edition ou consultation
		 */
		$scope.setEditing = function(editing) {
			$scope.editing = editing;
		}
		
		/**
		 * Méthode 'edit' : permet de passer la page en mode edition
		 */
		$scope.edit = function () {
			$scope.setEditing(true);
		}
		
		/**
		 * Méthode 'save' : Enregistre les modification apportées à l'élément
		 */
		$scope.save = function() {
			$scope.data.$save($scope.restServiceParams, $scope.saveCompleted);
		}
		
		/**
		 * Méthode 'saveCompleted' : Méthode appelée après l'enregistrement des données (CallBack)
		 */
		$scope.saveCompleted = function() {
			$scope.setEditing(false);
			$scope.loadData();
		}
		
		/**
		 * Méthode 'remove' : Supprime  l'élément
		 */
		$scope.remove = function() {
			$scope.data.$remove($scope.restServiceParams, $scope.removeCompleted);
			$scope.setEditing(false);
		}
		
		/**
		 * Méthode 'removeCompleted' : Méthode appelée après la suppression de l'élément (CallBack)
		 */
		$scope.removeCompleted = function() {
			$scope.goBack();
		}
		
		/**
		 * Méthode 'goBack' : Méthode permettant de revenir à la page précedente (mainPage)
		 */
		$scope.goBack = function () {
			$scope.go(mainPage);
		}		

		$scope.loadData();
		
	};
	
	/**
	 * Méthode 'applyEditViewService($scope, primaryRestService)' : Permet de rendre visible un ensemble de methode / services dans le "$scope" actuel
	 * ainsi que d'initialiser des valeurs nécessaire à la mise en page de type "Visualisation/Edition"
	 */
	pageService.applyCreationViewService = function($scope, primaryRestService, mainPage) {
				
		pageService.setGoFunction($scope);
		
		$scope.data = null;
		 
		/**
		 * Méthode 'save' : Enregistre / créer l'élément
		 */
		$scope.save =function() {
			primaryRestService.create($scope.data,  $scope.saveCompleted);
		}
		
		/**
		 * Méthode 'saveCompleted' : Méthode appelée après la création de l'élément (CallBack)
		 */
		$scope.saveCompleted = function() {
			$scope.goBack();
		}
		
		/**
		 * Méthode 'goBack' : Méthode permettant de revenir à la page précedente (mainPage)
		 */
		$scope.goBack = function () {
			$scope.go(mainPage);
		}
		
	};
	
	return pageService;
}]);


/**
 * Service permettant de réaliser un "Select" sur une liste
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
 * Propose les services suivants :
 *  - get : obtenir une "ligne" de la table
 *  - list : obtenir l'ensemble des "lignes" de la table
 *  - save : enregistrer un objet / une ligne modifiée
 *  - create : créer une nouvel objet/ une nouvelle ligne dans la table
 *  - delete : supprimer un élément de la table
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


