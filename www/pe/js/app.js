var IOHPEApp = angular.module('IOHPEApp', [
    'ngRoute'
    ,'checklist-model'
]);

IOHPEApp.config(function($routeProvider) {
  $routeProvider.
    when('/', { templateUrl: 'tplpe/today_list_pe.html', controller: 'PXListPECtrl' }).
    
    when('/homeZZZ', { templateUrl: '..//index.html' }).
 
    when('/:p_clinixrid', { templateUrl: 'tplpe/px_pe.html', controller: 'PXDetailCtrl' }).

    when('/history/:p_clinixrid', { templateUrl: 'tplpe/hx.html', controller: 'PXDetailCtrl' }).

    when('/interview/:p_clinixrid', { templateUrl: 'tplpe/vw_interview.html', controller: 'PXDetailCtrl' }).
    
    when('/peAmbuStatus/:p_clinixrid', { templateUrl: 'tplpe/common_ambulatorystatus.html', controller: 'AmbulatoryStatusCtrl' }).

    when('/peHIP/:p_clinixrid', { templateUrl: 'tplpe/px_hip.html', controller: 'PXDetailCtrl' }).
    when('/peKNEE/:p_clinixrid', { templateUrl: 'tplpe/px_knee.html', controller: 'PXDetailCtrl' }).

    when('/peSPINE/:p_clinixrid', { templateUrl: 'tplpe/spine.html', controller: 'PXDetailCtrl' }).

    when('/peGenOrtho/:p_clinixrid', { templateUrl: 'tplpe/gen_ortho.html', controller: 'PXDetailCtrl' }).
    when('/peSkelitalTrauma/:p_clinixrid', { templateUrl: 'tplpe/px_skeletaltrauma.html', controller: 'PXDetailCtrl' }).

    when('/peSPORTS_FootAnkle/:p_clinixrid', { templateUrl: 'tplpe/sports_footankle.html', controller: 'PXDetailCtrl' }).
    when('/peSPORTS_Knee/:p_clinixrid', { templateUrl: 'tplpe/sports_knee.html', controller: 'PXDetailCtrl' }).
    when('/peSPORTS_Shoulder/:p_clinixrid', { templateUrl: 'tplpe/sports_shoulder.html', controller: 'PXDetailCtrl' }).

    when('/oby-gyne/:p_clinixrid', { templateUrl: 'tplpe/ob-gyne.html', controller: 'PXDetailCtrl' }).

    when('/diagnosis/:p_clinixrid', { templateUrl: 'tplpe/common_diagnosis.html', controller: 'PXDetailCtrl' }).
    when('/PhyThera/:p_clinixrid', { templateUrl: 'tplpe/phythera.html', controller: 'PXDetailCtrl' }).
    when('/PhyThera2/:p_clinixrid', { templateUrl: 'tplpe/phytheraPT.html', controller: 'PXDetailCtrl' }).
    
    when('/billing/:p_clinixrid', { templateUrl: 'tplpe/close_PEcharges.html', controller: 'PXDetailCtrl' }).

    when('/preopHIP/:p_clinixrid', { templateUrl: 'tplpe/PREOpHIPreplc.html', controller: 'PXDetailCtrl' }).
    when('/opHIP/:p_clinixrid', { templateUrl: 'tplpe/OPHIP.html', controller: 'PXDetailCtrl' }).
    when('/postopHIP/:p_clinixrid', { templateUrl: 'tplpe/POSTOpHIPreplc.html', controller: 'PXDetailCtrl' }).

    when('/preopKNEE/:p_clinixrid', { templateUrl: 'tplpe/PREOpKNEEreplc.html', controller: 'PXDetailCtrl' }).
    when('/opKNEE/:p_clinixrid', { templateUrl: 'tplpe/OPKNEE.html', controller: 'PXDetailCtrl' }).
    when('/postopKNEE/:p_clinixrid', { templateUrl: 'tplpe/POSTOpKNEEreplc.html', controller: 'PXDetailCtrl' }).

    when('/structuredDischarge/:p_clinixrid', { templateUrl: 'tplpe/structured_discharge_summary.html', controller: 'PXDetailCtrl' }).
    
    when('/ORoomPreOp/:p_clinixrid', { templateUrl: 'tplpe/OR-PreOp.html', controller: 'PXDetailCtrl' }).
    when('/ORoomIntraOp/:p_clinixrid', { templateUrl: 'tplpe/OR-IntraOp.html', controller: 'PXDetailCtrl' }).
    when('/ORoomPostOp/:p_clinixrid', { templateUrl: 'tplpe/OR-PostOp.html', controller: 'PXDetailCtrl' }).

    otherwise({ redirectTo: '/' });
});