IOHPEApp.controller('knee_5_Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_Knee_5 = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadKnee5 = function(){
    var promise = $ipadrbg.context.jdata_Knee_5.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_Knee_5 = pxresult;
      });

    $scope.SportsKnee5= {
    ClinixRID  : $scope.clinix.ClinixRID
    ,PxRID     : $scope.clinix.PxRID

    ,PopliteralArtery : pxresult[0]['PopliteralArtery']
    ,PopliteralArteryDescrip : pxresult[0]['PopliteralArteryDescrip']
    ,Color : pxresult[0]['Color']

    }

    });
  }; 

   $scope.LoadKnee5();

  $scope.addNew_Knee5 = function (frmknee5) {
    
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      tx.executeSql("delete from 'jdata_Knee_5' WHERE ClinixRID = " + $scope.ClinixRID);
    });
    
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,PopliteralArtery : frmknee5.PopliteralArtery
      ,PopliteralArteryDescrip : frmknee5.PopliteralArteryDescrip
      ,Color : frmknee5.Color

    }
    $ipadrbg.context.jdata_Knee_5.add(newrecord);
    $ipadrbg.context.jdata_Knee_5.saveChanges();

    alert("Knee Data Saved!");

    $scope.LoadKnee5();    
  }

  $scope.removeKnee5 = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_Knee_5' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.SportsKnee5 = [];
    }
  }

});