IOHPEApp.controller('LABSCtrl', function ($scope, $routeParams, $http){
  $scope.clinix_LABS = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadLABS = function(){
    var promise = $ipadrbg.context.clinix_LABS.filter(function (px) { return px.ClinixRID == this.id },{ id: $scope.ClinixRID }).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_LABS = pxresult;
      });
    })
  }

  $scope.LoadLABS();

  $scope.addLABS = function (grpLABS) {
    newrecord = {
      ClinixRID         : $scope.clinix.ClinixRID
      ,PxRID            : $scope.clinix.PxRID

      ,labXRayDate      : grpLABS.labXRayDate
      ,labXRayReport    : grpLABS.labXRayReport
      ,MRIDate          : grpLABS.MRIDate
      ,MRIReport        : grpLABS.MRIReport
      ,CTSCanDate       : grpLABS.CTSCanDate
      ,CTScanReport     : grpLABS.CTScanReport
      ,BloodTest        : grpLABS.BloodTest
      ,BloodTestWhere   : grpLABS.BloodTestWhere
      ,BloodTestReport  : grpLABS.BloodTestReport
    }

      grpLABS.labXRayDate     = "";
      grpLABS.labXRayReport   = "";
      grpLABS.MRIDate         = "";
      grpLABS.MRIReport       = "";
      grpLABS.CTSCanDate      = "";
      grpLABS.CTScanReport    = "";
      grpLABS.BloodTest       = "";
      grpLABS.BloodTestWhere  = "";
      grpLABS.BloodTestReport = "";

      $ipadrbg.context.clinix_LABS.add(newrecord);
      $ipadrbg.context.clinix_LABS.saveChanges();

      $scope.LoadLABS();
  }

  $scope.removeLABS = function (grpLABS) {
    grpLABS.remove()
    .then(function() {
      $scope.$apply(function() {
         var comps = $scope.clinix_LABS;
         comps.splice(comps.indexOf(grpLABS), 1);
      });
    })
   .fail(function(err) {
       alert("Error deleting item!");
   });
  }


});