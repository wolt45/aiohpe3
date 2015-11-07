IOHPEApp.controller('spine_2_Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_spine_2 = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.Loadspine2 = function(){
    var promise = $ipadrbg.context.jdata_spine_2.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_spine_2 = pxresult;
      });

      $scope.spine2 = {
      ClinixRID  : $scope.clinix.ClinixRID
      ,PxRID     : $scope.clinix.PxRID

      ,backneckpain : pxresult[0]['backneckpain']
      ,legarmpain : pxresult[0]['legarmpain']

      }

       
    });
  }; 

   $scope.Loadspine2();

  $scope.addNew_spine2 = function (frmSpine2) {
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      tx.executeSql("delete from 'jdata_spine_2' WHERE ClinixRID = " + $scope.ClinixRID);
    });
    
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,backneckpain : frmSpine2.backneckpain
      ,legarmpain : frmSpine2.legarmpain

    }
    $ipadrbg.context.jdata_spine_2.add(newrecord);
    $ipadrbg.context.jdata_spine_2.saveChanges();

    alert("Spine Data Saved!");

    $scope.Loadspine2();
  }

  $scope.removespine2 = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_spine_2' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.spine2 = [];
    }
  }

});