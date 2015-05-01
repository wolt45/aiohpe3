IOHPEApp.controller('HipXRaysCtrl', function ($scope, $routeParams, $http){
  $scope.clinix_HipXRays = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

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

      });
    });
  };

  $scope.LoadHipXRays();

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