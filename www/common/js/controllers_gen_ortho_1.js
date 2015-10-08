IOHPEApp.controller('gen_orth1_Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_genotho_1 = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.Loadgenortho1 = function(){
    var promise = $ipadrbg.context.jdata_genotho_1.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_genotho_1 = pxresult;
      });

    $scope.genortho1 = {
    ClinixRID  : $scope.clinix.ClinixRID
    ,PxRID     : $scope.clinix.PxRID

    ,Appearance : pxresult[0]['Appearance']
    ,Deformity : pxresult[0]['Deformity']
    ,SkinCloOp : pxresult[0]['SkinCloOp']
    ,ActiveMotion : pxresult[0]['ActiveMotion']
    ,PassiveMotion : pxresult[0]['PassiveMotion']
    ,Neurologic : pxresult[0]['Neurologic']
    ,Vascular : pxresult[0]['Vascular']
    ,PoorDetails : pxresult[0]['PoorDetails']
  
  }

    });
  }; 

   $scope.Loadgenortho1();

  $scope.addNew_genortho1 = function (frmgenortho1) {
    
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      tx.executeSql("delete from 'jdata_genotho_1' WHERE ClinixRID = " + $scope.ClinixRID);
    });
    
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,Appearance : frmgenortho1.Appearance
      ,Deformity : frmgenortho1.Deformity
      ,SkinCloOp : frmgenortho1.SkinCloOp
      ,ActiveMotion : frmgenortho1.ActiveMotion
      ,PassiveMotion : frmgenortho1.PassiveMotion
      ,Neurologic : frmgenortho1.Neurologic
      ,Vascular : frmgenortho1.Vascular
      ,PoorDetails : frmgenortho1.PoorDetails

    }
    $ipadrbg.context.jdata_genotho_1.add(newrecord);
    $ipadrbg.context.jdata_genotho_1.saveChanges();

    alert("Sholder Data Saved!");

    $scope.Loadgenortho1();    
  }

  $scope.removegenortho1 = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_genotho_1' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.genortho1 = [];
    }
  }

});