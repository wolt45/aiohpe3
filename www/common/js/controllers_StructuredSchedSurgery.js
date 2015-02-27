IOHPEApp.controller('StructuredSchedSurgCtrl', function ($scope, $routeParams, $http){
  // $scope.clinix_StructuredSchedSurgery = [];
  // $scope.ClinixRID = $routeParams.p_clinixrid;

  // $scope.LoadDiagsSchedSurg = function(){
  //   var promise = $ipadrbg.context.clinix_StructuredSchedSurgery.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
  //   promise.then(function(pxresult) {
  //     $scope.$apply(function () {
  //       $scope.clinix_StructuredSchedSurgery = pxresult;
  //     });
  //   });
  // };

  // $scope.LoadDiagsSchedSurg();

  // $scope.addNew = function (daignosisObj) {
  //   newrecord = {
  //     ClinixRID : $scope.clinix.ClinixRID
  //     ,PxRID    : $scope.clinix.PxRID

  //     ,SurgeryType : daignosisObj.SurgeryType
  //     ,SurgeryDate : daignosisObj.SurgeryDate
  //     ,Surgeon     : daignosisObj.Surgeon
  //     ,Assistant   : daignosisObj.Assistant
  //     ,Cardio      : daignosisObj.Cardio
  //     ,Anesthesio  : daignosisObj.Anesthesio
  //     ,Hospital    : daignosisObj.Hospital
  //     ,Others      : daignosisObj.Others
  //   }
  //   $ipadrbg.context.clinix_StructuredSchedSurgery.add(newrecord);
  //   $ipadrbg.context.clinix_StructuredSchedSurgery.saveChanges();

  //   daignosisObj.SurgeryType = "";
  //   daignosisObj.SurgeryDate = null;
  //   daignosisObj.Surgeon = "";
  //   daignosisObj.Assistant = "";
  //   daignosisObj.Anesthesio = "";
  //   daignosisObj.Cardio = "";
  //   daignosisObj.Hospital = "";
  //   daignosisObj.Others = "";

  //   $scope.LoadDiagsSchedSurg();
  // }

  // $scope.removeItem = function (daignosisObj) {
  //   daignosisObj.remove()
  //   .then(function() {
  //     $scope.$apply(function() {
  //        var diagol = $scope.clinix_StructuredSchedSurgery;
  //        diagol.splice(diagol.indexOf(daignosisObj), 1);
  //     });
  //   })
  //  .fail(function(err) {
  //      alert("Error deleting item!");
  //  });
  // }

  $scope.clinix_DiagSchedSurgery = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadDiagsSchedSurg = function(){
    var promise = $ipadrbg.context.clinix_DiagSchedSurgery.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_DiagSchedSurgery = pxresult;
      });
    });
  };

  $scope.LoadDiagsSchedSurg();

  $scope.addNew = function (daignosisObj) {
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,SurgeryType : daignosisObj.SurgeryType
      ,SurgeryDate : daignosisObj.SurgeryDate
      ,Surgeon     : daignosisObj.Surgeon
      ,Assistant   : daignosisObj.Assistant
      ,Cardio      : daignosisObj.Cardio
      ,Anesthesio  : daignosisObj.Anesthesio
      ,Hospital    : daignosisObj.Hospital
      ,Others      : daignosisObj.Others
    }
    $ipadrbg.context.clinix_DiagSchedSurgery.add(newrecord);
    $ipadrbg.context.clinix_DiagSchedSurgery.saveChanges();

    daignosisObj.SurgeryType = "";
    daignosisObj.SurgeryDate = null;
    daignosisObj.Surgeon = "";
    daignosisObj.Assistant = "";
    daignosisObj.Anesthesio = "";
    daignosisObj.Cardio = "";
    daignosisObj.Hospital = "";
    daignosisObj.Others = "";

    $scope.LoadDiagsSchedSurg();
  }

  $scope.removeDiagnosis = function (daignosisObj) {
    daignosisObj.remove()
    .then(function() {
      $scope.$apply(function() {
         var diagol = $scope.clinix_DiagSchedSurgery;
         diagol.splice(diagol.indexOf(daignosisObj), 1);
      });
    })
   .fail(function(err) {
       alert("Error deleting item!");
   });
  }
});