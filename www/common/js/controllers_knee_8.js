IOHPEApp.controller('knee_8_Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_Knee_8 = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadKnee8 = function(){
    var promise = $ipadrbg.context.jdata_Knee_8.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_Knee_8 = pxresult;
      });

    $scope.SportsKnee8= {
    ClinixRID  : $scope.clinix.ClinixRID
    ,PxRID     : $scope.clinix.PxRID

    ,Assessment : pxresult[0]['Assessment']
    ,Management : pxresult[0]['Management']
    ,Disposition : pxresult[0]['Disposition']
   
    }

    });
  }; 

   $scope.LoadKnee8();

  $scope.addNew_Knee8 = function (frmknee8) {
    
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      tx.executeSql("delete from 'jdata_Knee_8' WHERE ClinixRID = " + $scope.ClinixRID);
    });
    
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,Assessment : frmknee8.Assessment
      ,Management : frmknee8.Management
      ,Disposition : frmknee8.Disposition

    }
    $ipadrbg.context.jdata_Knee_8.add(newrecord);
    $ipadrbg.context.jdata_Knee_8.saveChanges();

    alert("Knee Data Saved!");

    $scope.LoadKnee8();    
  }

  $scope.removeKnee8 = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_Knee_8' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.SportsKnee8 = [];
    }
  }

});