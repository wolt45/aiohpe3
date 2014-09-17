IOHPEApp.controller('PrevSurgeriesCtrl', function ($scope, $routeParams, $http){
  $scope.clinix_previousSurgeries = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadPrevSurgeries = function(){
    var promise = $ipadrbg.context.clinix_previousSurgeries.filter(function (px) { return px.ClinixRID == this.id },{ id: $scope.ClinixRID }).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_previousSurgeries = pxresult;
      });
    })
  }

  $scope.LoadPrevSurgeries();

  $scope.addPrevSurgeries = function (grpPrevSurg) {
    newrecord = {
      ClinixRID         : $scope.clinix.ClinixRID
      ,PxRID            : $scope.clinix.PxRID

      ,SurgeryType      : grpPrevSurg.SurgeryType
      ,SurgeryWhen      : grpPrevSurg.SurgeryWhen
      ,SurgeryWhere     : grpPrevSurg.SurgeryWhere
      ,SurgeryWho       : grpPrevSurg.SurgeryWho
      ,SurgeryHelped    : grpPrevSurg.SurgeryHelped
      ,SurgeryHowMany   : grpPrevSurg.SurgeryHowMany
      ,SurgeryHowManyUnit : grpPrevSurg.SurgeryHowManyUnit
    }

      grpPrevSurg.SurgeryType          = "";
      grpPrevSurg.SurgeryWhen          = "";
      grpPrevSurg.SurgeryWhere         = "";
      grpPrevSurg.SurgeryWho           = "";
      grpPrevSurg.SurgeryHelped        = "";
      grpPrevSurg.SurgeryHowMany   = "";
      grpPrevSurg.SurgeryHowManyUnit   = "";

      $ipadrbg.context.clinix_previousSurgeries.add(newrecord);
      $ipadrbg.context.clinix_previousSurgeries.saveChanges();

      $scope.LoadPrevSurgeries();
  }

  $scope.removePrevSurg = function (grpPrevSurg) {
    grpPrevSurg.remove()
    .then(function() {
      $scope.$apply(function() {
         var comps = $scope.clinix_previousSurgeries;
         comps.splice(comps.indexOf(grpPrevSurg), 1);
      });
    })
   .fail(function(err) {
       alert("Error deleting item!");
   });
  }


});