IOHPEApp.controller('knee_1_Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_Knee_1 = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadKnee1 = function(){
    var promise = $ipadrbg.context.jdata_Knee_1.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_Knee_1 = pxresult;
      });

    $scope.SportsKnee1 = {
    ClinixRID  : $scope.clinix.ClinixRID
    ,PxRID     : $scope.clinix.PxRID

    ,Ambulation : pxresult[0]['Ambulation']
    ,Sensorium : pxresult[0]['Sensorium']
    ,Conjunctivae : pxresult[0]['Conjunctivae']
    ,ChestExpansion : pxresult[0]['ChestExpansion']
    ,Cardiac : pxresult[0]['Cardiac']
    ,Abdomen : pxresult[0]['Abdomen']
  
  }

    });
  }; 

   $scope.LoadKnee1();

  $scope.addNew_Knee1 = function (frmknee1) {
    
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      tx.executeSql("delete from 'jdata_Knee_1' WHERE ClinixRID = " + $scope.ClinixRID);
    });
    
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,Ambulation : frmknee1.Ambulation
      ,Sensorium : frmknee1.Sensorium
      ,Conjunctivae : frmknee1.Conjunctivae
      ,ChestExpansion : frmknee1.ChestExpansion
      ,Cardiac : frmknee1.Cardiac
      ,Abdomen : frmknee1.Abdomen

    }
    $ipadrbg.context.jdata_Knee_1.add(newrecord);
    $ipadrbg.context.jdata_Knee_1.saveChanges();

    alert("knee Data Saved!");

    $scope.LoadKnee1();    
  }

  $scope.removeKnee1 = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_Knee_1' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.SportsKnee1 = [];
    }
  }

});