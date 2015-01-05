IOHPEApp.controller('HipStandingCtrl', function ($scope, $routeParams, $http){
  $scope.clinix_HipStanding = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadHipStanding = function(){
    var promise = $ipadrbg.context.clinix_HipStanding.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_HipStanding = pxresult;
      });
    });
  };

  $scope.LoadHipStanding();

  $scope.addNew = function (hipStanding) {
    if (hipStanding.PelvisLevel) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Standing : "Pelvis Level"
        ,Left     : hipStanding.PelvisLevel
      }
      $ipadrbg.context.clinix_HipStanding.add(newrecord);
    }

    if (hipStanding.TrendLeft || hipStanding.TrendRight) {
      var xL = (hipStanding.TrendLeft) ? "Left: " + hipStanding.TrendLeft : "";
      var xR = (hipStanding.TrendRight) ? "Right: " + hipStanding.TrendRight : "";

      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Standing : "Trendelenberg Exam"
        ,Left     : xL
        ,Right    : xR
      }
      $ipadrbg.context.clinix_HipStanding.add(newrecord);
    }
    
    $ipadrbg.context.clinix_HipStanding.saveChanges();

    hipStanding.PelvisLevel = "";
    hipStanding.TrendLeft = "";
    hipStanding.TrendRight = "";

    $scope.LoadHipStanding();
  }

  $scope.removeHipStanding = function (hipStanding) {
    hipStanding.remove()
    .then(function() {
      $scope.$apply(function() {
         var hipStands = $scope.clinix_HipStanding;
         hipStands.splice(hipStands.indexOf(hipStanding), 1);
      });
    })
   .fail(function(err) {
       alert("Error deleting item!");
   });
  }
});