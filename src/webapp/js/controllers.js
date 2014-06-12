'use strict';

/* Controllers */

var ogcediControllers = angular.module('ogcediControllers', []);

ogcediControllers.controller('StatsController', ['$scope', function($scope) {

	$scope.mainDatas = [
	                    {
	                    	key : "A1S",
	                    	values : [ [ "Base de la programmation", 45 ], [ "P2I", 10 ],
	                    	           [ "Methodes de programmation", 40 ] ]
	                    },
	                    {
	                    	key : "A2S",
	                    	values : [
	                    	          [ "Info pour nouveaux entrants", 45 ],
	                    	          [ "Integration logicielle (tronc commun)", 45 ],
	                    	          [ "Systeme d'Information (Domaine (GIPAD-GSI-OMTI))",
	                    	            45 ],
	                    	            [ "Intro aux Tec. D'AD (Domaine (GOPL-GIPAD))", 45 ],
	                    	            [ "Langages de \"nouvelle generation\" (GSI-OMTI)", 45 ],
	                    	            [ "Graphes et algorithmes (GIPAD)", 45 ] ]
	                    },
	                    {
	                    	key : "A2S2",
	                    	values : [
	                    	          [
	                    	           "Developpement et Qualite Logicielle (GSI-GIPAD-OMTI)",
	                    	           45 ],
	                    	           [
	                    	            "Patrons de Conception et Architecture Logicielle (GSI-OMTI)",
	                    	            45 ],
	                    	            [ "Systemes Concurrents et Repartis (GSI-OMTI)", 45 ],
	                    	            [ "Langages et techniques de Modelisation (GIPAD)", 45 ],
	                    	            [ "Structure et Execution des langages de Programmation (GSI)", 45 ],
	                    	            [ "Methodes de resolution sous contrainte (GIPAD)", 44, 5 ] ]
	                    } ];
	$scope.$on('tooltipShow.directive', function(event) {
		console.log('scope.tooltipShow', event);
	});
	$scope.$on('tooltipHide.directive', function(event) {
		console.log('scope.tooltipHide', event);
	});
	$scope.A1S = [ {
		key : "Bases de la programmation",
		y : 45
	}, {
		key : "P2I (espace integration)",
		y : 10
	}, {
		key : "Methodes de programmation",
		y : 40
	} ];
	$scope.A2S = [ {
		key : "Info pour nouveaux entrants",
		y : 45
	}, {
		key : "Integration logicielle (tronc commun)",
		y : 45
	}, {
		key : "Systeme d'Information (Domaine (GIPAD-GSI-OMTI))",
		y : 45
	}, {
		key : "Intro aux Tec. D'AD (Domaine (GOPL-GIPAD))",
		y : 45
	}, {
		key : "Langages de \"nouvelle generation\" (GSI-OMTI)",
		y : 45
	}, {
		key : "Graphes et algorithmes (GIPAD)",
		y : 45
	} ];
	$scope.A2S2 = [ {
		key : "Developpement et Qualite Logicielle (GSI-GIPAD-OMTI)",
		y : 45
	}, {
		key : "Patrons de Conception et Architecture Logicielle (GSI-OMTI)",
		y : 45
	}, {
		key : "Systemes Concurrents et Repartis (GSI-OMTI)",
		y : 45
	}, {
		key : "Langages et techniques de Modelisation (GIPAD)",
		y : 45
	}, {
		key : "Structure et Execution des langages de Programmation (GSI)",
		y : 45
	}, {
		key : "Methodes de resolution sous contrainte (GIPAD)",
		y : 44.5
	} ];
	$scope.datas = $scope.A1S;
	$scope.xFunction = function() {
		return function(d) {
			return d.key;
		};
	};
	$scope.yFunction = function() {
		return function(d) {
			return d.y;
		};
	};
	$scope.descriptionFunction = function() {
		return function(d) {
			return d.key;
		}
	};
	$scope.toolTipContentFunction = function() {
		return function(key, x, y, e, graph) {
			return '' + key + '<p>' + x + 'h</p>'
		};
	};
	$scope.changePie = function(type) {
		if (type === "A1S")
			$scope.datas = $scope.A1S;
		if (type === "A2S")
			$scope.datas = $scope.A2S;
		if (type === "A2S2")
			$scope.datas = $scope.A2S2;
	};
	$scope.enseignant1 = [ {
		key : "Enseignant 1",
		values : [ [ "Module1", 16 ], [ "Module2", 5 ], [ "Module3", 7 ],
		           [ "Module4", 15 ] ]
	} ];
	$scope.enseignant2 = [ {
		key : "Enseignant 2",
		values : [ [ "Module1", 12 ], [ "Module2", 15 ], [ "Module3", 6 ],
		           [ "Module4", 13 ], [ "Module5", 19 ] ]
	} ];
	$scope.datasBar = $scope.enseignant1;
	$scope.$on('tooltipShow.directive', function(event) {
		console.log('scope.tooltipShow', event);
	});
	$scope.$on('tooltipHide.directive', function(event) {
		console.log('scope.tooltipHide', event);
	});
	$scope.changeBar = function(ens) {
		if (ens === "ens1")
			$scope.datasBar = $scope.enseignant1;
		if (ens === "ens2")
			$scope.datasBar = $scope.enseignant2;
	};
}]);

ogcediControllers.controller('PersonneListCtrl', ['$scope', 'Personne', function($scope, Personne) {
			
	$scope.loadPersonnes = function() {
		$scope.personnes = [];
		$scope.data = Personne.list();
	};
		
	$scope.$watch(function(){return $scope.data.length;}, function(length) {	 		 
		if(length) {
			$scope.personnesCount = length;
			var dataCopy =  $scope.data.slice();
	    	dataCopy.splice($scope.personnes.length, Math.max(0, length-$scope.limit));
	    	
	    	dataCopy.forEach(function(personne) {
	    		$scope.personnes.push(personne);
	    	});
	    	
		}
	});
	
	$scope.limit = 10;
	$scope.orderProp = "nom";
	$scope.loadPersonnes();
	
}]);


ogcediControllers.controller('PersonneDetailCtrl', ['$scope', '$routeParams', 'Personne', '$location', function($scope, $routeParams, Personne, $location){
	
	$scope.personneId = $routeParams.personneId;
	
	$scope.modif=false;
	
	$scope.load = function()
	{
		$scope.personne = Personne.get({id: $routeParams.personneId});
	}
	
	$scope.load();
	
	$scope.edit = function () {
		$scope.modif = true;
	}
	
	$scope.saved = function() {
		$scope.modif = false;
		$scope.load();
	}
	
	$scope.save = function() {
		$scope.personne.$save({id: $routeParams.personneId}, $scope.saved);
	}
	
	$scope.remove = function() {
		$scope.personne.$remove({id: $routeParams.personneId}, function(){$scope.go('');});
		$scope.modif = false;
	}
		
	$scope.go = function(path) {
		$location.path(path);
	};
		
}]);

//PersonneCreationCtrl

ogcediControllers.controller('PersonneCreationCtrl', ['$scope', 'Personne', '$location', function($scope, Personne, $location){
	
	$scope.save = function() {
		Personne.create($scope.personne, function(){$scope.go('');});
	}
			
	$scope.go = function(path) {
		$location.path(path);
	};
		
}]);


/* *************************************************
 * Controller FORMATION                            *
 ***************************************************/
ogcediControllers.controller('FormationListCtrl', ['$scope', 'Formation', function($scope, Formation) {
			
	$scope.loadFormations = function() {
		$scope.formations = [];
		$scope.data = Formation.list();
	};
		
	$scope.$watch(function(){return $scope.data.length;}, function(length) {	 		 
		if(length) {
			$scope.formationsCount = length;
			var dataCopy =  $scope.data.slice();
	    	dataCopy.splice($scope.formations.length, Math.max(0, length-$scope.limit));
	    	
	    	dataCopy.forEach(function(personne) {
	    		$scope.formations.push(personne);
	    	});
	    	
		}
	});
	
	$scope.limit = 10;
	$scope.orderProp = "nom";
	$scope.loadFormations();
	
}]);


ogcediControllers.controller('FormationDetailCtrl', ['$scope', '$routeParams', 'Formation', '$location', function($scope, $routeParams, Formation, $location){
	
	$scope.personneId = $routeParams.formationId;
	
	$scope.modif=false;
	
	$scope.load = function()
	{
		$scope.formation = Formation.get({id: $routeParams.formationId});
	}
	
	$scope.load();
	
	$scope.edit = function () {
		$scope.modif = true;
	}
	
	$scope.saved = function() {
		$scope.modif = false;
		$scope.load();
	}
	
	$scope.save = function() {
		$scope.formation.$save({id: $routeParams.formationId}, $scope.saved);
	}
	
	$scope.remove = function() {
		$scope.formation.$remove({id: $routeParams.formationId}, function(){$scope.go('');});
		$scope.modif = false;
	}
		
	$scope.go = function(path) {
		$location.path(path);
	};
		
}]);

//FormationCreationCtrl

ogcediControllers.controller('FormationCreationCtrl', ['$scope', 'Formation', '$location', function($scope, Formation, $location){
	
	$scope.save = function() {
		Formation.create($scope.formation, function(){$scope.go('/formations');});
	}
			
	$scope.go = function(path) {
		$location.path(path);
	};
		
}]);


/* *************************************************
 * Controller PROMOTION                            *
 ***************************************************/
ogcediControllers.controller('PromotionListCtrl', ['$scope', 'Promotion', 'Formation', function($scope, Promotion, Formation) {
			
	$scope.loadPromotions = function() {
		$scope.promotions = [];
		$scope.data = Promotion.list();
	};
		
	$scope.$watch(function(){return $scope.data.length;}, function(length) {	 		 
		if(length) {
			$scope.promotionsCount = length;
			var dataCopy =  $scope.data.slice();
	    	dataCopy.splice($scope.promotions.length, Math.max(0, length-$scope.limit));
	    	
	    	dataCopy.forEach(function(personne) {
	    		$scope.promotions.push(personne);
	    	});
	    	
		}
	});
	
	$scope.limit = 10;
	$scope.orderProp = "nom";
	$scope.loadPromotions();
	
}]);


ogcediControllers.controller('PromotionDetailCtrl', ['$scope', '$routeParams', 'Promotion', '$location', function($scope, $routeParams, Promotion, $location){
	
	$scope.personneId = $routeParams.promotionId;
	
	$scope.modif=false;
	
	$scope.load = function()
	{
		$scope.promotion = Promotion.get({id: $routeParams.promotionId});
	}
	
	$scope.load();
	
	$scope.edit = function () {
		$scope.modif = true;
	}
	
	$scope.saved = function() {
		$scope.modif = false;
		$scope.load();
	}
	
	$scope.save = function() {
		$scope.promotion.$save({id: $routeParams.promotionId}, $scope.saved);
	}
	
	$scope.remove = function() {
		$scope.promotion.$remove({id: $routeParams.promotionId}, function(){$scope.go('');});
		$scope.modif = false;
	}
		
	$scope.go = function(path) {
		$location.path(path);
	};
		
}]);

//PromotionCreationCtrl

ogcediControllers.controller('PromotionCreationCtrl', ['$scope', 'Promotion', 'Formation', '$location', function($scope, Promotion, Formation, $location){

	$scope.formations = [];
	$scope.formations = Formation.list();
	
	$scope.save = function() {
		Promotion.create($scope.promotion, function(){$scope.go('/promotions');});
	}
			
	$scope.go = function(path) {
		$location.path(path);
	};
		
}]);


// ---------------------------------------------------------------------------------------------------------------------------





var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('PhoneListCtrl', ['$scope', 'Phone' /*'$http'*/, function($scope, Phone /*$http*/){
	
	$scope.orderProp = 'age';
	$scope.unedonnee='salut !';
	$scope.limit = 10;
		
	$scope.loadPhones = function(){
		
		$scope.phones = Phone.query();
		$scope.phonesCount = $scope.phones.length;
		
		/*
		$http.get('rest/phones.json').success(function(data){
			$scope.phonesCount = data.length;
			$scope.phones = data.splice(0,$scope.limit); 
		});
		*/
	};
	
	
	 $scope.$watch(function(){return $scope.phones.length;}, function(length) {
		 // ou .$watch('phones.length', function(length){
		 		 
	      if(length) { // <= first time length is changed from undefined to 0
	    	  $scope.phonesCount = length; //$scope.phones.length; // <= will log correct length
	    	  if($scope.phones.length > $scope.limit)
	    	  {
	    		  $scope.phones.splice($scope.limit, $scope.phones.length-$scope.limit);	    		  
	    	  }
	      }
	 });
	
	$scope.loadPhones();
	
}]);

/*
 phonecatControllers.controller('PhoneListCtrl', ['$scope', 'Phone', function($scope, Phone) {
  $scope.phones = Phone.query();
  $scope.orderProp = 'age';
}]);

 * 
 */

phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone'/*'$http'*/, '$location', function($scope, $routeParams, Phone /*$http*/, $location){
	
	$scope.phoneId = $routeParams.phoneId;
	
	$scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
		$scope.mainImageUrl = phone.images[0];
	});
	
	$scope.setImage = function(imageUrl) {
		$scope.mainImageUrl = imageUrl;
	}
	
	/*$http.get('rest/' + $routeParams.phoneId + '.json').success(function(data) {
	     $scope.phone = data;
	     $scope.mainImageUrl = data.images[0];
	});
	
	$scope.setImage = function(imageUrl) {
        $scope.mainImageUrl = imageUrl;
    }*/
	
	$scope.say = function(msg) {
        alert( msg + ' !');
    }

	$scope.go = function(path) {
		  $location.path(path);
	};
		
}]);




/*var phonecatApp = angular.module('phonecatApp', []);

phonecatApp.controller('PhoneListCtrl', ['$scope','$http', function ($scope, $http) {
	
	$scope.orderProp = 'age';
	$scope.unedonnee='salut !';
	$scope.limit = 10;
	
	//$http.get('rest/phones.json').success(function(data){
		// ou '../webapp/rest/phones.json' ou '/Projet_OGCEDI/ogcedi/src/webapp/rest/phones.json'
		//$scope.phones = data.splice(0,$scope.limit); // $scope.phones = data;
	//})
	
	$scope.loadPhones = function(){
		$http.get('rest/phones.json').success(function(data){
			$scope.phonesCount = data.length;
			$scope.phones = data.splice(0,$scope.limit); 
		});
	};
	
	$scope.loadPhones();
	  
}]); */

	

//phonecatApp.controller('PhoneListCtrl', function ($scope, $http) {
  /*$scope.phones = [
    {'name': 'Nexus S',
     'snippet': 'Fast just got faster with Nexus S.',
     'age': 1},
    {'name': 'Motorola XOOM™ with Wi-Fi',
     'snippet': 'The Next, Next Generation tablet.',
     'age': 3},
    {'name': 'MOTOROLA XOOM™',
     'snippet': 'The Next, Next Generation tablet.',
     'age': 2}
  ];*/
	
  /*$http.get('rest/phones.json').success(function(data){
	  $scope.phones = data.splice(0,5);
  })
  
  $scope.orderProp = 'age';
  $scope.unedonnee='salut !';
  
});*/

/*
var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('PhoneListCtrl', ['$scope', 'Phone',
  function($scope, Phone) {
    $scope.phones = Phone.query();
    $scope.orderProp = 'age';
  }]);

phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
  function($scope, $routeParams, Phone) {
    $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
      $scope.mainImageUrl = phone.images[0];
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }
  }]);*/
