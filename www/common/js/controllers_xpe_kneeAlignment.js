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

    if (kneeAlignment.SupineDegrees || kneeAlignment.Degrees12) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Alignment : "Supine"
        ,Degrees   : kneeAlignment.SupineDegrees
      }
      $ipadrbg.context.clinix_KneeAlignment.add(newrecord);
    }

    if (kneeAlignment.Normal) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Alignment : "Normal"
        ,Degrees  : kneeAlignment.Normal
      }
      $ipadrbg.context.clinix_KneeAlignment.add(newrecord);
    }

    if (kneeAlignment.Varus) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Alignment : "Varus"
        ,Degrees  : kneeAlignment.Varus
      }
      $ipadrbg.context.clinix_KneeAlignment.add(newrecord);
    }

    if (kneeAlignment.Valgus) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Alignment : "Valgus"
        ,Degrees  : kneeAlignment.Valgus
      }
      $ipadrbg.context.clinix_KneeAlignment.add(newrecord);
    }

    $ipadrbg.context.clinix_KneeAlignment.saveChanges();

    kneeAlignment.SupineDegrees = "";
    kneeAlignment.Normal = "";
    kneeAlignment.Varus = "";
    kneeAlignment.Valgus = "";

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