IOHPEApp.controller('ORSocHab3_Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_ORSocHab3 = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadORSocHab3 = function(){
    var promise = $ipadrbg.context.jdata_ORSocHab3.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_ORSocHab3 = pxresult;
      });

    $scope.ORSocHabNot3 = {
    ClinixRID  : $scope.clinix.ClinixRID
    ,PxRID     : $scope.clinix.PxRID

    ,NurseNotes : pxresult[0]['NurseNotes']
  
  }

    });
  }; 

   $scope.LoadORSocHab3();

  $scope.addNew_ORSocHab3 = function (frmORSocHab3) {
    
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      tx.executeSql("delete from 'jdata_ORSocHab3' WHERE ClinixRID = " + $scope.ClinixRID);
    });
    
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,NurseNotes : frmORSocHab3.NurseNotes

    }
    $ipadrbg.context.jdata_ORSocHab3.add(newrecord);
    $ipadrbg.context.jdata_ORSocHab3.saveChanges();

    alert("OR Data Saved!");

    $scope.LoadORSocHab3();    
  }

  $scope.removeORSocHab3 = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_ORSocHab3' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.ORSocHabNot3 = [];
    }
  }

});