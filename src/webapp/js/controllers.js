'use strict';

/* Controllers */

var ogcediControllers = angular.module('ogcediControllers', []);

/*
 * Ensemble des controleurs correspondant � chaque vue (sauf Statistiques),
 *  voir ogcedi/src/webapp/js/app.js (associe une url � un controleur et � une "vue" (r�pertoire "partials"))
 *  
 *  De mani�re g�n�rale :
 *   -  3 contr�leurs par entit� pour le listage, la consultation / modification et pour la cr�ation
 *   -  le "$scope", le service PageService et au moins un service REST correspondant � l'entit� "principal"
 *   	sont inject�s dans le contr�leur.  
 *   
 *  Les services se trouvent dans le script ogcedi/src/webapp/js/services.js 
 */



/* *************************************************
 * Controleurs PERSONNE                            *
 ***************************************************/

/**
 * Controleur 'PersonneListCtrl' : Liste des personnes
 */
ogcediControllers.controller('PersonneListCtrl', ['$scope', 'Personne', 'PageService', function($scope, Personne, PageService) {
	
	PageService.applyListViewService($scope, Personne);
	PageService.loadData();
	
}]);


/**
 * Controleur 'PersonneDetailCtrl' : Consultation / Edition d'une personne
 */
ogcediControllers.controller('PersonneDetailCtrl', ['$scope', 'Personne', 'PageService', function($scope, Personne, PageService){
	
	PageService.applyEditViewService($scope, Personne, '/personnes');
		
}]);


/**
 * Controleur 'PersonneCreationCtrl' : Cr�ation d'une personne
 */
ogcediControllers.controller('PersonneCreationCtrl', ['$scope', 'Personne', 'PageService', function($scope, Personne, PageService){
	
	PageService.applyCreationViewService($scope, Personne, '/personnes');
		
}]);


/* *************************************************
 * Controller FORMATION                            *
 ***************************************************/

/**
 * Controleur 'FormationListCtrl' : Liste des formations
 */
ogcediControllers.controller('FormationListCtrl', ['$scope', 'Formation', 'PageService', function($scope, Formation, PageService) {
			
	PageService.applyListViewService($scope, Formation);
	PageService.loadData();
	
}]);


/**
 * Controleur 'FormationDetailCtrl' : Consultation / Edition d'une formation
 */
ogcediControllers.controller('FormationDetailCtrl', ['$scope', 'Formation', 'PageService', function($scope, Formation, PageService){
	
	PageService.applyEditViewService($scope, Formation, '/formations');
		
}]);


/**
 * Controleur 'FormationCreationCtrl' : Cr�ation d'une formation
 */
ogcediControllers.controller('FormationCreationCtrl', ['$scope', 'Formation', 'PageService', function($scope, Formation, PageService){
	
	PageService.applyCreationViewService($scope, Formation, '/formations');
		
}]);



/* *************************************************
 * Controller PROMOTION                            *
 ***************************************************/

/**
 * Controleur 'PromotionListCtrl' : Liste des promotions
 */
ogcediControllers.controller('PromotionListCtrl', ['$scope', 'Promotion', 'Formation', 'SelectService', 'PageService', function($scope, Promotion, Formation, SelectService, PageService) {
	
	PageService.applyListViewService($scope, Promotion);
		
	$scope.loadData = function(){
		function loadPromotions() {
			PageService.loadData();
		};
		$scope.formations = Formation.list(loadPromotions);
	}
	
	$scope.getFormation = function(promotion) {
		return SelectService.byId($scope.formations, promotion.Formation_id)
	}
	
	$scope.loadData();
	
}]);


/**
 * Controleur 'PromotionDetailCtrl' : Consultation / Edition d'une promotion
 */
ogcediControllers.controller('PromotionDetailCtrl', ['$scope', 'Promotion', 'PageService', function($scope, Promotion, PageService){
	
	PageService.applyEditViewService($scope, Promotion, '/promotions');
		
}]);


/**
* Controleur 'PromotionCreationCtrl' : Cr�ation d'une promotion
*/
ogcediControllers.controller('PromotionCreationCtrl', ['$scope', 'Promotion', 'Formation', 'PageService', function($scope, Promotion, Formation, PageService){

	PageService.applyCreationViewService($scope, Promotion, '/promotions');
	$scope.formations = Formation.list()
	
}]);



/* *************************************************
 * Controleurs UV                                   *
 ***************************************************/

/**
 * Controleur 'UvListCtrl' : Liste des UV
 */
ogcediControllers.controller('UvListCtrl', ['$scope', 'Uv', 'Promotion', 'Formation', 'SelectService', 'PageService', function($scope, Uv, Promotion, Formation, SelectService, PageService) {

	PageService.applyListViewService($scope, Uv);
		
	$scope.loadData = function(){
		
		function loadUvs() {
			PageService.loadData();
		};
		
		function loadPromotions() {
			$scope.promotions = Promotion.list(loadUvs);
		};
	
		$scope.formations = Formation.list(loadPromotions);
	}
	
	$scope.getPromotion = function(uv) {
		return SelectService.byId($scope.promotions, uv.Promotion_id);
	}
	
	$scope.getFormation = function(uv) {
		var promotion = $scope.getPromotion(uv);
		return SelectService.byId($scope.formations, promotion.Formation_id);
	}
	
	$scope.loadData();
	
}]);


/**
 * Controleur 'UvDetailCtrl' : Consultation / Edition d'un UV
 */
ogcediControllers.controller('UvDetailCtrl', ['$scope', 'Uv', 'PageService', function($scope, Uv, PageService){
		
	PageService.applyEditViewService($scope, Uv, '/uvs');
	
}]);


/**
 * Controleur 'UvCreationCtrl' : Cr�ation d'un UV
 */
ogcediControllers.controller('UvCreationCtrl', ['$scope', 'Uv', 'Formation', 'Promotion', 'SelectService', 'PageService', function($scope, Uv, Formation, Promotion, SelectService, PageService){

	PageService.applyCreationViewService($scope, Uv, '/uvs');
	
	$scope.getFormation = function(promotion) {
		return SelectService.byId($scope.formations, promotion.Formation_id);
	}
	
	function loadPromotions() {
		$scope.promotions = Promotion.list();
	};

	$scope.formations = Formation.list(loadPromotions);
		
}]);


