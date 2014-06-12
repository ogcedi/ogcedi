'use strict';

/* Directives */

/*app.directive('ngConfirmClick', [
     function() {
       return {
         priority: 1,
         link: function(scope, element, attr) {
           var msg = attr.ngConfirmClick || "Are you sure?";
           var clickAction = attr.ngClick;
           attr.ngClick = "";
           element.bind('click', function(event) {
             if (window.confirm(msg)) {
               scope.$eval(clickAction)
             }
           });
         }
       };
     }
   ]);*/