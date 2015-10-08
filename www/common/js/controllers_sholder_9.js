IOHPEApp.controller('shoulder_9_Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_shoulder_9 = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.Loadshoulder9 = function(){
    var promise = $ipadrbg.context.jdata_shoulder_9.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_shoulder_9 = pxresult;
      });

    $scope.Sportshoulder9 = {
    ClinixRID  : $scope.clinix.ClinixRID
    ,PxRID     : $scope.clinix.PxRID

    ,Assessment : pxresult[0]['Assessment']
    ,Management : pxresult[0]['Management']
    ,Disposition : pxresult[0]['Disposition']

  }

    });
  }; 

   $scope.Loadshoulder9();

  $scope.addNew_shoulder9 = function (frmshoulder9) {
    
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      tx.executeSql("delete from 'jdata_shoulder_9' WHERE ClinixRID = " + $scope.ClinixRID);
    });
    
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,Assessment : frmshoulder9.Assessment
      ,Management : frmshoulder9.Management
      ,Disposition : frmshoulder9.Disposition

    }
    $ipadrbg.context.jdata_shoulder_9.add(newrecord);
    $ipadrbg.context.jdata_shoulder_9.saveChanges();

    alert("Sholder Data Saved!");

    $scope.Loadshoulder9();    
  }

  $scope.removeshoulder9 = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_shoulder_9' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.Sportshoulder9 = [];
    }
  }

});