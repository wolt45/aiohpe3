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
      });
    });
  };

  $scope.LoadOPHIP_3();

  $scope.addNew = function (frmObj) {
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

    frmObj.TypeOfHIPRep = "";
    frmObj.ImplantUsed = "";

    frmObj.AcetabularComponent = "";
    frmObj.AcetSize = "";
    frmObj.AcetScrews = "";

    frmObj.FemoralComponent = "";
    frmObj.HeadSize = "";
    frmObj.NeckLength = "";

    $scope.LoadOPHIP_3();
  }

  $scope.removeItem = function (frmObj) {
    frmObj.remove()
    .then(function() {
      $scope.$apply(function() {
         var diagol = $scope.jdata_OPHIP_3;
         diagol.splice(diagol.indexOf(frmObj), 1);
      });
    })
   .fail(function(err) {
       alert("Error deleting item!");
   });
  }
});