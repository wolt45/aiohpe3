IOHPEApp.controller('OPKNEE_4Ctrl', function ($scope, $routeParams, $http){
  $scope.jdata_OPKNEE_4 = [];

  $scope.ClinixRID = $routeParams.p_clinixrid;

  // $scope.ClinixRID =  parseInt($scope.CurrentClinixRID);

  $scope.LoadOPKNEE_4 = function(){
    var promise = $ipadrbg.context.jdata_OPKNEE_4.filter(function (px) { 
      return px.ClinixRID == this.id},{id:$scope.ClinixRID}).toLiveArray();
    promise.then(function(pxresult) {
      $scope.$apply(function () {
        $scope.jdata_OPKNEE_4 = pxresult;
      });
    });
  };

  $scope.LoadOPKNEE_4();

  $scope.addNew = function (frmObj) {
    newrecord = {
      ClinixRID : $scope.clinix.ClinixRID
      ,PxRID    : $scope.clinix.PxRID

      ,Approach : frmObj.Approach
      ,Tourniquet  : frmObj.Tourniquet
      ,ReleaseB4C : frmObj.ReleaseB4C
      ,Subvastus : frmObj.Subvastus
      ,SurgicalIncision : frmObj.SurgicalIncision
      ,StraightAnterior : frmObj.StraightAnterior
      ,BonePreparation : frmObj.BonePreparation
      ,CementingComponents : frmObj.CementingComponents
      ,LaterRelease : frmObj.LaterRelease
      ,HemovacUsed : frmObj.HemovacUsed
    }
    $ipadrbg.context.jdata_OPKNEE_4.add(newrecord);
    $ipadrbg.context.jdata_OPKNEE_4.saveChanges();

    frmObj.Approach = "";
    frmObj.Tourniquet = "";
    frmObj.ReleaseB4C = "";
    frmObj.Subvastus = "";
    frmObj.SurgicalIncision = "";
    frmObj.StraightAnterior = "";
    frmObj.BonePreparation = "";
    frmObj.CementingComponents = "";
    frmObj.LaterRelease = "";
    frmObj.HemovacUsed = "";

    $scope.LoadOPKNEE_4();
  }

  $scope.removeItem = function (frmObj) {
    frmObj.remove()
    .then(function() {
      $scope.$apply(function() {
         var diagol = $scope.jdata_OPKNEE_4;
         diagol.splice(diagol.indexOf(frmObj), 1);
      });
    })
   .fail(function(err) {
       alert("Error deleting item!");
   });
  }

});