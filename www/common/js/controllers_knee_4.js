IOHPEApp.controller('knee_4_Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_Knee_4 = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadKnee4 = function(){
    var promise = $ipadrbg.context.jdata_Knee_4.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_Knee_4 = pxresult;
      });

    $scope.SportsKnee4= {
    ClinixRID  : $scope.clinix.ClinixRID
    ,PxRID     : $scope.clinix.PxRID

    ,KneeandLeg : pxresult[0]['KneeandLeg']
    ,FlexionActive : pxresult[0]['FlexionActive']
    ,FlexionPassive : pxresult[0]['FlexionPassive']
    ,FlexionWithPain : pxresult[0]['FlexionWithPain']
    ,FlexionCrepitation : pxresult[0]['FlexionCrepitation']
    ,FlexionMMT : pxresult[0]['FlexionMMT']
    ,ExtensionPassive : pxresult[0]['ExtensionPassive']
    ,ExtensionActive : pxresult[0]['ExtensionActive']
    ,ExtensionWithPain : pxresult[0]['ExtensionWithPain']
    ,ExtensionCrepitation : pxresult[0]['ExtensionCrepitation']
    ,ExtensionMMT : pxresult[0]['ExtensionMMT']
    ,GaitNormalAbnormal : pxresult[0]['GaitNormalAbnormal']
    ,GaitType : pxresult[0]['GaitType']

    }

    });
  }; 

   $scope.LoadKnee4();

  $scope.addNew_Knee4 = function (frmknee4) {
    
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      tx.executeSql("delete from 'jdata_Knee_4' WHERE ClinixRID = " + $scope.ClinixRID);
    });
    
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,KneeandLeg : frmknee4.KneeandLeg
      ,FlexionActive : frmknee4.FlexionActive
      ,FlexionPassive : frmknee4.FlexionPassive
      ,FlexionWithPain : frmknee4.FlexionWithPain
      ,FlexionCrepitation : frmknee4.FlexionCrepitation
      ,FlexionMMT : frmknee4.FlexionMMT
      ,ExtensionPassive : frmknee4.ExtensionPassive
      ,ExtensionActive : frmknee4.ExtensionActive
      ,ExtensionWithPain : frmknee4.ExtensionWithPain
      ,ExtensionCrepitation : frmknee4.ExtensionCrepitation
      ,ExtensionMMT : frmknee4.ExtensionMMT
      ,GaitNormalAbnormal : frmknee4.GaitNormalAbnormal
      ,GaitType : frmknee4.GaitType

    }
    $ipadrbg.context.jdata_Knee_4.add(newrecord);
    $ipadrbg.context.jdata_Knee_4.saveChanges();

    alert("Knee Data Saved!");

    $scope.LoadKnee4();    
  }

  $scope.removeKnee4 = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_Knee_4' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.SportsKnee4 = [];
    }
  }

});