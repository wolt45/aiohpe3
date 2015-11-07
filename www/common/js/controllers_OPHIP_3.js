IOHPEApp.controller('OPHIP_3Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_OPHIP_3 = [];

  $scope.ClinixRID = $routeParams.p_clinixrid;

  // $scope.ClinixRID =  parseInt($scope.CurrentClinixRID);

  $scope.LoadOPHIP_3 = function(){
    var promise = $ipadrbg.context.jdata_OPHIP_3.filter(function (px) { 
      return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_OPHIP_3 = pxresult;

        $scope.ophip3 = {
            ClinixRID : $scope.clinix.ClinixRID
            ,PxRID    : $scope.clinix.PxRID

            ,TypeOfHIPRep : pxresult[0]['TypeOfHIPRep']
            ,ImplantUsed : pxresult[0]['ImplantUsed']
            ,AcetabularComponent : pxresult[0]['AcetabularComponent']
            ,AcetSize : pxresult[0]['AcetSize']
            ,AcetScrews : pxresult[0]['AcetScrews']
            ,FemoralComponent  : pxresult[0]['FemoralComponent']
            ,HeadSize: pxresult[0]['HeadSize']
            ,NeckLength    : pxresult[0]['NeckLength']
        };
      });
    });
  };

  $scope.LoadOPHIP_3();

  $scope.addNew_HIPImplant = function (frmObj) {
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      tx.executeSql("delete from 'jdata_OPHIP_3' WHERE ClinixRID = " + $scope.clinix.ClinixRID);
    });

    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,TypeOfHIPRep : frmObj.TypeOfHIPRep
      ,ImplantUsed  : frmObj.ImplantUsed
      
      ,AcetabularComponent : frmObj.AcetabularComponent
      ,AcetSize : frmObj.AcetSize
      ,AcetScrews : frmObj.AcetScrews

      ,FemoralComponent  : frmObj.FemoralComponent
      ,HeadSize  : frmObj.HeadSize
      ,NeckLength : frmObj.NeckLength
    }
    $ipadrbg.context.jdata_OPHIP_3.add(newrecord);
    $ipadrbg.context.jdata_OPHIP_3.saveChanges();

    alert("HIP Implant Data Saved!");

    $scope.LoadOPHIP_3();
  }

  $scope.removeHIPImplant = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
          tx.executeSql("delete from 'jdata_OPHIP_3' WHERE ClinixRID = " + $scope.clinix.ClinixRID);
      });
      $scope.ophip3 = [];
    }
  }
});