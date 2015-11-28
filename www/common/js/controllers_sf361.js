IOHPEApp.controller('sf3601Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_SF3601 = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.Loadsf361 = function(){
    var promise = $ipadrbg.context.jdata_SF3601.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_SF3601 = pxresult;
      });

        $scope.sf361 = {
        ClinixRID  : $scope.clinix.ClinixRID
        ,PxRID     : $scope.clinix.PxRID

        ,Health : pxresult[0]['Health']
        ,Health2 : pxresult[0]['Health2']
      
      }

    });
  }; 

   $scope.Loadsf361();

  $scope.addNewsf3601 = function (frmsf361) {
    
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      tx.executeSql("delete from 'jdata_SF3601' WHERE ClinixRID = " + $scope.ClinixRID);
    });
    
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,Health : frmsf361.Health
      ,Health2 : frmsf361.Health2

    }
    $ipadrbg.context.jdata_SF3601.add(newrecord);
    $ipadrbg.context.jdata_SF3601.saveChanges();

    alert("Sf 36 Data Saved!");

    $scope.Loadsf361();    
  }

  $scope.removesf361 = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_SF3601' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.sf361 = [];
    }
  }

});