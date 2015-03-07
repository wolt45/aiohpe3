IOHPEApp.controller('OPHIP_2Ctrl', function ($scope, $routeParams, $http){
  $scope.clinix_DiagSchedSurgery = [];
  $scope.ClinixRID = $routeParams.p_clinixrid;

  $scope.LoadDiagsSchedSurg = function(){
    var promise = $ipadrbg.context.clinix_DiagSchedSurgery.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.clinix_DiagSchedSurgery = pxresult;

        $scope.surgery = {
            ClinixRID : $scope.clinix.ClinixRID
            ,PxRID    : $scope.clinix.PxRID
            ,SurgeryType : pxresult[0]['SurgeryType']
            ,SurgeryDate : pxresult[0]['SurgeryDate']
            ,Surgeon     : pxresult[0]['Surgeon']
            ,Assistant   : pxresult[0]['Assistant']
            ,Cardio      : pxresult[0]['Cardio']
            ,Anesthesio  : pxresult[0]['Anesthesio']
            ,AnesthesiaType: pxresult[0]['AnesthesiaType']
            ,Hospital    : pxresult[0]['Hospital']
            ,Others      : pxresult[0]['Others']
        };
      });
    });
  };

  $scope.LoadDiagsSchedSurg();

  $scope.UpdateMe = function (daignosisObj){
    var promise = $ipadrbg.context.clinix_DiagSchedSurgery.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        
        $ipadrbg.context.clinix_DiagSchedSurgery.attach(pxresult[0]);

        pxresult[0].SurgeryType     = daignosisObj.SurgeryType;
        pxresult[0].SurgeryDate     = daignosisObj.SurgeryDate;
        pxresult[0].Surgeon         = daignosisObj.Surgeon;
        pxresult[0].Assistant       = daignosisObj.Assistant;
        pxresult[0].Cardio          = daignosisObj.Cardio;
        pxresult[0].Anesthesio      = daignosisObj.Anesthesio;
        pxresult[0].AnesthesiaType  = daignosisObj.AnesthesiaType;
        pxresult[0].Hospital        = daignosisObj.Hospital;
        pxresult[0].Others          = daignosisObj.Others;

        $ipadrbg.context.clinix_DiagSchedSurgery.saveChanges();

        $scope.LoadDiagsSchedSurg();
      });
    });
  }

  $scope.addNew = function (daignosisObj) {
    // if solved na, put delete here


    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,SurgeryType : daignosisObj.SurgeryType
      ,SurgeryDate : daignosisObj.SurgeryDate
      ,Surgeon     : daignosisObj.Surgeon
      ,Assistant   : daignosisObj.Assistant
      ,Cardio      : daignosisObj.Cardio
      ,Anesthesio  : daignosisObj.Anesthesio
      ,AnesthesiaType: daignosisObj.AnesthesiaType    
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
    daignosisObj.AnesthesiaType = "";
    daignosisObj.Cardio = "";
    daignosisObj.Hospital = "";
    daignosisObj.Others = "";

    $scope.LoadDiagsSchedSurg();
  }

  $scope.removeItem = function (daignosisObj) {
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