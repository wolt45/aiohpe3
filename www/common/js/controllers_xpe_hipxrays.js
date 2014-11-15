IOHPEApp.controller('HipXRaysCtrl', function ($scope, $routeParams, $http){
  $scope.clinix_HipXRays = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadHipXRays = function(){
    var promise = $ipadrbg.context.clinix_HipXRays.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_HipXRays = pxresult;
      });
    });
  };

  $scope.LoadHipXRays();

  $scope.addNew = function (hipXRay) {
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,APPelvisBothHipsDate : hipXRay.APPelvisBothHipsDate
      ,Pelvis           : hipXRay.Pelvis
      ,XRayArea         : hipXRay.XRayArea
      ,XRayAreaSeverity : hipXRay.XRayAreaSeverity
      ,XRayOthers       : hipXRay.XRayOthers
    }
    $ipadrbg.context.clinix_HipXRays.add(newrecord);
    $ipadrbg.context.clinix_HipXRays.saveChanges();

    hipXRay.APPelvisBothHipsDate = "";
    hipXRay.Pelvis = "";
    hipXRay.XRayArea = "";
    hipXRay.XRayAreaSeverity = "";
    hipXRay.XRayOthers = "";

    $scope.LoadHipXRays();
  }

  $scope.removeHipXRays = function (hipXRay) {
    hipXRay.remove()
    .then(function() {
      $scope.$apply(function() {
         var hipX = $scope.clinix_HipXRays;
         hipX.splice(hipX.indexOf(hipXRay), 1);
      });
    })
   .fail(function(err) {
       alert("Error deleting item!");
   });
  }
});