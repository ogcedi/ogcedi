'use strict';

/* Directives */

var ogcediDirectives = angular.module('ogcediDirectives', []);

ogcediDirectives.directive('ngConfirmClick', [
     function() {
       return {
         priority: 1,
         link: function(scope, element, attr) {
           var msg = attr.ngConfirmClick || "Are you sure?";
           var clickAction = attr.ngConfirmClickAction;
           attr.ConfirmClickAction= "";
           element.bind('click', function(event) {
             if (window.confirm(msg)) {
               scope.$eval(clickAction)
             }
           });
         }
       };
     }
]);
ogcediDirectives.directive('ngConfirmClickAction', function(){return {};});
