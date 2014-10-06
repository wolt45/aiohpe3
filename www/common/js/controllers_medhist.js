IOHPEApp.controller('MedHistCtrl', function ($scope, $routeParams, $http){
  $scope.clinix_MedHist = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.MedHistList = [
      { id : 0,  dropname : ""}
    , { id : 1,  dropname : "Heart Medication"}
    , { id : 3,  dropname : "Heart Surgery"}
    , { id : 4,  dropname : "Hypertension"}
    , { id : 5,  dropname : "Diabetes"}
    , { id : 6,  dropname : "Kidney"}
    , { id : 7,  dropname : "GI (ulcer, etc.)"}
    , { id : 8,  dropname : "Allergies"}
    , { id : 9,  dropname : "History of Infection"}
    , { id : 10,  dropname : "Lungs"}
    , { id : 11,  dropname : "Trauma"}
    , { id : 12,  dropname : "CNS"}
    , { id : 13,  dropname : "Others"}
  ]

  $scope.LoadMedHist = function(){
    var promise = $ipadrbg.context.clinix_MedHist.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_MedHist = pxresult;
      });
    });
  }

  $scope.LoadMedHist();

  $scope.addMedHist = function (grpMedHist) {
    newrecord = {
      ClinixRID         : $scope.clinix.ClinixRID
      ,PxRID            : $scope.clinix.PxRID

      ,MedHist         : grpMedHist.MedHist
      ,MedHistDetails  : grpMedHist.MedHistDetails
    }

    $ipadrbg.context.clinix_MedHist.add(newrecord);
    $ipadrbg.context.clinix_MedHist.saveChanges();

    grpMedHist.MedHist        = "";
    grpMedHist.MedHistDetails = "";

    //alert("HEY!");

    $scope.LoadMedHist();
  }

  $scope.removeMedHist = function (grpMedHist) {
    grpMedHist.remove()
    .then(function() {
      $scope.$apply(function() {
         var comps = $scope.clinix_MedHist;
         comps.splice(comps.indexOf(grpMedHist), 1);
      });
    })
   .fail(function(err) {
       alert("Error deleting item!");
   });
  }

});