IOHPEApp.controller('KneeAppearanceCtrl', function ($scope, $routeParams, $http){
  $scope.clinix_KneeAppearance = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadKneeAppearance = function(){
    var promise = $ipadrbg.context.clinix_KneeAppearance.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_KneeAppearance = pxresult;
      });

      $scope.KneeForm = {
        ClinixRID  : $scope.clinix.ClinixRID
        ,PxRID     : $scope.clinix.PxRID

        ,NormalR : pxresult[0]['NormalR']
        ,SwellingR : pxresult[0]['SwellingR']
        ,RedR : pxresult[0]['RedR']
        ,AppearanceSeverityR : pxresult[0]['AppearanceSeverityR']
        ,SynovitisR : pxresult[0]['SynovitisR']
        ,EffusionR : pxresult[0]['EffusionR']
        ,PainActiveROMR : pxresult[0]['PainActiveROMR']
        ,PainPassiveROMR : pxresult[0]['PainPassiveROMR']
        ,NormalL : pxresult[0]['NormalL']
        ,SwellingL : pxresult[0]['SwellingL']

        ,RedL : pxresult[0]['RedL']
        ,AppearanceSeverityL : pxresult[0]['AppearanceSeverityL']
        ,SynovitisL : pxresult[0]['SynovitisL']
        ,EffusionL : pxresult[0]['EffusionL']
        ,PainActiveROML : pxresult[0]['PainActiveROML']
        ,PainPassiveROML : pxresult[0]['PainPassiveROML']
      }
    });
  };

  $scope.LoadKneeAppearance();

  $scope.addNew_KneeAppearance = function (kneeForm) {
    var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
    db.transaction(function (tx) {
      tx.executeSql("delete from 'clinix_KneeAppearance' WHERE ClinixRID = " + $scope.ClinixRID);
    });

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
    $ipadrbg.context.clinix_KneeAppearance.saveChanges();

    alert("KNEE Appearance Data Saved!");

    $scope.LoadKneeAppearance();
  }

  $scope.removeKneeAppearance = function () {
    if (confirm('Are you sure to Delete this data?')) {
      var db = window.openDatabase("ipadrbg", "", "iPadMR", 200000);
      db.transaction(function (tx) {
        tx.executeSql("delete from 'clinix_KneeAppearance' WHERE ClinixRID = " + $scope.ClinixRID);
      });
      $scope.KneeForm = [];
    }
  }
});