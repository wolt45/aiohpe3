IOHPEApp.controller('sf3607Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_SF3607 = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.Loadsf367 = function(){
    var promise = $ipadrbg.context.jdata_SF3607.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_SF3607 = pxresult;
      });

        $scope.sf367 = {
        ClinixRID  : $scope.clinix.ClinixRID
        ,PxRID     : $scope.clinix.PxRID

        ,sf10a : pxresult[0]['sf10a']
      
      }

    });
  }; 

   $scope.Loadsf367();

  $scope.addNewsf367 = function (frmsf367) {
     var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
     db.transaction(function (tx) {
       tx.executeSql("delete from 'jdata_SF3607' WHERE ClinixRID = " + $scope.ClinixRID);
     });
    
     newrecord = {
       ClinixRID : $scope.clinix.ClinixRID
       ,PxRID    : $scope.clinix.PxRID

      ,sf10a : frmsf367.sf10a
    
       

    }
    $ipadrbg.context.jdata_SF3607.add(newrecord);
    $ipadrbg.context.jdata_SF3607.saveChanges();

    alert("Sf 36 Data Saved!");

    $scope.Loadsf367();    
  }

  $scope.removesf367 = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_SF3607' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.sf367 = [];
    }
  }

});