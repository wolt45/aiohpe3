IOHPEApp.controller('shoulder_2_Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_shoulder_2 = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.Loadshoulder2 = function(){
    var promise = $ipadrbg.context.jdata_shoulder_2.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_shoulder_2 = pxresult;
      });

    $scope.Sportsholder2 = {
    ClinixRID  : $scope.clinix.ClinixRID
    ,PxRID     : $scope.clinix.PxRID

    ,Ambulation : pxresult[0]['Ambulation']
    ,Sensorium : pxresult[0]['Sensorium']
    ,Conjunctivae : pxresult[0]['Conjunctivae']
    ,Cardiac : pxresult[0]['Cardiac']
    ,ChestExpansion : pxresult[0]['ChestExpansion']
    ,Abdomen : pxresult[0]['Abdomen']

  }

    });
  }; 

   $scope.Loadshoulder2();

  $scope.addNew_shoulder2 = function (frmshoulder2) {
    
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      tx.executeSql("delete from 'jdata_shoulder_2' WHERE ClinixRID = " + $scope.ClinixRID);
    });
    
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,Ambulation : frmshoulder2.Ambulation
      ,Sensorium : frmshoulder2.Sensorium
      ,Conjunctivae : frmshoulder2.Conjunctivae
      ,Cardiac : frmshoulder2.Cardiac
      ,ChestExpansion : frmshoulder2.ChestExpansion
      ,Abdomen : frmshoulder2.Abdomen

    }
    $ipadrbg.context.jdata_shoulder_2.add(newrecord);
    $ipadrbg.context.jdata_shoulder_2.saveChanges();

    alert("Shoulder Data Saved!");

    $scope.Loadshoulder2();    
  }

  $scope.removeshoulder2 = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_shoulder_2' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.Sportsholder2 = [];
    }
  }

});