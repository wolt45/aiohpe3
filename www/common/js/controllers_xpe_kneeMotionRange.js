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
    if (kneeMotionRange.FlexionContractureLeft || kneeMotionRange.FlexionContractureRight ) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,MotionArea : "Flexion Contracture"
        ,Left     : kneeMotionRange.FlexionContractureLeft
        ,Right    : kneeMotionRange.FlexionContractureRight
      }
      $ipadrbg.context.clinix_KneeMotionRange.add(newrecord);
    }

    if (kneeMotionRange.ExtensionLeft || kneeMotionRange.ExtensionRight ) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,MotionArea : "Extension"
        ,Left     : kneeMotionRange.ExtensionLeft
        ,Right    : kneeMotionRange.ExtensionRight
      }
      $ipadrbg.context.clinix_KneeMotionRange.add(newrecord);
    }

    if (kneeMotionRange.FlexionLeft || kneeMotionRange.FlexionRight ) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,MotionArea : "Flexion"
        ,Left     : kneeMotionRange.FlexionLeft
        ,Right    : kneeMotionRange.FlexionRight
      }
      $ipadrbg.context.clinix_KneeMotionRange.add(newrecord);
    }

    $ipadrbg.context.clinix_KneeMotionRange.saveChanges();

    kneeMotionRange.FlexionContractureLeft = "";
    kneeMotionRange.FlexionContractureRight = "";

    kneeMotionRange.ExtensionLeft = "";
    kneeMotionRange.ExtensionRight = "";

    kneeMotionRange.FlexionLeft = "";
    kneeMotionRange.FlexionRight = "";

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