IOHPEApp.controller('sf3608Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_SF3608 = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.Loadsf368 = function(){
    var promise = $ipadrbg.context.jdata_SF3608.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_SF3608 = pxresult;
      });

        $scope.sf368 = {
        ClinixRID  : $scope.clinix.ClinixRID
        ,PxRID     : $scope.clinix.PxRID

        ,sf11a : pxresult[0]['sf11a']
        ,sf11b : pxresult[0]['sf11b']
        ,sf11c : pxresult[0]['sf11c']
        ,sf11d : pxresult[0]['sf11d']
      
      }

    });
  }; 

   $scope.Loadsf368();

  $scope.addNewsf368 = function (frmsf368) {
     var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
     db.transaction(function (tx) {
       tx.executeSql("delete from 'jdata_SF3608' WHERE ClinixRID = " + $scope.ClinixRID);
     });
    
     newrecord = {
       ClinixRID : $scope.clinix.ClinixRID
       ,PxRID    : $scope.clinix.PxRID

      ,sf11a : frmsf368.sf11a
      ,sf11b : frmsf368.sf11b
      ,sf11c : frmsf368.sf11c
      ,sf11d : frmsf368.sf11d
    
       

    }
    $ipadrbg.context.jdata_SF3608.add(newrecord);
    $ipadrbg.context.jdata_SF3608.saveChanges();

    alert("Sf 36 Data Saved!");

    $scope.Loadsf368();    
  }

  $scope.removesf368 = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_SF3608' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.sf368 = [];
    }
  }

});