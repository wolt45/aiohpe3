IOHPEApp.controller('sf3605Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_SF3605 = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.Loadsf365 = function(){
    var promise = $ipadrbg.context.jdata_SF3605.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_SF3605 = pxresult;
      });

        $scope.sf365 = {
        ClinixRID  : $scope.clinix.ClinixRID
        ,PxRID     : $scope.clinix.PxRID

        ,sf6 : pxresult[0]['sf6']
        ,sf7 : pxresult[0]['sf7']
        ,sf8 : pxresult[0]['sf8']
      
      }

    });
  }; 

   $scope.Loadsf365();

  $scope.addNewsf365 = function (frmsf365) {
     var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
     db.transaction(function (tx) {
       tx.executeSql("delete from 'jdata_SF3605' WHERE ClinixRID = " + $scope.ClinixRID);
     });
    
     newrecord = {
       ClinixRID : $scope.clinix.ClinixRID
       ,PxRID    : $scope.clinix.PxRID

      ,sf6 : frmsf365.sf6
      ,sf7 : frmsf365.sf7
      ,sf8 : frmsf365.sf8
    
       

    }
    $ipadrbg.context.jdata_SF3605.add(newrecord);
    $ipadrbg.context.jdata_SF3605.saveChanges();

    alert("Sf 36 Data Saved!");

    $scope.Loadsf365();    
  }

  $scope.removesf365 = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_SF3605' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.sf365 = [];
    }
  }

});