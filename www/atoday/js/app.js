var IOHPEApp = angular.module('IOHPEApp', [
    'ngRoute'
]);

IOHPEApp.config(function($routeProvider) {
  $routeProvider
    .when('/', {templateUrl: 'tpl/today_list.html',controller: 'PXListCtrl'})
    .when('/:p_clinixrid', {templateUrl: 'tpl/px_iohpe.html',controller: 'PXDetailCtrl'})
    .when('/:p_chiefcomp/edit', {templateUrl: 'tpl/px_iohpe.html',controller: 'ChiefComplaintCtrl'})

    .otherwise({redirectTo: '/'});
});

// don't touch the bookmarks
IOHPEApp.directive('scrollToBookmark', function() {
    return {
      link: function(scope, element, attrs) {
        var value = attrs.scrollToBookmark;
        element.click(function() {
          scope.$apply(function() {
            var selector = "[scroll-bookmark='"+ value +"']";
            var element = $(selector);
            if(element.length)
              window.scrollTo(0, element[0].offsetTop - 10);  // Don't want the top to be the exact element, -100 will go to the top for a little bit more
          });
        });
      }
    };
});