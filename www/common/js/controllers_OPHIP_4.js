
// not used

IOHPEApp.controller('OPHIP_4Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_OPHIP_4 = [];

  $scope.ClinixRID = $routeParams.p_clinixrid;

  // $scope.ClinixRID =  parseInt($scope.CurrentClinixRID);

  $scope.LoadOPHIP_4 = function(){
    var promise = $ipadrbg.context.jdata_OPHIP_4.filter(function (px) { 
      return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_OPHIP_4 = pxresult;
      });
    });
  };

  $scope.LoadOPHIP_4();

  $scope.addNew = function (frmObj) {
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,AcetabularComponent : frmObj.AcetabularComponent
      ,AcetSize  : frmObj.AcetSize
      ,AcetScrews : frmObj.AcetScrews
      ,AcetPrep : frmObj.AcetPrep
      ,FemoralPrep : frmObj.FemoralPrep
    }
    $ipadrbg.context.jdata_OPHIP_4.add(newrecord);
    $ipadrbg.context.jdata_OPHIP_4.saveChanges();

    frmObj.AcetabularComponent = "";
    frmObj.AcetSize = "";
    frmObj.AcetScrews = "";
    frmObj.AcetPrep = "";
    frmObj.FemoralPrep = "";

    $scope.LoadOPHIP_4();
  }

  $scope.removeItem = function (frmObj) {
    frmObj.remove()
    .then(function() {
      $scope.$apply(function() {
         var diagol = $scope.jdata_OPHIP_4;
         diagol.splice(diagol.indexOf(frmObj), 1);
      });
    })
   .fail(function(err) {
       alert("Error deleting item!");
   });
  }

});