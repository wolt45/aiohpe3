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

  $scope.addNew = function (kneeForm) {

    if (kneeForm.Appearance || kneeForm.AppearanceSeverity) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        , Appearance : kneeForm.Appearance
        , Severity   : kneeForm.AppearanceSeverity
      }
      $ipadrbg.context.clinix_KneeAppearance.add(newrecord);
    }

    if (kneeForm.Synovitis) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Appearance : "Synovitis"
        ,Severity   : kneeForm.Synovitis
      }
      $ipadrbg.context.clinix_KneeAppearance.add(newrecord);
    }

    if (kneeForm.Effusion) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Appearance : "Effusion"
        ,Severity   : kneeForm.Effusion
      }
      $ipadrbg.context.clinix_KneeAppearance.add(newrecord);
    }

    if (kneeForm.PainActiveROM) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Appearance : "Pain Active ROM"
        ,Severity   : kneeForm.PainActiveROM
      }
      $ipadrbg.context.clinix_KneeAppearance.add(newrecord);
    }

    if (kneeForm.PainPassiveROM) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        ,Appearance : "Pain Passive ROM"
        ,Severity   : kneeForm.PainPassiveROM
      }
      $ipadrbg.context.clinix_KneeAppearance.add(newrecord);
    }

    kneeForm.Appearance = "";
    kneeForm.AppearanceSeverity = "";
    kneeForm.Synovitis = "";
    kneeForm.Effusion = "";
    kneeForm.PainActiveROM = "";
    kneeForm.PainPassiveROM = "";

    $ipadrbg.context.clinix_KneeAppearance.saveChanges();

    $scope.LoadKneeAppearance();
  }

  $scope.removeKneeAppearance = function (kneeForm) {
    kneeForm.remove()
    .then(function() {
      $scope.$apply(function() {
         var kneeAppear = $scope.clinix_KneeAppearance;
         kneeAppear.splice(kneeAppear.indexOf(kneeForm), 1);
      });
    })
   .fail(function(err) {
       alert("Error deleting item!");
   });
  }
});