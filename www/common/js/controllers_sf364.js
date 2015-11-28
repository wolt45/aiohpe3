IOHPEApp.controller('sf3604Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_SF3604 = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.Loadsf364 = function(){
    var promise = $ipadrbg.context.jdata_SF3604.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_SF3604 = pxresult;
      });

        $scope.sf363 = {
        ClinixRID  : $scope.clinix.ClinixRID
        ,PxRID     : $scope.clinix.PxRID

        ,sf5a : pxresult[0]['sf5a']
        ,sf5b : pxresult[0]['sf5b']
        ,sf5c : pxresult[0]['sf5c']
      
      }

    });
  }; 

   $scope.Loadsf364();

  $scope.addNewsf364 = function (frmsf364) {
     var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
     db.transaction(function (tx) {
       tx.executeSql("delete from 'jdata_SF3604' WHERE ClinixRID = " + $scope.ClinixRID);
     });
    
     newrecord = {
       ClinixRID : $scope.clinix.ClinixRID
       ,PxRID    : $scope.clinix.PxRID

      ,sf5a : frmsf364.sf5a
      ,sf5b : frmsf364.sf5b
      ,sf5c : frmsf364.sf5c
    
       

    }
    $ipadrbg.context.jdata_SF3604.add(newrecord);
    $ipadrbg.context.jdata_SF3604.saveChanges();

    alert("Sf 36 Data Saved!");

    $scope.Loadsf364();    
  }

  $scope.removesf364 = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_SF3604' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.sf364 = [];
    }
  }

});