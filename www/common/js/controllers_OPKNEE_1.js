IOHPEApp.controller('OPKNEE_1Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_OPKNEE_1 = [];

  $scope.ClinixRID = $routeParams.p_clinixrid;

  // $scope.ClinixRID =  parseInt($scope.CurrentClinixRID);

  $scope.LoadOPKNEE_1 = function(){
    var promise = $ipadrbg.context.jdata_OPKNEE_1.filter(function (px) { return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_OPKNEE_1 = pxresult;
      });
    });
  };

  $scope.LoadOPKNEE_1();

  $scope.addNew = function (frmObj) {
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,PreOpDiagnosis : frmObj.PreOpDiagnosis
    }
    $ipadrbg.context.jdata_OPKNEE_1.add(newrecord);
    $ipadrbg.context.jdata_OPKNEE_1.saveChanges();

    frmObj.PreOpDiagnosis = "";
    $scope.LoadOPKNEE_1();
  }

  $scope.removeItem = function (frmObj) {
    frmObj.remove()
    .then(function() {
      $scope.$apply(function() {
         var diagol = $scope.jdata_OPKNEE_1;
         diagol.splice(diagol.indexOf(frmObj), 1);
      });
    })
   .fail(function(err) {
       alert("Error deleting item!");
   });
  }


});