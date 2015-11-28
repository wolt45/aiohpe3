IOHPEApp.controller('sf3602Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_SF3602 = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.Loadsf362 = function(){
    var promise = $ipadrbg.context.jdata_SF3602.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_SF3602 = pxresult;
      });

        $scope.sf362 = {
        ClinixRID  : $scope.clinix.ClinixRID
        ,PxRID     : $scope.clinix.PxRID

        ,sf3a : pxresult[0]['sf3a']
        ,sf3b : pxresult[0]['sf3b']
        ,sf3c : pxresult[0]['sf3c']
        ,sf3d : pxresult[0]['sf3d']
        ,sf3e : pxresult[0]['sf3e']
        ,sf3f : pxresult[0]['sf3f']
        ,sf3g : pxresult[0]['sf3g']
        ,sf3h : pxresult[0]['sf3h']
        ,sf3i : pxresult[0]['sf3i']
        ,sf3j : pxresult[0]['sf3j']
      
      }

    });
  }; 

   $scope.Loadsf362();

  $scope.addNewsf3602 = function (frmsf362) {
     var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
     db.transaction(function (tx) {
       tx.executeSql("delete from 'jdata_SF3602' WHERE ClinixRID = " + $scope.ClinixRID);
     });
    
     newrecord = {
       ClinixRID : $scope.clinix.ClinixRID
       ,PxRID    : $scope.clinix.PxRID

       ,sf3a : frmsf362.sf3a
       ,sf3b : frmsf362.sf3b
        ,sf3c : frmsf362.sf3c
        ,sf3d : frmsf362.sf3d
        ,sf3e : frmsf362.sf3e
        ,sf3f : frmsf362.sf3f
        ,sf3g : frmsf362.sf3g
        ,sf3h : frmsf362.sf3h
        ,sf3i : frmsf362.sf3i
        ,sf3j : frmsf362.sf3j

    }
    $ipadrbg.context.jdata_SF3602.add(newrecord);
    $ipadrbg.context.jdata_SF3602.saveChanges();

    alert("Sf 36 Data Saved!");

    $scope.Loadsf362();    
  }

  $scope.removesf362 = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_SF3602' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.sf362 = [];
    }
  }

});