var app = angular.module("statsApp", [ 'nvd3ChartDirectives' ]);

function ExampleCtrl($scope) {

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
}