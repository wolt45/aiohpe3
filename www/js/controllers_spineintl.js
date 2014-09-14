IOHPEApp.controller('SpineInitialCtrl', function ($scope, $routeParams, $http){
  $scope.clinix_spineIntl = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadComplaints = function(){
    var promise = $ipadrbg.context.clinix_spineIntl.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_spineIntl = pxresult;
      });
    })
  }

  $scope.LoadComplaints();

  $scope.saveSpineIntl = function (spineIntl) {
    newrecord = {
      ClinixRID         : $scope.clinix.ClinixRID
      ,PxRID            : $scope.clinix.PxRID
      ,MyBone           : spineIntl.MyBone
      ,MyBoneLRB        : spineIntl.MyBoneLRB
      ,MyBoneComplaint  : spineIntl.MyBoneComplaint
      ,Remarks          : spineIntl.Remarks
    }

      $ipadrbg.context.clinix_spineIntl.add(newrecord);
      $ipadrbg.context.clinix_spineIntl.saveChanges();

      spineIntl.Remarks = null;

      $scope.LoadComplaints();
  }

  $scope.remove = function (spineIntl) {
    spineIntl.remove()
    .then(function() {
      $scope.$apply(function() {
         var comps = $scope.clinix_spineIntl;
         comps.splice(comps.indexOf(spineIntl), 1);
      });
    })
   .fail(function(err) {
       alert("Error deleting item!");
   });
  }
});