IOHPEApp.controller('HipXRaysCtrl', function ($scope, $routeParams, $http){
  $scope.clinix_HipXRays = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;
  $scope.PEHIPxrays = [];
  $scope.PxRID = 0;

  $scope.LoadHipXRays = function(){
    var promise = $ipadrbg.context.clinix_HipXRays.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_HipXRays = pxresult;

        $scope.HipXRays = {
          ClinixRID  : $scope.clinix.ClinixRID
          ,PxRID     : $scope.clinix.PxRID

          ,APPelvisBothHipsDate : pxresult[0]['APPelvisBothHipsDate']
          ,Pelvis : pxresult[0]['Pelvis']
          ,PelvisInches : pxresult[0]['PelvisInches']
          ,Avascular : pxresult[0]['Avascular']
          
          ,Narrowing : pxresult[0]['Narrowing']
          ,Subluxation : pxresult[0]['Subluxation']
          ,Osteoporosis : pxresult[0]['Osteoporosis']
          ,FracturesNeck : pxresult[0]['FracturesNeck']
          ,Intertrouch : pxresult[0]['Intertrouch']
          ,Others : pxresult[0]['Others']
        }

        // WFS HACKS: pick-up Chart Number Here
        $scope.PxRID = pxresult[0]['PxRID'];
        // alert($scope.PxRID);

        $scope.LoadPEHIPxrays();
      });
    });
  };

  $scope.LoadHipXRays();

  // LABS-XRays, loaded on the first promise, load after $scope.PxRID was promised
  $scope.LoadPEHIPxrays = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && labs.HangRID == this.hangRID} , {id:$scope.PxRID, hangRID: 4}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.PEHIPxrays = pxresult;
        // alert("HIP PE LABS & XRAYS working");
      });
    });
  }

  $scope.addNew_HipXRAY = function (hipXRay) {

    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
        tx.executeSql("delete from 'clinix_HipXRays' WHERE ClinixRID = " + $scope.clinix.ClinixRID );
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

    alert("Hip X-Ray Data Saved!");

    $scope.LoadHipXRays();
  }

  $scope.removeHipXRays = function (hipXRay) {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'clinix_HipXRays' WHERE ClinixRID = " + $scope.clinix.ClinixRID );
      });
      $scope.HipXRays = [];
    }
  }
});