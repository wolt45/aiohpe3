var IOHPEApp = angular.module('IOHPEApp', [
    'ngRoute'
]);

IOHPEApp.config(function($routeProvider) {
  $routeProvider.
    when('/', { templateUrl: '..//common/today_list.html', controller: 'PXListCtrl' }).

    when('/:p_clinixrid', { templateUrl: 'tplpe/px_pe.html', controller: 'PXDetailCtrl' }).

    when('/knee/:p_pxrid', { templateUrl: 'tplpe/px_pe.html', controller: 'PXDetailCtrl' }).
    
    otherwise({ redirectTo: '/' });
});