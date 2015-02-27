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

    // if (kneeForm.AppearanceR || kneeForm.AppearanceSeverityR) {
      newrecord = {
        ClinixRID : $scope.clinix.ClinixRID
        ,PxRID    : $scope.clinix.PxRID

        , NormalR         : kneeForm.NormalR
        , SwellingR       : kneeForm.SwellingR
        , RedR            : kneeForm.RedR

        , SynovitisR      : kneeForm.SynovitisR
        , EffusionR       : kneeForm.EffusionR
        , PainActiveROMR  : kneeForm.PainActiveROMR
        , PainPassiveROMR : kneeForm.PainPassiveROMR

        , NormalL         : kneeForm.NormalL
        , SwellingL       : kneeForm.SwellingL
        , RedL            : kneeForm.RedL

        , SynovitisL      : kneeForm.SynovitisL
        , EffusionL       : kneeForm.EffusionL
        , PainActiveROML  : kneeForm.PainActiveROML
        , PainPassiveROML : kneeForm.PainPassiveROML
      }
      $ipadrbg.context.clinix_KneeAppearance.add(newrecord);
    // }
    // if (kneeForm.Appearan
    kneeForm.NormalR = "";
    kneeForm.SwellingR = "";
    kneeForm.RedR = "";
    kneeForm.AppearanceSeverityR = "";
    kneeForm.SynovitisR = "";
    kneeForm.EffusionR = "";
    kneeForm.PainActiveROMR = "";
    kneeForm.PainPassiveROMR = "";

    kneeForm.NormalL = "";
    kneeForm.SwellingL = "";
    kneeForm.RedL = "";
    kneeForm.AppearanceSeverityL = "";
    kneeForm.SynovitisL = "";
    kneeForm.EffusionL = "";
    kneeForm.PainActiveROML = "";
    kneeForm.PainPassiveROML = "";

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