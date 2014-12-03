IOHPEApp.controller('OPKNEE_3Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_OPKNEE_3 = [];

  $scope.ClinixRID = $routeParams.p_clinixrid;

  // $scope.ClinixRID =  parseInt($scope.CurrentClinixRID);

  $scope.LoadOPKNEE_3 = function(){
    var promise = $ipadrbg.context.jdata_OPKNEE_3.filter(function (px) { 
      return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_OPKNEE_3 = pxresult;
      });
    });
  };

  $scope.LoadOPKNEE_3();

  $scope.addNew = function (frmObj) {
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,TypeOfKNEERep : frmObj.TypeOfKNEERep
      ,ImplantUsed   : frmObj.ImplantUsed
      ,FemoralCompo  : frmObj.FemoralCompo
      ,TibiaCompo    : frmObj.TibiaCompo
      ,Patella       : frmObj.Patella
    }
    $ipadrbg.context.jdata_OPKNEE_3.add(newrecord);
    $ipadrbg.context.jdata_OPKNEE_3.saveChanges();

    frmObj.TypeOfKNEERep = "";
    frmObj.ImplantUsed = "";
    frmObj.FemoralCompo = "";
    frmObj.TibiaCompo = "";
    frmObj.Patella = "";

    $scope.LoadOPKNEE_3();
  }

  $scope.removeItem = function (frmObj) {
    frmObj.remove()
    .then(function() {
      $scope.$apply(function() {
         var diagol = $scope.jdata_OPKNEE_3;
         diagol.splice(diagol.indexOf(frmObj), 1);
      });
    })
   .fail(function(err) {
       alert("Error deleting item!");
   });
  }

});