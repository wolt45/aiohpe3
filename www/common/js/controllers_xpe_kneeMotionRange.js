IOHPEApp.controller('KneeMotionRangeCtrl', function ($scope, $routeParams, $http){
  $scope.clinix_KneeMotionRange = []; 
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadKneeMotionRange = function(){
    var promise = $ipadrbg.context.clinix_KneeMotionRange.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_KneeMotionRange = pxresult;
      });
    });
  };

  $scope.LoadKneeMotionRange();

  $scope.addNew = function (kneeMotionRange) {
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,MotionArea : kneeMotionRange.MotionArea
      ,Left     : kneeMotionRange.Left
      ,Right    : kneeMotionRange.Right
    }
    $ipadrbg.context.clinix_KneeMotionRange.add(newrecord);
    $ipadrbg.context.clinix_KneeMotionRange.saveChanges();

    kneeMotionRange.Left = "";
    kneeMotionRange.Right = "";

    $scope.LoadKneeMotionRange();
  }

  $scope.removeKneeMotionRange = function (kneeMotionRange) {
    kneeMotionRange.remove()
    .then(function() {
      $scope.$apply(function() {
         var kneeMotio = $scope.clinix_KneeMotionRange;
         kneeMotio.splice(kneeMotio.indexOf(kneeMotionRange), 1);
      });
    })
   .fail(function(err) {
       alert("Error deleting item!");
   });
  }
});