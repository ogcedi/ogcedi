var app = angular.module("statsApp", [ 'nvd3ChartDirectives' ]);

function ExampleCtrl($scope) {
	$scope.UV = [ {
		key : "UV1",
		y : 5
	}, {
		key : "UV2",
		y : 2
	}, {
		key : "UV3",
		y : 9
	}, {
		key : "UV4",
		y : 7
	}, {
		key : "UV5",
		y : 4
	}, {
		key : "UV6",
		y : 3
	}, {
		key : "UV7",
		y : 9
	} ];
	$scope.module = [ {
		key : "module1",
		y : 8
	}, {
		key : "module2",
		y : 12
	}, {
		key : "module3",
		y : 4
	}, {
		key : "module4",
		y : 7
	}, {
		key : "module5",
		y : 4
	}, {
		key : "module6",
		y : 3
	}, {
		key : "module7",
		y : 9
	} ];

	$scope.datas = $scope.UV;

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
			return 'Super New Tooltip' + '<h1>' + key + '</h1>' + '<p>' + y
			+ ' at ' + x + '</p>'
		};
	};

	$scope.changePie = function(type) {
		if (type === "UV")
			$scope.datas = $scope.UV;
		if (type === "module")
			$scope.datas = $scope.module;
	};

	$scope.enseignant1 = [ {
		key : "Enseignant 1",
		values : [ [ "Module1", 16 ], [ "Module2", 5 ],
		           [ "Module3", 7 ], [ "Module4", 15 ] ]
	} ];
	
	$scope.enseignant2 = [ {
		key : "Enseignant 2",
		values : [ [ "Module1", 12 ], [ "Module2", 15 ],
		           [ "Module3", 6 ], [ "Module4", 13 ],
		           [ "Module5", 19 ]]
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