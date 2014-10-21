var IOHPEApp = angular.module('IOHPEApp', [
    'ngRoute'
    ,'checklist-model'
]);

IOHPEApp.config(function($routeProvider) {
  $routeProvider.
    when('/', { templateUrl: 'tplpe/today_list_pe.html', controller: 'PXListPECtrl' }).

    when('/:p_clinixrid', { templateUrl: 'tplpe/px_pe.html', controller: 'PXDetailCtrl' }).



    when('/preopts_hip/:p_clinixrid', { templateUrl: 'tplpe/PREOpHIPreplc.html', controller: 'PREOpHIP_preformCtrl' }).

    otherwise({ redirectTo: '/' });
});