IOHPEApp.controller('gen_orth4_Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_genotho_4 = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.Loadgenortho4 = function(){
    var promise = $ipadrbg.context.jdata_genotho_4.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_genotho_4 = pxresult;
      });

    $scope.genortho4 = {
    ClinixRID  : $scope.clinix.ClinixRID
    ,PxRID     : $scope.clinix.PxRID

    ,Medications : pxresult[0]['Medications']
    ,Injections : pxresult[0]['Injections']
    ,PhysicalTherapy : pxresult[0]['PhysicalTherapy']
    ,Others : pxresult[0]['Others']
    ,Disposition : pxresult[0]['Disposition']
  
  }

    });
  }; 

   $scope.Loadgenortho4();

  $scope.addNew_genortho4 = function (frmgenortho4) {
    
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      tx.executeSql("delete from 'jdata_genotho_4' WHERE ClinixRID = " + $scope.ClinixRID);
    });
    
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,Medications : frmgenortho4.Medications
      ,Injections : frmgenortho4.Injections
      ,PhysicalTherapy : frmgenortho4.PhysicalTherapy
      ,Others : frmgenortho4.Others
      ,Disposition : frmgenortho4.Disposition

    }
    $ipadrbg.context.jdata_genotho_4.add(newrecord);
    $ipadrbg.context.jdata_genotho_4.saveChanges();

    alert("General Ortho Data Saved!");

    $scope.Loadgenortho4();    
  }

  $scope.removegenortho4 = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_genotho_4' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.genortho4 = [];
    }
  }

});