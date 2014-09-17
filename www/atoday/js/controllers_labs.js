IOHPEApp.controller('LABSCtrl', function ($scope, $routeParams, $http){
  $scope.clinix_LABS = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.labCategories = [
      { id : 0,  dropname : ""}
    , { id : 1,  dropname : "X-Rays"}
    , { id : 2,  dropname : "MRI"}
    , { id : 3,  dropname : "CT-SCAN"}
    , { id : 4,  dropname : "CBC"}
    , { id : 5,  dropname : "ESR"}
    , { id : 6,  dropname : "CRP"}
  ]

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

      ,labCategory      : grpLABS.labCategory
      ,labDate          : grpLABS.labDate
      ,labSource        : grpLABS.labSource
      ,labReport        : grpLABS.labReport
    }

      grpLABS.labCategory = "";
      grpLABS.labDate     = "";
      grpLABS.labSource   = "";
      grpLABS.labReport   = "";

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