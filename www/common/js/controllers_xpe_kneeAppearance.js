IOHPEApp.controller('KneeAppearanceCtrl', function ($scope, $routeParams, $http){
  $scope.clinix_KneeAppearance = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadKneeAppearance = function(){
    var promise = $ipadrbg.context.clinix_KneeAppearance.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_KneeAppearance = pxresult;
      });
    });
  };

  $scope.LoadKneeAppearance();

  $scope.addNew = function (kneeAppearance) {

    if (kneeAppearance.NatureOfAppearance1 || kneeAppearance.AppearanceSeverity1) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,AppearanceItem     : kneeAppearance.AppearanceItem1
        ,NatureOfAppearance : kneeAppearance.NatureOfAppearance1
        ,AppearanceSeverity : kneeAppearance.AppearanceSeverity1
      }
      $ipadrbg.context.clinix_KneeAppearance.add(newrecord);
    }

    if (kneeAppearance.AppearanceSeverity2) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,AppearanceItem     : kneeAppearance.AppearanceItem2
        ,AppearanceSeverity : kneeAppearance.AppearanceSeverity2
      }
      $ipadrbg.context.clinix_KneeAppearance.add(newrecord);
    }


    kneeAppearance.AppearanceItem1 = "Appearance";
    kneeAppearance.NatureOfAppearance1 = "";
    kneeAppearance.AppearanceSeverity1 = "";

    kneeAppearance.AppearanceItem2 = "";
    kneeAppearance.AppearanceSeverity2 = "";
    
    $ipadrbg.context.clinix_KneeAppearance.saveChanges();

    $scope.LoadKneeAppearance();
  }

  $scope.removeKneeAppearance = function (kneeAppearance) {
    kneeAppearance.remove()
    .then(function() {
      $scope.$apply(function() {
         var kneeAppear = $scope.clinix_KneeAppearance;
         kneeAppear.splice(kneeAppear.indexOf(kneeAppearance), 1);
      });
    })
   .fail(function(err) {
       alert("Error deleting item!");
   });
  }
});