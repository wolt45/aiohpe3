IOHPEApp.controller('OPKNEE_3Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_OPKNEE_3 = [];

  $scope.ClinixRID = $routeParams.p_clinixrid;

  // $scope.ClinixRID =  parseInt($scope.CurrentClinixRID);

  $scope.LoadOPKNEE_3 = function(){
    var promise = $ipadrbg.context.jdata_OPKNEE_3.filter(function (px) { 
      return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_OPKNEE_3 = pxresult;

        $scope.opknee3 = {
          ClinixRID : $scope.clinix.ClinixRID
          ,PxRID    : $scope.clinix.PxRID

          ,TypeOfKNEERep  : pxresult[0]['TypeOfKNEERep'] 
          ,ImplantUsed  : pxresult[0]['ImplantUsed'] 
          ,FemoralCompo  : pxresult[0]['FemoralCompo'] 
          ,TibiaCompo  : pxresult[0]['TibiaCompo'] 
          ,Patella  : pxresult[0]['Patella'] 
        }
      });
    });
  };

  $scope.LoadOPKNEE_3();

  $scope.addNew = function (frmObj) {
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
        tx.executeSql("delete from 'jdata_OPKNEE_3' WHERE ClinixRID = " + $scope.ClinixRID);
    });

    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,TypeOfKNEERep : frmObj.TypeOfKNEERep
      ,ImplantUsed   : frmObj.ImplantUsed
      ,FemoralCompo  : frmObj.FemoralCompo
      ,TibiaCompo    : frmObj.TibiaCompo
      ,Patella       : frmObj.Patella
    }
    $ipadrbg.context.jdata_OPKNEE_3.add(newrecord);
    $ipadrbg.context.jdata_OPKNEE_3.saveChanges();

    alert("KNEE Implant Data Saved!");

    $scope.LoadOPKNEE_3();
  }

  $scope.removeItem = function (frmObj) {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
          tx.executeSql("delete from 'jdata_OPKNEE_3' WHERE ClinixRID = " + $scope.clinix.ClinixRID);
      });
      $scope.opknee3 = [];
    }
  }

});