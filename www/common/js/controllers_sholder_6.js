IOHPEApp.controller('shoulder_6_Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_shoulder_6 = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.Loadshoulder6 = function(){
    var promise = $ipadrbg.context.jdata_shoulder_6.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_shoulder_6 = pxresult;
      });

    $scope.Sportshoulder6 = {
    ClinixRID  : $scope.clinix.ClinixRID
    ,PxRID     : $scope.clinix.PxRID

    ,BrachialArtery : pxresult[0]['BrachialArtery']
    ,BrachialArteryDescrip : pxresult[0]['BrachialArteryDescrip']
    ,Color : pxresult[0]['Color']

  }

    });
  }; 

   $scope.Loadshoulder6();

  $scope.addNew_shoulder6 = function (frmshoulder6) {
    
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      tx.executeSql("delete from 'jdata_shoulder_6' WHERE ClinixRID = " + $scope.ClinixRID);
    });
    
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,BrachialArtery : frmshoulder6.BrachialArtery
      ,BrachialArteryDescrip : frmshoulder6.BrachialArteryDescrip
      ,Color : frmshoulder6.Color

    }
    $ipadrbg.context.jdata_shoulder_6.add(newrecord);
    $ipadrbg.context.jdata_shoulder_6.saveChanges();

    alert("Shoulder Data Saved!");

    $scope.Loadshoulder6();    
  }

  $scope.removeshoulder6 = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_shoulder_6' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.Sportshoulder6 = [];
    }
  }

});