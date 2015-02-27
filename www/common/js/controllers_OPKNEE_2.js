IOHPEApp.controller('OPKNEE_2Ctrl', function ($scope, $routeParams, $http){
  
  $scope.jdata_OPKNEE_2 = [];

  $scope.ClinixRID = $routeParams.p_clinixrid;

  // $scope.ClinixRID =  parseInt($scope.CurrentClinixRID);

  $scope.LoadOPKNEE_2 = function(){
    var promise = $ipadrbg.context.jdata_OPKNEE_2.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_OPKNEE_2 = pxresult;
      });
    });
  };

  $scope.LoadOPKNEE_2();

  $scope.addNew = function (frmObj) {
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,SurgeryType : frmObj.SurgeryType
      ,SurgeryDate : frmObj.SurgeryDate
      ,Surgeon     : frmObj.Surgeon
      ,Assistant   : frmObj.Assistant
      ,Cardio      : frmObj.Cardio
      ,Anesthesio  : frmObj.Anesthesio
      ,AnesthesiaType : frmObj.AnesthesiaType
      ,Hospital   : frmObj.Hospital
    }
    $ipadrbg.context.jdata_OPKNEE_2.add(newrecord);
    $ipadrbg.context.jdata_OPKNEE_2.saveChanges();

    frmObj.SurgeryType    = "";
    frmObj.SurgeryDate    = "";
    frmObj.Surgeon        = "";
    frmObj.Assistant      = "";
    frmObj.Cardio         = "";
    frmObj.Anesthesio     = "";
    frmObj.AnesthesiaType = "";
    frmObj.Hospital = "";
    
    $scope.LoadOPKNEE_2();
  }

  $scope.removeItem = function (frmObj) {
    frmObj.remove()
    .then(function() {
      $scope.$apply(function() {
         var diagol = $scope.jdata_OPKNEE_2;
         diagol.splice(diagol.indexOf(frmObj), 1);
      });
    })
   .fail(function(err) {
       alert("Error deleting item!");
   });
  }
});