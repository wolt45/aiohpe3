var IOHPEApp = angular.module('IOHPEApp', [
    'ngRoute'
]);

IOHPEApp.config(function($routeProvider) {
  $routeProvider
    .when('/', { templateUrl: '..//common/today_list.html', controller: 'PXListCtrl' })
    .when('/main', { templateUrl: '..//index.html'})
    .when('/:p_clinixrid', { templateUrl: 'tpl/px_iohpe.html', controller: 'PXDetailCtrl' })

    .when('/:p_chiefcomp/edit', { templateUrl: 'tpl/px_iohpe.html', controller: 'ChiefComplaintCtrl' })


    .otherwise({ redirectTo: '/' });
});