var AppPXPE = angular.module('AppPXPE', [
    'ngRoute'
]);

AppPXPE.config(function($routeProvider) {
  $routeProvider.
    when('/', { templateUrl: 'tplpe/today_list_pe.html', controller: 'PXListCtrl' }).
    when('/:p_pxrid', { templateUrl: 'tplpe/px_pe.html', controller: 'PXDetailCtrl' }).


    when('/knee/:p_pxrid', { templateUrl: 'tplpe/px_pe.html', controller: 'PXDetailCtrl' }).

    
    otherwise({ redirectTo: '/' });
});


AppPXPE.directive('scrollToBookmark', function() {
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