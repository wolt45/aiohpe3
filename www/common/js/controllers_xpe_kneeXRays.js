IOHPEApp.controller('KneeXRaysCtrl', function ($scope, $routeParams, $http){
  $scope.clinix_KneeXRays = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.PEKNEExrays = [];
  $scope.PxRID = 0;

  $scope.LoadKneeXRays = function(){
    var promise = $ipadrbg.context.clinix_KneeXRays.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_KneeXRays = pxresult;

        $scope.KneeXRayForm = {
          ClinixRID  : $scope.clinix.ClinixRID
          ,PxRID     : $scope.clinix.PxRID

          ,APDate : pxresult[0]['APDate']
          ,Normal : pxresult[0]['Normal']
          ,VarusDegrees : pxresult[0]['VarusDegrees']
          ,JointSpaceVarusR : pxresult[0]['JointSpaceVarusR']
          ,JointSpaceVarusL : pxresult[0]['JointSpaceVarusL']
          ,ValgusDegrees : pxresult[0]['ValgusDegrees']
          ,JointSpaceValgusR : pxresult[0]['JointSpaceValgusR']
          ,JointSpaceValgusL : pxresult[0]['JointSpaceValgusL']
          ,BilateralJointSpace : pxresult[0]['BilateralJointSpace']
          ,LaurinPatel_LR : pxresult[0]['LaurinPatel_LR']
          ,LaurinPatel_LRSeverity : pxresult[0]['LaurinPatel_LRSeverity']
        }

        // WFS HACKS: pick-up Chart Number Here
        $scope.PxRID = pxresult[0]['PxRID'];
        // alert($scope.PxRID);

        $scope.LoadPEKNEExrays(); 
      });
    });
  };

  $scope.LoadKneeXRays();

  // LABS-XRays, loaded on the first promise, load after $scope.PxRID was promised
  $scope.LoadPEKNEExrays = function(){
    var promise = $ipadrbg.context.LAB_Results.filter(function (labs) 
      { return labs.PxRID == this.id && labs.HangRID == this.hangRID} , {id:$scope.PxRID, hangRID: 5}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.PEKNEExrays = pxresult;
        // alert("HIP PE LABS & XRAYS working");
      });
    });
  }

  $scope.addNew_XRays = function (kneeXRay) {
    
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      tx.executeSql("delete from 'clinix_KneeXRays' WHERE ClinixRID = " + $scope.ClinixRID);
    });

    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,APDate : kneeXRay.APDate
      ,Normal : kneeXRay.Normal
      ,VarusDegrees : kneeXRay.VarusDegrees
      ,JointSpaceVarusR : kneeXRay.JointSpaceVarusR
      ,JointSpaceVarusL : kneeXRay.JointSpaceVarusL
      ,ValgusDegrees : kneeXRay.ValgusDegrees
      ,JointSpaceValgusR : kneeXRay.JointSpaceValgusR
      ,JointSpaceValgusL : kneeXRay.JointSpaceValgusL
      ,BilateralJointSpace : kneeXRay.BilateralJointSpace
      ,LaurinPatel_LR : kneeXRay.LaurinPatel_LR
      ,LaurinPatel_LRSeverity  : kneeXRay.LaurinPatel_LRSeverity
    }
    $ipadrbg.context.clinix_KneeXRays.add(newrecord);
    $ipadrbg.context.clinix_KneeXRays.saveChanges();

    alert("KNEE X-Ray Data Saved!");

    $scope.LoadKneeXRays();
  }

  $scope.removeKneeXRays = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'clinix_KneeXRays' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.KneeXRayForm = [];
    }
  }
});