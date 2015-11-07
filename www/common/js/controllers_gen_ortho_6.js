IOHPEApp.controller('gen_orth6_Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_genotho_6 = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.Loadgenortho6 = function(){
    var promise = $ipadrbg.context.jdata_genotho_6.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_genotho_6 = pxresult;
      });

    $scope.genortho6 = {
    ClinixRID  : $scope.clinix.ClinixRID
    ,PxRID     : $scope.clinix.PxRID

    ,PreviousSurgery : pxresult[0]['PreviousSurgery'] 

    }
    });
  }; 

   $scope.Loadgenortho6();

  $scope.addNew_genortho6 = function (frmgenortho6) {
    
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      tx.executeSql("delete from 'jdata_genotho_6' WHERE ClinixRID = " + $scope.ClinixRID);
    });
    
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,PreviousSurgery : frmgenortho6.PreviousSurgery

    }
    $ipadrbg.context.jdata_genotho_6.add(newrecord);
    $ipadrbg.context.jdata_genotho_6.saveChanges();

    alert("General Ortho Data Saved!");

    $scope.Loadgenortho6();    
  }

  $scope.removegenortho6 = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_genotho_6' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.genortho6 = [];
    }
  }

});