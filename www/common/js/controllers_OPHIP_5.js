IOHPEApp.controller('OPHIP_5Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_OPHIP_5 = [];

  $scope.ClinixRID = $routeParams.p_clinixrid;

  // $scope.ClinixRID =  parseInt($scope.CurrentClinixRID);

  $scope.LoadOPHIP_5 = function(){
    var promise = $ipadrbg.context.jdata_OPHIP_5.filter(function (px) { 
      return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_OPHIP_5 = pxresult;
      });
    });
  };

  $scope.LoadOPHIP_5();

  $scope.addNew = function (frmObj) {
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,SurgicalApproach : frmObj.SurgicalApproach
      ,StabPosterior  : frmObj.StabPosterior
      ,StabAnterior : frmObj.StabAnterior
      ,HemovacUsed : frmObj.HemovacUsed
    }
    $ipadrbg.context.jdata_OPHIP_5.add(newrecord);
    $ipadrbg.context.jdata_OPHIP_5.saveChanges();

    frmObj.SurgicalApproach = "";
    frmObj.StabPosterior = "";
    frmObj.StabAnterior = "";
    frmObj.HemovacUsed = "";

    $scope.LoadOPHIP_5();
  }

  $scope.removeItem = function (frmObj) {
    frmObj.remove()
    .then(function() {
      $scope.$apply(function() {
         var diagol = $scope.jdata_OPHIP_5;
         diagol.splice(diagol.indexOf(frmObj), 1);
      });
    })
   .fail(function(err) {
       alert("Error deleting item!");
   });
  }

});