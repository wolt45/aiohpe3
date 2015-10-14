IOHPEApp.controller('gen_orth3_Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_genotho_3 = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.Loadgenortho3 = function(){
    var promise = $ipadrbg.context.jdata_genotho_3.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_genotho_3 = pxresult;
      });

    $scope.genortho3 = {
    ClinixRID  : $scope.clinix.ClinixRID
    ,PxRID     : $scope.clinix.PxRID

    ,xfindings : pxresult[0]['xfindings']
    ,AbnormalDes : pxresult[0]['AbnormalDes']
  
  }

    });
  }; 

   $scope.Loadgenortho3();

  $scope.addNew_genortho3 = function (frmgenortho3) {
    
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      tx.executeSql("delete from 'jdata_genotho_3' WHERE ClinixRID = " + $scope.ClinixRID);
    });
    
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,xfindings : frmgenortho3.xfindings
      ,AbnormalDes : frmgenortho3.AbnormalDes

    }
    $ipadrbg.context.jdata_genotho_3.add(newrecord);
    $ipadrbg.context.jdata_genotho_3.saveChanges();

    alert("General Ortho Data Saved!");

    $scope.Loadgenortho3();    
  }

  $scope.removegenortho3 = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_genotho_3' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.genortho3 = [];
    }
  }

});