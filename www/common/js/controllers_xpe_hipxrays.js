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

    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
        tx.executeSql("delete from 'clinix_HipMotionRange' WHERE ClinixRID = " 
          + $scope.clinix.ClinixRID
          + " AND MotionArea = 'SLR vs Resistance (left)'" );
    }); 
    
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,APPelvisBothHipsDate : hipXRay.APPelvisBothHipsDate
      ,Pelvis             : hipXRay.Pelvis
      ,PelvisInches       : hipXRay.PelvisInches

      ,Avascular          : hipXRay.Avascular
      ,Narrowing          : hipXRay.Narrowing

      ,Subluxation        : hipXRay.Subluxation
      ,Osteoporosis       : hipXRay.Osteoporosis
      ,FracturesNeck      : hipXRay.FracturesNeck
      ,Intertrouch        : hipXRay.Intertrouch
      ,Others             : hipXRay.Others
    }
    $ipadrbg.context.clinix_HipXRays.add(newrecord);
    $ipadrbg.context.clinix_HipXRays.saveChanges();

    hipXRay.APPelvisBothHipsDate  = "";
    hipXRay.Pelvis  = "";
    hipXRay.PelvisInche  = "";
    hipXRay.Avascular  = "";
    hipXRay.Narrowing  = "";
    hipXRay.Subluxation  = "";
    hipXRay.Osteoporosis  = "";
    hipXRay.FractionsNeck  = "";
    hipXRay.Intertrouch  = "";
    hipXRay.Others  = "";

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