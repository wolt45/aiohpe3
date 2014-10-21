IOHPEApp.controller('KneeAlignmentCtrl', function ($scope, $routeParams, $http){
  $scope.clinix_KneeAlignment = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadKneeAlignment = function(){
    var promise = $ipadrbg.context.clinix_KneeAlignment.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_KneeAlignment = pxresult;
      });
    });
  };

  $scope.LoadKneeAlignment();

  $scope.addNew = function (kneeAlignment) {

    if (kneeAlignment.Degrees11 || kneeAlignment.Degrees12) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Alignment : kneeAlignment.Alignment1
        ,Degrees1  : kneeAlignment.Degrees11
        ,Degrees2  : kneeAlignment.Degrees12
      }
      $ipadrbg.context.clinix_KneeAlignment.add(newrecord);
    }

    if (kneeAlignment.Degrees21) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Alignment : kneeAlignment.Alignment2
        ,Degrees1  : kneeAlignment.Degrees21
      }
      $ipadrbg.context.clinix_KneeAlignment.add(newrecord);
    }
    $ipadrbg.context.clinix_KneeAlignment.saveChanges();

    kneeAlignment.Degrees11 = "";
    kneeAlignment.Degrees12 = "";
    kneeAlignment.Degrees21 = "";

    $scope.LoadKneeAlignment();
  }

  $scope.removeKneeAlignment = function (kneeAlignment) {
    kneeAlignment.remove()
    .then(function() {
      $scope.$apply(function() {
         var kneeAlign = $scope.clinix_KneeAlignment;
         kneeAlign.splice(kneeAlign.indexOf(kneeAlignment), 1);
      });
    })
   .fail(function(err) {
       alert("Error deleting item!");
   });
  }
});