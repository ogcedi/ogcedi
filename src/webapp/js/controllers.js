'use strict';

/* Controllers */

var ogcediControllers = angular.module('ogcediControllers', []);

ogcediControllers.controller('PersonneListCtrl', ['$scope', 'ListPersonne', function($scope, ListPersonne) {
			
	$scope.loadPersonnes = function() {
		$scope.personnes = [];
		$scope.data = ListPersonne.query();
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
		$scope.personne = Personne.get({personneId: $routeParams.personneId});
	}
	
	$scope.load();
	
	$scope.edit = function () {
		$scope.modif = true;
	}
	
	$scope.save = function() {
		$scope.personne.$save({personneId: $routeParams.personneId});
		$scope.load();
		$scope.modif = false;
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
