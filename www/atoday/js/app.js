var IOHPEApp = angular.module('IOHPEApp', [
    'ngRoute'
]);

IOHPEApp.config(function($routeProvider) {
  $routeProvider
    .when('/', { templateUrl: 'tpl/today_list.html', controller: 'PXListCtrl' })
    .when('/main', { templateUrl: '..//index.html'})
    .when('/:p_clinixrid', { templateUrl: 'tpl/px_iohpe.html', controller: 'PXDetailCtrl' })

    .when('/:p_chiefcomp/edit', { templateUrl: 'tpl/px_iohpe.html', controller: 'ChiefComplaintCtrl' })



    .otherwise({ redirectTo: '/' });
});



routerApp.directive('siteHeader', function () {
    return {
        restrict: 'E',
        template: '<button class="btn">{{back}}</button><button class="btn">{{forward}}</button>',
        scope: {
            back: '@back',
            forward: '@forward',
            icons: '@icons'
        },
        link: function(scope, element, attrs) {
            $(element[0]).on('click', function() {
                history.back();
                scope.$apply();
            });
            $(element[1]).on('click', function() {
                history.forward();
                scope.$apply();
            });
        }
    };
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