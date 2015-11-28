IOHPEApp.controller('sf3603Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_SF3603 = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.Loadsf363 = function(){
    var promise = $ipadrbg.context.jdata_SF3603.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_SF3603 = pxresult;
      });

        $scope.sf363 = {
        ClinixRID  : $scope.clinix.ClinixRID
        ,PxRID     : $scope.clinix.PxRID

        ,sf4a : pxresult[0]['sf4a']
        ,sf4b : pxresult[0]['sf4b']
        ,sf4c : pxresult[0]['sf4c']
        ,sf4d : pxresult[0]['sf4d']
      
      }

    });
  }; 

   $scope.Loadsf363();

  $scope.addNewsf363 = function (frmsf363) {
     var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
     db.transaction(function (tx) {
       tx.executeSql("delete from 'jdata_SF3603' WHERE ClinixRID = " + $scope.ClinixRID);
     });
    
     newrecord = {
       ClinixRID : $scope.clinix.ClinixRID
       ,PxRID    : $scope.clinix.PxRID

      ,sf4a : frmsf363.sf4a
      ,sf4b : frmsf363.sf4b
      ,sf4c : frmsf363.sf4c
      ,sf4d : frmsf363.sf4d
       

    }
    $ipadrbg.context.jdata_SF3603.add(newrecord);
    $ipadrbg.context.jdata_SF3603.saveChanges();

    alert("Sf 36 Data Saved!");

    $scope.Loadsf363();    
  }

  $scope.removesf363 = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_SF3603' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.sf363 = [];
    }
  }

});