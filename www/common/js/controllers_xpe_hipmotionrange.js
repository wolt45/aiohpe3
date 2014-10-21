IOHPEApp.controller('HipMotionRangeCtrl', function ($scope, $routeParams, $http){
  $scope.clinix_HipMotionRange = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadHipMotionRange = function(){
    var promise = $ipadrbg.context.clinix_HipMotionRange.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_HipMotionRange = pxresult;
      });
    });
  };

  $scope.LoadHipMotionRange();

  $scope.addNew = function (hipMotionRange) {
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,MotionArea : hipMotionRange.MotionArea
      ,Left     : hipMotionRange.Left
      ,Right    : hipMotionRange.Right
    }
    $ipadrbg.context.clinix_HipMotionRange.add(newrecord);
    $ipadrbg.context.clinix_HipMotionRange.saveChanges();

    hipMotionRange.Left = "";
    hipMotionRange.Right = "";

    $scope.LoadHipMotionRange();
  }

  $scope.removeHipMotionRange = function (hipMotionRange) {
    hipMotionRange.remove()
    .then(function() {
      $scope.$apply(function() {
         var hipMotio = $scope.clinix_HipMotionRange;
         hipMotio.splice(hipMotio.indexOf(hipMotionRange), 1);
      });
    })
   .fail(function(err) {
       alert("Error deleting item!");
   });
  }
});