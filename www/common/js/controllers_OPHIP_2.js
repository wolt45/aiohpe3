IOHPEApp.controller('OPHIP_2Ctrl', function ($scope, $routeParams, $http){
  // $scope.jdata_OPHIP_2 = [];

  // $scope.ClinixRID = $routeParams.p_clinixrid;

  // // $scope.ClinixRID =  parseInt($scope.CurrentClinixRID);

  // $scope.LoadOPHIP_2 = function(){
  //   var promise = $ipadrbg.context.jdata_OPHIP_2.filter(function (px) { 
  //     return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
  //   promise.then(function(pxresult) {
  //     $scope.$apply(function () {
  //       $scope.jdata_OPHIP_2 = pxresult;
  //     });
  //   });
  // };

  // $scope.LoadOPHIP_2();

  // $scope.addNew = function (frmObj) {
  //   newrecord = {
  //     ClinixRID : $scope.clinix.ClinixRID
  //     ,PxRID    : $scope.clinix.PxRID

  //     ,SurgeryType : frmObj.SurgeryType
  //     ,SurgeryDate : frmObj.SurgeryDate
  //     ,Surgeon     : frmObj.Surgeon
  //     ,Assistant   : frmObj.Assistant
  //     ,Cardio      : frmObj.Cardio
  //     ,Anesthesio  : frmObj.Anesthesio
  //     ,AnesthesiaType : frmObj.AnesthesiaType
  //     ,Hospital   : frmObj.Hospital
  //   }
  //   $ipadrbg.context.jdata_OPHIP_2.add(newrecord);
  //   $ipadrbg.context.jdata_OPHIP_2.saveChanges();

  //   frmObj.SurgeryType = "";
  //   frmObj.SurgeryDate = "";
  //   frmObj.Surgeon = "";
  //   frmObj.Cardio = "";
  //   frmObj.Assistant = "";
  //   frmObj.Anesthesio = "";
  //   frmObj.AnesthesiaType = "";
  //   frmObj.Hospital = "";

  //   $scope.LoadOPHIP_2();
  // }

  // $scope.removeItem = function (frmObj) {
  //   frmObj.remove()
  //   .then(function() {
  //     $scope.$apply(function() {
  //        var diagol = $scope.jdata_OPHIP_2;
  //        diagol.splice(diagol.indexOf(frmObj), 1);
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