var IOHPEApp = angular.module('IOHPEApp', [
    'ngRoute'
    ,'checklist-model'
]);

IOHPEApp.config(function($routeProvider) {
  $routeProvider.
    when('/', { templateUrl: 'tplpe/today_list_pe.html', controller: 'PXListPECtrl' }).
    when('/homeZZZ', { templateUrl: '..//index.html' }).
 
    when('/:p_clinixrid', { templateUrl: 'tplpe/px_pe.html', controller: 'PXDetailCtrl' }).

    when('/interview/:p_clinixrid', { templateUrl: 'tplpe/vw_interview.html', controller: 'PXDetailCtrl' }).
    
    when('/peHIP/:p_clinixrid', { templateUrl: 'tplpe/px_hip.html', controller: 'PXDetailCtrl' }).
    when('/peKNEE/:p_clinixrid', { templateUrl: 'tplpe/px_knee.html', controller: 'PXDetailCtrl' }).
    
    when('/diagnosis/:p_clinixrid', { templateUrl: 'tplpe/common_diagnosis.html', controller: 'PXDetailCtrl' }).
    
    when('/billing/:p_clinixrid', { templateUrl: 'tplpe/close_PEcharges.html', controller: 'PXDetailCtrl' }).
    

    when('/preopHIP/:p_clinixrid', { templateUrl: 'tplpe/PREOpHIPreplc.html', controller: 'PXDetailCtrl' }).
    when('/opHIP/:p_clinixrid', { templateUrl: 'tplpe/OPHIP.html', controller: 'PXDetailCtrl' }).
    when('/postopHIP/:p_clinixrid', { templateUrl: 'tplpe/POSTOpHIPreplc.html', controller: 'PXDetailCtrl' }).

    when('/preopKNEE/:p_clinixrid', { templateUrl: 'tplpe/PREOpKNEEreplc.html', controller: 'PXDetailCtrl' }).
    when('/opKNEE/:p_clinixrid', { templateUrl: 'tplpe/OPKNEE.html', controller: 'PXDetailCtrl' }).
    when('/postopKNEE/:p_clinixrid', { templateUrl: 'tplpe/POSTOpKNEEreplc.html', controller: 'PXDetailCtrl' }).

    when('/structuredDischarge/:p_clinixrid', { templateUrl: 'tplpe/structured_discharge_summary.html', controller: 'PXDetailCtrl' }).

    otherwise({ redirectTo: '/' });
});