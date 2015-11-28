IOHPEApp.controller('sf3606Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_SF3606 = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.Loadsf366 = function(){
    var promise = $ipadrbg.context.jdata_SF3606.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_SF3606 = pxresult;
      });

        $scope.sf366 = {
        ClinixRID  : $scope.clinix.ClinixRID
        ,PxRID     : $scope.clinix.PxRID

        ,sf10a : pxresult[0]['sf10a']
        ,sf9b : pxresult[0]['sf9b']
        ,sf9d : pxresult[0]['sf9c']
        ,sf9d : pxresult[0]['sf9d']
        ,sf9e : pxresult[0]['sf9e']
        ,sf9f : pxresult[0]['sf9f']
        ,sf9g : pxresult[0]['sf9g']
        ,sf9h : pxresult[0]['sf9h']
        ,sf9i : pxresult[0]['sf9i']
      
      }

    });
  }; 

   $scope.Loadsf366();

  $scope.addNewsf366 = function (frmsf366) {
     var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
     db.transaction(function (tx) {
       tx.executeSql("delete from 'jdata_SF3606' WHERE ClinixRID = " + $scope.ClinixRID);
     });
    
     newrecord = {
       ClinixRID : $scope.clinix.ClinixRID
       ,PxRID    : $scope.clinix.PxRID

      ,sf9a : frmsf366.sf9a
      ,sf9b : frmsf366.sf9b
      ,sf9c : frmsf366.sf9c
      ,sf9d : frmsf366.sf9d
      ,sf9e : frmsf366.sf9e
      ,sf9f : frmsf366.sf9f
      ,sf9g : frmsf366.sf9g
      ,sf9h : frmsf366.sf9h
      ,sf9i : frmsf366.sf9i
    
       

    }
    $ipadrbg.context.jdata_SF3606.add(newrecord);
    $ipadrbg.context.jdata_SF3606.saveChanges();

    alert("Sf 36 Data Saved!");

    $scope.Loadsf366();    
  }

  $scope.removesf366 = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_SF3606' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.sf366 = [];
    }
  }

});